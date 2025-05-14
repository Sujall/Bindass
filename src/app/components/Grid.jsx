"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign, FaUsers } from "react-icons/fa";

const Grid = () => {
  const giveaways = [
    {
      id: 1,
      seats: { current: 742, total: 1500 },
      entryFee: "19",
      image: "/images/iphone-15-pro-thumbnail.png",
      title: "iPhone 15 Giveaway: Black, Bold & Yours to Win!",
      description: "🎉 Win the brand-new Apple iPhone 15 (Black, 128 GB)! 🎉",
    },
    {
      id: 2,
      seats: { current: 325, total: 1000 },
      entryFee: "29",
      image: "/images/iphone.png",
      title: "iPhone 14 Pro Max Giveaway!",
      description: "🚀 Get a chance to win iPhone 14 Pro Max (256 GB) 💥",
    },
  ];

  const cashGiveaways = [
    {
      id: 101,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "🎉 5,000 Cash Prize — Enter for Your Shot at Winning Big! 🎉",
      entryFee: "47",
      seats: { current: 32, total: 100 },
    },
    {
      id: 102,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "🎯 10,000 Cash Bonanza! Join & Win 🎯",
      entryFee: "55",
      seats: { current: 76, total: 150 },
    },
    {
      id: 103,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "💸 1,000 Daily Prize! Participate Today 💸",
      entryFee: "19",
      seats: { current: 50, total: 100 },
    },
    {
      id: 104,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "🎁 Win 2,500 Instantly! Just One Click 🎁",
      entryFee: "29",
      seats: { current: 82, total: 100 },
    },
    {
      id: 105,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "🎊 7,777 Special Jackpot Giveaway 🎊",
      entryFee: "39",
      seats: { current: 61, total: 100 },
    },
  ];

  const renderGiveawayCard = (item) => {
    const { current, total } = item.seats;
    const percentage = total ? Math.round((current / total) * 100) : 0;
    const isAvailable = current < total;

    return (
      <div
        key={item.id}
        className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden"
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
            <div className="text-gray-800 flex items-center gap-1">
              <FaUsers className="text-gray-600" />
              {current}/{total}
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
                item.entryFee.includes("19") ? "bg-green-500" : "bg-blue-700"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center space-x-2 text-sm mt-2">
            <span className="text-gray-700 font-semibold">Entry fee:</span>
            <div className="flex items-center">
              <FaRupeeSign className="text-gray-600" />
            <span className="text-gray-700 font-semibold">{item.entryFee}</span>
            </div>
          </div>

          <Link
            href={`/giveaway/${item.id}`}
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
    <div className="max-w-[480px] mx-auto px-4 py-6">
      {/* iPhone Giveaways */}
      <div className="space-y-6">{giveaways.map(renderGiveawayCard)}</div>

      {/* Cash Giveaways */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">💵 Cash Giveaways</h2>
        {cashGiveaways.map(renderGiveawayCard)}
      </div>

      {/* View All Giveaways Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition duration-200">
          View All Giveaways
        </button>
      </div>
    </div>
  );
};

export default Grid;
