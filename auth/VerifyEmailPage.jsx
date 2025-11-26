// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// export default function VerifyEmailPage() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   const [otp, setOtp] = useState("");
//   const [password, setPassword] = useState("");

//   const backend = import.meta.env.VITE_API_BASE_URL;

//  const handleVerify = async () => {
//   try {
//     const res = await axios.post(`${backend}/custom/verify-otp`, {
//       email,
//       otp,
//       password, // only if required for registration
//     });

//     toast.success(res.data.message);

//     // after verification → go to home page
//     navigate("/");
//   } catch (err) {
//     toast.error(err.response?.data?.message || "Invalid OTP");
//   }
// };


//   return (
//     <div className="p-6 max-w-md mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-3">Verify Your Email</h2>
//       <p className="mb-4 text-gray-600">
//         OTP sent to <strong>{email}</strong>
//       </p>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="w-full p-3 border rounded mb-3"
//       />

//       <input
//         type="password"
//         placeholder="Create New Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="w-full p-3 border rounded mb-3"
//       />

//       <button
//         onClick={handleVerify}
//         className="w-full bg-green-700 text-white p-3 rounded"
//       >
//         Verify & Create Password
//       </button>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0); // seconds
  const [isLoading, setIsLoading] = useState(true);
  const backend = import.meta.env.VITE_API_BASE_URL;

  // ⏳ Fetch OTP expiry from backend on mount
  useEffect(() => {
    const fetchExpiry = async () => {
      try {
        const res = await axios.post(`${backend}/custom/get-otp-expiry`, { email });
        const expiry = new Date(res.data.expiresAt).getTime();
        const now = Date.now();
        const remaining = Math.max(Math.floor((expiry - now) / 1000), 0);
        setTimer(remaining);
      } catch (err) {
        toast.error(err.response?.data?.message || "Cannot fetch OTP expiry");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpiry();
  }, [email]);

  // ⏱ Countdown Timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ⏱ Format timer mm:ss
  const formatTime = () => {
    const m = Math.floor(timer / 60);
    const s = timer % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // 🔢 Handle typing
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // 📋 Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    let pasteData = e.clipboardData.getData("text").trim();
    if (!/^\d{6}$/.test(pasteData)) return;
    setOtp(pasteData.split(""));
    document.getElementById("otp-5")?.focus();
  };

  // 🔐 Verify OTP
  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      toast.error("Enter 6-digit OTP");
      return;
    }

    try {
      const res = await axios.post(`${backend}/custom/verify-otp`, { email, otp: finalOtp });
      toast.success(res.data.message);
      navigate("/"); // or dashboard
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  // 🔁 Resend OTP
  const resendOtp = async () => {
    try {
      await axios.post(`${backend}/custom/resend-otp`, { email });
      toast.success("OTP resent successfully");
      setOtp(["", "", "", "", "", ""]);
      setTimer(300); // reset 5 minutes
      document.getElementById("otp-0")?.focus();
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto mt-10 text-center">
      <h2 className="text-3xl font-bold mb-3">Verify Your Email</h2>
      <p className="mb-4 text-gray-600">
        Enter the 6-digit OTP sent to <strong>{email}</strong>
      </p>

      {/* OTP Boxes */}
      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            onPaste={handlePaste}
            className="w-12 h-12 text-center text-xl font-bold border border-gray-400 rounded-lg focus:border-green-700 outline-none"
          />
        ))}
      </div>

      {/* Timer / Resend */}
      <div className="mb-4">
        {timer > 0 ? (
          <p className="text-gray-500">Resend OTP in <strong>{formatTime()}</strong></p>
        ) : (
          <button onClick={resendOtp} className="text-green-700 font-semibold underline">
            Resend OTP
          </button>
        )}
      </div>

      {/* Verify Button */}
      <button
        onClick={handleVerify}
        className="w-full bg-green-700 text-white p-3 rounded-lg font-semibold text-lg"
      >
        Verify OTP
      </button>
    </div>
  );
}
