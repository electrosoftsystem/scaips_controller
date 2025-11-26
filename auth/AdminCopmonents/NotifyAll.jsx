import React, { useState } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

export const NotifyAll = ({ isDark }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setLoading(true);

    axios
      .post("http://localhost:5000/api/admin/notify-all", { message }, { withCredentials: true })
      .then(() => {
        alert("Notification sent to all users ✅");
        setMessage("");
      })
      .catch((err) => console.error("Error sending notification:", err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Notify All Users
      </h2>

      <div className={`${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'} p-6 rounded-2xl shadow-lg border`}>
        <p className={`mb-4 p-3 rounded-lg text-sm ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-blue-50 text-blue-700'}`}>
          This message will be sent to all registered users.
        </p>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Compose your broadcast message..."
          className={`w-full p-3 rounded-lg border outline-none focus:border-purple-500 transition-colors min-h-[150px] resize-none text-sm lg:text-base ${
            isDark ? "bg-slate-700/50 border-slate-600 text-white" : "bg-gray-100 border-gray-300"
          }`}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="w-full mt-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 text-base lg:text-lg font-semibold shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          <Bell size={18} />
          {loading ? "Sending..." : "Send Broadcast"}
        </button>
      </div>
    </div>
  );
};
