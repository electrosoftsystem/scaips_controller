import React from "react";
import { useAuth } from "../contexts/AuthContext";

const UserInfoExample = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-100 rounded-lg">
        <p>Please log in to see user information</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Information Example</h2>

      {/* Basic Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <strong>Name:</strong>{" "}
            {user.name || `${user.first_name} ${user.last_name}`}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong> {user.role}
          </div>
          {user.imageUrl && (
            <div>
              <strong>Profile Picture:</strong>
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full mt-2"
              />
            </div>
          )}
          {user.google_id && (
            <div>
              <strong>Google Account:</strong> ✓ Connected
            </div>
          )}
        </div>
      </div>

      {/* Role-Specific Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">
          Role-Specific Information
        </h3>

        {user.role === "student" && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Student Information</h4>
            <div className="space-y-2">
              {user.student_college_name && (
                <p>
                  <strong>College:</strong> {user.student_college_name}
                </p>
              )}
              {user.username && (
                <p>
                  <strong>Contact:</strong> {user.username}
                </p>
              )}
              {user.contact_no && (
                <p>
                  <strong>Contact:</strong> {user.contact_no}
                </p>
              )}
              {user.interested_field && (
                <p>
                  <strong>Interested Field:</strong> {user.interested_field}
                </p>
              )}
              {user.other_field && (
                <p>
                  <strong>Other Field:</strong> {user.other_field}
                </p>
              )}
            </div>
          </div>
        )}

        {user.role === "college" && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">College Information</h4>
            <div className="space-y-2">
              {user.college_name && (
                <p>
                  <strong>College Name:</strong> {user.college_name}
                </p>
              )}
              {user.college_address && (
                <p>
                  <strong>Address:</strong> {user.college_address}
                </p>
              )}
              {user.establishment_year && (
                <p>
                  <strong>Established:</strong> {user.establishment_year}
                </p>
              )}
              {user.website && (
                <p>
                  <strong>Website:</strong>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    {user.website}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {user.role === "industry" && (
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Industry Information</h4>
            <div className="space-y-2">
              {user.company_name && (
                <p>
                  <strong>Company:</strong> {user.company_name}
                </p>
              )}
              {user.industry_type && (
                <p>
                  <strong>Industry Type:</strong> {user.industry_type}
                </p>
              )}
              {user.designation && (
                <p>
                  <strong>Designation:</strong> {user.designation}
                </p>
              )}
              {user.company_size && (
                <p>
                  <strong>Company Size:</strong> {user.company_size}
                </p>
              )}
            </div>
          </div>
        )}

        {user.role === "startup" && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Startup Information</h4>
            <div className="space-y-2">
              {user.startup_name && (
                <p>
                  <strong>Startup:</strong> {user.startup_name}
                </p>
              )}
              {user.startup_stage && (
                <p>
                  <strong>Stage:</strong> {user.startup_stage}
                </p>
              )}
              {user.funding_status && (
                <p>
                  <strong>Funding:</strong> {user.funding_status}
                </p>
              )}
              {user.team_size && (
                <p>
                  <strong>Team Size:</strong> {user.team_size}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Code Example */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">
          How to Access This Information
        </h3>
        <pre className="text-sm bg-gray-800 text-white p-3 rounded overflow-x-auto">
          {`// In any React component
import { useAuth } from '../contexts/AuthContext';

const MyComponent = () => {
  const { user } = useAuth();
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      
      {user.role === 'student' && (
        <p>College: {user.student_college_name}</p>
      )}
      
      {user.imageUrl && (
        <img src={user.imageUrl} alt="Profile" />
      )}
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default UserInfoExample;
