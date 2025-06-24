'use client';

import { FiMail } from 'react-icons/fi';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
      {/* Reset Card */}
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
        <p className="text-center text-white/80 mb-6">
          Enter your email to reset your password
        </p>

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
        <button className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-500 hover:brightness-110 transition font-semibold text-white text-sm flex items-center justify-center gap-2">
          Next <span className="text-lg">→</span>
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Footer Link */}
        <div className="text-sm text-center text-white/70">
          <a href="/login" className="hover:underline">Back to Login</a>
        </div>
      </div>
    </div>
  );
}
