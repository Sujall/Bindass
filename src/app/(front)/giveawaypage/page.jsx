"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// List of product giveaways
const giveaways = [
  {
    id: 1,
    seats: { current: 742, total: 1500 },
    entryFee: "₹19",
    image: "/images/iphone-15-pro-thumbnail.png",
    title: "iPhone 15 Giveaway: Black, Bold & Yours to Win!",
    description: "🎉 Win the brand-new Apple iPhone 15 (Black, 128 GB)! 🎉",
  },
  {
    id: 2,
    seats: { current: 325, total: 1000 },
    entryFee: "₹29",
    image: "/images/iphone.png",
    title: "iPhone 14 Pro Max Giveaway!",
    description: "🚀 Get a chance to win iPhone 14 Pro Max (256 GB) 💥",
  },
];

// List of cash giveaways
const cashGiveaways = [
  {
    id: 101,
    image: "/images/cash-giveaway-thumbnail.png",
    title: "🎉 ₹5,000 Cash Prize — Enter for Your Shot at Winning Big! 🎉",
    entryFee: "₹47",
    seats: { current: 32, total: 100 },
  },
  {
    id: 102,
    image: "/images/cash-giveaway-thumbnail.png",
    title: "🎯 ₹10,000 Cash Bonanza! Join & Win 🎯",
    entryFee: "₹55",
    seats: { current: 76, total: 150 },
  },
];

export default function GiveawayPage() {
  const [search, setSearch] = useState("");

  // Filter giveaways by title based on user search
  const filterGiveaways = (items) =>
    items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  // Reusable giveaway card renderer
  const renderGiveawayCard = (item) => {
    const { current, total } = item.seats;
    const percentage = total ? Math.round((current / total) * 100) : 0;
    const isAvailable = current < total;

    return (
      <div
        key={item.id}
        className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full"
      >
        {/* Giveaway image */}
        <div className="relative w-full aspect-[4/2]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id <= 2}
          />
        </div>

        {/* Giveaway content */}
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>

          {/* Optional description */}
          {item.description && (
            <p className="text-sm text-gray-700 font-medium">
              {item.description}
            </p>
          )}

          {/* Seat availability */}
          <div className="flex items-center justify-between text-sm font-semibold mt-2">
            <div className="text-gray-800">
              Seats: {current}/{total}
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                isAvailable
                  ? "text-green-700 bg-green-100"
                  : "text-red-700 bg-red-100"
              }`}
            >
              {isAvailable ? "AVAILABLE" : "FULL"}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className={`h-full rounded-full ${
                item.entryFee.includes("₹19") ? "bg-green-500" : "bg-blue-700"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          {/* Entry fee */}
          <div className="flex items-center space-x-2 text-sm mt-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-gray-700 font-semibold">
              Entry fee: {item.entryFee}
            </span>
          </div>

          {/* CTA button */}
          <Link
            href={isAvailable ? `/giveaway/${item.id}` : "#"}
            className={`block w-full text-center text-white font-bold py-2 mt-3 rounded-lg transition duration-200 ${
              isAvailable
                ? "bg-gray-900 hover:bg-black"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            aria-disabled={!isAvailable}
            tabIndex={!isAvailable ? -1 : undefined}
          >
            {isAvailable ? "Join Giveaway" : "Giveaway Full"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Search Input Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-700 mb-2 text-center">
          Search Giveaways
        </h1>
        <input
          type="text"
          placeholder="Search for giveaways..."
          className="w-full px-4 py-3 border border-gray-400 rounded-lg text-gray-700 placeholder-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Product Giveaways Section */}
      <div className="mb-12">
        {/* <h2 className="text-xl font-semibold text-gray-900 mb-4">
          📱 Latest Giveaways
        </h2> */}
        <div className="space-y-6">
          {filterGiveaways(giveaways).map(renderGiveawayCard)}
        </div>
      </div>

      {/* Cash Giveaways Section */}
      <div className="mt-8">
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">
          💵 Cash Giveaways
        </h2> */}
        <div className="space-y-6">
          {filterGiveaways(cashGiveaways).map(renderGiveawayCard)}
        </div>
      </div>
    </div>
  );
}
