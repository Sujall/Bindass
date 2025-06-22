"use client";

import React, { useState } from "react";

export default function CreateGiveawayPage() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    entryFee: "",
    totalSeats: "",
    endDate: "",
    categories: "",
    banner: null,
    qrCode: null, // ✅ new field
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send `formData` to backend
    console.log("Giveaway submitted:", formData);
  };

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Giveaway</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Banner Image Upload */}
        <div>
          <label className="block font-medium mb-2">Giveaway Banner Image</label>
          <input
            type="file"
            accept="image/*"
            name="banner"
            onChange={handleChange}
            className="block w-full border p-2 rounded-md"
          />
        </div>

        {/* ✅ QR Code Upload */}
        <div>
          <label className="block font-medium mb-2">QR Code Image</label>
          <input
            type="file"
            accept="image/*"
            name="qrCode"
            onChange={handleChange}
            className="block w-full border p-2 rounded-md"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="iPhone 15 Giveaway: Black, Bold & Yours to Win!"
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-medium mb-2">Subtitle</label>
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Apple iPhone 15 (Black Titanium, 128 GB)"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Enter the full giveaway description..."
          />
        </div>

        {/* Entry Fee */}
        <div>
          <label className="block font-medium mb-2">Entry Fee (₹)</label>
          <input
            type="number"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="e.g. 19"
            required
          />
        </div>

        {/* Total Seats */}
        <div>
          <label className="block font-medium mb-2">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="e.g. 1500"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block font-medium mb-2">End Date & Time</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium mb-2">Categories (comma separated)</label>
          <input
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            className="w-full border p-2 rounded-md"
            placeholder="Mobile, iPhone, Apple"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Create Giveaway
          </button>
        </div>
      </form>
    </div>
  );
}
