"use client";

import { loginUser } from "@/api/apiClient";
import { useState } from "react";
import { FiArrowLeft, FiMail, FiLock } from "react-icons/fi";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear field-specific error
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Call the API
      const response = await loginUser(email, password);

      // Assuming the response contains token and user information
      const token = response.token;
      const user = response.user;
      console.log("User", response);

      if (token) {
        localStorage.setItem("authToken", token); // Store JWT
        console.log("Login successful, token saved:", token);

        // Optional: store user info if needed
        localStorage.setItem("userRole", user.role);
        console.log("userRole", user.role);

        // Redirect based on user role
        if (user.role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/home";
        }
      } else {
        throw new Error("Token not found in response");
      }
    } catch (err) {
      const apiError =
        err.response?.data?.message || "Login failed. Please try again.";
      alert(apiError);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center relative">
      {/* Back Icon */}
      <button
        className="absolute top-4 left-4 text-white text-2xl"
        onClick={() => window.history.back()}
      >
        <FiArrowLeft />
      </button>

      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-white/80 mb-6">
          Sign in to your account
        </p>

        {/* Email Field */}
        <label className="text-sm block mb-2">Email Address</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
          <FiMail className="text-white/60 mr-2" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>
        {errors.email && (
          <p className="text-red-300 text-sm mb-4">{errors.email}</p>
        )}

        {/* Password Field */}
        <label className="text-sm block mb-2 mt-4">Password</label>
        <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
          <FiLock className="text-white/60 mr-2" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
          />
        </div>
        {errors.password && (
          <p className="text-red-300 text-sm mb-4">{errors.password}</p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 mt-4 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white text-sm hover:opacity-90 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="border-t border-white/10 my-6"></div>

        {/* Footer Links */}
        <div className="text-sm text-center text-white/70 space-x-4">
          <a href="/register" className="hover:underline">
            Create new
          </a>
          <span>|</span>
          <a href="/reset-password" className="hover:underline">
            Reset Password?
          </a>
          <span>|</span>
          <a href="/support" className="hover:underline">
            Need help?
          </a>
        </div>
      </div>
    </div>
  );
}
