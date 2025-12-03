import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../services/apiService";
import { ChevronDown } from "lucide-react";
import UsernameField from "../../components/student/CheckUserNameExist";

export default function CompleteGoogleSignup() {
  const [formData, setFormData] = useState({
    role: "student",
    username: "",
    contact_no: "",
    interested_field: "",
    other_field: "",
    // College fields
    college_name: "",
    college_address: "",
    establishment_year: "",
    website: "",
    campus_area: "",
    nirf_rank: "",
    accreditation: "",
    total_students: "",
    total_faculty: "",
    description: "",
    // Industry fields
    company_name: "",
    industry_type: "",
    company_size: "",
    designation: "",
    // Startup fields
    startup_name: "",
    startup_stage: "",
    funding_status: "",
    team_size: "",
  });
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [googleUser, setGoogleUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { registerWithGoogle, registerCollegeWithGoogle } = useAuth();

  useEffect(() => {
    // Get Google user data from navigation state or localStorage
    if (location.state?.googleUser) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log(
          "🔍 Google user data from location.state:",
          location.state.googleUser
        );
      }
      setGoogleUser(location.state.googleUser);
      // Try to get from localStorage as fallback
      const storedGoogleUser = localStorage.getItem("googleUser");
      if (storedGoogleUser) {
        try {
          const parsedUser = JSON.parse(storedGoogleUser);
          if (import.meta.env.NODE_ENV !== "production") {
            console.log("🔍 Google user data from localStorage:", parsedUser);
          }
          setGoogleUser(parsedUser);
        } catch (error) {
          if (import.meta.env.NODE_ENV !== "production") {
            console.error("❌ Failed to parse stored Google user data:", error);
          }
          navigate("/auth/signup");
        }
      } else {
        // Redirect to signup if no Google user data found
        if (import.meta.env.NODE_ENV !== "production") {
          console.log("❌ No Google user data found, redirecting to signup");
        }
        navigate("/auth/signup");
      }
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.role) {
      setError("Please select a role");
      return;
    }

    // Role-specific validation
    if (formData.role === "student") {
      if (!formData.college_name.trim()) {
        setError("Student college name is required");
        return;
      }

      if (
        formData.interested_field === "Other" &&
        !formData.other_field.trim()
      ) {
        setError("Please specify the other field of interest");
        return;
      }
    } else if (formData.role === "college") {
      if (!formData.college_name.trim()) {
        setError("College name is required");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");
      let registrationData = {
        ...googleUser, // Keep all Google user data (id, googleId, email, etc.)
        role: formData.role,
      };

      // console.log("🔍 Initial registration data:", registrationData);

      // Add role-specific fields to the registration data
      if (formData.role === "student") {
        registrationData = {
          ...registrationData,
          contact_no: formData.contact_no,
          username: formData.username,
          student_college_name: formData.college_name,
          interested_field: formData.interested_field,
          other_field:
            formData.interested_field === "Other"
              ? formData.other_field
              : undefined,
        };
      }

      let result;
      if (formData.role === "college") {
        // Use college-specific registration
        result = await registerCollegeWithGoogle(registrationData);
      } else {
        // Use general registration for other roles - pass data as-is since apiService will restructure it
        result = await registerWithGoogle(registrationData);
      }

      if (result.success) {
        const rolePage = apiService.getRoleHomePage(result.user.role);
        navigate(rolePage);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!googleUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen  from-[#EEF5F9] to-[#F8FAFC] py-12 px-4 flex items-center justify-end">
      <div className="hidden md:flex flex-1 items-center justify-center mr-20 bg-gray-50 min-w-0">
        <img
          src="/newlogo-removebg-preview.png"
          alt="Logo"
          className="max-w-96 w-11/12 h-auto block"
        />
      </div>
      <div className="max-w-xl w-full relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-16 w-40 h-40 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative z-10">
          {/* Header Section - Redesigned */}
          <div className="bg-gradient-to-r from-[#4B91C5] via-[#5A94B5] to-[#6EA9C8] px-4 py-2">
            <h2 className="text-3xl font-bold text-white text-center mb-3">
              Complete Your Profile
            </h2>
            <p className="text-blue-100 text-center flex items-center justify-center gap-1">
              <span>Welcome</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md font-medium text-white backdrop-blur-sm">
                {googleUser.firstName}
              </span>
              <span>! Let's set up your account</span>
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-red-700 font-medium">{error}</span>
                  </div>
                </div>
              )}

              {/* Student-specific fields - Enhanced & Stylish */}
              {formData.role === "student" && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#4B91C5]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Student Information
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
                      <div className="group">
                        <label
                          htmlFor="contact_no"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Contact Number
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <input
                              type="tel"
                              id="contact_no"
                              name="contact_no"
                              placeholder="Enter your contact number"
                              value={formData.contact_no}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Allow only numbers
                                if (/^\d{0,10}$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-[#4B91C5] focus:border-[#4B91C5] transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-blue-300 ${
                                formData.contact_no &&
                                !/^[6-9]\d{9}$/.test(formData.contact_no)
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                          </div>
                        </div>
                        {/* Validation message */}
                        {formData.contact_no &&
                          !/^[6-9]\d{9}$/.test(formData.contact_no) && (
                            <p className="mt-2 text-sm text-red-600">
                              Please enter a valid 10-digit mobile number
                              starting with 6–9.
                            </p>
                          )}
                      </div>

                      <UsernameField
                        googleUser={googleUser}
                        formData={formData}
                        handleChange={handleChange}
                        setStatus={setStatus}
                      />

                      <div className="group">
                        <label
                          htmlFor="college_name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          College Name <span className="text-red-500">*</span>
                        </label>

                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>

                          <div className="relative">
                            <input
                              type="text"
                              id="college_name"
                              name="college_name"
                              placeholder="e.g. G H Raisoni College, Nagpur"
                              value={formData.college_name}
                              onChange={(e) => {
                                const value = e.target.value;

                                // Allow only letters, spaces, commas, periods, and hyphens
                                if (/^[a-zA-Z\s.,'-]*$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              className={`w-full px-5 py-4 border rounded-lg focus:ring-2 focus:ring-[#4B91C5] focus:border-[#4B91C5] transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm ${
                                !formData.college_name
                                  ? "border-gray-300"
                                  : /^[A-Za-z\s.'-]+,\s*[A-Za-z\s.'-]+$/.test(
                                      formData.college_name
                                    )
                                  ? "border-green-400"
                                  : "border-red-500"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Validation message */}
                        {formData.college_name &&
                          !/^[A-Za-z\s.'-]+,\s*[A-Za-z\s.'-]+$/.test(
                            formData.college_name
                          ) && (
                            <p className="mt-2 text-sm text-red-600">
                              Please enter in format:{" "}
                              <strong>College Name, City</strong>
                            </p>
                          )}
                      </div>
                    </div>

                    {/* Field of Interest - Stylish Dropdown */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Field of Interest
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          {
                            value: "Technology",
                            // icon: "💻",
                            label: "Technology",
                          },
                          {
                            value: "Business",
                            // icon: "💼",
                            label: "Business",
                          },
                          {
                            value: "Healthcare",
                            // icon: "🏥",
                            label: "Healthcare",
                          },
                          {
                            value: "Education",
                            // icon: "📚",
                            label: "Education",
                          },
                          {
                            value: "Engineering",
                            // icon: "⚙️",
                            label: "Engineering",
                          },
                          {
                            value: "Other",
                            // icon: "🔍",
                            label: "Other",
                          },
                        ].map((field) => (
                          <div
                            key={field.value}
                            onClick={() =>
                              handleChange({
                                target: {
                                  name: "interested_field",
                                  value: field.value,
                                },
                              })
                            }
                            className={`relative cursor-pointer rounded-full border p-2  transition-all duration-200 hover:shadow-md ${
                              formData.interested_field === field.value
                                ? "border-[#4B91C5] bg-blue-50 shadow-md"
                                : "border-gray-200 bg-white hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center justify-center">
                              <span className="text-lg">{field.icon}</span>
                              <span
                                className={`text-sm font-medium ${
                                  formData.interested_field === field.value
                                    ? "text-[#4B91C5]"
                                    : "text-gray-700"
                                }`}
                              >
                                {field.label}
                              </span>
                            </div>
                            {formData.interested_field === field.value && (
                              <div className="absolute top-2 right-2">
                                <div className="w-5 h-5 bg-[#4B91C5] rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Other Field - Conditional */}
                    {formData.interested_field === "Other" && (
                      <div className="group">
                        <label
                          htmlFor="other_field"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Specify Other Field{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <input
                              type="text"
                              id="other_field"
                              name="other_field"
                              placeholder="Please specify your field of interest"
                              value={formData.other_field}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B91C5] focus:border-[#4B91C5] transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-blue-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* College-specific fields - Enhanced & Stylish */}
              {formData.role === "college" && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      College Information
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* College Name - Stylish Input */}
                      <div className="group">
                        <label
                          htmlFor="college_name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          College Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <input
                              type="text"
                              id="college_name"
                              name="college_name"
                              placeholder="Enter college name"
                              value={formData.college_name}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-green-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* College Address - Stylish Textarea */}
                    <div className="group">
                      <label
                        htmlFor="college_address"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        College Address
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <textarea
                            id="college_address"
                            name="college_address"
                            placeholder="Enter complete college address"
                            value={formData.college_address}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-green-300 resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Website - Stylish Input */}
                    <div className="group">
                      <label
                        htmlFor="website"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        College Website
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <input
                            type="url"
                            id="website"
                            name="website"
                            placeholder="https://www.college.edu"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-green-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Industry-specific fields - Enhanced & Stylish */}
              {formData.role === "industry" && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H7a1 1 0 00-1 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Industry Information
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Company Name - Stylish Input */}
                      <div className="group">
                        <label
                          htmlFor="company_name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Company Name
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <input
                              type="text"
                              id="company_name"
                              name="company_name"
                              placeholder="Enter company name"
                              value={formData.company_name}
                              onChange={handleChange}
                              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-purple-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Industry Type - Stylish Dropdown */}
                    <div className="group">
                      <label
                        htmlFor="industry_type"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Industry Type
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <select
                            id="industry_type"
                            name="industry_type"
                            value={formData.industry_type}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white text-gray-800 shadow-sm appearance-none hover:border-purple-300"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23884DFF' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                              backgroundSize: "1.5em 1.5em",
                              paddingRight: "3rem",
                            }}
                          >
                            <option value="">Select Industry Type</option>
                            <option value="Technology">💻 Technology</option>
                            <option value="Healthcare">🏥 Healthcare</option>
                            <option value="Finance">💰 Finance</option>
                            <option value="Manufacturing">
                              🏭 Manufacturing
                            </option>
                            <option value="Education">📚 Education</option>
                            <option value="Other">🎯 Other</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Company Size - Stylish Input */}
                    <div className="group">
                      <label
                        htmlFor="company_size"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Company Size
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-50 via-purple-100 to-purple-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <select
                            id="company_size"
                            name="company_size"
                            value={formData.company_size}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white text-gray-800 shadow-sm appearance-none hover:border-purple-300"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23884DFF' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                              backgroundSize: "1.5em 1.5em",
                              paddingRight: "3rem",
                            }}
                          >
                            <option value="">Select Company Size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="501-1000">501-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Startup-specific fields - Enhanced & Stylish */}
              {formData.role === "startup" && (
                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm transition-all">
                  <div className="flex items-center mb-5">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-orange-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Startup Information
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Startup Name - Stylish Input */}
                      <div className="group">
                        <label
                          htmlFor="startup_name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Startup Name
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <input
                              type="text"
                              id="startup_name"
                              name="startup_name"
                              placeholder="Enter startup name"
                              value={formData.startup_name}
                              onChange={handleChange}
                              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm hover:border-orange-300"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Startup Stage - Stylish Dropdown */}
                      <div className="group">
                        <label
                          htmlFor="startup_stage"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Startup Stage
                        </label>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                          <div className="relative">
                            <select
                              id="startup_stage"
                              name="startup_stage"
                              value={formData.startup_stage}
                              onChange={handleChange}
                              className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white text-gray-800 shadow-sm appearance-none hover:border-orange-300"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F97316' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5em 1.5em",
                                paddingRight: "3rem",
                              }}
                            >
                              <option value="">Select Stage</option>
                              <option value="Idea">💡 Idea</option>
                              <option value="MVP">🛠️ MVP</option>
                              <option value="Growth">📈 Growth</option>
                              <option value="Scale">🎯 Scale</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Funding Status - Stylish Dropdown */}
                    <div className="group">
                      <label
                        htmlFor="funding_status"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Funding Status
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <select
                            id="funding_status"
                            name="funding_status"
                            value={formData.funding_status}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white text-gray-800 shadow-sm appearance-none hover:border-orange-300"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F97316' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                              backgroundSize: "1.5em 1.5em",
                              paddingRight: "3rem",
                            }}
                          >
                            <option value="">Select Funding Status</option>
                            <option value="Bootstrapped">
                              💪 Bootstrapped
                            </option>
                            <option value="Seed">🌱 Seed</option>
                            <option value="Series A">🔥 Series A</option>
                            <option value="Series B+">💎 Series B+</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Team Size - Stylish Input */}
                    <div className="group">
                      <label
                        htmlFor="team_size"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Team Size
                      </label>
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 rounded-lg opacity-0 group-hover:opacity-100 transition duration-200 blur"></div>
                        <div className="relative">
                          <select
                            id="team_size"
                            name="team_size"
                            value={formData.team_size}
                            onChange={handleChange}
                            className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors bg-white text-gray-800 shadow-sm appearance-none hover:border-orange-300"
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23F97316' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 1rem center",
                              backgroundSize: "1.5em 1.5em",
                              paddingRight: "3rem",
                            }}
                          >
                            <option value="">Select Team Size</option>
                            <option value="1-5">1-5 members</option>
                            <option value="6-10">6-10 members</option>
                            <option value="11-25">11-25 members</option>
                            <option value="26-50">26-50 members</option>
                            <option value="50+">50+ members</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button - Enhanced & Stylish */}
              {/* Submit Button - Enhanced & Stylish */}
              <div className="pt-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-70 group-hover:opacity-100 transition duration-200 blur"></div>
                  <div className="relative">
                    <button
                      type="submit"
                      className={`w-full bg-gradient-to-r from-[#4B91C5] to-[#6EA9C8] text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 ${
                        isLoading
                          ? "opacity-70 cursor-not-allowed"
                          : "transform hover:translate-y-[-2px]"
                      }`}
                      disabled={isLoading || !status}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span>Complete Registration</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-center text-sm text-gray-500">
                  By completing registration, you agree to our
                  <a
                    href="#"
                    className="text-[#4B91C5] hover:text-blue-700 font-medium"
                  >
                    {" "}
                    Terms of Service{" "}
                  </a>
                  and
                  <a
                    href="#"
                    className="text-[#4B91C5] hover:text-blue-700 font-medium"
                  >
                    {" "}
                    Privacy Policy
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
