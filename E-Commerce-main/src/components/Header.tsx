import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Mic, ChevronDown, Menu, X, LogOut, Package, Heart, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Header = () => {
  const { user, cart, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-300 bg-[#1a1f2e] py-4`}>
      <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="bg-[#FF8C00] p-2 rounded-lg">
            <Package className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">E-Commerce Shop</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-3xl items-center bg-white rounded-md overflow-hidden h-11 shadow-sm">
          <button className="bg-[#f3f4f6] text-[#1a1f2e] px-5 h-full flex items-center gap-3 text-xs font-bold border-r border-gray-200 hover:bg-gray-200 transition-colors whitespace-nowrap">
            <div className="flex flex-col items-start leading-none">
              <span>All</span>
              <span>Categories</span>
            </div>
            <ChevronDown size={14} />
          </button>
          <div className="flex-1 flex items-center px-4 h-full relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-transparent text-gray-900 text-sm outline-none placeholder:text-gray-400 font-medium"
            />
            <button className="text-gray-400 hover:text-[#FF8C00] transition-colors">
              <Mic size={18} />
            </button>
          </div>
          <button className="bg-[#FF8C00] h-full px-5 text-white hover:bg-[#FFA500] transition-colors">
            <Search size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-10">
          {/* User Account */}
          <div className="group relative cursor-pointer">
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-white/50 font-medium uppercase tracking-widest mb-0.5">Hello, Guest!</span>
              <div className="flex items-center gap-1 text-white">
                <span className="text-sm font-bold">Sign in</span>
                <ChevronDown size={14} className="group-hover:rotate-180 transition-transform text-white/70" />
              </div>
            </div>

            {/* Dropdown */}
            <div className="absolute top-full right-0 mt-4 w-72 bg-white border border-gray-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-6 z-[110]">
              <h3 className="text-lg font-black text-gray-900 mb-4">Your Account</h3>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {[
                  { label: 'My Orders', sub: 'Track, Return, Replace' },
                  { label: 'My Wishlist', sub: '0 items' },
                  { label: 'My Coupons', sub: '3 unused' },
                  { label: 'My Reviews', sub: '' },
                  { label: 'Saved Cards/UPI', sub: '' },
                  { label: 'Address Book', sub: '' },
                  { label: 'Notification Preferences', sub: '' },
                ].map((item, i) => (
                  <button key={i} className="text-left group/item">
                    <p className="text-sm font-bold text-gray-800 group-hover/item:text-[#FF8C00] transition-colors">{item.label}</p>
                    {item.sub && <p className="text-[10px] text-gray-400">{item.sub}</p>}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                {!user ? (
                  <>
                    <Link to="/login" className="w-full bg-[#FF8C00] text-white text-center py-3 rounded-lg font-bold hover:bg-[#FFA500] transition-all">Login</Link>
                    <Link to="/register" className="w-full border border-gray-200 text-gray-700 text-center py-3 rounded-lg font-bold hover:bg-gray-50 transition-all">Register</Link>
                  </>
                ) : (
                  <button 
                    onClick={logout}
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Cart */}
          <Link to="/cart" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#FF8C00] transition-all bg-white/5">
                <ShoppingCart size={20} className="text-white group-hover:text-[#FF8C00]" />
              </div>
              <span className="absolute -top-1 -right-1 bg-[#FF8C00] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-lg border border-[#1a1f2e]">
                {cartCount}
              </span>
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-[9px] text-white/50 font-medium uppercase tracking-widest mb-0.5">Shopping</span>
              <span className="text-sm font-bold text-white">Cart ({cartCount})</span>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a1f2e] border-t border-white/5 overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <Search size={18} className="text-white/40 mr-3" />
                <input type="text" placeholder="Search..." className="bg-transparent text-white text-sm outline-none w-full" />
              </div>
              <nav className="space-y-4">
                {['Electronics', 'Sports', 'Home', 'Fashion'].map(cat => (
                  <Link key={cat} to={`/products?category=${cat}`} className="block text-white/60 hover:text-white font-bold text-lg">
                    {cat}
                  </Link>
                ))}
              </nav>
              <div className="pt-6 border-t border-white/5">
                {user ? (
                  <button onClick={logout} className="text-red-400 font-bold">Sign Out</button>
                ) : (
                  <Link to="/login" className="bg-[#FF8C00] text-white block text-center py-4 rounded-xl font-bold">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
