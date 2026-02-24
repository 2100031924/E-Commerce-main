import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (res.ok) {
      const data = await res.json();
      login(data.token, data.user);
      navigate('/');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl border border-white/5">
        {/* Left Panel */}
        <div className="p-12 flex flex-col justify-between bg-gradient-to-b from-[#1a1f2e] to-[#0d1117]">
          <div>
            <h1 className="text-2xl font-bold text-[#FF8C00] mb-8">E-Commerce Shop™</h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#FF8C00] to-[#FFA500] bg-clip-text text-transparent mb-4">Join Us Today!</h2>
            <p className="text-gray-400 mb-8">Create your account and start shopping with exclusive benefits</p>
            
            <ul className="space-y-4 mb-12">
              <li className="flex items-center gap-3 text-white/90">
                <span className="text-[#FF8C00]">🎁</span> Coupons & offers for new users
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <span className="text-[#FF8C00]">💳</span> Save addresses and payment methods
              </li>
              <li className="flex items-center gap-3 text-white/90">
                <span className="text-[#FF8C00]">🎯</span> Personalized recommendations
              </li>
            </ul>
          </div>
          
          <Link to="/" className="inline-flex items-center text-white/60 hover:text-white border border-white/20 px-6 py-2 rounded-full transition-all w-fit">
            ← Back to Shop
          </Link>
        </div>

        {/* Right Panel */}
        <div className="p-12 border-l-4 border-[#FF8C00] bg-[#0d1117]">
          <h3 className="text-2xl font-bold text-white mb-1">Create Account</h3>
          <div className="w-12 h-1 bg-[#FF8C00] mb-8"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#FF8C00] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#FF8C00] outline-none transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#FF8C00] outline-none transition-colors"
                required
              />
              <p className="text-[10px] text-gray-500 mt-1">Minimum 6 characters</p>
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:border-[#FF8C00] outline-none transition-colors"
                required
              />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FF6B00] text-white py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-orange-500/20 transition-all">
              CREATE ACCOUNT
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500 mb-8">By signing up, you agree to our Terms of Service and Privacy Policy</p>
            <p className="text-gray-400 mb-4">Already have an account?</p>
            <Link to="/login" className="inline-block w-full border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/5 transition-all">
              SIGN IN INSTEAD
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
