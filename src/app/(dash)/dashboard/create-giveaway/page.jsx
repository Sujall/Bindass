"use client";

import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";

export default function CreateGiveawayPage() {
  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 text-black dark:text-white shadow-md rounded-lg p-6 mt-6">
      <Typography variant="h4" className="mb-6 text-center font-semibold">
        Create a Giveaway
      </Typography>

      <form className="space-y-4">
        <div>
          <Typography variant="small" className="mb-1 font-medium">
            Giveaway Title
          </Typography>
          <Input type="text" placeholder="Enter giveaway title" className="bg-white dark:bg-neutral-800" />
        </div>

        <div>
          <Typography variant="small" className="mb-1 font-medium">
            Description
          </Typography>
          <Textarea placeholder="Enter giveaway description" className="bg-white dark:bg-neutral-800" />
        </div>

        <div>
          <Typography variant="small" className="mb-1 font-medium">
            Prize
          </Typography>
          <Input type="text" placeholder="Enter prize name or amount" className="bg-white dark:bg-neutral-800" />
        </div>

        <div>
          <Typography variant="small" className="mb-1 font-medium">
            End Date
          </Typography>
          <Input type="date" className="bg-white dark:bg-neutral-800" />
        </div>

        <Button type="submit" className="w-full bg-black text-white">
          Create Giveaway
        </Button>
      </form>
    </div>
  );
}
