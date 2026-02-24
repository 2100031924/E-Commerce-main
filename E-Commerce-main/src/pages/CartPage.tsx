import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const CartPage = () => {
  const { cart, removeFromCart } = useAuth();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center"
      >
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-[#FF8C00]" />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-10 max-w-xs">Looks like you haven't added anything to your cart yet. Start exploring our premium collection.</p>
        <Link to="/" className="bg-[#1a1f2e] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#FF8C00] transition-all shadow-xl shadow-gray-900/10 flex items-center gap-2">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-4xl font-black text-gray-900">Shopping Cart</h1>
          <span className="bg-white px-3 py-1 rounded-full border border-gray-200 text-sm font-bold text-gray-500">
            {cart.length} Items
          </span>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all"
                >
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-xl text-gray-900 hover:text-[#FF8C00] transition-colors cursor-pointer">{item.name}</h3>
                        <span className="font-black text-xl text-[#e53e3e]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-xs font-bold text-[#FF8C00] uppercase tracking-widest mb-4">{item.category}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"><Minus size={16} /></button>
                        <span className="px-6 font-black text-gray-900">{item.quantity}</span>
                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"><Plus size={16} /></button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2 text-sm font-bold"
                      >
                        <Trash2 size={18} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-black text-gray-900 mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Estimated Tax</span>
                  <span className="text-gray-900 font-bold">$0.00</span>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-3xl font-black text-[#e53e3e]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#FF8C00] text-white py-5 rounded-2xl font-bold hover:bg-[#FFA500] transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-3 active:scale-95">
                Checkout Now <ArrowRight size={20} />
              </button>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center gap-4 text-gray-400">
                <ShieldCheck size={24} className="text-green-500" />
                <p className="text-[10px] font-medium leading-tight">
                  Secure SSL Encryption. Your data is protected by industry-standard security protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
