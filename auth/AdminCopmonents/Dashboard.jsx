import React, { useEffect, useState } from "react";
import { Users, Bell, Shield } from "lucide-react";
import axios from "axios";

export const Dashboard = ({ navigateTo, isDark }) => {
  const [counts, setCounts] = useState({ users: 0, notify: "∞", admins: 0 });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/admin/dashboard-counts`, { withCredentials: true })
      .then((res) => setCounts(res.data))
      .catch((err) => console.error("Error fetching counts:", err));
  }, []);

  const items = [
    { title: "Users", icon: <Users size={24} />, page: "users", count: counts.users, gradient: "from-blue-500 to-cyan-500" },
    { title: "Notify All", icon: <Bell size={24} />, page: "notify-all", count: counts.notify, gradient: "from-purple-500 to-pink-500" },
    { title: "Admin Profile", icon: <Shield size={24} />, page: "admin-profile", count: counts.admins, gradient: "from-green-500 to-emerald-500" },
  ];

  return (
    <div>
      
       <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Dashboard Overview
      </h2>
       
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            onClick={() => navigateTo(item.page)}
            className={`${
              isDark
                ? "bg-slate-800 border-slate-700 hover:border-slate-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            } p-4 rounded-xl shadow cursor-pointer border flex items-center justify-between gap-3 transition-all hover:scale-105`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}>
                {item.icon}
              </div>
              <div>
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <span className="text-lg font-bold">{item.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
