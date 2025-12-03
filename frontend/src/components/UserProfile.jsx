import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import apiService from "../services/apiService";

const UserProfile = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchUserDetails();
      setHasFetched(true);
    }
  }, [hasFetched]);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCurrentUser();
      if (response.success) {
        setUserDetails(response.data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  const displayUser = userDetails || user;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center space-x-6 mb-8">
        {displayUser.imageUrl && (
          <img
            src={displayUser.imageUrl}
            alt={
              displayUser.name ||
              `${displayUser.first_name} ${displayUser.last_name}`
            }
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {displayUser.name ||
              `${displayUser.first_name} ${displayUser.last_name}`}
          </h1>
          <p className="text-lg text-gray-600 capitalize">{displayUser.role}</p>
          <p className="text-gray-500">{displayUser.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Basic Information
          </h2>
          <div className="space-y-3">
            <div>
              <strong className="text-gray-600">Email:</strong>
              <p className="text-gray-800">{displayUser.email}</p>
            </div>
            <div>
              <strong className="text-gray-600">Role:</strong>
              <p className="text-gray-800 capitalize">{displayUser.role}</p>
            </div>
            {displayUser.google_id && (
              <div>
                <strong className="text-gray-600">Google Account:</strong>
                <p className="text-gray-800">✓ Connected</p>
              </div>
            )}
            {displayUser.contact_no && (
              <div>
                <strong className="text-gray-600">Contact:</strong>
                <p className="text-gray-800">{displayUser.contact_no}</p>
              </div>
            )}
          </div>
        </div>

        {/* Role-specific Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {displayUser.role === "student"
              ? "Academic Information"
              : displayUser.role === "college"
              ? "College Information"
              : displayUser.role === "industry"
              ? "Company Information"
              : "Startup Information"}
          </h2>
          <div className="space-y-3">
            {displayUser.role === "student" && (
              <>
                {displayUser.student_college_name && (
                  <div>
                    <strong className="text-gray-600">College:</strong>
                    <p className="text-gray-800">
                      {displayUser.student_college_name}
                    </p>
                  </div>
                )}
                {displayUser.interested_field && (
                  <div>
                    <strong className="text-gray-600">Interested Field:</strong>
                    <p className="text-gray-800">
                      {displayUser.interested_field}
                    </p>
                  </div>
                )}
                {displayUser.other_field && (
                  <div>
                    <strong className="text-gray-600">Other Field:</strong>
                    <p className="text-gray-800">{displayUser.other_field}</p>
                  </div>
                )}
              </>
            )}

            {displayUser.role === "college" && (
              <>
                {displayUser.college_name && (
                  <div>
                    <strong className="text-gray-600">College Name:</strong>
                    <p className="text-gray-800">{displayUser.college_name}</p>
                  </div>
                )}
                {displayUser.college_address && (
                  <div>
                    <strong className="text-gray-600">Address:</strong>
                    <p className="text-gray-800">
                      {displayUser.college_address}
                    </p>
                  </div>
                )}
                {displayUser.establishment_year && (
                  <div>
                    <strong className="text-gray-600">Established:</strong>
                    <p className="text-gray-800">
                      {displayUser.establishment_year}
                    </p>
                  </div>
                )}
                {displayUser.website && (
                  <div>
                    <strong className="text-gray-600">Website:</strong>
                    <p className="text-gray-800">
                      <a
                        href={displayUser.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {displayUser.website}
                      </a>
                    </p>
                  </div>
                )}
              </>
            )}

            {displayUser.role === "industry" && (
              <>
                {displayUser.company_name && (
                  <div>
                    <strong className="text-gray-600">Company:</strong>
                    <p className="text-gray-800">{displayUser.company_name}</p>
                  </div>
                )}
                {displayUser.industry_type && (
                  <div>
                    <strong className="text-gray-600">Industry Type:</strong>
                    <p className="text-gray-800">{displayUser.industry_type}</p>
                  </div>
                )}
                {displayUser.designation && (
                  <div>
                    <strong className="text-gray-600">Designation:</strong>
                    <p className="text-gray-800">{displayUser.designation}</p>
                  </div>
                )}
                {displayUser.company_size && (
                  <div>
                    <strong className="text-gray-600">Company Size:</strong>
                    <p className="text-gray-800">{displayUser.company_size}</p>
                  </div>
                )}
              </>
            )}

            {displayUser.role === "startup" && (
              <>
                {displayUser.startup_name && (
                  <div>
                    <strong className="text-gray-600">Startup Name:</strong>
                    <p className="text-gray-800">{displayUser.startup_name}</p>
                  </div>
                )}
                {displayUser.startup_stage && (
                  <div>
                    <strong className="text-gray-600">Stage:</strong>
                    <p className="text-gray-800">{displayUser.startup_stage}</p>
                  </div>
                )}
                {displayUser.funding_status && (
                  <div>
                    <strong className="text-gray-600">Funding Status:</strong>
                    <p className="text-gray-800">
                      {displayUser.funding_status}
                    </p>
                  </div>
                )}
                {displayUser.team_size && (
                  <div>
                    <strong className="text-gray-600">Team Size:</strong>
                    <p className="text-gray-800">{displayUser.team_size}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      {displayUser.description && (
        <div className="mt-6 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700">{displayUser.description}</p>
        </div>
      )}

      {/* Account Information */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong className="text-gray-600">User ID:</strong>
            <p className="text-gray-800">{displayUser.id}</p>
          </div>
          <div>
            <strong className="text-gray-600">Registration Date:</strong>
            <p className="text-gray-800">
              {displayUser.created_at
                ? new Date(displayUser.created_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <strong className="text-gray-600">Last Updated:</strong>
            <p className="text-gray-800">
              {displayUser.updated_at
                ? new Date(displayUser.updated_at).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
