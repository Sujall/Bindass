"use client";

import { Typography } from "@material-tailwind/react";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <Typography variant="h4" className="text-white mb-4">
        Profile
      </Typography>
      <p className="text-white">Manage your account details here.</p>
    </div>
  );
}
