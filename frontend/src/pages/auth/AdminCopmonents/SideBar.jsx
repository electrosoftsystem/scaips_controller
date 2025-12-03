import React from "react";
import { Users, Bell, LayoutDashboard, Shield, Moon, Sun } from "lucide-react";

export const Sidebar = ({ sidebarOpen, isDark, setIsDark, navigateTo }) => (
  <>
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-40 w-64 p-4 flex flex-col gap-4 transform transition-transform duration-300 shadow-lg ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-gray-200"} border-r`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Admin
        </h1>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-100"
        }`}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mt-4">
        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" onClick={() => navigateTo("dashboard")} isDark={isDark} />
        <NavItem icon={<Users size={18} />} label="Users" onClick={() => navigateTo("users")} isDark={isDark} />
        <NavItem icon={<Bell size={18} />} label="Notify All" onClick={() => navigateTo("notify-all")} isDark={isDark} />
        <NavItem icon={<Shield size={18} />} label="Admin Profile" onClick={() => navigateTo("admin-profile")} isDark={isDark} />
      </nav>
    </aside>

    {/* Mobile overlay */}
    {sidebarOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => navigateTo(null)} />}
  </>
);

// NavItem component
const NavItem = ({ icon, label, onClick, isDark }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium transition-colors ${
      isDark ? "hover:bg-slate-700/50" : "hover:bg-gray-100"
    }`}
  >
    {icon} {label}
  </div>
);
