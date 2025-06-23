"use client";

import React from "react";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome to the Profile
      </h1>

      <p className="text-gray-600">
        This is your Profile. You can customize this section to show
        analytics, stats, quick links, or recent activity.
      </p>

      {/* Add more components here */}
    </div>
  );
}