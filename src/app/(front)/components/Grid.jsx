"use client";
import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign, FaUsers } from "react-icons/fa";

const Grid = () => {
  const giveaways = [
    {
      id: 1,
      seats: { current: 745, total: 1500 },
      entryFee: "19",
      image: "/images/iphone-15-pro-thumbnail.png",
      title: "iPhone 15 Giveaway: Black, Bold & Yours to Win!",
      bulletPoints: [
        {
          text: "Win the brand-new Apple iPhone 15 (Black, 128 GB)!",
          color: "text-green-500",
        },
        { text: "Seats: 745/1500", color: "text-blue-500" },
        { text: "Entry fee: ₹19", color: "text-yellow-500" },
      ],
    },
    {
      id: 2,
      seats: { current: 325, total: 1000 },
      entryFee: "19",
      image: "/images/iphone.png",
      title: "iPhone 14 Pro Max Giveaway!",
      bulletPoints: [
        {
          text: "Get a chance to win iPhone 14 Pro Max (256 GB)",
          color: "text-green-500",
        },
        { text: "Seats: 325/1000", color: "text-blue-500" },
        { text: "Entry fee: ₹19", color: "text-yellow-500" },
      ],
    },
  ];

  const cashGiveaways = [
    {
      id: 101,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "5,000 Cash Prize — Enter for Your Shot at Winning Big!",
      entryFee: "47",
      seats: { current: 32, total: 100 },
    },
    {
      id: 102,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "10,000 Cash Bonanza! Join & Win",
      entryFee: "55",
      seats: { current: 76, total: 150 },
    },
    {
      id: 103,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "1,000 Daily Prize! Participate Today",
      entryFee: "19",
      seats: { current: 50, total: 100 },
    },
    {
      id: 104,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "Win 2,500 Instantly! Just One Click",
      entryFee: "29",
      seats: { current: 82, total: 100 },
    },
    {
      id: 105,
      image: "/images/cash-giveaway-thumbnail.png",
      title: "7,777 Special Jackpot Giveaway",
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
        className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="relative w-full aspect-[4/2.2]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={item.id <= 2}
          />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>

          {/* Bullet Points */}
          {item.bulletPoints && (
            <ul className="space-y-1">
              {item.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  {/* ⬇️ Increase bullet point size here (e.g., text-xl or text-2xl) */}
                  <span className={`text-2xl leading-none ${point.color}`}>
                    •
                  </span>

                  <span className="text-[15px] text-gray-800">
                    {point.text.startsWith("Entry fee") ? (
                      <>
                        Entry fee:{" "}
                        <span className="font-bold">
                          {point.text.replace("Entry fee: ", "")}
                        </span>
                      </>
                    ) : (
                      point.text
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Seats and Availability */}
          <div className="flex items-center justify-between text-sm mt-2">
            <div className="text-gray-700 flex items-center gap-1.5">
              <FaUsers className="text-gray-500" />
              <span className="font-semibold">Seats:</span>
              {current}/{total}
            </div>
            <span
              className={`px-2 py-1 rounded-md text-xs font-bold ${
                isAvailable
                  ? "text-green-500 bg-green-100"
                  : "text-red-800 bg-red-100"
              }`}
            >
              {isAvailable ? "Available" : "Full"}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Entry Fee Below Progress */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-gray-700">
              <span className="font-bold">Entry fee:</span>
              <span className="font-bold ml-1 text-gray-900">
                ₹ {item.entryFee}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={`/giveaway/${item.id}`}
            className={`block w-full text-center font-bold py-2.5 mt-3 rounded-md ${
              isAvailable
                ? "bg-gray-900 text-white hover:bg-black"
                : "bg-gray-200 text-gray-600 cursor-not-allowed"
            }`}
            aria-disabled={!isAvailable}
            tabIndex={!isAvailable ? -1 : undefined}
          >
            {isAvailable ? "Join Giveaway" : "Closed"}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* iPhone Giveaways */}
      <div className="space-y-5">{giveaways.map(renderGiveawayCard)}</div>

      {/* Cash Giveaways */}
      <div className="mt-10 space-y-5">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          💵 Cash Giveaways
        </h2>
        {cashGiveaways.map(renderGiveawayCard)}
      </div>

      {/* View All Button */}
      <div className="mt-8 flex justify-center">
        <Link href="/giveawaypage" passHref>
          <button className="bg-white text-gray-900 font-bold py-2.5 px-6 rounded-lg border-2 border-gray-300 hover:bg-gray-50">
            View All Giveaways
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Grid;
