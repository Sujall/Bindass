"use client";
import { getAllGiveaways } from "@/api/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Skeleton component
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full animate-pulse">
    <div className="w-full aspect-[4/2] bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
      <div className="h-2 bg-gray-200 rounded w-full mt-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
      <div className="h-10 bg-gray-300 rounded w-full mt-3" />
    </div>
  </div>
);

export default function GiveawayPage() {
  const [search, setSearch] = useState("");
  const [giveaways, setGiveaways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const res = await getAllGiveaways();
        const giveaways = Array.isArray(res) ? res : res.giveaways || [];
        setGiveaways(giveaways);
      } catch (err) {
        console.error("Error loading giveaways:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiveaways();
  }, []);

  const filterGiveaways = (items) =>
    items.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase())
    );

  const renderGiveawayCard = (item) => {
    const current = item.participantsCount ?? item.participants?.length ?? 0;
    const total = item.totalSlots;
    const percentage = Math.min(
      100,
      Math.max(0, Math.round((current / total) * 100))
    );
    const isAvailable = current < total;

    return (
      <div
        key={item.id || item._id}
        className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full"
      >
        <div className="relative w-full aspect-[4/2]">
          <Image
            src={item.giveawayImageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>

          {item.description && (
            <p className="text-sm text-gray-700 font-medium line-clamp-3">
              {item.description}
            </p>
          )}

          <div className="flex items-center justify-between text-sm font-semibold mt-2">
            <div className="text-gray-800">
              Slots: {current}/{total}
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

          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className="h-full rounded-full bg-green-700"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center space-x-2 text-sm mt-2">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-gray-700 font-semibold">
              Entry fee: ₹{item.fee}
            </span>
          </div>

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
      {/* <div className="mb-8">
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
      </div> */}

      {isLoading ? (
        <div className="space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filterGiveaways(giveaways).map(renderGiveawayCard)}
        </div>
      )}
    </div>
  );
}
