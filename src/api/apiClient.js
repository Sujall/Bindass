import axios from "axios";
import {jwtDecode} from "jwt-decode"; // npm install jwt-decode


// Create Axios instance
const apiClient = axios.create({
  // baseURL: "https://bindass-backend.vercel.app/api",
  baseURL: "http://192.168.1.103:5002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log(token);
  return config;
});


export const getLoggedInUserId = () => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded?.id || decoded?._id || null;
  } catch (error) {
    console.error("Token decode failed:", error);
    return null;
  }
};

export const getUserRole = () => {
  if (typeof window === "undefined") return null;

  const role = localStorage.getItem("userRole");
  return role || null;
};


// Example login call
export const loginUser = async (email, password) => {
  try {
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const res = await apiClient.post("/auth/logout");
    // Remove token from localStorage
    localStorage.removeItem("authToken");
    return res.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
};

export const sendResetOTP = async (email) => {
  try {
    const res = await apiClient.post("/auth/forgot-password", { email });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

// Verify OTP and reset password
export const submitNewPassword = async ({ email, otp, newPassword }) => {
  try {
    const res = await apiClient.post("/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Something went wrong" };
  }
};

export default apiClient;

export const initiateRegistration = async ({
  fullName,
  email,
  mobile,
  address,
}) => {
  try {
    const res = await apiClient.post("/auth/initialRegister", {
      fullName,
      email,
      mobile,
      address,
    });
    return res.data;
  } catch (err) {
    console.error(
      "Init registration error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const completeRegistration = async ({ email, otp, password }) => {
  try {
    const res = await apiClient.post("/auth/completeRegister", {
      email,
      otp,
      password,
    });
    return res.data;
  } catch (err) {
    console.error(
      "Complete registration error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getUserProfile = async () => {
  try {
    const res = await apiClient.get("/profile/view");
    return res.data;
  } catch (err) {
    console.error("Profile fetch error:", err.response?.data || err.message);
    throw err;
  }
};

export const getUserGiveawayHistoryByID = async (userId) => {
  try {
   const res = await apiClient.get(`/giveaways/history/${userId}`);
  return res.data;
  } catch (err) {
    console.error("Error while fetching User Giveaway Histroty By ID:", err.response?.data || err.message);
    throw err;
  }
};

// api/apiClient.js

export const participateInGiveaway = async ({ giveawayId, transactionId }) => {
  console.log("Sending participation request:", {
    giveawayId,
    transactionId,
  });
  try {

    const res = await apiClient.post("/giveaways/participate", {
      giveawayId,
      transactionId,
    });

    // Axios automatically throws for non-2xx status, so no need to check res.ok
    return res.data;
  } catch (err) {
    // Axios error structure handling
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong during participation";
    console.error("Error in participateInGiveaway:", message);
    throw new Error(message);
  }
};

export const updateUserProfile = async (data) => {
  try {
    const res = await apiClient.put("/profile/updateProfile", data);
    return res.data;
  } catch (err) {
    console.error("Profile update error:", err.response?.data || err.message);
    throw err;
  }
};

export const getAllGiveaways = async () => {
  try {
    const res = await apiClient.get("/giveaways/all-giveaways");
    console.log("Giveaways response:", res.data);
    return res.data;
  } catch (err) {
    console.error(
      "GiveAways fetching error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

export const getGiveawayByID = async (id) => {
  try {
    const res = await apiClient.get(`/giveaways/giveaway/${id}`);
    return res.data;
  } catch (err) {
    console.error(
      "Giveaway by ID fetch error:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// Admin Actions: Banner's

export const fetchAllBanners = async () => {
  const res = await apiClient.get("/admin/media/banner");
  return res.data.banners;
};

export const uploadBannerImage = async (file) => {
  const formData = new FormData();
  formData.append("banner", file); // must match backend's multer field name

  const response = await apiClient.post("/admin/media/banner", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // optional, can omit
    },
  });

  return response.data;
};

export const deleteBannerById = async (id) => {
  const response = await apiClient.delete(`/admin/media/banner/${id}`);
  return response.data;
};

// Admin Actions: Create Giveaway
export async function uploadGiveawayMedia(giveawayImageFile, qrCodeFile) {
  const formData = new FormData();
  formData.append("giveawayImage", giveawayImageFile);
  formData.append("qrCode", qrCodeFile);

  try {
    const response = await apiClient.post("/admin/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const { giveawayImageUrl, qrCodeUrl } = response.data;

    console.log("Uploaded image URLs:", { giveawayImageUrl, qrCodeUrl });

    // Return in correct format expected by the backend
    return {
      giveawayImageUrl,
      qrCodeUrl,
    };
  } catch (error) {
    console.error("Error uploading images:", error);
    throw new Error("Image upload failed");
  }
}

// Submit the giveaway form with image URLs
export const createGiveaway = async (formPayload) => {
  console.log("Form Payload", formPayload);
  try {
    const response = await apiClient.post(
      "/admin/create-giveaway",
      formPayload
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error in createGiveaway:",
      error.response?.data || error.message
    );
    throw error;
  }
};
