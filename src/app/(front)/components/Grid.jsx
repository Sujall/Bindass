"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRupeeSign, FaUsers } from "react-icons/fa";
import axios from "axios";
import { getAllGiveaways } from "@/api/apiClient";

const Grid = () => {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchGiveaways = async () => {
  //     try {
  //       const res = await getAllGiveaways(); // Adjust the path if needed
  //       const data = await res.json();

  //       if (res.ok) {
  //         // Map API data to expected format
  //         const formatted = data.giveaways.map((g) => ({
  //           id: g.id,
  //           title: g.title,
  //           entryFee: g.fee,
  //           seats: {
  //             current: g.participantsCount,
  //             total: g.totalSlots,
  //           },
  //           image: g.bannerUrl || "/images/default-thumbnail.png",
  //           bulletPoints: [
  //             {
  //               text: g.subTitle,
  //               color: "text-green-500",
  //             },
  //             {
  //               text: `Seats: ${g.participantsCount}/${g.totalSlots}`,
  //               color: "text-blue-500",
  //             },
  //             {
  //               text: `Entry fee: ₹${g.fee}`,
  //               color: "text-yellow-500",
  //             },
  //           ],
  //         }));
  //         setGiveaways(formatted);
  //       } else {
  //         console.error("Error fetching giveaways:", data.message);
  //       }
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGiveaways();
  // }, []);

  useEffect(() => {
  const fetchGiveaways = async () => {
    try {
      const data = await getAllGiveaways(); // already returns parsed JSON

      const formatted = data.giveaways.map((g) => ({
        id: g.id,
        title: g.title,
        entryFee: g.fee,
        seats: {
          current: g.participantsCount,
          total: g.totalSlots,
        },
        image: g.bannerUrl || "/images/default-thumbnail.png",
        bulletPoints: [
          {
            text: g.subTitle,
            color: "text-green-500",
          },
          {
            text: `Seats: ${g.participantsCount}/${g.totalSlots}`,
            color: "text-blue-500",
          },
          {
            text: `Entry fee: ₹${g.fee}`,
            color: "text-yellow-500",
          },
        ],
      }));

      setGiveaways(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchGiveaways();
}, []);

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
            priority
          />
        </div>
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-xl text-gray-900">{item.title}</h3>

          {item.bulletPoints && (
            <ul className="space-y-1">
              {item.bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
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

          <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
            <div
              className="h-full rounded-full bg-green-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-gray-700">
              <span className="font-bold">Entry fee:</span>
              <span className="font-bold ml-1 text-gray-900">
                ₹ {item.entryFee}
              </span>
            </div>
          </div>

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
      {loading ? (
        <p className="text-center text-gray-500">Loading giveaways...</p>
      ) : (
        <div className="space-y-5">{giveaways.map(renderGiveawayCard)}</div>
      )}

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
