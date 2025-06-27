"use client";

import apiClient from "@/api/apiClient";
import { useEffect, useState } from "react";
import { FaClock, FaCheckCircle, FaUsers } from "react-icons/fa";

const TABS = [
  { id: "active", label: "Active", icon: <FaClock className="w-4 h-4 mr-2" /> },
  {
    id: "completed",
    label: "Completed",
    icon: <FaCheckCircle className="w-4 h-4 mr-2" />,
  },
  {
    id: "stopped",
    label: "Stopped",
    icon: <FaUsers className="w-4 h-4 mr-2" />,
  },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [participation, setParticipation] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await fetch("/api/user/giveaway-history"); // Adjust API path if needed
  //       const data = await res.json();
  //       setParticipation(data.participation || []);
  //     } catch (err) {
  //       console.error("Failed to fetch history", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchHistory();
  // }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get("/giveaways/history");
        setParticipation(res.data.participation || []);
      } catch (err) {
        console.error("Failed to fetch giveaway history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const now = new Date();

  const filtered = participation.filter(({ giveaway }) => {
    const isEnded = new Date(giveaway.endDate) < now;

    if (activeTab === "active") return !isEnded;
    if (activeTab === "completed") return isEnded;
    if (activeTab === "stopped") return false; // Logic for "stopped" goes here if applicable
    return true;
  });

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

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500 text-sm font-medium py-20">
            No giveaways found
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(({ giveaway, participant }, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-4">
                    <h2 className="text-lg font-semibold">{giveaway.title}</h2>
                    <p className="text-sm text-gray-500">{giveaway.subTitle}</p>
                    <p className={"text-sm text-gray-500"}>
                      Status:{" "}
                      <span
                        className={`capitalize font-bold ${
                          participant.status === "pending"
                            ? "text-yellow-600"
                            : participant.status === "verified"
                            ? "text-green-600"
                            : participant.status === "rejected"
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {participant.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
