import React, { useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useAuth } from "../contexts/AuthContext";

const GoogleAuthTest = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { user, isAuthenticated } = useAuth();

  const handleSuccess = (result) => {
    setMessage(`Success! User: ${JSON.stringify(result, null, 2)}`);
    setError("");
  };

  const handleError = (errorMsg) => {
    setError(`Error: ${errorMsg}`);
    setMessage("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Google Authentication Test</h1>

      {isAuthenticated ? (
        <div className="mb-4 p-4 bg-green-100 rounded">
          <h2 className="text-lg font-semibold">Currently Logged In</h2>
          <p>Name: {user.name || `${user.first_name} ${user.last_name}`}</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-12 h-12 rounded-full mt-2"
            />
          )}
        </div>
      ) : (
        <div className="mb-4 p-4 bg-yellow-100 rounded">
          <p>Not logged in. Try signing in with Google below.</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Continue with Google</h3>
          <GoogleSignInButton
            isSignUp={false}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Sign Up with Google</h3>
          <GoogleSignInButton
            isSignUp={true}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>

      {message && (
        <div className="mt-4 p-4 bg-blue-100 rounded">
          <h3 className="font-semibold">Success Message:</h3>
          <pre className="text-sm overflow-x-auto">{message}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded">
          <h3 className="font-semibold">Error Message:</h3>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Debug Info:</h3>
        <p>
          Google Client ID:
          120148362755-dmisbc1usk06heg33nan4cklovcreqm6.apps.googleusercontent.com
        </p>
        <p>Current URL: {window.location.href}</p>
        <p>Google Script Loaded: {window.google ? "Yes" : "No"}</p>
      </div>
    </div>
  );
};

export default GoogleAuthTest;
