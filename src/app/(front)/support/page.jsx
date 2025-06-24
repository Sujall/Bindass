'use client';
import React, { useEffect, useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiSearch,
  FiClock,
  FiRefreshCw,
  FiHelpCircle,
} from 'react-icons/fi';
import { RiCustomerService2Fill } from 'react-icons/ri';

export default function SupportPage() {
  const [today, setToday] = useState('');

  useEffect(() => {
    // Ensures the date is only set on client side to avoid hydration mismatch
    setToday(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RiCustomerService2Fill className="w-6 h-6" />
              <h1 className="text-xl font-bold">Customer Support</h1>
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
              <FiClock className="w-4 h-4" />
              <span>09:00 AM - 07:00 PM</span>
            </div>
          </div>
          <p className="text-sm opacity-90 mt-2">We're here to help you 7 days a week</p>
        </div>

        {/* Search */}
        <div className="p-5 pb-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="How can we help you today?"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-gray-50 text-black"
            />
          </div>
        </div>

        {/* FAQ Tags */}
        <div className="px-5 py-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Common Questions
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Account Issues', 'Payment Help', 'Game Rules', 'Withdrawals'].map((item) => (
              <button
                key={item}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Support Options */}
        <div className="p-5 pt-2 space-y-4">
          {/* Email */}
          <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-start gap-4 transition cursor-pointer">
            <div className="p-3 rounded-full bg-green-100 text-green-600 flex-shrink-0">
              <FiMail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Email Support</h3>
              <p className="text-sm text-gray-600 mt-1">Get help via email with detailed responses</p>
              <p className="text-sm text-green-600 font-medium mt-2">Bindaasonline@bindaas.online</p>
            </div>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-start gap-4 transition cursor-pointer">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
              <FiPhone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Phone Support</h3>
              <p className="text-sm text-gray-600 mt-1">Speak directly with our support agents</p>
              <p className="text-sm text-blue-600 font-medium mt-2">+91 77889 94454</p>
            </div>
          </div>

          {/* Live Chat */}
          <div className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-start gap-4 transition cursor-pointer">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 flex-shrink-0">
              <FiMessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">Live Chat</h3>
              <p className="text-sm text-gray-600 mt-1">Instant messaging with our support team</p>
              <button
                className="mt-3 w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-sm px-4 py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
                onClick={() => console.log("Start Chat clicked")}
              >
                <FiMessageCircle className="w-4 h-4" />
                Start Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Help Resources */}
        <div className="p-5 pt-0">
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <FiHelpCircle className="text-gray-500" />
              Help Resources
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition text-left">
                FAQ Center
              </button>
              <button className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition text-left">
                Community Forum
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
          <FiRefreshCw className="w-3 h-3" />
          <span>Last updated: {today}</span>
        </div>
      </div>
    </div>
  );
}
