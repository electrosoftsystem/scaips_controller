import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Calendar, Shield, Edit, Key } from "lucide-react";

export const AdminProfile = ({ isDark }) => {
  const [admin, setAdmin] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "", role: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, { withCredentials: true })
      .then((res) => {
        setAdmin(res.data);
        setEditData({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role || "",
        });
      })
      .catch((err) => console.log("Error loading admin:", err));
  }, []);

  if (!admin) return <p className={isDark ? "text-white" : "text-black"}>Loading...</p>;

  const handleEditSubmit = () => {
    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/admin/profile`, editData, { withCredentials: true })
      .then((res) => {
        setAdmin(res.data);
        setIsEditOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordSubmit = () => {
    axios
      .put(`${import.meta.env.VITE_API_BASE_URL}/admin/change-password`, passwordData, { withCredentials: true })
      .then(() => setIsPasswordOpen(false))
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Admin Profile
      </h2>

      {/* Profile Card */}
      <div className={`p-6 rounded-2xl shadow-lg border ${isDark ? "bg-slate-800" : "bg-white"}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white">
            {admin.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold">{admin.name}</h3>
            <span className="inline-block mt-1 px-2 py-0.5 bg-purple-500/20 text-purple-600 text-xs rounded-full font-medium">
              {admin.role}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className={`flex items-start gap-2 p-2 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
            <Mail size={16} className="text-blue-500 mt-0.5" />
            <div>
              <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Email</span>
              <span className="font-medium">{admin.email}</span>
            </div>
          </div>

          <div className={`flex items-start gap-2 p-2 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
            <Calendar size={16} className="text-orange-500 mt-0.5" />
            <div>
              <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Joined</span>
              <span className="font-medium">{new Date(admin.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={`flex items-start gap-2 p-2 ${isDark ? "bg-slate-700/50" : "bg-gray-50"} rounded-lg`}>
            <Shield size={16} className="text-purple-500 mt-0.5" />
            <div>
              <span className={`${isDark ? "text-slate-400" : "text-gray-600"} text-xs block`}>Last Updated</span>
              <span className="font-medium">{new Date(admin.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button onClick={() => setIsEditOpen(true)} className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-semibold">
            <Edit size={16} /> Edit
          </button>
          <button onClick={() => setIsPasswordOpen(true)} className={`flex items-center gap-1 border px-3 py-2 rounded-lg text-sm font-semibold ${isDark ? "border-slate-700 text-white" : "border-gray-200 text-black"}`}>
            <Key size={16} /> Change Password
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-4 rounded-xl w-80 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
            <input type="text" className="w-full mb-2 p-2 border rounded" placeholder="Name" value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            <input type="email" className="w-full mb-2 p-2 border rounded" placeholder="Email" value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
            <input type="text" className="w-full mb-4 p-2 border rounded" placeholder="Role" value={editData.role} onChange={(e) => setEditData({ ...editData, role: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditOpen(false)} className="px-3 py-1 rounded border text-sm">Cancel</button>
              <button onClick={handleEditSubmit} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`p-4 rounded-xl w-80 ${isDark ? "bg-slate-800" : "bg-white"}`}>
            <h3 className="text-lg font-semibold mb-2">Change Password</h3>
            <input type="password" className="w-full mb-2 p-2 border rounded" placeholder="Old Password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} />
            <input type="password" className="w-full mb-4 p-2 border rounded" placeholder="New Password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsPasswordOpen(false)} className="px-3 py-1 rounded border text-sm">Cancel</button>
              <button onClick={handlePasswordSubmit} className="px-3 py-1 rounded bg-blue-600 text-white text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
