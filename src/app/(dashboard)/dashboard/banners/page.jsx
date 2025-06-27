"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";
import {
  deleteBannerById,
  fetchAllBanners,
  uploadBannerImage,
} from "@/api/apiClient";
import { DialogBody } from "@material-tailwind/react";
import { toast } from "sonner";

export default function BannerListPage() {
  const [banners, setBanners] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedBanner, setSelectedBanner] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (file) {
      // Check file type
      if (!allowedFormats.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG formats are allowed.");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      // Check file size
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

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const fetched = await fetchAllBanners();
        console.log(fetched);
        setBanners(fetched);
      } catch (err) {
        console.error("Failed to load banners", err);
      }
    };
    loadBanners();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      const data = await uploadBannerImage(selectedFile);

      setBanners((prev) => [...prev, data.media.url]);
      setSelectedFile(null);
      setPreviewUrl(null);
      toast.success("Banner uploaded successfully");
      setOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload banner.");
      toast.error("Failed to upload Banner");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedBanner) return;
    try {
      await deleteBannerById(selectedBanner._id);
      setBanners((prev) => prev.filter((b) => b._id !== selectedBanner._id));
      setSelectedBanner(null);
      toast.success("Banner Deleted Successfully");
      setConfirmOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (err) {
      toast.error("Failed to delete Banner");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Uploaded Banners
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
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
                accept=".jpg,.jpeg,.png"
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
                disabled={!selectedFile || loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Uploading..." : "Upload"}
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
              key={banner._id || index}
              className="relative border rounded-md overflow-hidden shadow-sm"
            >
              <img
                src={banner.url} // ✅ access the `url` property of the object
                alt={`Banner ${index + 1}`}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={() => {
                  setSelectedBanner(banner);
                  setConfirmOpen(true);
                }}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-red-100"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))
        )}
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="text-lg font-semibold">
            Delete Banner
          </DialogTitle>
          <DialogBody className="text-sm text-gray-600">
            Are you sure you want to delete this banner? This action cannot be
            undone.
          </DialogBody>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
