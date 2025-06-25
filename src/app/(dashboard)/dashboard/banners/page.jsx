"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";

export default function BannerListPage() {
  const [banners, setBanners] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image size should be less than 2MB.");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      setError("");
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    // Simulate upload
    setBanners((prev) => [...prev, previewUrl]);
    setSelectedFile(null);
    setPreviewUrl(null);
    alert("Banner uploaded successfully (simulation).");
  };

  const handleDelete = (index) => {
    setBanners((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Uploaded Banners
        </h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload Banner
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Banner Image</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border p-2 rounded-md"
              />

              {error && (
                <p className="text-sm text-red-500 font-medium">{error}</p>
              )}

              {previewUrl && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Banner Preview"
                    className="w-full h-48 object-cover rounded-md border"
                  />
                </div>
              )}

              <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Upload
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.length === 0 ? (
          <p className="text-gray-500">No banners uploaded yet.</p>
        ) : (
          banners.map((banner, index) => (
            <div
              key={index}
              className="relative border rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={banner}
                alt={`Banner ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
