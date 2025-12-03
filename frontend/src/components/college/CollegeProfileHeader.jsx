import React, { useState, useEffect } from "react";
import {
  Edit3,
  X,
  MapPin,
  Phone,
  Mail,
  Globe,
  Camera,
  Plus,
  User,
  Bell,
  Users,
  Check,
  UserPlus,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";

import apiService from "../../services/apiService";

const NAV_OPTIONS_DEFAULT = [
  { id: "college-info", name: "College Info" },
  { id: "course-details", name: "Course Details" },
  { id: "course-fees", name: "Course Fees" },
  { id: "review", name: "Review" },
  { id: "admission", name: "Admission" },
  { id: "placement", name: "Placement" },
  { id: "faculty", name: "Faculty" },
  { id: "hostel", name: "Hostel/Campus" },
  { id: "alumni", name: "Alumni" },
  { id: "events", name: "Events" },
  { id: "downloads", name: "Downloads" },
];

const QUICK_STATS_DEFAULT = [
  { label: "Projects", value: "120+" },
  { label: "Departments", value: "30" },
  { label: "Alumni", value: "50,000+" },
  { label: "Rating", value: "4.9" },
];

const CollegeProfileHeader = ({
  profileData,
  onProfileUpdate,
  onNavigationChange,
  customNavigations,
  onCustomNavigationUpdate,
  isOwner = false,
}) => {
  // Profile edit state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isEditing, setIsEditing] = useState(false);

  // Navigation state
  const [activeItem, setActiveItem] = useState("posts");
  const [isNavEditModalOpen, setIsNavEditModalOpen] = useState(false);
  const [isNewNavModalOpen, setIsNewNavModalOpen] = useState(false);
  const [hiddenNavItems, setHiddenNavItems] = useState([]);
  const [newNavData, setNewNavData] = useState({
    name: "",
    contentType: "text",
    content: "",
  });
  const [editingCustomNav, setEditingCustomNav] = useState(null);
  const [isEditingCustomNav, setIsEditingCustomNav] = useState(false);

  // Profile picture and cover photo URLs
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");

  // Ping/Connection state (adapted for colleges)
  const [pingStatus, setPingStatus] = useState("none"); // none, sent, received, accepted
  const [connectionCount, setConnectionCount] = useState(0);
  const [pingRequests, setPingRequests] = useState([]);
  const [isPingRequestsModalOpen, setIsPingRequestsModalOpen] = useState(false);
  const [isLoadingPing, setIsLoadingPing] = useState(false);

  // Connection modal state
  const [connections, setConnections] = useState([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  // Project/Program state (adapted for colleges)
  const [programCount, setProgramCount] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  const [user, setUser] = useState(profileData);

  // Sync with profileData prop changes
  useEffect(() => {
    if (profileData) {
      setUser(profileData);
      console.log(
        "✅ COLLEGE PROFILE HEADER - Updated user from props:",
        profileData
      );
      // Notify parent of any updates
      if (onProfileUpdate) {
        onProfileUpdate(profileData);
      }
    }
  }, [profileData, onProfileUpdate]);

  // Update image URLs when profileData changes
  useEffect(() => {
    if (profileData) {
      const profilePic =
        profileData.logo ||
        profileData.profilePicture ||
        profileData.basicInfo?.profile_picture ||
        profileData.profile_picture ||
        "";
      const coverPic =
        profileData.backgroundUrl ||
        profileData.background ||
        profileData.basicInfo?.background_url ||
        profileData.background_url ||
        "";

      console.log("✅ COLLEGE PROFILE DATA RECEIVED:", profileData);
      console.log("✅ Picked College Logo URL:", profilePic);
      console.log("✅ Picked College Cover URL:", coverPic);

      setProfilePicUrl(profilePic);
      setCoverPicUrl(coverPic);
    }
  }, [profileData]);

  // Listen for custom navigation edit events
  useEffect(() => {
    const handleEditCustomNavigation = (event) => {
      const { customNavItem } = event.detail;
      setEditingCustomNav(customNavItem);
      setNewNavData({
        name: customNavItem.name,
        contentType: customNavItem.contentType,
        content: customNavItem.content,
      });
      setIsEditingCustomNav(true);
    };

    window.addEventListener("editCustomNavigation", handleEditCustomNavigation);

    return () => {
      window.removeEventListener(
        "editCustomNavigation",
        handleEditCustomNavigation
      );
    };
  }, []);

  const navigationItems = [
    {
      id: "posts",
      name: "Posts",
      shortName: "Posts",
    },
    {
      id: "college-info",
      name: "College Info",
      shortName: "Info",
    },
    {
      id: "course-details",
      name: "Course Details",
      shortName: "Courses",
    },
    {
      id: "course-fees",
      name: "Course Fees",
      shortName: "Fees",
    },
    {
      id: "review",
      name: "Review",
      shortName: "Reviews",
    },
    {
      id: "admission",
      name: "Admission",
      shortName: "Admission",
    },
    {
      id: "placement",
      name: "Placement",
      shortName: "Placement",
    },
    {
      id: "faculty",
      name: "Faculty",
      shortName: "Faculty",
    },
    {
      id: "hostel",
      name: "Hostel/Campus",
      shortName: "Campus",
    },
    {
      id: "alumni",
      name: "Alumni",
      shortName: "Alumni",
    },
    {
      id: "events",
      name: "Events",
      shortName: "Events",
    },
    {
      id: "downloads",
      name: "Downloads",
      shortName: "Downloads",
    },
  ];

  // Profile handlers
  const handleEditClick = () => {
    const normalizedData = {
      ...profileData,
      collegeName: profileData.collegeName || profileData.name || "",
      location: profileData.location || profileData.city || "",
      universityAffiliation: profileData.universityAffiliation || "",
      naacRating: profileData.naacRating || "",
    };
    setEditData(normalizedData);
    setIsEditModalOpen(true);
  };

  const handleImageEditClick = () => {
    setIsImageEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      const payload = {
        name: editData.collegeName || editData.name,
        location: editData.location,
        email: editData.email,
        website: editData.website,
        description: editData.description,
        established: editData.established,
        accreditation: editData.accreditation,
        nirfRank: editData.nirfRank,
        totalStudents: editData.totalStudents,
        totalFaculty: editData.totalFaculty,
        universityAffiliation: editData.universityAffiliation,
        naacRating: editData.naacRating,
      };

      await apiService.updateCollegeProfile(payload);

      // Refresh profile data and notify parent
      if (onProfileUpdate) {
        const updatedProfile = await apiService.getCollegeProfile();
        onProfileUpdate(updatedProfile.data || updatedProfile);
      }

      toast.success("College profile updated successfully!");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update college profile:", error);
      toast.error("Failed to update college profile.");
    }
  };

  const handleUploadProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("logoImage", file); // college logo

      const response = await apiService.uploadCollegeLogo(formData);

      // Refresh profile data and notify parent
      if (onProfileUpdate) {
        const updatedProfile = await apiService.getCollegeProfile();
        onProfileUpdate(updatedProfile.data || updatedProfile);
      }

      toast.success("College logo updated");
    } catch (error) {
      console.error("Failed to upload college logo:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleUploadCoverPic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);
      const response = await apiService.uploadCollegeCover(formData);

      // Refresh profile data and notify parent
      if (onProfileUpdate) {
        const updatedProfile = await apiService.getCollegeProfile();
        onProfileUpdate(updatedProfile.data || updatedProfile);
      }

      setCoverPicUrl(response.data.background_url);
      toast.success("College cover picture updated");
    } catch (error) {
      console.error("Failed to upload college cover picture:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleRemoveProfilePic = () => {
    if (onProfileUpdate) {
      onProfileUpdate({ ...profileData, logo: "" });
    }
  };

  const handleRemoveCoverPic = () => {
    if (onProfileUpdate) {
      onProfileUpdate({ ...profileData, background: "" });
    }
  };

  // Ping/Connection functions (adapted for colleges)
  const fetchPingStatus = async () => {
    if (!profileData?.id || isOwner) return;

    try {
      const response = await apiService.checkCollegePingStatus(profileData.id);
      setPingStatus(response.data.status);
    } catch (error) {
      console.error("Failed to fetch college ping status:", error);
    }
  };

  const fetchConnectionCount = async () => {
    try {
      const response = await apiService.getCollegeConnectionCount();
      setConnectionCount(response.data.count);
    } catch (error) {
      console.error("Failed to fetch college connection count:", error);
    }
  };

  const fetchPingRequests = async () => {
    try {
      const response = await apiService.getCollegePingRequests();
      setPingRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch college ping requests:", error);
      toast.error("Failed to load ping requests");
    }
  };

  const handleSendPing = async () => {
    if (!profileData?.id) return;

    setIsLoadingPing(true);
    try {
      await apiService.sendCollegePingRequest(profileData.id);
      setPingStatus("sent");
      toast.success("Ping request sent to college successfully!");
    } catch (error) {
      console.error("Failed to send college ping:", error);
      toast.error(error.message || "Failed to send ping request");
    } finally {
      setIsLoadingPing(false);
    }
  };

  const handleAcceptPing = async (requestId) => {
    try {
      await apiService.acceptCollegePingRequest(requestId);
      await fetchPingRequests();
      await fetchConnectionCount();
      toast.success("Ping request accepted!");
    } catch (error) {
      console.error("Failed to accept college ping:", error);
      toast.error("Failed to accept ping request");
    }
  };

  const handleRejectPing = async (requestId) => {
    try {
      await apiService.rejectCollegePingRequest(requestId);
      await fetchPingRequests();
      toast.success("Ping request rejected");
    } catch (error) {
      console.error("Failed to reject college ping:", error);
      toast.error("Failed to reject ping request");
    }
  };

  const openPingRequestsModal = () => {
    setIsPingRequestsModalOpen(true);
    fetchPingRequests();
  };

  // Connection functions
  const fetchConnections = async () => {
    try {
      const response = await apiService.getCollegeConnections();
      setConnections(response.data || []);
    } catch (error) {
      console.error("Failed to fetch college connections:", error);
      toast.error("Failed to load connections");
      setConnections([]);
    }
  };

  const openConnectionModal = () => {
    setIsConnectionModalOpen(true);
    fetchConnections();
  };

  // Program functions (adapted from student projects)
  const fetchProgramCount = async () => {
    try {
      console.log("🔍 Fetching college program count...");
      const response = await apiService.getCollegePrograms();
      console.log("📊 College program response:", response);

      const count = response.data?.length || 0;
      console.log("📊 College program count:", count);
      setProgramCount(count);
    } catch (error) {
      console.error("❌ Failed to fetch college program count:", error);
      setProgramCount(0);
    }
  };

  const fetchPrograms = async () => {
    try {
      console.log("🔍 Fetching college programs for modal...");
      const response = await apiService.getCollegePrograms();
      console.log("📊 College programs response:", response);

      setPrograms(response.data || []);
    } catch (error) {
      console.error("❌ Failed to fetch college programs:", error);
      toast.error("Failed to load programs");
      setPrograms([]);
    }
  };

  const openProgramModal = () => {
    setIsProgramModalOpen(true);
    fetchPrograms();
  };

  // Refresh program data function (can be called externally)
  const refreshProgramData = async () => {
    await fetchProgramCount();
    if (isProgramModalOpen) {
      await fetchPrograms();
    }
  };

  // Expose refresh function via useEffect and callback
  useEffect(() => {
    if (onProfileUpdate && typeof onProfileUpdate === "function") {
      onProfileUpdate.refreshPrograms = refreshProgramData;
    }
  }, [onProfileUpdate]);

  // Also create a global function that can be called from anywhere
  useEffect(() => {
    window.refreshCollegeProfilePrograms = refreshProgramData;

    return () => {
      delete window.refreshCollegeProfilePrograms;
    };
  }, []);

  // Fetch ping status and connection count when component mounts or profileData changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPingStatus();
      fetchConnectionCount();
      fetchProgramCount();
    }, 500);

    return () => clearTimeout(timer);
  }, [profileData?.id, isOwner]);

  // Refresh program count when component becomes visible (navigation changes)
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProgramCount();
    }, 100);

    return () => clearTimeout(timer);
  }, [activeItem]);

  // Refresh program count when page becomes visible (user switches back to tab)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchProgramCount();
      }
    };

    const handleFocus = () => {
      fetchProgramCount();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  // Navigation handlers
  const handleItemClick = (item) => {
    setActiveItem(item.id);
    onNavigationChange(item.id, item.name);
  };

  const handleCustomNavClick = (customNav) => {
    setActiveItem(customNav.id);
    onNavigationChange(customNav.id, customNav.name, customNav);
  };

  const handleToggleNavItem = (itemId) => {
    setHiddenNavItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleCreateCustomNav = () => {
    if (newNavData.name.trim()) {
      const newNav = {
        id: `custom-${Date.now()}`,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content:
          newNavData.contentType === "text"
            ? { title: newNavData.name, content: newNavData.content }
            : newNavData.content,
      };

      const updatedCustomNavs = [...customNavigations, newNav];
      onCustomNavigationUpdate(updatedCustomNavs);

      setNewNavData({ name: "", contentType: "text", content: "" });
      setIsNewNavModalOpen(false);

      // Switch to the new navigation item
      setActiveItem(newNav.id);
      onNavigationChange(newNav.id, newNav.name, newNav);
    }
  };

  const handleUpdateCustomNav = () => {
    if (editingCustomNav && newNavData.name.trim()) {
      const updatedNav = {
        ...editingCustomNav,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content:
          newNavData.contentType === "text"
            ? { title: newNavData.name, content: newNavData.content }
            : newNavData.content,
      };

      const updatedCustomNavs = customNavigations.map((nav) =>
        nav.id === editingCustomNav.id ? updatedNav : nav
      );
      onCustomNavigationUpdate(updatedCustomNavs);

      setNewNavData({ name: "", contentType: "text", content: "" });
      setEditingCustomNav(null);
      setIsEditingCustomNav(false);

      // Update the active content if it's currently selected
      if (activeItem === editingCustomNav.id) {
        onNavigationChange(updatedNav.id, updatedNav.name, updatedNav);
      }
    }
  };

  const handleDeleteCustomNav = (customNavId) => {
    const updatedCustomNavs = customNavigations.filter(
      (nav) => nav.id !== customNavId
    );
    onCustomNavigationUpdate(updatedCustomNavs);

    // If the deleted nav was active, switch to posts
     if (activeItem === customNavId) {
      setActiveItem("posts");
      onNavigationChange("posts", "Posts");
    }
  };

  const visibleNavigationItems = navigationItems.filter(
    (item) => !hiddenNavItems.includes(item.id)
  );

  return (
    <>
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div
            className="h-44 bg-gradient-to-r from-blue-400 to-indigo-500"
            style={{
              backgroundImage: coverPicUrl ? `url(${coverPicUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Edit Background/Profile Image Button - Top right of background */}
          {isOwner && (
            <button
              onClick={handleImageEditClick}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Edit Background & College Logo"
            >
              <Camera className="w-7 h-7 invert" />
            </button>
          )}
          <input
            type="file"
            id="coverPicInput"
            style={{ display: "none" }}
            onChange={(e) => handleUploadCoverPic(e.target.files[0])}
          />

          {/* College Logo */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src={profilePicUrl || "/college-logo.png"}
                  alt="College Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/college-logo.png";
                  }}
                />
              </div>
            </div>

            <input
              type="file"
              id="profilePicInput"
              style={{ display: "none" }}
              onChange={(e) => handleUploadProfilePic(e.target.files[0])}
            />
          </div>
        </div>

        {/* College Info */}
        <div className="pt-16 px-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            {/* Left Section - College Name and Location */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {editData?.collegeName ||
                  profileData?.collegeName ||
                  profileData?.name ||
                  "College Name"}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 mr-1.5" />
                {editData?.location ||
                  profileData?.location ||
                  profileData?.city ||
                  "Location not specified"}
              </div>
            </div>

            {/* Middle Section - Affiliation and NAAC Rating */}
            <div className="flex flex-col items-center justify-center gap-2 px-4">
              {(editData?.universityAffiliation ||
                profileData?.universityAffiliation) && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    Affiliated to
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {editData?.universityAffiliation ||
                      profileData?.universityAffiliation}
                  </p>
                </div>
              )}
              {(editData?.naacRating || profileData?.naacRating) && (
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    NAAC Grade
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    {editData?.naacRating || profileData?.naacRating}
                  </p>
                </div>
              )}
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {/* Profile Info Edit Button */}
              {isOwner && (
                <button
                  onClick={handleEditClick}
                  className="py-3 px-3 rounded-full bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1.5"
                  title="Edit College Info"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              )}

              {/* Connection Requests Button for Owner */}
              {isOwner && (
                <button
                  onClick={openPingRequestsModal}
                  className="py-2 px-5 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: "#6EA9CB" }}
                >
                  <Bell className="w-4 h-4" />
                  Connection Requests
                  {pingRequests.length > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {pingRequests.length}
                    </span>
                  )}
                </button>
              )}

              {/* Dynamic Ping/Connect Button for non-owners */}
              {!isOwner && (
                <>
                  {pingStatus === "none" && (
                    <button
                      onClick={handleSendPing}
                      disabled={isLoadingPing}
                      className="py-2 px-5 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90 flex items-center gap-2"
                      style={{ backgroundColor: "#6EA9CB" }}
                    >
                      {isLoadingPing ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <UserPlus className="w-4 h-4" />
                      )}
                      {isLoadingPing ? "Sending..." : "Connect"}
                    </button>
                  )}

                  {pingStatus === "sent" && (
                    <button
                      disabled
                      className="py-2 px-5 bg-gray-400 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Request Sent
                    </button>
                  )}

                  {pingStatus === "received" && (
                    <button
                      onClick={openPingRequestsModal}
                      className="py-2 px-5 bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Respond to Request
                    </button>
                  )}

                  {pingStatus === "accepted" && (
                    <button
                      disabled
                      className="py-2 px-5 bg-green-500 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Connected
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div
            className="flex items-center justify-around mt-6 pt-4 border-t"
            style={{ borderColor: "#DCE8F2" }}
          >
            {/* Programs */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={isOwner ? openProgramModal : undefined}
                className={`${
                  isOwner
                    ? "hover:bg-gray-100 cursor-pointer"
                    : "cursor-default"
                } p-2 rounded-lg transition-colors`}
                title={isOwner ? "View college programs" : undefined}
              >
                <span
                  className="block text-2xl font-bold"
                  style={{ color: "#1F2D3D" }}
                >
                  {programCount}
                </span>
                <span
                  className="block text-sm mt-1"
                  style={{ color: "#1F2D3D", opacity: 0.7 }}
                >
                  Programs
                </span>
              </button>
              {isOwner && (
                <button
                  onClick={fetchProgramCount}
                  className="mt-1 p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Refresh program count"
                >
                  <svg
                    className="w-3 h-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Connections */}
            <div className="flex flex-col items-center text-center">
              <button
                onClick={isOwner ? openConnectionModal : undefined}
                className={`${
                  isOwner
                    ? "hover:bg-gray-100 cursor-pointer"
                    : "cursor-default"
                } p-2 rounded-lg transition-colors`}
                title={isOwner ? "View connections" : undefined}
              >
                <span
                  className="block text-2xl font-bold"
                  style={{ color: "#1F2D3D" }}
                >
                  {connectionCount}
                </span>
                <span
                  className="block text-sm mt-1"
                  style={{ color: "#1F2D3D", opacity: 0.7 }}
                >
                  Connections
                </span>
              </button>
            </div>

            {/* Rating */}
            <div className="flex flex-col items-center text-center">
              <span
                className="block text-2xl font-bold"
                style={{ color: "#1F2D3D" }}
              >
                4.9
              </span>
              <span
                className="block text-sm mt-1"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Rating
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items - Horizontal LinkedIn Style */}
        <div
          className="border-b"
          style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
        >
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-1 overflow-x-auto">
              {/* Regular Navigation Items */}
              {visibleNavigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeItem === item.id
                      ? "border border-opacity-50 text-white"
                      : "hover:bg-opacity-70 transition-colors"
                  }`}
                  style={{
                    backgroundColor:
                      activeItem === item.id ? "#6EA9CB" : "transparent",
                    borderColor:
                      activeItem === item.id ? "#B5D3E7" : "transparent",
                    color: activeItem === item.id ? "white" : "#1F2D3D",
                  }}
                  onMouseEnter={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = "#DCE8F2";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeItem !== item.id) {
                      e.target.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {item.shortName}
                </button>
              ))}

              {/* Custom Navigation Items */}
              {customNavigations?.map((customNav) => (
                <div key={customNav.id} className="relative group">
                  <button
                    onClick={() => handleCustomNavClick(customNav)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      activeItem === customNav.id
                        ? "border border-opacity-50 text-white"
                        : "hover:bg-opacity-70 transition-colors"
                    }`}
                    style={{
                      backgroundColor:
                        activeItem === customNav.id ? "#6EA9CB" : "transparent",
                      borderColor:
                        activeItem === customNav.id ? "#B5D3E7" : "transparent",
                      color: activeItem === customNav.id ? "white" : "#1F2D3D",
                    }}
                    onMouseEnter={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = "#DCE8F2";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeItem !== customNav.id) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {customNav.name}
                  </button>

                  {/* Delete button for custom nav (visible on hover) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomNav(customNav.id);
                    }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                    title="Delete custom navigation"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {/* Add Custom Navigation Button */}
              {isOwner && (
                <button
                  onClick={() => setIsNewNavModalOpen(true)}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                  style={{ color: "#1F2D3D" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                  title="Add Custom Section"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}

              {/* Settings Button */}
              {isOwner && (
                <button
                  onClick={() => setIsNavEditModalOpen(true)}
                  className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-70"
                  style={{ color: "#1F2D3D" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                  }}
                  title="Navigation Settings"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Background & College Logo Modal */}
      {isImageEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Images
                </h2>
                <button
                  onClick={() => setIsImageEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Background Image
                </h3>
                <div className="relative">
                  <div
                    className="w-full h-32 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: coverPicUrl
                        ? `url(${coverPicUrl})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  {isOwner && (
                    <button
                      onClick={() =>
                        document.getElementById("coverPicInputModal").click()
                      }
                      className="absolute bottom-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full transition-all duration-200"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  <input
                    type="file"
                    id="coverPicInputModal"
                    style={{ display: "none" }}
                    onChange={(e) => handleUploadCoverPic(e.target.files[0])}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      document.getElementById("coverPicInputModal").click()
                    }
                    className="flex-1 py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Upload New
                  </button>
                  <button
                    onClick={handleRemoveCoverPic}
                    className="flex-1 py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">
                  College Logo
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                      <img
                        src={profilePicUrl || "/college-logo.png"}
                        alt="College Logo"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/college-logo.png";
                        }}
                      />
                    </div>
                    {isOwner && (
                      <button
                        onClick={() =>
                          document
                            .getElementById("profilePicInputModal")
                            .click()
                        }
                        className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        <Camera className="w-3 h-3" />
                      </button>
                    )}
                    <input
                      type="file"
                      id="profilePicInputModal"
                      style={{ display: "none" }}
                      onChange={(e) =>
                        handleUploadProfilePic(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-3">
                      JPG, PNG or GIF (max. 2MB)
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          document
                            .getElementById("profilePicInputModal")
                            .click()
                        }
                        className="py-2 px-4 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        Upload New
                      </button>
                      <button
                        onClick={handleRemoveProfilePic}
                        className="py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsImageEditModalOpen(false)}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit College Profile
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={editData.collegeName || ""}
                    onChange={(e) =>
                      handleInputChange("collegeName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter college name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Affiliation
                  </label>
                  <input
                    type="text"
                    value={editData.universityAffiliation || ""}
                    onChange={(e) =>
                      handleInputChange("universityAffiliation", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., University of Excellence"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NAAC Rating
                  </label>
                  <input
                    type="text"
                    value={editData.naacRating || ""}
                    onChange={(e) =>
                      handleInputChange("naacRating", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., A++, A+, A, B++, B+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    value={editData.contactNo || ""}
                    onChange={(e) =>
                      handleInputChange("contactNo", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="College email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={editData.website || ""}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="https://college-website.com"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Affiliation
                  </label>
                  <input
                    type="text"
                    value={editData.universityAffiliation || ""}
                    onChange={(e) =>
                      handleInputChange("universityAffiliation", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="e.g., University of Mumbai"
                  />
                </div>
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NAAC Rating
                  </label>
                  <select
                    value={editData.naacRating || ""}
                    onChange={(e) =>
                      handleInputChange("naacRating", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select NAAC Grade</option>
                    <option value="A++">A++ (3.51 - 4.00)</option>
                    <option value="A+">A+ (3.26 - 3.50)</option>
                    <option value="A">A (3.01 - 3.25)</option>
                    <option value="B++">B++ (2.76 - 3.00)</option>
                    <option value="B+">B+ (2.51 - 2.75)</option>
                    <option value="B">B (2.26 - 2.50)</option>
                    <option value="C">C (1.51 - 2.25)</option>
                    <option value="Not Accredited">Not Accredited</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={isEditing}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                {isEditing ? "Saving..." : "Save Changes"}
              </button>
              {isEditingCustomNav && (
                <button
                  onClick={handleUpdateCustomNav}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Update Navigation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CollegeProfileHeader;
