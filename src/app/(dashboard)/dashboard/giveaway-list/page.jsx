"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const mockGiveaways = [
  {
    id: "g1",
    title: "iPhone 15 Giveaway",
    entryFee: 19,
    totalSeats: 1500,
    endDate: "2025-06-20T23:59:00Z",
    participants: [
      { id: "p1", name: "Alice", email: "alice@example.com" },
      { id: "p2", name: "Bob", email: "bob@example.com" },
    ],
  },
  {
    id: "g2",
    title: "MacBook Pro M3 Giveaway",
    entryFee: 49,
    endDate: "2025-07-01T23:59:00Z",
    totalSeats: 500,
    participants: [
      { id: "p3", name: "Charlie", email: "charlie@example.com" },
      { id: "p4", name: "Dana", email: "dana@example.com" },
    ],
  },
];

export default function GiveawayListPage() {
  const [selectedGiveaway, setSelectedGiveaway] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        All Giveaways
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Entry Fee</th>
              <th className="px-6 py-3">Total Seats</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Participants</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockGiveaways.map((giveaway) => (
              <tr
                key={giveaway.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{giveaway.title}</td>
                <td className="px-6 py-4">₹{giveaway.entryFee}</td>
                <td className="px-6 py-4">{giveaway.totalSeats}</td>
                <td className="px-6 py-4">
                  {new Date(giveaway.endDate).toLocaleString()}
                </td>
                <td className="px-6 py-4">{giveaway.participants.length}</td>
                <td className="px-6 py-4 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedGiveaway(giveaway)}
                      >
                        View Participants
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl">
                      <DialogTitle>
                        Participants for "{selectedGiveaway?.title}"
                      </DialogTitle>
                      <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                        {selectedGiveaway?.participants.map((p) => (
                          <div
                            key={p.id}
                            className="p-3 border rounded-md space-y-1 bg-gray-50"
                          >
                            <div className="flex justify-between">
                              <span className="font-medium">{p.name}</span>
                              <span className="text-sm text-gray-500">
                                {p.email}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <p>
                                <strong>Transaction ID:</strong>{" "}
                                {p.transactionId}
                              </p>
                              <p>
                                <strong>Registered At:</strong>{" "}
                                {new Date(p.registeredAt).toLocaleString()}
                              </p>
                              <p>
                                <strong>Status:</strong>{" "}
                                <span
                                  className={`font-semibold ${
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

                            <div className="flex gap-2 pt-2">
                              <button
                                onClick={() =>
                                  updateParticipantStatus(p.id, "verified")
                                }
                                disabled={p.status === "verified"}
                                className={`text-sm px-3 py-1 rounded-md ${
                                  p.status === "verified"
                                    ? "bg-green-300 cursor-not-allowed"
                                    : "bg-green-600 text-white hover:bg-green-700"
                                }`}
                              >
                                Verify
                              </button>
                              <button
                                onClick={() =>
                                  updateParticipantStatus(p.id, "rejected")
                                }
                                disabled={p.status === "rejected"}
                                className={`text-sm px-3 py-1 rounded-md ${
                                  p.status === "rejected"
                                    ? "bg-red-300 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700"
                                }`}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        ))}
                        {selectedGiveaway?.participants.length === 0 && (
                          <p className="text-gray-500">No participants yet.</p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
