import React, { useState } from "react";
import axios from "axios";

export default function UsernameCheck({ editData, handleInputChange, setIsUsernameAvailable }) {
  const [checkMessage, setCheckMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const generateSuggestions = (username) => {
    // Example: Add random numbers or variants
    const randomNum = Math.floor(Math.random() * 1000);
    setSuggestions([
      `${username}${randomNum}`,
      `${username}_official`,
      `${username}_01`,
    ]);
  };

 const handleCheckUsername = async () => {
  if (!editData.username) {
    setCheckMessage("⚠️ Please enter a username first.");
    return;
  }

  setLoading(true);
  setCheckMessage("Checking availability...");
  setIsUsernameAvailable(false); // Disable Save during check

  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/students/check-username?username=${editData.username}`
    );

    if (res.data.available) {
      setCheckMessage("✅ Username is available");
      setStatus(true);
      setIsUsernameAvailable(true);   // Enable save
      setSuggestions([]);
    } else {
      setCheckMessage("❌ Username already taken");
      setStatus(false);
      setIsUsernameAvailable(false);  // Keep disabled
      generateSuggestions(editData.username);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Username *
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={editData.username || ""}
         onChange={(e) => {
  handleInputChange("username", e.target.value);
  setIsUsernameAvailable(null);  // force re-check
}}

          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Enter your username"
        />
        <button
          type="button"
          onClick={handleCheckUsername}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {checkMessage && (
        <p
          className={`mt-2 text-sm ${
            status ? "text-green-600" : "text-red-600"
          }`}
        >
          {checkMessage}
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600">Try these:</p>
          <ul className="list-disc pl-6 text-sm text-gray-800">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => handleInputChange("username", s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
