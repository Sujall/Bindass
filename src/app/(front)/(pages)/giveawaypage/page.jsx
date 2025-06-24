"use client";
import { getAllGiveaways } from "@/api/apiClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GiveawayPage() {
  const [search, setSearch] = useState("");
  const [productGiveaways, setProductGiveaways] = useState([]);
  const [cashGiveaways, setCashGiveaways] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch giveaways on component mount
  useEffect(() => {
    const fetchGiveaways = async () => {
      try {
        const data = await getAllGiveaways();

        // Separate product & cash giveaways based on your API response structure
        const product = data.filter((g) => g.type === "product");
        const cash = data.filter((g) => g.type === "cash");

        setProductGiveaways(product);
        setCashGiveaways(cash);
      } catch (err) {
        console.error("Error loading giveaways:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGiveaways();
  }, []);

  // Filter giveaways based on search
  const filterGiveaways = (items) =>
    items.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

  const renderGiveawayCard = (item) => {
    const { current, total } = item.seats || { current: 0, total: 1 };
    const percentage = total ? Math.round((current / total) * 100) : 0;
    const isAvailable = current < total;

    return (
      <div
        key={item.id}
        className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden w-full"
      >
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

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>

          {item.description && (
            <p className="text-sm text-gray-700 font-medium">
              {item.description}
            </p>
          )}

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

          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className={`h-full rounded-full ${
                item.entryFee?.includes("₹19")
                  ? "bg-green-500"
                  : "bg-blue-700"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex items-center space-x-2 text-sm mt-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="text-gray-700 font-semibold">
              Entry fee: {item.entryFee}
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

      {isLoading ? (
        <p className="text-center text-gray-600 font-medium">Loading giveaways...</p>
      ) : (
        <>
          {/* Product Giveaways */}
          <div className="mb-12">
            <div className="space-y-6">
              {filterGiveaways(productGiveaways).map(renderGiveawayCard)}
            </div>
          </div>

          {/* Cash Giveaways */}
          <div className="mt-8">
            <div className="space-y-6">
              {filterGiveaways(cashGiveaways).map(renderGiveawayCard)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
