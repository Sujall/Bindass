'use client';

import { FiUser, FiPhone, FiMapPin } from 'react-icons/fi';

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
      {/* Register Card */}
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-2">Create an Account</h2>
        <p className="text-center text-white/80 mb-6">Step 1 of 3</p>

        {/* Full Name Field */}
        <label className="text-sm block mb-2">Full Name</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
          <FiUser className="text-white/60 mr-2" />
          <input
            type="text"
            placeholder="Your full name"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>

        {/* Phone Number Field */}
        <label className="text-sm block mb-2">Phone Number</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
          <FiPhone className="text-white/60 mr-2" />
          <input
            type="tel"
            placeholder="+1234567890"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>

        {/* Address Field */}
        <label className="text-sm block mb-2">Address</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6">
          <FiMapPin className="text-white/60 mr-2" />
          <input
            type="text"
            placeholder="Your address"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>

        {/* Next Button */}
        <button className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold text-white text-sm">
          Next
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Footer Links */}
        <div className="text-sm text-center text-white/70 space-x-4">
          <a href="/login" className="hover:underline">Already have an account?</a>
          <span>&bull;</span>
          <a href="#" className="hover:underline">Need help?</a>
        </div>
      </div>
    </div>
  );
}
