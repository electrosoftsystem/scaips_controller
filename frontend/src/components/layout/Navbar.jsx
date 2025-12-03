import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  Bell,
  User,
  Home,
  Users,
  Briefcase,
  PlayCircle,
  LogOut,
  ChevronDown,
  Building,
  GraduationCap,
  Rocket,
  Factory,
} from "lucide-react";

// import apiService from "../../services/apiService";
import { IoIosSearch } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { user, logout } = useAuth();
  // const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Get appropriate icon for user type
  // const getUserTypeIcon = (userType) => {
  //   switch (userType) {
  //     case "student":
  //       return (
  //         <GraduationCap className="w-4 h-4" style={{ color: "#6EA9CB" }} />
  //       );
  //     case "college":
  //       return <Building className="w-4 h-4" style={{ color: "#6EA9CB" }} />;
  //     case "startup":
  //       return <Rocket className="w-4 h-4" style={{ color: "#6EA9CB" }} />;
  //     case "industry":
  //       return <Factory className="w-4 h-4" style={{ color: "#6EA9CB" }} />;
  //     default:
  //       return <User className="w-4 h-4" style={{ color: "#6EA9CB" }} />;
  //   }
  // };
  // console.log("🧑 User from useAuth:", user);

  // Search function
  // const searchUsers = async (query) => {
  //   if (!query.trim()) {
  //     setSearchResults([]);
  //     setShowSearchResults(false);
  //     return;
  //   }

  //   setIsSearching(true);
  //   try {
  //     const response = await apiService.searchUsers(query);
  //     setSearchResults(response.data || []);
  //     setShowSearchResults(true);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //     setSearchResults([]);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

  // Handle search input change with debouncing
  // const handleSearchChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   // Clear previous timeout
  //   if (searchTimeoutRef.current) {
  //     clearTimeout(searchTimeoutRef.current);
  //   }

  //   // Set new timeout for debounced search
  //   searchTimeoutRef.current = setTimeout(() => {
  //     searchUsers(query);
  //   }, 300);
  // };

  // // Handle clicking on search result
  // const handleSearchResultClick = (result) => {
  //   setSearchQuery("");
  //   setShowSearchResults(false);
  //   setSearchResults([]);

  //   // Navigate to user profile based on type
  //   let profileRoute;
  //   switch (result.type) {
  //     case "student":
  //       profileRoute = `/student-profile/${result.id}`;
  //       break;
  //     case "college":
  //       profileRoute = `/profile/college/${result.id}`;
  //       break;
  //     case "startup":
  //       profileRoute = `/profile/startup/${result.id}`;
  //       break;
  //     case "industry":
  //       profileRoute = `/profile/industry/${result.id}`;
  //       break;
  //     default:
  //       profileRoute = `/student-profile/${result.id}`;
  //   }
  //   navigate(profileRoute);
  // };

  // Handle click outside search to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleViewProfile = () => {
    if (user?.id) {
      window.location.href = `/student/portfolio/${user.username}`;
    }
    setShowUserDropdown(false);
  };

  return (
    <nav
      className="border-b sticky top-0 z-50"
      style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left side - Logo */}
          <div className="flex items-center space-x-4">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <img
                src="/titlelogo.png"
                alt="SCAIPS Logo"
                className="w-14 h-14 object-contain"
              />
              <span
                className="ml-1 font-extrabold hidden sm:block text-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, #1A3B5D 0%, #092537 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  letterSpacing: "2px",
                  fontFamily: "'Times New Roman', serif",
                }}
              >
                SCAIPS
              </span>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-lg mx-6 relative" ref={searchRef}>
            {/* Search Icon Positioned Inside Input */}
            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <IoIosSearch className="h-5 w-5 text-gray-400" />
            </div> */}

            {/* <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for connections, jobs, posts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            /> */}

            {/* Search Results Dropdown */}
            {/* {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mx-auto"></div>
                    <span className="mt-2 block">Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <div
                        key={`${result.type}-${result.id}`}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            {result.profilePicture ? (
                              <img
                                src={result.profilePicture}
                                alt={result.name}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#DCE8F2" }}
                              >
                                {getUserTypeIcon(result.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {result.name}
                              </p>
                              <span className="text-xs text-blue-600 capitalize bg-blue-50 px-2 py-1 rounded-full">
                                {result.type}
                              </span>
                            </div>
                            {result.subtitle && (
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {result.subtitle}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No results found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )} */}
          </div>

          {/* Right side - Navigation Icons */}
          <div className="flex items-center space-x-6">
            {/* <div className="flex items-center space-x-4">
              <div>
                <a
                  href="/"
                  className="flex flex-col items-center cursor-pointer group"
                >
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
                </a>
              </div>
              <div>
                <a
                  href="/student/connection"
                  className="flex flex-col items-center cursor-pointer group"
                >
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
                </a>
              </div>
              <div>
                <a
                  href="/student/projects"
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <Briefcase
                    className="w-5 h-5 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  />

                  <span
                    className="text-xs transition-colors"
                    style={{ color: "#6EA9CB" }}
                  >
                    Projects
                  </span>
                </a>
              </div>
              <div>
                <a
                  href="/student/message"
                  className="flex flex-col items-center cursor-pointer group"
                >
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
                </a>
              </div>
              <div>
                <a
                  href="/student/notification"
                  className="flex flex-col items-center cursor-pointer group relative"
                >
                  <div className="absolute -top-1 right-5 w-2 h-2 bg-red-500 rounded-full"></div>

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
                </a>
              </div>
            </div> */}

            <div
              className="border-l pl-4 relative"
              style={{ borderColor: "#B5D3E7" }}
            >
              <div
                className="flex items-center cursor-pointer group"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {/* Profile Picture */}
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture} // ✅ Use URL directly
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#DCE8F2" }}
                  >
                    <User className="w-4 h-4" style={{ color: "#1F2D3D" }} />
                  </div>
                )}
                <span
                  className="ml-2 text-sm transition-colors hidden sm:block"
                  style={{ color: "#6EA9CB" }}
                >
                  {[user?.firstName, user?.lastName]
                    .filter(Boolean) // remove undefined or empty
                    .join(" ") ||"me"}
                </span>
                <ChevronDown
                  className="w-3 h-3 ml-1 transition-transform"
                  style={{
                    color: "#6EA9CB",
                    transform: showUserDropdown
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                />
              </div>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div
                    className="px-4 py-2 border-b border-gray-100 cursor-pointer"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {[user?.firstName, user?.lastName]
                        .filter(Boolean) // remove undefined or empty
                        .join(" ") || "me"}
                    </p>
                    {/* <p className="text-xs text-gray-500">{user?.email}</p> */}
                    <p className="text-xs text-blue-600 capitalize">
                      {user?.role}
                    </p>
                  </div>
                  <button
                    onClick={handleViewProfile}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    View Portfolio
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
