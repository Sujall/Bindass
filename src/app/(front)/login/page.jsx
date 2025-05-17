'use client';

import { FiArrowLeft, FiArrowRight, FiMail } from 'react-icons/fi';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center relative">
      
      {/* Back Icon */}
      <button className="absolute top-4 left-4 text-white text-2xl">
        <FiArrowLeft />
      </button>

      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-white/80 mb-6">Enter your details to sign in</p>

        {/* Email Field */}
        <label className="text-sm block mb-2">Email Address</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6">
          <FiMail className="text-white/60 mr-2" />
          <input
            type="email"
            placeholder="your@email.com"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>

        {/* Next Button */}
        <button className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-semibold text-white text-sm gap-2 hover:opacity-90 transition">
          Next <FiArrowRight />
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Footer Links */}
        <div className="text-sm text-center text-white/70 space-x-4">
          <a href="/register" className="hover:underline">Create new</a>
          <span>|</span>
          <a href="/reset-password" className="hover:underline">Reset Password?</a>
          <span>|</span>
          <a href="/support" className="hover:underline">Need help?</a>
        </div>
      </div>
    </div>
  );
}
