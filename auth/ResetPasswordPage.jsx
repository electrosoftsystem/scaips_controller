import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const backend = import.meta.env.VITE_API_BASE_URL;

  const inputRefs = useRef([]);

  // Handle digit change & auto-focus
  const handleOtpChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, ""); // only digits
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) inputRefs.current[index + 1].focus();
    if (!val && index > 0) inputRefs.current[index - 1].focus();
  };

  // Handle paste (paste entire OTP)
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasteData.length === 6) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleReset = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return toast.error("Enter a valid 6-digit OTP");
    if (!password || password !== confirmPassword)
      return toast.error("Passwords must match and cannot be empty");

    setIsLoading(true);
    try {
      await axios.post(`${backend}/custom/reset-password`, {
        email,
        otp: otpValue,
        password,
      });
      toast.success("Password updated successfully!");
      navigate("/auth/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP or server error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <p className="text-gray-600 mb-6 text-center">
        OTP sent to <strong>{email}</strong>
      </p>

      {/* OTP Inputs */}
      <div
        className="flex justify-between mb-4"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleOtpChange(e, index)}
            className="w-12 h-12 text-center border border-green-500 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        ))}
      </div>

      {/* New Password */}
      <div className="mb-4 relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 font-semibold"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="mb-6 relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        disabled={isLoading}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold transition-colors disabled:opacity-70"
      >
        {isLoading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}
