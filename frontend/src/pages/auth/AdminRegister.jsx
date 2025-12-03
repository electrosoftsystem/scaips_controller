import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

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
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

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

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await axios.post(`${backend}/admin/register`, formData, { withCredentials: true });
      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white to-blue-100">
      <div className="w-full flex justify-center items-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-blue-50">
          <h2 className="text-3xl font-bold text-blue-700 text-center">
            Admin Register
          </h2>
          <p className="text-gray-500 text-center mt-1">
            Create a new admin account
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                  errors.name ? "border-red-500 focus:ring-red-400" : "border-blue-200 focus:ring-blue-400"
                }`}
                placeholder="John Doe"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

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
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full p-3 rounded-lg border focus:ring-2 outline-none ${
                  errors.confirmPassword ? "border-red-500 focus:ring-red-400" : "border-blue-200 focus:ring-blue-400"
                }`}
                placeholder="••••••••"
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Show/Hide Password Toggle */}
            <p
              className="text-sm text-blue-600 cursor-pointer hover:underline text-right"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Passwords" : "Show Passwords"}
            </p>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p
              className="text-center text-sm text-blue-600 cursor-pointer hover:underline"
              onClick={() => navigate("/admin")}
            >
              Already have an account? Login
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
