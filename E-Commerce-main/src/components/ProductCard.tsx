import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden bg-[#f9f9f9] relative">
        <Link to={`/product/${product.id}`}>
          <motion.img 
            layoutId={`product-image-${product.id}`}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-xl text-[10px] font-black text-[#FF8C00] shadow-md border border-gray-50">
          NEW
        </div>
      </div>
      <div className="p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xl font-medium text-[#1a1f2e] mb-2 truncate hover:text-[#FF8C00] transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-[#f6ad55]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">({product.reviews_count} reviews)</span>
        </div>
        
        <div className="mb-6">
          <span className="text-3xl font-bold text-[#e53e3e] tracking-tight">${product.price.toFixed(2)}</span>
        </div>

        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-[#FF8C00] text-white py-4 rounded-xl font-medium text-base flex items-center justify-center gap-3 hover:bg-[#FFA500] transition-all transform active:scale-95 shadow-lg shadow-orange-500/10"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
};
