"use client";

import React, { useState } from "react";
import { GiveawayFormDialog } from "../../components/GiveawaFormDialog";
import { GiveawayTable } from "../../components/GiveawayTable";

export default function GiveawayListPage() {
  const [winners, setWinners] = useState({});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Giveaways</h1>
        <GiveawayFormDialog />
      </div>
      <GiveawayTable winners={winners} setWinners={setWinners} />
    </div>
  );
}
