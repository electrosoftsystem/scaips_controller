import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import apiService from "../../../services/apiService";

const GitHubAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    const handleGitHubCallback = async () => {
      try {
        const token = searchParams.get("token");
        const encodedUserData = searchParams.get("userData");

        if (!token) {
          setError("Authentication failed. No token received.");
          setIsLoading(false);
          return;
        }

        console.log("GitHub token received:", token.substring(0, 10) + "...");

        // Store token
        localStorage.setItem("authToken", token);

        // Try to decode user data from URL if available
        if (encodedUserData) {
          try {
            const userData = JSON.parse(atob(encodedUserData));
            console.log("User data decoded from URL:", userData);

            // Store user data in localStorage
            localStorage.setItem("userData", JSON.stringify(userData));

            // Get appropriate redirect page based on user role
            const rolePage = apiService.getRoleHomePage(userData.role);

            // Redirect to user's dashboard
            navigate(rolePage, { replace: true });
            return;
          } catch (decodeError) {
            console.error("Error decoding user data:", decodeError);
            // Fall back to fetching user data
          }
        }

        // If no user data in URL or decoding failed, fetch user data using the token
        try {
          console.log("Fetching user data with token...");
          const response = await apiService.getCurrentUser();

          if (response.success && response.data && response.data.user) {
            console.log("User data received from API:", response.data.user);
            // Store user data in localStorage
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.user)
            );

            // Get appropriate redirect page based on user role
            const rolePage = apiService.getRoleHomePage(
              response.data.user.role
            );

            // Redirect to user's dashboard
            navigate(rolePage, { replace: true });
          } else {
            throw new Error("Failed to get user data");
          }
        } catch (userDataError) {
          console.error("Error fetching user data:", userDataError);
          setError("Failed to get user data. Please try again.");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("GitHub auth callback error:", error);
        setError("Authentication failed. Please try again.");
        setIsLoading(false);
      }
    };

    handleGitHubCallback();
  }, [searchParams, navigate, checkAuthStatus]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-600 text-xl mb-4">Authentication Error</div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          GitHub Authentication Successful
        </h2>
        <p className="text-gray-600">
          You are being redirected to your dashboard...
        </p>
      </div>
    </div>
  );
};

export default GitHubAuthSuccess;
