import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, Zap, Shield, Truck, Clock, CheckCircle2, MessageSquare, CreditCard, Award, Gamepad2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../lib/utils';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-20">
      {/* Hero Section Carousel */}
      <section className="relative h-[70vh] min-h-[550px] flex items-center overflow-hidden bg-[#FF8C00]">
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-medium text-white leading-tight mb-6 tracking-tight">
              Big Billion Days <br />
              Starting Soon!
            </h1>
            <p className="text-xl md:text-2xl text-white font-medium mb-12 opacity-95">
              Up to 80% off on electronics, fashion & more
            </p>
            <div className="flex justify-center">
              <Link to="/products" className="bg-white text-[#FF8C00] px-10 py-4 rounded-xl font-medium text-xl hover:bg-orange-50 transition-all transform hover:scale-105 shadow-2xl">
                Explore Deals
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          <div className="w-4 h-4 rounded-full bg-white shadow-lg"></div>
          <div className="w-4 h-4 rounded-full bg-white/40 hover:bg-white/60 transition-colors cursor-pointer"></div>
          <div className="w-4 h-4 rounded-full bg-white/40 hover:bg-white/60 transition-colors cursor-pointer"></div>
          <div className="w-4 h-4 rounded-full bg-white/40 hover:bg-white/60 transition-colors cursor-pointer"></div>
        </div>
      </section>

      {/* Filter Pills */}
      <div className="bg-white py-6 px-6 shadow-sm overflow-x-auto border-b border-gray-100">
        <div className="flex gap-4 max-w-7xl mx-auto">
          {[
            { label: 'Trending Now', emoji: '🔥' },
            { label: 'Free Delivery', emoji: '🚚' },
            { label: 'EMI Available', emoji: '💳' },
            { label: 'Top Rated', emoji: '⭐' },
            { label: 'Just Launched', emoji: '🆕' },
            { label: 'Best Sellers', emoji: '🏆' },
            { label: 'Gift Cards', emoji: '🎁' },
            { label: 'Price Drop Alert', emoji: '💰' },
            { label: 'Bulk Offers', emoji: '📦' }
          ].map(pill => (
            <button key={pill.label} className="whitespace-nowrap px-6 py-3 rounded-xl border border-gray-100 text-sm font-bold text-gray-700 hover:bg-orange-50 hover:border-[#FF8C00] hover:text-[#FF8C00] transition-all flex items-center gap-2 shadow-sm">
              <span className="text-lg">{pill.emoji}</span> {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Today's Deals Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 mb-12">
            <h2 className="text-4xl lg:text-5xl font-black mb-2">Today's Deals</h2>
            <p className="text-xl opacity-80">Up to 50% off on selected items! Limited time offer.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {products.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us Section */}
      <section className="bg-[#1a1f2e] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-black text-[#FF8C00] text-center mb-16">Why Shop With Us?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { icon: <Shield size={24} />, title: "Secure Payment", sub: "SSL Encrypted" },
              { icon: <CheckCircle2 size={24} />, title: "100% Genuine", sub: "Authentic Products" },
              { icon: <Truck size={24} />, title: "Free Delivery", sub: "Above ₹499" },
              { icon: <RotateCcw size={24} />, title: "Easy Returns", sub: "7-Day Policy" },
              { icon: <MessageSquare size={24} />, title: "24/7 Support", sub: "Always Here" },
              { icon: <CreditCard size={24} />, title: "Cash on Delivery", sub: "Pay at Door" },
              { icon: <Award size={24} />, title: "ISO Certified", sub: "Quality Assured" }
            ].map((item, i) => (
              <div key={i} className="bg-[#0d1117] border border-[#FF8C00]/20 p-6 rounded-2xl text-center hover:border-[#FF8C00] transition-all group">
                <div className="text-[#FF8C00] mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-white font-bold text-xs mb-1">{item.title}</h3>
                <p className="text-gray-500 text-[10px]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Customer Reviews & Ratings</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-black text-gray-900">⭐ 4.5</span>
              <div className="flex text-orange-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-gray-500 font-bold">(Based on 12,345 reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", text: "Fast delivery and excellent product quality. Highly recommended!", rating: 5 },
              { name: "Priya Patel", text: "Great quality products at affordable prices. Will shop again.", rating: 5 },
              { name: "Amit Kumar", text: "Good prices and quick delivery. Customer service is responsive.", rating: 4 }
            ].map((review, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-2xl border-l-4 border-[#FF8C00] shadow-sm">
                <div className="flex text-orange-400 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill={j < review.rating ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{review.text}"</p>
                <p className="font-black text-gray-900">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="bg-[#0d1117] py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF8C00] rounded-full blur-[150px] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-black text-[#FF8C00] mb-8 flex items-center justify-center gap-4">
            <Gamepad2 size={40} /> Download Our App
          </h2>
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-white/80 font-bold">
            <p>✓ Get ₹100 off on first order</p>
            <p>✓ Track orders in real-time</p>
            <p>✓ Exclusive app-only deals</p>
          </div>
          <div className="flex justify-center gap-6">
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white hover:text-black transition-all">Google Play</button>
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl font-black hover:bg-white hover:text-black transition-all">App Store</button>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#1a1f2e] rounded-[2rem] overflow-hidden relative flex flex-col lg:flex-row items-center">
          <div className="p-12 lg:p-20 lg:w-1/2 z-10">
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Get <span className="text-[#FF8C00]">20% Off</span> Your <br />
              First Purchase
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Join our community and stay updated with the latest tech trends and exclusive offers.
            </p>
            <div className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white outline-none focus:border-[#FF8C00] transition-all"
              />
              <button className="bg-[#FF8C00] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#FFA500] transition-all">
                Join
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 h-64 lg:h-full relative">
            <img 
              src="https://picsum.photos/seed/tech/800/600" 
              className="w-full h-full object-cover opacity-60"
              alt="Promo"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1a1f2e]"></div>
          </div>
        </div>
      </section>

      {/* More Products */}
      <section className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-gray-900 mb-12">Explore More</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

const RotateCcw = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
