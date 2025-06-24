import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://192.168.1.151:5002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  console.log(token)
  return config;
});


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

export default apiClient;

export const initiateRegistration = async ({ fullName, email, mobile, address }) => {
  try {
    const res = await apiClient.post("/auth/initialRegister", {
      fullName,
      email,
      mobile,
      address,
    });
    return res.data;
  } catch (err) {
    console.error("Init registration error:", err.response?.data || err.message);
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
    console.error("Complete registration error:", err.response?.data || err.message);
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

export const updateUserProfile = async (data) => {
  try {
    const res = await apiClient.put("/profile/updateProfile", data);
    return res.data;
  } catch (err) {
    console.error("Profile update error:", err.response?.data || err.message);
    throw err;
  }
};

