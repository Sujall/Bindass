"use client";

import React, { useState } from "react";

export default function WinnerPage() {
  const participants = ["Simon Tirkey", "Mukesh Razz", "Amit Kumar", "Nikita Singh"];
  const [winner, setWinner] = useState("");

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-sm space-y-6">
      <h2 className="text-2xl font-bold">Winner</h2>

      {/* Winner Selection */}
      <div className="space-y-2">
        <label className="block font-medium">Select Winner</label>
        <select
          className="w-full border p-2 rounded-md"
          value={winner}
          onChange={(e) => setWinner(e.target.value)}
        >
          <option value="">-- Select a winner --</option>
          {participants.map((name, idx) => (
            <option key={idx} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Winner Display */}
      <div className="bg-gray-50 p-4 rounded-lg text-center border">
        {!winner ? (
          <>
            <div className="text-4xl mb-2">⏳</div>
            <h3 className="font-semibold text-gray-700 text-lg">Winner Pending</h3>
            <p className="text-sm text-gray-500">The winner will be announced after the giveaway ends</p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="font-bold text-xl text-green-600">{winner}</h3>
            <p className="text-sm text-gray-600">Congratulations! You’ve won this giveaway.</p>
          </>
        )}
      </div>
    </div>
  );
}
