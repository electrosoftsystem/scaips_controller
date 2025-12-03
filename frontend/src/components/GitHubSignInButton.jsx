import React, { useState } from "react";
import apiService from "../services/apiService";
import githubAuthService from "../utils/githubAuth";
import { useAuth } from "../contexts/AuthContext";

export default function GitHubSignInButton({ isSignUp, onSuccess, onError }) {
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithGitHub, registerWithGitHub } = useAuth();

  const handleGitHubSignIn = async () => {
    setIsLoading(true);
    try {
      // Log auth attempt for debugging
      console.log(`Attempting GitHub ${isSignUp ? "signup" : "login"}...`);

      // Check if localStorage is working
      try {
        localStorage.setItem("github_test", "test");
        localStorage.removeItem("github_test");
        console.log("localStorage is working properly");
      } catch (storageError) {
        console.error("localStorage error:", storageError);
        onError(
          "Browser storage is not available. Please enable cookies and try again."
        );
        setIsLoading(false);
        return;
      }

      // Initiate GitHub OAuth flow
      githubAuthService.initiateGitHubAuth();
      // The rest of the authentication will be handled on callback
    } catch (error) {
      setIsLoading(false);
      const errorMessage = `GitHub authentication failed: ${
        error.message || "Unknown error"
      }`;
      console.error(errorMessage, error);
      onError(errorMessage);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGitHubSignIn}
      disabled={isLoading}
      className="social-login-button github-button"
      style={{
        backgroundColor: "#24292e",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
        fontWeight: "500",
        width: "100%",
        marginTop: "10px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        style={{ marginRight: "10px" }}
      >
        <path
          fill="white"
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
      {isLoading
        ? "Processing..."
        : isSignUp
        ? "Sign up with GitHub"
        : "Sign in with GitHub"}
    </button>
  );
}
