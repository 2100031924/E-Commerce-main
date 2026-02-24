import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("ecommerce.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image TEXT,
    category TEXT,
    rating REAL DEFAULT 0,
    reviews_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_amount REAL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed Products if empty
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare("INSERT INTO products (name, price, image, category, rating, reviews_count) VALUES (?, ?, ?, ?, ?, ?)");
  const products = [
    ["Wireless Headphones", 99.99, "https://picsum.photos/id/7/400/400", "Electronics", 4.5, 120],
    ["Smartphone", 699.99, "https://picsum.photos/id/160/400/400", "Electronics", 4.7, 350],
    ["Laptop Pro", 1199.99, "https://picsum.photos/id/180/400/400", "Electronics", 4.6, 210],
    ["Bluetooth Speaker", 59.99, "https://picsum.photos/id/211/400/400", "Electronics", 4.4, 95],
    ["Smart Watch", 199.99, "https://picsum.photos/id/26/400/400", "Electronics", 4.3, 180],
    ["Running Shoes", 79.99, "https://picsum.photos/id/21/400/400", "Sports", 4.8, 150],
    ["Coffee Maker", 49.99, "https://picsum.photos/id/425/400/400", "Home", 4.2, 80],
    ["Backpack", 39.99, "https://picsum.photos/id/355/400/400", "Fashion", 4.5, 60]
  ];
  products.forEach(p => insertProduct.run(...p));
}

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

async function startServer() {
  const app = express();
  const server = createServer(app);
  const wss = new WebSocketServer({ server });
  const PORT = 3000;

  app.use(express.json());

  // WebSocket logic for real-time "Live Sales" notifications
  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket");
    
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const products = db.prepare("SELECT name FROM products ORDER BY RANDOM() LIMIT 1").get() as any;
        const locations = ["New York", "London", "Mumbai", "Tokyo", "Berlin", "Sydney"];
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        ws.send(JSON.stringify({
          type: "SALE_NOTIFICATION",
          message: `Someone in ${location} just bought ${products.name}!`,
          timestamp: new Date().toISOString()
        }));
      }
    }, 20000);

    ws.on("close", () => clearInterval(interval));
  });

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const info = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
      const token = jwt.sign({ id: info.lastInsertRowid, email }, JWT_SECRET);
      res.json({ token, user: { id: info.lastInsertRowid, name, email } });
    } catch (err) {
      res.status(400).json({ error: "Email already exists" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });

  // Product Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  });

  // Cart Routes
  app.get("/api/cart/:userId", (req, res) => {
    const cartItems = db.prepare(`
      SELECT cart.*, products.name, products.price, products.image, products.category 
      FROM cart 
      JOIN products ON cart.product_id = products.id 
      WHERE user_id = ?
    `).all(req.params.userId);
    res.json(cartItems);
  });

  app.post("/api/cart", (req, res) => {
    const { userId, productId, quantity } = req.body;
    const existing = db.prepare("SELECT * FROM cart WHERE user_id = ? AND product_id = ?").get(userId, productId) as any;
    if (existing) {
      db.prepare("UPDATE cart SET quantity = quantity + ? WHERE id = ?").run(quantity || 1, existing.id);
    } else {
      db.prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)").run(userId, productId, quantity || 1);
    }
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${3000}`);
  });
}

startServer();
