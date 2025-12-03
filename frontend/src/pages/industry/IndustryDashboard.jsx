import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function IndustryDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (location.state?.newUser) {
      setShowWelcome(true);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCompleteProfile = () => {
    // Navigate to industry's own profile with their ID
    if (user?.id) {
      navigate(`/industry/profile/${user.id}`);
    } else {
      navigate("/industry/profile");
    }
  };

  const handlePostJobs = () => {
    alert("Job posting feature coming soon!");
  };

  const handleRecruitment = () => {
    alert("Recruitment portal coming soon!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Message */}
        {showWelcome && location.state?.welcomeMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-green-500">✓</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {location.state.welcomeMessage}
                </p>
                <p className="text-sm mt-1">
                  Set up your company profile to connect with top talent.
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setShowWelcome(false)}
                  className="text-green-500 hover:text-green-700"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome,{" "}
            {user?.contactPerson || user?.fullName || "Industry Partner"}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {user?.companyName
              ? `${user.companyName} Dashboard`
              : "Industry Partner Dashboard"}{" "}
            - Recruit Top Talent
          </p>
        </div>

        {/* Profile Completion Card */}
        {user?.profileCompletion < 100 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Complete Your Company Profile
                </h3>
                <p className="text-gray-600 mt-1">
                  {user?.profileCompletion || 0}% complete - Showcase your
                  company to attract the best candidates
                </p>
              </div>
              <button
                onClick={handleCompleteProfile}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Complete Profile
              </button>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${user?.profileCompletion || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Recruitment Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">🎯</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Recruitment Portal
                </h3>
                <p className="text-gray-600">
                  Browse student and alumni profiles
                </p>
              </div>
            </div>
            <button
              onClick={handleRecruitment}
              className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Browse Candidates
            </button>
          </div>

          {/* Job Posting Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <span className="text-green-600 font-semibold">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Postings
                </h3>
                <p className="text-gray-600">Create and manage job openings</p>
              </div>
            </div>
            <button
              onClick={handlePostJobs}
              className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors"
            >
              Post New Job
            </button>
          </div>

          {/* Company Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-md flex items-center justify-center">
                  <span className="text-indigo-600 font-semibold">🏢</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Company Profile
                </h3>
                <p className="text-gray-600">Manage your company information</p>
              </div>
            </div>
            <button
              onClick={handleCompleteProfile}
              className="mt-4 w-full bg-indigo-50 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Company Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Company Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {user?.companyName || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Company Name</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user?.sector || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Sector</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {user?.employeeCount || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {user?.headquarters || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Headquarters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
