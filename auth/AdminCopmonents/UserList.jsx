import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";

export const UserList = ({ navigateTo, isDark }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/students`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Students
      </h2>

      <div
        className={`${
          isDark
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-gray-200"
        } p-4 lg:p-6 rounded-2xl shadow-lg border`}
      >
        <div className="space-y-3 lg:space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className={`${
                isDark
                  ? "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                  : "bg-gray-50 border-gray-200 hover:border-gray-300"
              } p-3 lg:p-4 rounded-xl flex items-center justify-between gap-4 border transition-all`}
            >
              <div className="flex items-center gap-3 lg:gap-4 min-w-0">
                {/* Profile Picture */}
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.firstName}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg lg:text-xl font-bold text-white flex-shrink-0">
                    {user.firstName ? user.firstName.charAt(0) : "U"}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm lg:text-base truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs truncate`}>
                    {user.email}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${
                      user.isActive
                        ? "bg-green-500/20 text-green-600"
                        : "bg-red-500/20 text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => navigateTo("user-details", user.id)}
                className="px-3 py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg flex items-center gap-2 text-sm lg:text-base shadow hover:from-blue-500 hover:to-blue-600 transition"
              >
                <Eye size={16} /> View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
