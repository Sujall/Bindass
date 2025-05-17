'use client';
import { use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUsers, FaRupeeSign } from 'react-icons/fa';

const mockData = {
  1: {
    id: 1,
    image: '/images/iphone-15-pro-thumbnail.png',
    title: 'iPhone 15 Giveaway: Black, Bold & Yours to Win!',
    description: '🎉 Win the brand-new Apple iPhone 15 (Black, 128 GB)! 🎉',
    entryFee: '19',
    seats: { current: 742, total: 1500 },
  },
  2: {
    id: 2,
    image: '/images/iphone.png',
    title: 'iPhone 14 Pro Max Giveaway!',
    description: '🚀 Get a chance to win iPhone 14 Pro Max (256 GB) 💥',
    entryFee: '29',
    seats: { current: 325, total: 1000 },
  },
};

const GiveawayDetailPage = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const item = mockData[id];

  if (!item) {
    return (
      <div className="max-w-[480px] mx-auto p-6 text-center">
        <p className="text-gray-600">Giveaway not found</p>
        <button
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg"
          onClick={() => router.back()}
        >
          Go Back
        </button>
      </div>
    );
  }

  const { current, total } = item.seats;
  const percentage = total ? Math.round((current / total) * 100) : 0;
  const isAvailable = current < total;

  return (
    <div className="max-w-[480px] mx-auto px-4 py-6">
      <div className="relative w-full aspect-[4/2] rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mt-4">{item.title}</h1>
      <p className="text-sm text-gray-700 mt-2">{item.description}</p>

      <div className="flex justify-between text-sm text-gray-800 mt-4 font-semibold">
        <div className="flex items-center gap-1">
          <FaUsers />
          <span>{current}/{total} seats</span>
        </div>
        <div className="flex items-center gap-1">
          <FaRupeeSign />
          <span>{item.entryFee}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
        <div
          className={`h-full rounded-full ${
            item.entryFee.includes("₹19") ? "bg-green-500" : "bg-blue-700"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isAvailable ? "AVAILABLE" : "FULL"}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {percentage}% filled
        </span>
      </div>

      <button
        className={`w-full font-bold py-3 mt-6 rounded-lg transition duration-200 ${
          isAvailable
            ? "bg-gray-900 text-white hover:bg-black"
            : "bg-gray-400 text-white cursor-not-allowed"
        }`}
        disabled={!isAvailable}
      >
        {isAvailable ? "Join Giveaway" : "Giveaway Full"}
      </button>
    </div>
  );
};

export default GiveawayDetailPage;
