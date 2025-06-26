"use client";

import { sendResetOTP, submitNewPassword } from "@/api/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMail, FiKey } from "react-icons/fi";

export default function ResetPasswordPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");


  const handleSendOtp = async () => {
    try {
      setLoading(true);
      await sendResetOTP(email);
      setStep(2);
      setMessage("OTP sent to your email.");
    } catch (err) {
      setMessage(err.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await submitNewPassword({ email, otp, newPassword });
      setMessage("Password reset successfully. You can now login.");
      router.push("/login");
    } catch (err) {
      setMessage(err.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-2">Reset Password</h2>
        <p className="text-center text-white/80 mb-6">
          {step === 1
            ? "Enter your email to receive an OTP"
            : step === 2
            ? "Enter OTP and new password"
            : "You're all set!"}
        </p>

        {message && <p className="text-sm text-yellow-200 mb-4">{message}</p>}

        {step === 1 && (
          <>
            <label className="text-sm block mb-2">Email Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6">
              <FiMail className="text-white/60 mr-2" />
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-500 hover:brightness-110 transition font-semibold text-white text-sm flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-sm block mb-2 mt-4">OTP</label>
            <input
              type="text"
              className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4 text-white placeholder-white/50"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <label className="text-sm block mb-2">New Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6">
              <FiKey className="text-white/60 mr-2" />
              <input
                type="password"
                placeholder="New Password"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleResetPassword}
              disabled={loading}
              className="w-full py-2 rounded-md bg-gradient-to-r from-green-600 to-teal-500 hover:brightness-110 transition font-semibold text-white text-sm flex items-center justify-center gap-2"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <div className="border-t border-white/10 my-6"></div>
        <div className="text-sm text-center text-white/70">
          <a href="/login" className="hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
