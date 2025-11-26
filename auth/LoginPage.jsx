import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";



export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const { user } = useAuth();
  const navigate = useNavigate();
  const backend = `${import.meta.env.VITE_API_BASE_URL}`;

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (error) {
      setError("");
    }
  };
  // In LoginPage.jsx - around line 334 area based on your screenshot
 

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);
  setError("");

  try {
    const res = await axios.post(
      `${backend}/custom/login`,
      {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      },
      { withCredentials: true }
    );

    // OTP REQUIRED
    if (res.data.otpRequired) {
      toast.info("OTP sent to your email");

      navigate("/auth/verify-email", {
        state: { email: formData.email },
      });
      return;
    }

    toast.success("Login successful!");
    window.location.href = "/";

  } catch (err) {
    const errorMessage = err.response?.data?.message || "Login failed";
    setError(errorMessage);
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/auth/forgot-password");
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      // Redirect to backend Google OAuth endpoint
      window.location.href = `${backend}/auth/google`;
    } catch (err) {
      const errorMessage = "Google login failed. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row overflow-x-hidden -mt-5 bg-white">
      <div className="hidden -mt-20 md:-mt-8 sm:flex lg:flex items-center justify-center p-6 sm:p-8 md:p-12 lg:flex-1 lg:p-16 bg-white/5 backdrop-blur-md">
        <video
          src="/videologo.mp4"
          className="w-30 h-auto object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Login Side */}
      <div className="flex-1 flex -mt-2 items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:p-12 xl:p-16">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          {/* Mobile Logo - Only visible on small screens */}
          <div className="sm:hidden flex justify-center mb-6">
            <video
              src="/videologo.mp4"
              className="w-12 h-auto object-contain"
              autoPlay
              loop
              muted
              playsInline
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Login Box */}
          <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 text-center">
              Sign in to continue to your account
            </p>

            {/* Error Alert */}
            {error && (
              <div
                className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg mb-4 sm:mb-5 text-xs sm:text-sm md:text-base break-words"
                role="alert"
                aria-live="polite"
              >
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 md:space-y-5"
              noValidate
            >
              {/* Email Field */}
              <div className="space-y-1 sm:space-y-1.5">
                <label htmlFor="email" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  autoComplete="email"
                  className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3.5 border-2 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                    fieldErrors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  } focus:outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60`}
                  aria-invalid={fieldErrors.email ? "true" : "false"}
                  aria-describedby={
                    fieldErrors.email ? "email-error" : undefined
                  }
                  disabled={isLoading}
                />
                {fieldErrors.email && (
                  <span
                    id="email-error"
                    className="text-red-600 text-xs sm:text-sm block mt-1"
                    role="alert"
                  >
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1 sm:space-y-1.5">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    autoComplete="current-password"
                    className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 md:py-3.5 pr-16 sm:pr-20 border-2 rounded-lg text-sm sm:text-base transition-all duration-200 ${
                      fieldErrors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-300 focus:border-green-800"
                    } focus:outline-none focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60`}
                    aria-invalid={fieldErrors.password ? "true" : "false"}
                    aria-describedby={
                      fieldErrors.password ? "password-error" : undefined
                    }
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-green-600 text-xs sm:text-sm font-semibold hover:text-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {fieldErrors.password && (
                  <span
                    id="password-error"
                    className="text-red-600 text-xs sm:text-sm block mt-1"
                    role="alert"
                  >
                    {fieldErrors.password}
                  </span>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs sm:text-sm md:text-base text-black hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 sm:py-3 md:py-3.5 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
{/* 
              {/* Separator */}
              {/* <div className="flex items-center my-4 sm:my-5 md:my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-3 sm:px-4 text-xs sm:text-sm text-gray-500">
                  OR
                </span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>  */}

              {/* Google Sign In Button */}
           <p className="text-center mt-4 text-sm text-gray-600">
  New here?{" "}
  <Link to="/auth/signup" className="text-green-700 font-semibold hover:underline">
    Sign up
  </Link>
</p>

            </form>
          </div>

        
        </div>
      </div>
    </div>
  );
}



  //  <button
  //               type="button"
  //               onClick={handleGoogleLogin}
  //               disabled={isLoading}
  //               className="w-full py-2.5 sm:py-3 md:py-3.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
  //             >
  //               <svg className="w-5 h-5" viewBox="0 0 24 24">
  //                 <path
  //                   fill="#4285F4"
  //                   d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
  //                 />
  //                 <path
  //                   fill="#34A853"
  //                   d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
  //                 />
  //                 <path
  //                   fill="#FBBC05"
  //                   d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
  //                 />
  //                 <path
  //                   fill="#EA4335"
  //                   d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
  //                 />
  //               </svg>
  //               {isLoading ? "Signing in..." : "Continue with Google"}
  //             </button>