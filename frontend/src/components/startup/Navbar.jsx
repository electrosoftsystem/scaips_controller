import React from "react";
import {
  Search,
  MessageCircle,
  Bell,
  User,
  Home,
  Users,
  Briefcase,
  PlayCircle,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="border-b sticky top-0 z-50"
      style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img
                src="/newlogo-removebg-preview.png"
                alt="Scaips Logo"
                className="w-14 h-14 object-contain"
              />
              <span
                className="ml-2 font-semibold hidden sm:block"
                style={{ color: "#1F2D3D" }}
              >
                SCAIPS
              </span>
            </div>
          </div>

          {/* Right side - Navigation Icons */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col items-center cursor-pointer group">
                <Home
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Home
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Users
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Network
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <Briefcase
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Jobs
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group">
                <MessageCircle
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Messaging
                </span>
              </div>
              <div className="flex flex-col items-center cursor-pointer group relative">
                <Bell
                  className="w-5 h-5 transition-colors"
                  style={{ color: "#6EA9CB" }}
                />
                <span
                  className="text-xs transition-colors"
                  style={{ color: "#6EA9CB" }}
                >
                  Notifications
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            <div className="border-l pl-4" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex items-center cursor-pointer group">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <User className="w-4 h-4" style={{ color: "#1F2D3D" }} />
                </div>
                <span
                  className="ml-2 text-sm transition-colors hidden sm:block"
                  style={{ color: "#6EA9CB" }}
                >
                  Me
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
