import axios from "axios";

// Create Axios instance
const apiClient = axios.create({
  baseURL: "http://192.168.29.193:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
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
