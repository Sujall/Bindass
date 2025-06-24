"use client";

import React from "react";
import Link from "next/link";

import { FiPlus, FiHelpCircle, FiCreditCard } from "react-icons/fi";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">My Wallet</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your funds and view recent transactions
          </p>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                <FiCreditCard className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Available Balance
              </h2>
            </div>
            <button
              className="cursor-not-allowed flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add Money
            </button>
          </div>
          <div className="text-4xl font-bold text-gray-800">₹0.00</div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Transactions
          </h2>

          {/* Empty State */}
          <div className="text-center py-10">
            <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 border-2 border-amber-300">
              <svg
                className="w-10 h-10 text-amber-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-base mb-2">
              You have no transactions yet
            </p>
            <button
              className="text-gray-700 transition-colors"
            >
              Make your first deposit
            </button>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <div className="flex justify-center items-center gap-2 mb-2 text-gray-500">
            <FiHelpCircle className="w-4 h-4" />
            <h3 className="text-sm font-medium">Need Help?</h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Our support team is here for you 24/7
          </p>
          <Link
            href="/support"
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
