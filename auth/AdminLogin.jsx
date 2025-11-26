import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const backend = import.meta.env.VITE_API_BASE_URL;
   

  useEffect(() => {
    axios
      .get(`${backend}/admin/me`, { withCredentials: true })
      .then((res) => {
        if (res.data.role == "admin") navigate("/admin/dashboard");
      })
      .catch(() => navigate("/admin")); // redirect if not logged in
  }, []);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop submission if invalid
    setLoading(true);

    try {
      await axios.post(`${backend}/admin/login`, formData, { withCredentials: true });
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-blue-100">
      {/* Left Illustration */}
      <div className="hidden md:flex w-1/2 justify-center items-center p-10">
        <video
          src="/videologo.mp4"
          className="w-30 h-auto object-contain"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Right Login Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-50">
          <h2 className="text-3xl font-bold text-blue-700 text-center">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center mt-1">
            Sign in to access the admin dashboard
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                  errors.email ? "border-red-500 focus:ring-red-400" : "border-blue-200 focus:ring-blue-400"
                }`}
                placeholder="admin@example.com"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                    errors.password ? "border-red-500 focus:ring-red-400" : "border-blue-200 focus:ring-blue-400"
                  }`}
                  placeholder="••••••••"
                  required
                />
                <span
                  className="absolute right-4 top-3 cursor-pointer text-blue-600 font-semibold"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Forgot Password */}
            <p className="text-right text-sm text-blue-600 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
