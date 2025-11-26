import React, { useEffect, useState } from "react";
import { ArrowLeft, Bell, Mail, Calendar, MapPin, Pencil, Trash, Phone, Building2 } from "lucide-react";
import axios from "axios";

export const UserDetails = ({ navigateTo, userId, isDark }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/students/${userId}`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching student:", err));
  }, [userId]);

  // DELETE USER HANDLER
  const deleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/admin/students/${userId}`,
        { withCredentials: true }
      );

      alert("User deleted successfully!");
      navigateTo("users");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user.");
    }
  };

  if (!user)
    return <p className={isDark ? "text-white" : "text-black"}>Loading...</p>;

  return (
    <div>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigateTo("users")}
        className={`flex items-center gap-2 ${
          isDark ? "text-slate-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
        } mb-4 lg:mb-6 transition-colors text-sm lg:text-base`}
      >
        <ArrowLeft size={20} /> Back to Users
      </button>

      {/* TITLE + EDIT/DELETE BUTTONS */}
      <div className="flex justify-between items-center mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Student Profile
        </h2>

        {/* EDIT + DELETE BUTTONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo("edit-user", userId)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-all text-sm lg:text-base"
          >
            <Pencil size={18} /> Edit
          </button>

          <button
            onClick={deleteUser}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition-all text-sm lg:text-base"
          >
            <Trash size={18} /> Delete
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Student Info */}
        <div
          className={`${
            isDark
              ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
              : "bg-white border-gray-200"
          } p-6 lg:p-8 rounded-2xl shadow-lg border`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            {/* Profile Picture */}
            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.firstName}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl lg:text-3xl font-bold text-white">
                {user.firstName?.charAt(0) || "U"}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="text-xl lg:text-2xl font-bold truncate">
                {user.firstName} {user.lastName}
              </h3>
              <span className="inline-block mt-1 px-3 py-1 bg-green-500/20 text-green-600 text-xs lg:text-sm rounded-full">
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="space-y-3 lg:space-y-4 text-sm lg:text-base">

            {/* Email */}
            <div className={`flex items-start gap-3 p-3 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
              <Mail size={18} className="text-blue-500 mt-0.5" />
              <div>
                <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Email</span>
                <span className="font-medium break-all">{user.email}</span>
              </div>
            </div>

            {/* ⭐ Phone Number Added */}
            {user.contactNo && (
              <div className={`flex items-start gap-3 p-3 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
                <Phone size={18} className="text-green-500 mt-0.5" />
                <div>
                  <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Phone</span>
                  <span className="font-medium">{user.contactNo}</span>
                </div>
              </div>
            )}

            {/* ⭐ College Name Added */}
            {user.collegeName && (
              <div className={`flex items-start gap-3 p-3 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
                <Building2 size={18} className="text-purple-500 mt-0.5" />
                <div>
                  <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>College</span>
                  <span className="font-medium">{user.collegeName}</span>
                </div>
              </div>
            )}

            {/* Joined */}
            <div className={`flex items-start gap-3 p-3 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
              <Calendar size={18} className="text-orange-500 mt-0.5" />
              <div>
                <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Joined</span>
                <span className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Location */}
            {user.location && (
              <div className={`flex items-start gap-3 p-3 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
                <MapPin size={18} className="text-red-500 mt-0.5" />
                <div>
                  <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Location</span>
                  <span className="font-medium">{user.location}</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Notification Section */}
        <div
          className={`${
            isDark
              ? "bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700"
              : "bg-white border-gray-200"
          } p-6 lg:p-8 rounded-2xl shadow-lg border`}
        >
          <h3 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 flex items-center gap-2">
            <Bell size={24} className="text-blue-500" /> Send Notification
          </h3>

          <textarea
            placeholder="Enter your message here..."
            className={`w-full p-3 lg:p-4 rounded-lg ${
              isDark ? "bg-slate-700/50 border-slate-600" : "bg-gray-100 border-gray-300"
            } border outline-none focus:border-blue-500 min-h-[150px] resize-none`}
          />

          <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-500 hover:to-blue-600 text-base lg:text-lg font-semibold shadow-lg transition-all">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};
