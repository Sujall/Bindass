"use client";
import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaUsers, FaRupeeSign, FaClock } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";

const mockData = {
  1: {
    id: 1,
    image: "/images/iphone-15-pro-thumbnail.png",
    title: "iPhone 15 Giveaway: Black, Bold & Yours to Win!",
    description: "🎉 Win the brand-new Apple iPhone 15 (Black, 128 GB)! 🎉",
    entryFee: "19",
    seats: { current: 755, total: 1500 },
    endTime: "May 15, 03:13 PM",
    specs: [
      {
        icon: "🖤",
        title: "Stunning Black Design",
        description:
          "Aerospace-grade aluminum with color-infused glass for that premium look & feel.",
      },
      {
        icon: "💾",
        title: "128 GB Storage",
        description:
          "Store all your photos, videos, apps, and files with ease.",
      },
      {
        icon: "⚡",
        title: "A16 Bionic Chip",
        description:
          "Blazing-fast speed for gaming, streaming, and multitasking.",
      },
      {
        icon: "📸",
        title: "48MP Advanced Dual-Camera System",
        description:
          "Shoot stunning portraits, sharp night photos, and cinematic 4K videos.",
      },
    ],
  },
};

const GiveawayDetailPage = ({ params }) => {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const item = mockData[id];
  const [tab, setTab] = useState("details");

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
    <div className="max-w-[480px] mx-auto px-2 py-2 bg-white">
      {/* Image Banner */}
      <div className="relative w-full aspect-[4/2] rounded-xl overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      {/* Title & Description */}
      <h1 className="px-4 text-xl font-semibold text-gray-900 mt-4">
        {item.title}
      </h1>
      <p className="px-4 text-sm text-gray-700 mt-1">{item.description}</p>

      {/* Stats Bar */}
      <div className="px-4 flex justify-between items-center text-sm text-gray-800 mt-4 font-semibold">
        <div className="flex items-center gap-1">
          <FaUsers />
          <span>
            {current}/{total} entries
          </span>
        </div>
        <div className="flex items-center gap-1">
          <FaClock />
          <span>7d 20h 51m</span>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="mt-6 flex border-b">
        {["details", "participants", "winner"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 text-sm font-semibold capitalize ${
              tab === t
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Details Tab */}
      {tab === "details" && (
        <div className="pt-4 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-800">
            <p>
              📱 🎉 <strong>Apple iPhone 15 (128 GB, Black) Giveaway</strong> 🎉
              📱
            </p>
            <p className="mt-2">
              Get ready to elevate your everyday with the iconic{" "}
              <strong>Apple iPhone 15</strong> in sleek{" "}
              <strong>Black 🖤</strong>— the perfect blend of style, power, and
              performance!
            </p>
            <p className="mt-2">
              Whether you're snapping photos, gaming, or multitasking like a
              pro, the iPhone 15 is built to impress.
            </p>
          </div>

          {/* Features List */}
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex items-start gap-2 text-green-600 font-medium">
              <MdCheckCircle className="mt-1" />
              <span>Why you'll love the iPhone 15:</span>
            </div>

            {item.specs.map((spec, index) => (
              <div key={index} className="pl-6 text-gray-800">
                <p className="font-semibold">
                  {spec.icon} {spec.title}
                </p>
                <p className="text-gray-600 text-sm">{spec.description}</p>
              </div>
            ))}
          </div>

          {/* Giveaway Details */}
          <div className="mt-6 mb-20 border rounded-lg p-4 text-sm text-gray-800 bg-gray-50">
            <p>
              <strong>Entry fee:</strong> ₹{item.entryFee}
            </p>
            <p>
              <strong>Total seats:</strong> {item.seats.total}
            </p>
            <p>
              <strong>Ends at:</strong> {item.endTime}
            </p>
            <div className="mt-2 flex gap-2 text-xs text-gray-600">
              <span className="bg-gray-200 px-2 py-1 rounded">Mobile</span>
              <span className="bg-gray-200 px-2 py-1 rounded">iPhone</span>
              <span className="bg-gray-200 px-2 py-1 rounded">Apple</span>
            </div>
          </div>

          <BottomActionBar entryFee={item.entryFee} />
        </div>
      )}

      {/* Participants Tab */}
      {tab === "participants" && (
        <div className="pt-4 bg-gray-50 pb-24">
          {/* Most Recent Title */}
          <h2 className="text-sm font-semibold text-gray-800 mb-3">
            Most Recent
          </h2>

          {/* Participant List */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden divide-y">
            {[
              { name: "Simon Tirkey" },
              { name: "Mukesh Razz" },
              { name: "Amit Bhagat" },
            ].map((user, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                  👤
                </div>
                <span className="text-sm text-gray-900">{user.name}</span>
              </div>
            ))}
          </div>

          {/* Entry Fee + Join Now */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto px-4 py-3 bg-white border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-gray-500">Entry fee</p>
                <p className="font-semibold text-gray-900">₹{item.entryFee}</p>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Winner Tab */}
      {tab === "winner" && (
        <div className="bg-gray-50 pt-6 pb-24 flex justify-center items-center flex-col">
          {/* Winner Pending Card */}
          <div className="bg-white rounded-xl shadow-sm border w-full max-w-md px-6 py-8 text-center">
            <div className="text-4xl text-gray-400 mb-4">⏰</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Winner Pending
            </h3>
            <p className="text-sm text-gray-500">
              The winner will be announced after the giveaway ends
            </p>
          </div>

          {/* Entry Fee + Join Now Button */}
          <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto px-4 py-3 bg-white border-t">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <p className="text-gray-500">Entry fee</p>
                <p className="font-semibold text-gray-900">₹{item.entryFee}</p>
              </div>
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
                Join Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveawayDetailPage;

const BottomActionBar = ({ entryFee }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [email, setEmail] = useState("");

  const handlePayment = () => {
    setShowSheet(true);
  };

  const handleSubmit = () => {
    if (!transactionId || !email) {
      alert("Please enter both Transaction ID and Email");
      return;
    }
    // Submit logic here (e.g. API call)
    alert(`Submitted:\nEmail: ${email}\nTxn: ${transactionId}`);
    setShowSheet(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto px-4 py-3 bg-white border-t">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-500">Entry fee</p>
            <p className="font-semibold text-gray-900">₹{entryFee}</p>
          </div>
          <button
            onClick={handlePayment}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md"
          >
            Pay Now
          </button>
        </div>
      </div>
      {showSheet && (
        <div className="fixed inset-0 z-20 bg-black/40 bg-opacity-40 flex justify-center items-end">
          <div className="w-full max-w-[480px] bg-white rounded-t-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Complete Payment
              </h2>
              <button
                onClick={() => setShowSheet(false)}
                className="text-gray-500 text-xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4 text-center">
              <img
                src="/images/sample-qr.png" // Replace with your QR code path
                alt="QR Code"
                className="mx-auto w-40 h-40"
              />
              <p className="text-sm text-gray-600 mt-2">
                Scan this QR to pay ₹{entryFee}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700">Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Enter your transaction number"
                />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
            >
              Submit Payment Details
            </button>
          </div>
        </div>
      )}
    </>
  );
};
