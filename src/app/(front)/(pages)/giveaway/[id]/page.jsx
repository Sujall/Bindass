"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { FaUsers, FaClock } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import {
  getGiveawayByID,
  getLoggedInUserId,
  getUserGiveawayHistoryByID,
  participateInGiveaway,
} from "@/api/apiClient";
import { toast } from "sonner";
import CountdownTimer from "@/app/(front)/components/CountDown";

// The main page component
const GiveawayDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [item, setItem] = useState(null);
  const [tab, setTab] = useState("details");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGiveaway = async () => {
      try {
        const data = await getGiveawayByID(id);
        setItem(data.giveaway);
      } catch (err) {
        console.error("Error fetching giveaway:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGiveaway();
  }, [id]);

  const userId = getLoggedInUserId(); // Extracted from token
  const hasParticipated = item?.participantsList?.some(
    (p) => p.userId === userId
  );

  if (loading) {
    return (
      <div className="max-w-[480px] mx-auto p-6 text-center">
        <p className="text-gray-600">Loading giveaway details...</p>
      </div>
    );
  }

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

  const current = item.participantsCount || 0;
  const total = item.totalSlots;
  const percentage = total ? Math.round((current / total) * 100) : 0;

  return (
    <div className="max-w-[480px] mx-auto px-2 py-2 bg-white">
      {/* Image Banner */}
      <div className="relative w-full aspect-[4/2] rounded-xl overflow-hidden">
        <Image
          src={item.giveawayImageUrl}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw"
        />
      </div>

      <h1 className="px-4 text-xl font-semibold text-gray-900 mt-4">
        {item.title}
      </h1>
      <p className="px-4 text-sm text-gray-700 mt-1">
        {item.subTitle || item.description}
      </p>

      <div className="px-4 flex justify-between items-center text-sm text-gray-800 mt-4 font-semibold">
        <div className="flex items-center gap-1">
          <FaUsers />
          <span>
            {current}/{total} entries
          </span>
        </div>
        <CountdownTimer endDate={item.endDate} />
      </div>

      {/* Tabs */}
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
          <div className="text-sm text-gray-800 space-y-2">
            <p>{item.description}</p>
          </div>

          {/* Specs (optional) */}
          {item.specs && item.specs.length > 0 && (
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-start gap-2 text-green-600 font-medium">
                <MdCheckCircle className="mt-1" />
                <span>Product Features:</span>
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
          )}

          {/* Giveaway Info */}
          <div className="mt-6 mb-20 border rounded-lg p-4 text-sm text-gray-800 bg-gray-50">
            <p>
              <strong>Entry fee:</strong> ₹{item.fee}
            </p>
            <p>
              <strong>Total slots:</strong> {item.totalSlots}
            </p>
            <p>
              <strong>Ends at:</strong>{" "}
              {new Date(item.endDate).toLocaleString()}
            </p>
            {item.categories?.length > 0 && (
              <div className="mt-2 flex gap-2 text-xs text-gray-600 flex-wrap">
                {item.categories.map((cat, i) => (
                  <span key={i} className="bg-gray-200 px-2 py-1 rounded">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <BottomActionBar
            entryFee={item.fee}
            qrCodeUrl={item.qrCodeUrl}
            giveawayId={item.id}
            userId={userId}
            hasParticipated={hasParticipated}
          />
        </div>
      )}

      {/* Participants Tab */}
      {tab === "participants" && (
        <div className="pt-4 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-800 mb-3 px-4">
            Most Recent Verified Participants
          </h2>
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden divide-y">
            {item.participantsList && item.participantsList.length > 0 ? (
              item.participantsList
                .filter((participant) => participant.status === "verified")
                .slice(0, 5)
                .map((participant, idx) => {
                  console.log(participant.status);
                  return (
                    <div key={idx} className="flex items-center gap-3 p-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                        {participant.profileImage && (
                          <span className="text-gray-600 text-sm font-medium">
                            👤
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {participant.name || "Anonymous"}
                        </p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className="p-4 text-sm text-gray-600 text-center">
                No participants yet. Be the first to join!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Winner Tab */}
      {tab === "winner" && (
        <div className="bg-gray-50 pt-6 pb-24 flex justify-center items-center flex-col">
          {item.winnersList && item.winnersList.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border w-full px-2 py-8 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                🎉 Winner{item.winnersList.length > 1 ? "s" : ""} Announced!
              </h3>
              <div className="border border-gray-200"></div>
              <div className="space-y-4 mt-4">
                {item.winnersList.map((winner, idx) => (
                  <div
                    key={idx}
                    className="px-4 flex items-center gap-3 text-left"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      {winner.profileImage ? (
                        <Image
                          src={winner.profileImage}
                          alt={winner.name || "Winner"}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 text-xl">
                          🏆
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{winner.name}</p>
                      <p className="text-xs text-gray-500">{winner.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border w-full max-w-md px-6 py-8 text-center">
              <div className="text-4xl text-gray-400 mb-4">⏰</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Winner Pending
              </h3>
              <p className="text-sm text-gray-500">
                The winner will be announced after the giveaway ends
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GiveawayDetailPage;

const BottomActionBar = ({ entryFee, qrCodeUrl, giveawayId, userId }) => {
  const [showSheet, setShowSheet] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [hasParticipated, setHasParticipated] = useState(false);

  const router = useRouter();

  // Check if user has already participated
  useEffect(() => {
    const checkParticipation = async () => {
      try {
        const res = await getUserGiveawayHistoryByID(userId);
        const alreadyParticipated = res.participation.some(
          (p) => p.giveaway._id === giveawayId
        );
        setHasParticipated(alreadyParticipated);
      } catch (err) {
        console.error("Error checking participation:", err);
      }
    };

    if (userId && giveawayId) {
      checkParticipation();
    }
  }, [userId, giveawayId]);

  const handlePayment = () => {
    setShowSheet(true);
  };

  const handleSubmit = async () => {
    if (!transactionId) {
      toast.error("Please enter the Transaction ID");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await participateInGiveaway({
        giveawayId,
        transactionId,
      });

      setMessage(response.message || "Successfully registered!");
      setTransactionId("");
      setShowSheet(false);
      setHasParticipated(true); // Update UI immediately
    } catch (err) {
      console.error("Participation error:", err);
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto px-4 py-3 bg-white border-t z-10">
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <p className="text-gray-500">Entry fee</p>
            <p className="font-semibold text-gray-900">₹{entryFee}</p>
          </div>
          <button
            onClick={() => {
              if (!userId) {
                router.push("/login");
              } else {
                handlePayment();
              }
            }}
            disabled={hasParticipated}
            className={`px-5 py-2 rounded-full text-sm font-medium shadow-md ${
              hasParticipated
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            {hasParticipated ? "Already Joined" : "Pay Now"}
          </button>
        </div>
      </div>

      {showSheet && !hasParticipated && (
        <div className="fixed inset-0 z-20 bg-black/40 flex justify-center items-end">
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
                src={qrCodeUrl || "/images/sample-qr.png"}
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
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
            >
              {loading ? "Submitting..." : "Submit Payment Details"}
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="fixed bottom-20 max-w-[480px] mx-auto inset-x-0 px-4 z-20">
          <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm text-center shadow">
            {message}
          </div>
        </div>
      )}
    </>
  );
};
