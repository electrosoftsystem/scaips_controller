import React, { useState } from "react";
import axios from "axios";

function UsernameField({ formData, handleChange, setStatus, googleUser }) {
  const [checkMessage, setCheckMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Local validation
  const validateUsername = (username) => {
    if (!username.trim()) return "Username is required";
    if (username.length < 3)
      return "Username must be at least 3 characters long";
    const regex = /^[a-zA-Z0-9._]+$/;
    if (!regex.test(username))
      return "Only letters, numbers, dots, and underscores are allowed";
    return "";
  };

  const checkUsername = async () => {
    const error = validateUsername(formData.username);
    if (error) {
      setValidationError(error);
      setCheckMessage("");
      setStatus(false);
      return;
    }

    setValidationError("");
    setLoading(true);
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/students/check-username?username=${formData.username}`
      );

      if (res.data.available) {
        setCheckMessage("✅ Username is available");
        setSuggestions([]);
        setStatus(true);
      } else {
        setCheckMessage("❌ Username already taken");
        setStatus(false);
        generateSuggestions(formData.username);
      }
    } catch (err) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error(err);
      }
      setCheckMessage("Error checking username");
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate smart suggestions
  const generateSuggestions = async (baseName) => {
    const name = googleUser?.firstName?.toLowerCase() || baseName.toLowerCase();
    const possible = [
      `${name}123`,
      `${name}_01`,
      `${name}.${Math.floor(Math.random() * 100)}`,
      `${name}_${new Date().getFullYear()}`,
      `${name}${Math.floor(Math.random() * 1000)}`,
    ];

    const checked = [];

    for (const username of possible) {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/students/check-username?username=${username}`
        );
        if (res.data.available) checked.push(username);
      } catch (err) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Error checking suggestion:", err);
        }
      }
    }

    setSuggestions(checked.slice(0, 3)); // show max 3 suggestions
  };

  return (
    <div className="group">
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        User Name
      </label>

      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) => {
              handleChange(e);
              const error = validateUsername(e.target.value);
              setValidationError(error);
              setCheckMessage("");
              setSuggestions([]);
            }}
            className={`w-full px-5 py-4 border rounded-lg focus:ring-2 transition-all bg-white text-gray-800 placeholder-gray-400 shadow-sm ${
              validationError
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-[#4B91C5] focus:border-[#4B91C5]"
            }`}
          />
        </div>

        <button
          type="button"
          onClick={checkUsername}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {/* Validation Error */}
      {validationError && (
        <p className="mt-2 text-sm font-medium text-red-600">
          {validationError}
        </p>
      )}

      {/* Backend Check Message */}
      {!validationError && checkMessage && (
        <p className="mt-2 text-sm font-medium">
          {checkMessage.includes("✅") ? (
            <span className="text-green-600">{checkMessage}</span>
          ) : (
            <span className="text-red-600">{checkMessage}</span>
          )}
        </p>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 mb-1">Try these:</p>
          <div className="flex gap-2 flex-wrap">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "username", value: s } })
                }
                className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-blue-100 border border-gray-300 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UsernameField;
