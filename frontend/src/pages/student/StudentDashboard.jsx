import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome message for new users
    if (location.state?.newUser) {
      setShowWelcome(true);
      // Clear the state to prevent showing welcome on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCompleteProfile = () => {
    navigate("/student/profile");
  };

  const handleViewOpportunities = () => {
    // TODO: Navigate to opportunities page when implemented
    alert("Job opportunities feature coming soon!");
  };

  const handleConnectAlumni = () => {
    // TODO: Navigate to alumni network when implemented
    alert("Alumni network feature coming soon!");
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
                  Let's get started by completing your profile.
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
            Welcome, {user?.fullName || "Student"}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Your student dashboard - Connect, Learn, and Grow
          </p>
        </div>

        {/*Profile Completion Card*/}
        {user?.profileCompletion < 100 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Complete Your Profile
                </h3>
                <p className="text-gray-600 mt-1">
                  {user?.profileCompletion || 0}% complete - Add more details to
                  connect with alumni and opportunities
                </p>
              </div>
              <button
                onClick={handleCompleteProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Complete Profile
              </button>
            </div>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${user?.profileCompletion || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Opportunities Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">💼</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Job Opportunities
                </h3>
                <p className="text-gray-600">
                  Explore internships and job openings
                </p>
              </div>
            </div>
            <button
              onClick={handleViewOpportunities}
              className="mt-4 w-full bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              View Opportunities
            </button>
          </div>

          {/* Alumni Network Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <span className="text-green-600 font-semibold">🤝</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Alumni Network
                </h3>
                <p className="text-gray-600">
                  Connect with alumni in your field
                </p>
              </div>
            </div>
            <button
              onClick={handleConnectAlumni}
              className="mt-4 w-full bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors"
            >
              Connect with Alumni
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">👤</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  My Profile
                </h3>
                <p className="text-gray-600">Manage your academic profile</p>
              </div>
            </div>
            <button
              onClick={handleCompleteProfile}
              className="mt-4 w-full bg-purple-50 text-purple-600 py-2 px-4 rounded-lg hover:bg-purple-100 transition-colors"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Academic Info
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user?.collegeName || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">College</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {user?.course || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Course</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user?.year || "Not Set"}
              </div>
              <div className="text-sm text-gray-600">Year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {user?.skills?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Skills</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
