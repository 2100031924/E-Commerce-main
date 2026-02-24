import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { Product } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

export const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useAuth();

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            layoutId={`product-image-${product.id}`}
            className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-200"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:border-[#FF8C00] transition-colors">
                <img 
                  src={`${product.image}?sig=${i}`} 
                  alt={product.name} 
                  className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-sm font-bold text-[#FF8C00] uppercase tracking-wider">{product.category}</span>
            <h1 className="text-4xl font-black text-gray-900 mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                <span className="font-bold text-[#FF8C00]">{product.rating}</span>
                <div className="flex text-[#f6ad55]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 font-medium">{product.reviews_count} Verified Reviews</span>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-[#e53e3e]">${product.price.toFixed(2)}</span>
              <span className="text-lg text-gray-400 line-through">${(product.price * 1.2).toFixed(2)}</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">20% OFF</span>
            </div>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Experience premium quality with our {product.name}. Designed for durability and style, 
              this product offers exceptional performance and value. Perfect for everyday use or as a special gift.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-[#FF8C00] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#FFA500] transition-all shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-200 text-gray-700 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all">
              <Heart size={20} />
              Wishlist
            </button>
          </div>

          {/* Features */}
          <div className="space-y-4 border-t border-gray-100 pt-8">
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">1 Year Warranty</h4>
                <p className="text-xs text-gray-500">Full protection against manufacturing defects</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">Free Express Delivery</h4>
                <p className="text-xs text-gray-500">Delivery within 2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">7 Days Easy Return</h4>
                <p className="text-xs text-gray-500">No questions asked return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
