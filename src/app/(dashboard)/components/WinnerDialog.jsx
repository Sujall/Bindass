"use client";

import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function WinnerDialog({ giveaway, winners, setWinners }) {
  const toggleWinner = (participantId) => {
    setWinners((prev) => {
      const current = prev[giveaway.id] || [];
      const updated = current.includes(participantId)
        ? current.filter((id) => id !== participantId)
        : [...current, participantId];
      return { ...prev, [giveaway.id]: updated };
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Make Winner</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Select Winners for "{giveaway.title}"</DialogTitle>
        <div className="py-4 space-y-4">
          <div>
            <span className="text-sm font-medium">Number of Winners: {giveaway.numberOfWinners}</span>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {giveaway.participants.filter((p) => p.status === "verified").map((p) => (
              <WinnerCheckboxCard
                key={p.id}
                participant={p}
                isChecked={(winners[giveaway.id] || []).includes(p.id)}
                onToggle={() => toggleWinner(p.id)}
              />
            ))}
          </div>
          <Button
            onClick={() => console.log("Selected winners:", winners[giveaway.id])}
            className="bg-green-600 text-white hover:bg-green-700 mt-4"
          >
            Mark as Winner
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


const WinnerCheckboxCard = ({ participant, isChecked, onToggle }) => {
  return (
    <div className={`p-3 border rounded-md ${isChecked ? "bg-green-100 border-green-500" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-medium">{participant.name}</div>
          <div className="text-sm text-gray-500">{participant.email}</div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={onToggle}
            className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <span className="text-sm text-gray-600">Winner</span>
        </label>
      </div>
    </div>
  );
}
