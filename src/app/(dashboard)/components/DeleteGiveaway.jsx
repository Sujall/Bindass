"use client";

import React, { useState } from "react";
import apiClient from "@/api/apiClient"; // ✅ Make sure the path is correct
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or your preferred toast lib

export default function DeleteGiveaway({ giveawayId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!giveawayId) return;
    setLoading(true);
    try {
      await apiClient.delete(`/admin/admin/giveaway/${giveawayId}`);
      toast.success("Giveaway deleted successfully");
      setTimeout(() => {
        window.location.reload();
      }, 300);
      setConfirmOpen(false);
    } catch (err) {
      console.error("Failed to delete giveaway:", err);
      toast.error("Failed to delete giveaway");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
        Delete
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-lg font-semibold">
            Delete Giveaway
          </DialogTitle>
          <p className="text-sm text-gray-600">
            Are you sure you want to delete this giveaway? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
