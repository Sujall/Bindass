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

export function ParticipantDialog({ giveaway }) {
  const [open, setOpen] = useState(false);
  const [participants, setParticipants] = useState([]);

  // Fetch participants from backend when dialog opens
  useEffect(() => {
    if (open) {
      apiClient
        .get(`/admin/giveaways/${giveaway._id}/participants`)
        .then((res) => {
          setParticipants(res.data.participants);
        })
        .catch((err) => {
          console.error("Failed to fetch participants:", err);
        });
    }
  }, [open, giveaway._id]);

  // Update participant status by userId
  const handleStatusUpdate = async (userId, status) => {
      console.log(`/api/participants/${userId}/status`);
      console.log(`Updating status for user: ${userId}`);
    try {
      const res = await apiClient.put(`/admin/participants/${userId}/status`, {
        status,
      });

      console.log(res.data);
      const updated = res.data.participant;

      // Update state
      setParticipants((prev) =>
        prev.map((p) =>
          p.userId._id === updated.userId._id ? { ...p, ...updated } : p
        )
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">View Participants</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Participants for "{giveaway.title}"</DialogTitle>
        <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
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
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Name : </strong>
                    {p.userId?.fullName || "N/A"}
                  </p>
                  <p>
                    <strong>Email : </strong>
                    {p.userId?.email || "N/A"}
                  </p>
                  <p>
                    <strong>Transaction ID :</strong> {p.transactionId}
                  </p>
                  <p>
                    <strong>Registered At :</strong>{" "}
                    {new Date(p.registeredAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>Status :</strong>
                    <span
                      className={`font-semibold capitalize ${
                        p.status === "verified"
                          ? "text-green-600"
                          : p.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {" "}
                      {p.status}
                    </span>
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <button
                    className="border border-red-400 text-red-400 p-2 rounded-lg text-sm font-bold"
                    onClick={() => handleStatusUpdate(p.userId._id, "rejected")}
                  >
                    Reject
                  </button>
                  <button
                    className="border border-green-400 text-green-400 p-2 rounded-lg text-sm font-bold"
                    onClick={() => handleStatusUpdate(p.userId._id, "verified")}
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
