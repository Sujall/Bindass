"use client";

import { useState } from "react";
import { FiUser, FiPhone, FiMapPin, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h2>
        <p className="text-center text-white/80 mb-6">Step {step} of 3</p>

        {step === 1 && (
          <>
            <label className="text-sm block mb-2">Full Name</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
              <FiUser className="text-white/60 mr-2" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>

            <label className="text-sm block mb-2">Phone Number</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
              <FiPhone className="text-white/60 mr-2" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1234567890"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>

            <label className="text-sm block mb-2">Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6">
              <FiMapPin className="text-white/60 mr-2" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>

            <button
              onClick={nextStep}
              className="w-full p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold text-white text-md"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-sm block mb-2">Email Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
              <FiMail className="text-white/60 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>

            {/* Send OTP Button */}

            <div className="flex justify-between gap-4">
              <button
                onClick={prevStep}
                className="w-full p-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-md font-medium"
              >
                Back
              </button>
              <button
                onClick={() => {
                  // Simulate sending OTP
                  const { fullName, phone, address, email } = formData;
                  console.log("Sending OTP with:", {
                    fullName,
                    phone,
                    address,
                    email,
                  });
                  // alert(`OTP sent to ${email}`);
                  nextStep();
                }}
                className="w-full p-3 rounded-md bg-indigo-600 hover:bg-indigo-600 transition text-white text-md font-medium"
              >
                Send OTP
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <label className="text-sm block mb-2">6-digit OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              maxLength={6}
              placeholder="Enter OTP"
              className="w-full bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-6 text-white placeholder-white/50 outline-none"
            />

            <label className="text-sm block mb-2">Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-4">
              <FiLock className="text-white/60 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={prevStep}
                className="w-full p-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-md font-medium"
              >
                Back
              </button>
              <button className="w-full p-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-md font-semibold">
                Register
              </button>
            </div>
          </>
        )}

        <div className="border-t border-white/10 my-6"></div>

        <div className="text-sm text-center text-white/70 space-x-4">
          <a href="/login" className="hover:underline">
            Already have an account? Login
          </a>
          <span>&bull;</span>
          <a href="/about-us" className="hover:underline">
            Need help?
          </a>
        </div>
      </div>
    </div>
  );
}
