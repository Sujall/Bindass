"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ParticipantDialog } from "./ParticipantDialog";
import { WinnerDialog } from "./WinnerDialog";
import apiClient from "@/api/apiClient";

export function GiveawayTable({ winners, setWinners }) {
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGiveaways() {
      try {
        const response = await apiClient.get("/admin/view-giveaway");
        setGiveaways(response.data.giveaways || []);
      } catch (err) {
        console.error("Failed to fetch giveaways:", err);
        setError("Failed to load giveaways");
      } finally {
        setLoading(false);
      }
    }

    fetchGiveaways();
  }, []);

  if (loading)
    return <div className="p-6 flex justify-center">Loading giveaways...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full text-sm text-left border">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Title</th>
            <th className="px-6 py-3">Entry Fee</th>
            <th className="px-6 py-3">Total Seats</th>
            <th className="px-6 py-3">End Date</th>
            <th className="px-6 py-3">Participants</th>
            <th className="px-6 py-3 text-right">Make Winner</th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {giveaways.map((giveaway) => (
            <tr
              key={giveaway._id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium">{giveaway.title}</td>
              <td className="px-6 py-4">₹{giveaway.fee}</td>
              <td className="px-6 py-4">{giveaway.totalSlots}</td>
              <td className="px-6 py-4">
                {new Date(giveaway.endDate).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-right">
                <ParticipantDialog
                  giveaway={giveaway}
                  numberOfParticipants={giveaway.participants?.length || 0}
                />
              </td>
              <td className="px-6 py-4 text-right">
                <WinnerDialog
                  giveaway={giveaway}
                  winners={winners}
                  setWinners={setWinners}
                />
              </td>
              <td className="px-6 py-4">Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
