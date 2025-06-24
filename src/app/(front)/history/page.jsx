"use client";

import { useState } from "react";
import { FaClock, FaCheckCircle, FaUsers } from "react-icons/fa";

const TABS = [
  { id: "active", label: "Active", icon: <FaClock className="w-4 h-4 mr-2" /> },
  { id: "completed", label: "Completed", icon: <FaCheckCircle className="w-4 h-4 mr-2" /> },
  { id: "stopped", label: "Stopped", icon: <FaUsers className="w-4 h-4 mr-2" /> },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md p-6">
        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-all border ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="text-center text-gray-500 text-sm font-medium py-20">
          No giveaways found
        </div>
      </div>
    </div>
  );
}
