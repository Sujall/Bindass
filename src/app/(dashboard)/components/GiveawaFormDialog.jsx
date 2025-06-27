"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import apiClient, {
  uploadGiveawayMedia,
  createGiveaway,
} from "@/api/apiClient";

export function GiveawayFormDialog() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [imageFiles, setImageFiles] = useState({
    giveawayImage: null,
    qrCode: null,
  });

  const [uploadedUrls, setUploadedUrls] = useState({
    giveawayImage: "",
    qrCode: "",
  });

  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    description: "",
    fee: "",
    totalSlots: "",
    endDate: "",
    categories: "",
  });

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setImageFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!imageFiles.giveawayImage || !imageFiles.qrCode) {
      alert("Please upload both images.");
      return;
    }

    try {
      setLoading(true);
      const { giveawayImageUrl, qrCodeUrl } = await uploadGiveawayMedia(
        imageFiles.giveawayImage,
        imageFiles.qrCode
      );

      console.log("Image upload success:", giveawayImageUrl, qrCodeUrl); // ✅ Check this

      setUploadedUrls({ giveawayImageUrl, qrCodeUrl });

      setStep(2);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitGiveaway = async (e) => {
    e.preventDefault();

    console.log("uploadedUrls", uploadedUrls); // Debug

    if (!uploadedUrls.giveawayImageUrl || !uploadedUrls.qrCodeUrl) {
      alert("Image URLs missing. Please re-upload.");
      return;
    }

    const payload = {
      ...formData,
      giveawayImageUrl: uploadedUrls.giveawayImageUrl,
      qrCodeUrl: uploadedUrls.qrCodeUrl,
    };

    console.log("Creating giveaway with:", payload);

    try {
      setLoading(true);
      const result = await createGiveaway(payload);
      console.log("Giveaway created:", result);
      alert("Giveaway created successfully!");
      resetAll();
      setOpen(false);
    } catch (err) {
      console.error("Giveaway submission failed:", err);
      alert("Failed to submit giveaway. Check your input.");
    } finally {
      setLoading(false);
    }
  };

  const resetAll = () => {
    setStep(1);
    setImageFiles({ giveawayImage: null, qrCode: null });
    setUploadedUrls({ giveawayImageUrl: "", qrCodeUrl: "" });
    setFormData({
      title: "",
      subTitle: "",
      description: "",
      fee: "",
      totalSlots: "",
      endDate: "",
      categories: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Giveaway</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogTitle>Create a New Giveaway</DialogTitle>

        {step === 1 && (
          <form onSubmit={handleImageUpload} className="space-y-4 mt-4">
            <div>
              <label className="block font-medium mb-1">Giveaway Image</label>
              <input
                type="file"
                accept="image/*"
                name="giveawayImage"
                onChange={handleImageChange}
                required
                className="block w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">QR Code Image</label>
              <input
                type="file"
                accept="image/*"
                name="qrCode"
                onChange={handleImageChange}
                required
                className="block w-full border p-2 rounded-md"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white w-full"
            >
              {loading ? "Uploading..." : "Upload & Continue"}
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmitGiveaway} className="space-y-4 mt-4">
            <div>
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Sub Title</label>
              <input
                type="text"
                name="subTitle"
                value={formData.subTitle}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Entry Fee (₹)</label>
              <input
                type="number"
                name="fee"
                value={formData.fee}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Total Seats</label>
              <input
                type="number"
                name="totalSlots"
                value={formData.totalSlots}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Categories</label>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleInputChange}
                className="w-full border p-2 rounded-md"
                placeholder="e.g. Electronics, Mobile, Apple"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white w-full mt-2"
            >
              {loading ? "Submitting..." : "Submit Giveaway"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
