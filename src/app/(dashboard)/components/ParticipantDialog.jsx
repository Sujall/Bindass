"use client";

import apiClient from "@/api/apiClient";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // ✅ updated toast
import { Loader2 } from "lucide-react";

export function ParticipantDialog({ giveaway }) {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState({});

  useEffect(() => {
    if (open) {
      setLoading(true);
      apiClient
        .get(`/admin/giveaways/${giveaway._id}/participants`)
        .then((res) => {
          setParticipants(res.data.participants);
        })
        .catch((err) => {
          console.error("Failed to fetch participants:", err);
          toast.error("Failed to load participants.");
        })
        .finally(() => setLoading(false));
    }
  }, [open, giveaway._id]);

  const handleStatusUpdate = async (userId, status) => {
    setStatusLoading({ userId, status });
    try {
      const res = await apiClient.put(`/admin/participants/${userId}/status`, {
        status,
      });
      console.log("Before update:", participants);
      const updated = res.data.participant;
      console.log("After update:", participants);

      const updatedUserId = updated.userId._id?.toString();

      setParticipants((prev) =>
        prev.map((p) => {
          const currentId =
            typeof p.userId === "object" ? p.userId._id?.toString() : p.userId;
          const updatedId = updated.userId._id?.toString();
          return currentId === updatedId ? { ...p, ...updated } : p;
        })
      );
      console.log("Updating participant in UI:", {
        updatedId: updated.userId._id,
        existingIds: participants.map((p) => p.userId._id),
      });
      toast.success(`${updated.userId.fullName} marked as ${status}.`);
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Failed to update participant status.");
    } finally {
      setStatusLoading({});
    }
  };

  const isUpdating = (userId, status) =>
    statusLoading.userId === userId && statusLoading.status === status;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Participants</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogTitle>Participants for "{giveaway.title}"</DialogTitle>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
            <span className="ml-2 text-sm text-gray-500">Loading...</span>
          </div>
        ) : (
          <div className="mt-4 space-y-2 max-h-[500px] overflow-y-auto">
            {participants.length === 0 ? (
              <p className="text-sm text-gray-500 italic text-center">
                No participants yet.
              </p>
            ) : (
              participants.map((p) => (
                <div
                  key={p._id}
                  className="flex justify-between p-3 border rounded-md space-y-1 bg-gray-50"
                >
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Name:</strong> {p.userId?.fullName || "N/A"}
                    </p>
                    <p>
                      <strong>Email:</strong> {p.userId?.email || "N/A"}
                    </p>
                    <p>
                      <strong>Transaction ID:</strong> {p.transactionId}
                    </p>
                    <p>
                      <strong>Registered At:</strong>{" "}
                      {new Date(p.registeredAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-semibold capitalize ${
                          p.status === "verified"
                            ? "text-green-600"
                            : p.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </p>
                  </div>

                  {p.status !== "verified" && p.status !== "rejected" && (
                    <div className="flex gap-3 items-center">
                      <button
                        className="border border-red-400 text-red-400 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                        onClick={() =>
                          handleStatusUpdate(p.userId._id, "rejected")
                        }
                        disabled={isUpdating(p.userId._id, "rejected")}
                      >
                        {isUpdating(p.userId._id, "rejected") && (
                          <Loader2 className="animate-spin w-4 h-4" />
                        )}
                        Reject
                      </button>
                      <button
                        className="border border-green-400 text-green-400 px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50"
                        onClick={() =>
                          handleStatusUpdate(p.userId._id, "verified")
                        }
                        disabled={isUpdating(p.userId._id, "verified")}
                      >
                        {isUpdating(p.userId._id, "verified") && (
                          <Loader2 className="animate-spin w-4 h-4" />
                        )}
                        Accept
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
