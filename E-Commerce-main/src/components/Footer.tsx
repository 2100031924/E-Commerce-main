import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-[#0d1117] text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* App Download Section */}
        <div className="bg-[#1a1f2e] p-8 rounded-2xl mb-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
          <div>
            <h3 className="text-2xl font-bold text-[#FF8C00] mb-4 flex items-center gap-2">
              🎮 Download Our App
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-white/80">
              <span>✓ Get ₹100 off on first order</span>
              <span>✓ Track orders in real-time</span>
              <span>✓ Exclusive app-only deals</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-white">Google Play</button>
            <button className="px-6 py-2 border border-white/20 rounded-lg hover:bg-white/5 transition-colors text-white">App Store</button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-white font-bold mb-6">COMPANY</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-[#FF8C00]">About Us</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Careers</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Affiliate Program</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Become a Seller</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Advertise</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">HELP & SUPPORT</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-[#FF8C00]">Contact Us</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">FAQ</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Return Policy</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Cancellation</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Refund Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">LEGAL</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="#" className="hover:text-[#FF8C00]">Terms of Use</Link></li>
              <li><Link to="#" className="hover:text-[#FF8C00]">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">FOLLOW US</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><span className="text-blue-500">🔵</span> Facebook</li>
              <li className="flex items-center gap-2"><span className="text-pink-500">📸</span> Instagram</li>
              <li className="flex items-center gap-2"><span className="text-blue-400">🐦</span> Twitter</li>
              <li className="flex items-center gap-2"><span className="text-red-500">📌</span> Pinterest</li>
              <li className="flex items-center gap-2"><span className="text-red-600">▶️</span> YouTube</li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-wrap gap-2">
            {['Visa', 'MasterCard', 'RuPay', 'UPI', 'PayPal', 'COD'].map(method => (
              <span key={method} className="bg-white/5 px-3 py-1 rounded text-[10px] font-bold text-white/60 border border-white/10">
                {method}
              </span>
            ))}
          </div>
          <p className="text-xs">© 2023 E-Commerce Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
