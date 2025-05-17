"use client";

import { Typography } from "@material-tailwind/react";

export default function WalletPage() {
  return (
    <div className="p-6">
      <Typography variant="h4" className="text-white mb-4">
        Wallet
      </Typography>
      <p className="text-white">Check your wallet balance and transactions here.</p>
    </div>
  );
}
