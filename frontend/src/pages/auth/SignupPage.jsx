// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import GoogleSignInButton from "../../components/GoogleSignInButton";
// import GitHubSignInButton from "../../components/GitHubSignInButton";
// import axios from "axios";

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGoogleSuccess = async (googleUser) => {
//     setIsLoading(true);
//     setError("");

//     try {
//       const email = googleUser.profileObj.email; // or googleUser.user.email (depending on lib)

//       const res = await axios.get(
//         `http://localhost:5000/auth/check-user/${"nikhilkandhare22gmail.com"}`
//       );
//       const { exists } = res.data;

//       if (exists) {
//         navigate("/"); // ✅ redirect to home if user exists
//         localStorage.setItem("googleUser", JSON.stringify(googleUser));
//       } else {
//         navigate("/auth/complete-google-signup", {
//           state: { googleUser },
//           replace: false,
//         });
//       }
//     } catch (err) {
//       if (import.meta.env.NODE_ENV !== "production") {
//         console.error("Google signup check error:", err);
//       }
//       setError("Error checking user. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleGoogleError = (error) => {
//     if (import.meta.env.NODE_ENV !== "production") {
//       console.error("Google signup error:", error);
//     }

//     let errorMessage = "Google sign-up failed. Please try again.";

//     if (error.includes("popup_closed")) {
//       errorMessage = "Sign-up was cancelled. Please try again.";
//     } else if (error.includes("access_denied")) {
//       errorMessage = "Access denied. Please grant the necessary permissions.";
//     } else if (error.includes("network")) {
//       errorMessage =
//         "Network error. Please check your connection and try again.";
//     } else if (error) {
//       errorMessage = error;
//     }

//     setError(errorMessage);
//     setIsLoading(false);
//   };

//   return (
//     <div className="flex flex-col lg:flex-row  bg-gray-50">
//       <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 w-full">
//         {/* Error Alert */}
//         {error && (
//           <div
//             className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm"
//             role="alert"
//             aria-live="polite"
//           >
//             {error}
//           </div>
//         )}

//         <div className="flex flex-col gap-3 sm:gap-4">
//           {/* GitHub Signup Button */}
//           {/* <GitHubSignInButton
//                 isSignUp={true}
//                 disabled={isLoading}
//                 onSuccess={handleGitHubSuccess}
//                 onError={handleGitHubError}
//                 aria-label="Sign up with GitHub"
//               /> */}
//           <span className="mr-1 sm:mr-2">New to platform?</span>
//           {/* Google Signup Button */}
//           <GoogleSignInButton
//             isSignUp={true}
//             disabled={isLoading}
//             onSuccess={handleGoogleSuccess}
//             onError={handleGoogleError}
//             aria-label="Sign up with Google"
//           />
//         </div>

//         {/* Terms and Privacy Notice */}
//         {/* <p className="mt-6 text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
//               By signing up, you agree to our{" "}
//               <Link
//                 to="/terms"
//                 className="text-blue-500 hover:text-blue-700 underline touch-manipulation"
//               >
//                 Terms of Service
//               </Link>{" "}
//               and{" "}
//               <Link
//                 to="/privacy"
//                 className="text-blue-500 hover:text-blue-700 underline touch-manipulation"
//               >
//                 Privacy Policy
//               </Link>
//             </p> */}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const backend = `${import.meta.env.VITE_API_BASE_URL}`;

  const togglePassword = () => setShowPassword((prev) => !prev);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

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

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      errors.confirmPassword = "Passwords do not match";
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
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${backend}/custom/register`,
        {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        },
        { withCredentials: true }
      );

      toast.success("OTP sent to your email!");

      navigate("/auth/verify-email", {
        state: { email: formData.email.trim().toLowerCase() },
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Signup failed";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row overflow-x-hidden -mt-5 bg-white">

      {/* LEFT SIDE WITH VIDEO */}
      <div className="hidden -mt-20 md:-mt-8 sm:flex lg:flex items-center justify-center p-6 sm:p-8 md:p-12 lg:flex-1 lg:p-16 bg-white/5 backdrop-blur-md">
        <video
          src="/videologo.mp4"
          className="w-30 h-auto object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex-1 flex -mt-2 items-center justify-center px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 lg:p-12 xl:p-16">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">

          <div className="sm:hidden flex justify-center mb-6">
            <video
              src="/videologo.mp4"
              className="w-12 h-auto object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>

          <div className="bg-white rounded-xl shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 text-center">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-6 text-center">
              Sign up to get started
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* FIRST NAME */}
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                    fieldErrors.firstName
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  }`}
                />
                {fieldErrors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.firstName}</p>
                )}
              </div>

              {/* LAST NAME */}
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                    fieldErrors.lastName
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  }`}
                />
                {fieldErrors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.lastName}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                    fieldErrors.email
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                    fieldErrors.password
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  }`}
                />
                {fieldErrors.password && (
                  <p className="text-red-600 text-sm mt-1">{fieldErrors.password}</p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base ${
                    fieldErrors.confirmPassword
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-300 focus:border-green-800"
                  }`}
                />

                {fieldErrors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1">
                    {fieldErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg font-semibold text-base shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70"
              >
                {isLoading ? "Creating..." : "Create Account"}
              </button>

              <p className="text-center text-sm mt-3">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-green-700 font-semibold">
                  Login
                </Link>
              </p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
