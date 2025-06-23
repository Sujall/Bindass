"use client";

import React, { useState } from "react";

function StatsCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {stats.map(({ id, title, value }) => (
        <div
          key={id}
          className="bg-white p-6 rounded shadow-md flex flex-col items-center justify-center"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
          <p className="text-3xl font-bold text-blue-600">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [bannerImage, setBannerImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB.");
        setBannerImage(null);
        setPreviewUrl(null);
        return;
      }
      setError("");
      setBannerImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!bannerImage) {
      alert("Please select an image first.");
      return;
    }
    // Placeholder for real upload logic
    console.log("Uploading image...", bannerImage);
    alert("Banner uploaded successfully (simulation).");
  };

  // Example stats (replace with real data)
  const giveawayStats = [
    { id: 1, title: "Total Number of Giveaways", value: 128 },
    { id: 2, title: "Average Giveaway Participants", value: 347 },
    { id: 3, title: "Live Giveaways", value: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h1>

      <p className="text-gray-600 mb-6">
        This is your homepage. You can customize this section to show analytics,
        stats, quick links, or recent activity.
      </p>

      {/* Banner Upload Section */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-4">
          Upload Banner Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-3"
        />

        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

        {previewUrl && (
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <img
              src={previewUrl}
              alt="Banner Preview"
              className="w-full max-w-2xl h-48 object-cover rounded border"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload Banner
        </button>
      </div>

      {/* Stats Cards Section */}
      <StatsCards stats={giveawayStats} />
    </div>
  );
}
