"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/api/apiClient";

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 rounded-full">
      {stats.map(({ id, title, value }) => (
        <div
          key={id}
          className="bg-white p-6 rounded shadow-md flex flex-col items-center justify-center border border-black/15"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const [giveawayRes, bannerRes] = await Promise.all([
          apiClient.get("/admin/view-giveaway"),
          apiClient.get("/admin/media/banner"),
        ]);

        const giveaways = giveawayRes.data.giveaways || [];
        const banners = bannerRes.data.banners || [];

        const totalGiveaways = giveaways.length;

        const now = new Date();
        const liveGiveaways = giveaways.filter(g => new Date(g.endDate) > now).length;

        const computedStats = [
          { id: 1, title: "Total Number of Giveaways", value: totalGiveaways },
          { id: 3, title: "Live Giveaways", value: liveGiveaways },
          { id: 4, title: "Banners", value: banners.length },
        ];

        setStats(computedStats);
      } catch (err) {
        console.error("Failed to fetch dashboard stats:", err);
        setError("Something went wrong while loading dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        This is your homepage. You can customize this section to show analytics,
        stats, quick links, or recent activity.
      </p>

      {loading ? (
        <div className="text-gray-500">Loading stats...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <StatsCards stats={stats} />
      )}
    </div>
  );
}
