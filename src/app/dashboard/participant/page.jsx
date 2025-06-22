"use client";

import React, { useState } from "react";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState([
    { name: "Raj Kumar" },
    { name: "Mukesh Jaiswal" },
  ]);
  const [newParticipant, setNewParticipant] = useState("");

  const handleAddParticipant = () => {
    if (!newParticipant.trim()) return;

    setParticipants((prev) => [...prev, { name: newParticipant.trim() }]);
    setNewParticipant("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md space-y-6">
      <h2 className="text-2xl font-bold mb-4">Participants</h2>

      {/* Form to Add Participant */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter participant name"
          className="flex-1 border border-gray-300 p-2 rounded-md"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
        />
        <button
          onClick={handleAddParticipant}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      {/* Participant List */}
      <div className="bg-gray-50 rounded-lg border">
        <h3 className="text-md font-semibold px-4 py-2 border-b">Most Recent</h3>
        <ul className="divide-y">
          {participants.map((p, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-3">
              <span className="text-gray-800 font-medium">{p.name}</span>
              {/* Optional delete feature */}
              <button
                onClick={() =>
                  setParticipants(participants.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
