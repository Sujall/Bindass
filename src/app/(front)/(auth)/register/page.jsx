"use client";

import { completeRegistration, initiateRegistration } from "@/api/apiClient";
import { useState } from "react";
import { FiUser, FiPhone, FiMapPin, FiMail, FiLock } from "react-icons/fi";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    otp: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validateStepOne = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!/^\+91\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Phone number must start with +91 followed by 10 digits";
    }
    if (!formData.address.trim()) errors.address = "Address is required";
    return errors;
  };

  const validateStepTwo = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const validateStepThree = () => {
    const errors = {};
    if (!formData.otp || formData.otp.length !== 6)
      errors.otp = "Valid 6-digit OTP is required";
    if (!formData.password || formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    return errors;
  };

  const nextStep = () => {
    let errors = {};
    if (step === 1) errors = validateStepOne();
    if (step === 2) errors = validateStepTwo();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
    } else {
      setFieldErrors({});
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setError("");
    setFieldErrors({});
    setStep((prev) => prev - 1);
  };

  const handleInitiateRegistration = async () => {
    const validationErrors = validateStepTwo();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setError("");
    setLoading(true);
    const { fullName, phone, address, email } = formData;

    try {
      await initiateRegistration({
        fullName,
        email,
        mobile: phone,
        address,
      });
      alert("OTP sent to email");
      nextStep();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async () => {
    const validationErrors = validateStepThree();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setError("");
    setLoading(true);
    const { email, otp, password } = formData;

    try {
      await completeRegistration({ email, otp, password });
      alert("Registration successful!");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-700 to-purple-700 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md text-white rounded-xl p-8 w-full max-w-md shadow-xl border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-2">
          Create an Account
        </h2>
        <p className="text-center text-white/80 mb-6">Step {step} of 3</p>

        {/* Step 1 */}
        {step === 1 && (
          <>
            <label className="text-sm block mb-2">Full Name</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
              <FiMail className="text-white/60 mr-2" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              />
            </div>
            {fieldErrors.fullName && (
              <p className="text-red-300 text-sm mb-4">
                {fieldErrors.fullName}
              </p>
            )}

            <label className="text-sm block mt-4 mb-2">Phone Number</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
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
            {fieldErrors.phone && (
              <p className="text-red-300 text-sm mb-4">{fieldErrors.phone}</p>
            )}

            <label className="text-sm block mt-4 mb-2">Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
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
            {fieldErrors.address && (
              <p className="text-red-300 text-sm mb-4">{fieldErrors.address}</p>
            )}

            <button
              onClick={nextStep}
              className="mt-2 w-full p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold text-white text-md"
            >
              Next
            </button>
          </>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <>
            <label className="text-sm block mb-2">Email Address</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
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
            {fieldErrors.email && (
              <p className="text-red-300 text-sm mb-4">{fieldErrors.email}</p>
            )}

            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={prevStep}
                className="w-full p-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-md font-medium"
              >
                Back
              </button>
              <button
                disabled={loading}
                onClick={handleInitiateRegistration}
                className="w-full p-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-md font-medium"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
          </>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <>
            <label className="text-sm block mb-2">6-digit OTP</label>
             <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="bg-transparent flex-1 outline-none text-white placeholder-white/50"
              placeholder="Enter OTP"
            />
             </div>
            {fieldErrors.otp && (
              <p className="text-red-300 text-sm mb-4">{fieldErrors.otp}</p>
            )}

            <label className="text-sm block mt-4 mb-2">Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-md px-4 py-2 mb-1">
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
            {fieldErrors.password && (
              <p className="text-red-300 text-sm mb-4">
                {fieldErrors.password}
              </p>
            )}

            <div className="flex justify-between gap-4 mt-6">
              <button
                onClick={prevStep}
                className="w-full p-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-md font-medium"
              >
                Back
              </button>
              <button
                disabled={loading}
                onClick={handleCompleteRegistration}
                className="w-full p-3 rounded-md bg-green-600 hover:bg-green-700 text-white text-md font-semibold"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>

            {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
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
