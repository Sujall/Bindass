"use client";

import { Typography } from "@material-tailwind/react";

export default function Dashboard() {
  return (
    <div className="p-6">
      <Typography variant="h4" className="text-white mb-4">
        Dashboard
      </Typography>
      <p className="text-white">Welcome to the Dashboard page.</p>
    </div>
  );
}
