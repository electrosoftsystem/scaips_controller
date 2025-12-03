

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
 import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Dashboard } from "./AdminCopmonents/Dashboard";
import { UserList } from "./AdminCopmonents/UserList";
import { UserDetails } from "./AdminCopmonents/UserDetails";

import { AdminProfile } from "./AdminCopmonents/AdminProfile";
import { Sidebar } from "./AdminCopmonents/SideBar";
import { EditUser } from "./AdminCopmonents/EditUser";
import NotifyAll from "../../components/student/NotifyAll";

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
 


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/me`, { withCredentials: true })
      .then((res) => {
        if (res.data.role !== "admin") navigate("/auth/login");
      })
      .catch(() => navigate("/admin")); // redirect if not logged in
  }, []);

  const navigateTo = (page, userId = null) => {
    setCurrentPage(page);
    setSelectedUserId(userId);
    setSidebarOpen(false);
  };

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg border ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-gray-200'}`}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Sidebar sidebarOpen={sidebarOpen} isDark={isDark} setIsDark={setIsDark} navigateTo={navigateTo} />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 mt-16 lg:mt-0 overflow-x-hidden">
        {currentPage === "dashboard" && <Dashboard navigateTo={navigateTo} isDark={isDark} />}
        {currentPage === "users" && <UserList navigateTo={navigateTo} isDark={isDark} />}
        {currentPage === "user-details" && <UserDetails navigateTo={navigateTo} userId={selectedUserId} isDark={isDark} />}
        {currentPage === "edit-user" && (
  <EditUser navigateTo={navigateTo} userId={selectedUserId} isDark={isDark} />
)}

        {currentPage === "notify-all" && <NotifyAll isDark={isDark} />}
        {currentPage === "admin-profile" && <AdminProfile isDark={isDark} />}
    

      </main>
    </div>
  );
}