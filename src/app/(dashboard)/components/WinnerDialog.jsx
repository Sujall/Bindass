"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown, Loader2 } from "lucide-react";
import apiClient from "@/api/apiClient";
import { toast } from "sonner";

export function WinnerDialog({ giveaway, winners, setWinners }) {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const giveawayId = giveaway._id;
  const selectedWinners = winners[giveawayId] || [];
  const winnersFinalized =
    (giveaway.winners?.length || 0) >= giveaway.numberOfWinners;

  useEffect(() => {
    if (open) {
      setLoading(true);
      setError("");

      apiClient
        .get(`/admin/giveaways/${giveawayId}/participants`)
        .then((res) => {
          const verified = res.data.participants.filter(
            (p) => p.status === "verified"
          );
          setParticipants(verified);

          const alreadyWinners = verified
            .filter((p) => p.isWinner)
            .map((p) => p._id); // this is the participant _id
          if (alreadyWinners.length > 0) {
            setWinners((prev) => ({
              ...prev,
              [giveawayId]: alreadyWinners,
            }));
          }
        })
        .catch((err) => {
          console.error("Failed to fetch participants:", err);
          setError("Failed to load participants.");
        })
        .finally(() => setLoading(false));
    }
  }, [open, giveawayId]);

  const toggleWinner = (participantId) => {
    if (winnersFinalized) return;
    setWinners((prev) => {
      const current = prev[giveawayId] || [];
      const updated = current.includes(participantId)
        ? current.filter((id) => id !== participantId)
        : [...current, participantId];
      return { ...prev, [giveawayId]: updated };
    });
  };

  const handleSubmitWinners = async () => {
    if (selectedWinners.length !== giveaway.numberOfWinners) {
      toast.error(
        `You must select exactly ${giveaway.numberOfWinners} winner(s).`
      );
      return;
    }

    setSubmitting(true);
    try {
      // Map selected participant IDs to their corresponding user IDs
      const winnerUserIds = selectedWinners
        .map((participantId) => {
          const match = participants.find((p) => p._id === participantId);
          return match?.userId?._id || match?.userId; // handle both populated and unpopulated
        })
        .filter(Boolean);

      if (winnerUserIds.length !== selectedWinners.length) {
        toast.error("Unable to map all selected participants to user IDs.");
        setSubmitting(false);
        return;
      }

      const response = await apiClient.post(
        `/admin/giveaways/${giveawayId}/pick-winners`,
        { winnerIds: winnerUserIds }
      );

      toast.success("Winners marked and notified successfully!");
      setOpen(false);

      // Update frontend state
      setWinners((prev) => ({
        ...prev,
        [giveawayId]: response.data.winners,
      }));

      // Refresh participants to reflect updated winner flags
      const res = await apiClient.get(
        `/admin/giveaways/${giveawayId}/participants`
      );
      const verified = res.data.participants.filter(
        (p) => p.status === "verified"
      );
      setParticipants(verified);
    } catch (error) {
      console.error("Failed to mark winners:", error);
      toast.error(error?.response?.data?.message || "Failed to mark winners.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Make Winner</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Select Winners for "{giveaway.title}"</DialogTitle>
        <div className="py-4 space-y-4">
          <div>
            <span className="text-sm font-medium">
              Number of Winners: {giveaway.numberOfWinners}
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="w-5 h-5 animate-spin mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">
                Loading participants...
              </span>
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : participants.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No verified participants.
            </p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {participants.map((p) => (
                <WinnerCheckboxCard
                  key={p._id}
                  participant={p}
                  isChecked={selectedWinners.includes(p._id)}
                  isWinner={p.isWinner}
                  onToggle={() => toggleWinner(p._id)}
                  disabled={winnersFinalized || p.isWinner}
                />
              ))}
            </div>
          )}

          {!winnersFinalized && (
            <Button
              onClick={handleSubmitWinners}
              className="bg-green-600 text-white hover:bg-green-700 mt-4"
              disabled={
                submitting || selectedWinners.length === 0 || winnersFinalized
              }
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                "Mark as Winner"
              )}
            </Button>
          )}

          {winnersFinalized && (
            <p className="text-sm text-green-600 font-medium mt-2 text-center">
              Winners already selected.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const WinnerCheckboxCard = ({
  participant,
  isChecked,
  isWinner,
  onToggle,
  disabled,
}) => {
  return (
    <div
      onClick={!disabled ? onToggle : undefined}
      className={`p-3 border rounded-md transition-all duration-200 ${
        isChecked
          ? "bg-green-100 border-green-500"
          : "bg-gray-50 hover:bg-gray-100 border-gray-200"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium flex items-center gap-2">
            {participant.userId?.fullName || "Unnamed User"}
          </div>
          <div className="text-sm text-gray-500">
            {participant.userId?.email}
          </div>
        </div>

        {isWinner && (
          <span className="flex items-center text-yellow-600 text-xs font-semibold">
            <Crown className="w-4 h-4 mr-1" />
            Winner
          </span>
        )}
        {isChecked && !isWinner && (
          <p className="flex gap-2 items-center">
            <Check color="green" />
            <span className="text-green-600 text-sm font-semibold">
              Selected
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
