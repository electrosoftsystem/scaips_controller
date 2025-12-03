import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const CompleteGitHubSignup = () => {
  const [searchParams] = useSearchParams();
  const [githubData, setGithubData] = useState(null);
  const [formData, setFormData] = useState({
    contact_no: "",
    student_college_name: "",
    interested_field: "Computer",
    other_field: "",
    userType: "student",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { registerWithGitHub } = useAuth();

  useEffect(() => {
    // Extract and decode GitHub data from URL
    const encodedData = searchParams.get("data");
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        setGithubData(decodedData);
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Error decoding GitHub data:", error);
        }
        setError("Invalid GitHub data. Please try again.");
      }
    } else {
      setError("No GitHub data provided. Please try again.");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    if (!githubData) {
      setError("GitHub information is missing. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      // Combine GitHub data with form data
      const registrationData = {
        ...githubData,
        ...formData,
      };

      const result = await registerWithGitHub(registrationData);

      if (result.success) {
        // For students, redirect to dashboard
        if (formData.userType === "student") {
          navigate("/student/dashboard");
        } else {
          // For colleges, redirect to college dashboard
          navigate("/college/dashboard");
        }
      } else {
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("GitHub registration error:", error);
      }
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!githubData && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Complete Your Registration
        </h2>

        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded mb-4">{error}</div>
        )}

        {githubData && (
          <div className="mb-6">
            <div className="flex items-center mb-4">
              {githubData.imageUrl && (
                <img
                  src={githubData.imageUrl}
                  alt="GitHub Profile"
                  className="w-12 h-12 rounded-full mr-4"
                />
              )}
              <div>
                <p className="font-medium text-gray-800">
                  {githubData.firstName} {githubData.lastName}
                </p>
                <p className="text-gray-600 text-sm">{githubData.email}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">I am a:</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="student"
                  checked={formData.userType === "student"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="userType"
                  value="college"
                  checked={formData.userType === "college"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>College</span>
              </label>
            </div>
          </div>

          {formData.userType === "student" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">College Name</label>
                <input
                  type="text"
                  name="student_college_name"
                  value={formData.student_college_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Interested Field
                </label>
                <select
                  name="interested_field"
                  value={formData.interested_field}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="Computer">Computer</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.interested_field === "Other" && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Specify Other Field
                  </label>
                  <input
                    type="text"
                    name="other_field"
                    value={formData.other_field}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Processing..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteGitHubSignup;
