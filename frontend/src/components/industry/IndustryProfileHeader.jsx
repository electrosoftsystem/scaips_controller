import React, { useState } from "react";
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
  UserPlus,
  Clock,
  Check,
  Bell,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import instustryapiService from "../../services/industryapiservices";

const styles = {
  hideScrollbar: {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
};

const HorizontalProfileNavbar = ({
  onNavigationChange,

  industryData = {},
  isOwner = false,
  onUpdate,
}) => {
  const [activeItem, setActiveItem] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [editData, setEditData] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [coverPicUrl, setCoverPicUrl] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  // Quick Stats State - Dynamic counts
  const [projectCount, setProjectCount] = useState(0);
  const [connectionCount, setConnectionCount] = useState(0);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  // Real-time project stats from localStorage or parent component
  const [projectStats, setProjectStats] = useState({
    total: 0,
  });

  // Ping/Connection state
  const [pingStatus, setPingStatus] = useState("none"); // none, sent, received, accepted
  const [pingRequests, setPingRequests] = useState([]);
  const [isPingRequestsModalOpen, setIsPingRequestsModalOpen] = useState(false);
  const [isLoadingPing, setIsLoadingPing] = useState(false);

  // Connection modal state
  const [connections, setConnections] = useState([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  const navigationItems = [
    { id: "posts", name: "Posts", description: "Your posts and activities" },
    {
      id: "industry-overview",
      name: "Industry Overview",
      description: "Overview of the industry",
    },
    {
      id: "sector-category",
      name: "Sector / Category",
      description: "Industry sectors and categories",
    },
    {
      id: "live-projects",
      name: "Live Projects",
      description: "Live industry projects",
    },
    {
      id: "job-career-opportunities",
      name: "Job Career Opportunities",
      description: "Jobs and career paths",
    },
    // { id: "technology", name: "Technology",  description: "Technologies in the industry" },
    {
      id: "challenges-solutions",
      name: "Challenges / Solutions",
      description: "Industry challenges and solutions",
    },
    {
      id: "post-news-jobs",
      name: "Post News and Jobs",
      description: "Share news and job posts",
    },
    {
      id: "expert-opinions-interview",
      name: "Expert Opinions/Interview",
      description: "Expert interviews and opinions",
    },
    {
      id: "poll-comment-section",
      name: "Poll/Comment Section",
      description: "Polls and comments",
    },
    // { id: "internship-training-requests", name: "Internship or Training Requests",  description: "Request internships or training" },
    // {
    //   id: "upload-project",
    //   name: "Upload Project",
    //   description: "Upload your project",
    // },
  ];

  // Fetch project count from Live Projects section or localStorage
  const fetchProjectCount = async () => {
    try {
      setIsLoadingStats(true);

      // Try to get real project data from localStorage first (where LiveProjects stores data)
      const storedProjects = localStorage.getItem("industryProjects");
      let projects = [];

      if (storedProjects) {
        try {
          projects = JSON.parse(storedProjects);
        } catch (e) {
          console.warn("Failed to parse stored projects:", e);
        }
      }

      // If no stored data, create some sample data or use API
      if (!projects || projects.length === 0) {
        // You can replace this with actual API call
        projects = [
          { id: 1, status: "Open" },
          { id: 2, status: "In Progress" },
          { id: 3, status: "Open" },
          { id: 4, status: "Completed" },
          { id: 5, status: "Open" },
        ];
      }

      // Calculate stats
      const stats = {
        total: projects.length,
        open: projects.filter((p) => p.status === "Open").length,
        inProgress: projects.filter((p) => p.status === "In Progress").length,
        completed: projects.filter((p) => p.status === "Completed").length,
      };

      setProjectCount(stats.total);
      setProjectStats(stats);
    } catch (error) {
      console.error("Error fetching project count:", error);
      setProjectCount(0);
      setProjectStats({ total: 0, open: 0, inProgress: 0, completed: 0 });
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Fetch connection count
  const fetchConnectionCount = async () => {
    try {
      let response;
      if (isOwner) {
        // Industry owner viewing their own profile
        response = await instustryapiService.getIndustryConnectionCount();
      } else {
        // Non-owner viewing an industry profile
        response = await instustryapiService.getIndustryConnectionCount(
          industryData?.id
        );
      }
      setConnectionCount(response.data.count);
    } catch (error) {
      console.error("Error fetching connection count:", error);
      // Fallback to 0 for now
      setConnectionCount(0);
    }
  };

  // Ping/Connection functions
  const fetchPingStatus = async () => {
    if (!industryData?.id || isOwner) return;

    try {
      const response = await instustryapiService.checkIndustryPingStatus(
        industryData.id
      );
      setPingStatus(response.data.status);
    } catch (error) {
      console.error("Failed to fetch industry ping status:", error);
    }
  };

  const fetchPingRequests = async () => {
    try {
      const response = await instustryapiService.getIndustryPingRequests();
      // console.log("Ping requests response:", response);
      setPingRequests(response.data || []);
    } catch (error) {
      console.error("Failed to fetch industry ping requests:", error);
      console.error("Error details:", error.response?.data);
      toast.error("Failed to load ping requests");
    }
  };

  const handleSendPing = async () => {
    if (!industryData?.id) return;

    setIsLoadingPing(true);
    try {
      console.log("Sending ping to industry:", industryData.id);
      await instustryapiService.sendIndustryPingRequest(industryData.id);
      setPingStatus("sent");
      toast.success("Ping request sent to industry successfully!");
      console.log("Ping sent successfully");
    } catch (error) {
      console.error("Failed to send industry ping:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.message || "Failed to send ping request");
    } finally {
      setIsLoadingPing(false);
    }
  };

  const handleAcceptPing = async (requestId) => {
    try {
      await instustryapiService.acceptIndustryPingRequest(requestId);
      await fetchPingRequests();
      await fetchConnectionCount();
      toast.success("Ping request accepted!");
    } catch (error) {
      console.error("Failed to accept industry ping:", error);
      toast.error("Failed to accept ping request");
    }
  };

  const handleRejectPing = async (requestId) => {
    try {
      await instustryapiService.rejectIndustryPingRequest(requestId);
      await fetchPingRequests();
      toast.success("Ping request rejected");
    } catch (error) {
      console.error("Failed to reject industry ping:", error);
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
      const response = await instustryapiService.getIndustryConnections();
      setConnections(response.data || []);
    } catch (error) {
      console.error("Failed to fetch industry connections:", error);
      toast.error("Failed to load connections");
      setConnections([]);
    }
  };

  const openConnectionModal = () => {
    setIsConnectionModalOpen(true);
    fetchConnections();
  };

  // Open project modal (if owner)
  const openProjectModal = () => {
    if (isOwner) {
      // Navigate to Live Projects section
      setActiveItem("live-projects");
      if (onNavigationChange) {
        onNavigationChange("live-projects", "Live Projects");
      }
    }
  };

  const handleUploadCoverPic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);
      const response = await instustryapiService.uploadIndustryCoverImage(
        formData
      );

      // Update local state with new cover picture URL
      setCoverPicUrl(response.data.cover_picture);
      toast.success("Cover picture updated");
    } catch (error) {
      console.error("Failed to upload cover picture:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  const handleUploadProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profileImage", file);
      const response = await instustryapiService.uploadIndustryProfileImage(
        formData
      );

      // Update local state with new profile picture URL
      setProfilePicUrl(response.data.profile_picture);
      toast.success("Profile picture updated");
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      toast.error(error.message || "Upload failed");
    }
  };

  useEffect(() => {
    if (industryData && !initialized) {
      setProfileData(industryData);
      setEditData(industryData);
      setInitialized(true);

      // Initialize image URLs from industry data
      if (industryData.backgroundUrl) {
        setCoverPicUrl(industryData.backgroundUrl);
      }
      if (industryData.logoUrl) {
        setProfilePicUrl(industryData.logoUrl);
      }

      // Fetch quick stats when profile loads
      fetchProjectCount();
      fetchConnectionCount();

      // Fetch ping status if not owner
      if (!isOwner) {
        fetchPingStatus();
      } else {
        // If user is owner, fetch ping requests to show count
        fetchPingRequests();
      }
    }

    // Listen for project updates from LiveProjects component
    const handleProjectUpdate = () => {
      fetchProjectCount();
    };

    // Add event listeners for real-time updates
    window.addEventListener("projectAdded", handleProjectUpdate);
    window.addEventListener("projectUpdated", handleProjectUpdate);
    window.addEventListener("projectDeleted", handleProjectUpdate);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("projectAdded", handleProjectUpdate);
      window.removeEventListener("projectUpdated", handleProjectUpdate);
      window.removeEventListener("projectDeleted", handleProjectUpdate);
    };
  }, [industryData, initialized, isOwner]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      onNavigationChange(item.id, item.name);
    }
  };

  // const handleEditClick = () => {
  //   setEditData({ ...profileData });
  //   setIsEditModalOpen(true);
  // };

  const handleSaveProfile = () => {
    setProfileData({ ...editData });
    if (onUpdate) {
      onUpdate(editData);
    }
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageEditClick = () => {
    setIsImageEditModalOpen(true);
  };

  return (
    <>
      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header - Horizontal */}
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
              // onClick={() => document.getElementById("coverPicInput").click()}
              onClick={handleImageEditClick}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Edit Background & Profile Image"
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

          {/* Profile Image */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src={profilePicUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = "/default-avatar.png";
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

        {/* Profile Info - Horizontal Layout */}
        {/* Increased top padding from pt-10 to pt-16 to accommodate larger image */}
        <div
          className="pt-16 px-8 pb-6 border-b"
          style={{ borderColor: "#DCE8F2" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
                {profileData?.companyName || "Loading..."}
              </h3>
              <p
                className="text-md font-medium mt-1"
                style={{ color: "#6EA9CB" }}
              >
                {profileData?.industryType || ""}
              </p>
              <div
                className="flex items-center text-sm mt-2"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
              >
                <MapPin className="w-4 h-4 mr-1.5" />
                {profileData?.location || "N/A"}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {/* Dynamic Ping/Connect Button */}
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
                    <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {pingRequests.length}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats - Dynamic with Live Project Count */}
          <div
            className="flex items-center justify-around mt-6 pt-4 border-t"
            style={{ borderColor: "#DCE8F2" }}
          >
            {/* Total Projects */}
            <div className="text-center">
              <div className="flex items-center gap-1 justify-center">
                <button
                  onClick={isOwner ? openProjectModal : undefined}
                  className={`${
                    isOwner
                      ? "hover:bg-gray-100 cursor-pointer"
                      : "cursor-default"
                  } p-2 rounded-lg transition-colors`}
                  title={isOwner ? "View your live projects" : "Total Projects"}
                >
                  <span
                    className="font-bold text-lg"
                    style={{ color: "#1F2D3D" }}
                  >
                    {isLoadingStats ? "..." : projectStats.total}
                  </span>
                </button>
                {isOwner && (
                  <button
                    onClick={fetchProjectCount}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Refresh project count"
                    disabled={isLoadingStats}
                  >
                    <svg
                      className={`w-3 h-3 text-gray-400 ${
                        isLoadingStats ? "animate-spin" : ""
                      }`}
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
              <span
                className="text-sm"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Projects
              </span>
            </div>

            {/* Connections */}
            <div className="text-center">
              <button
                onClick={openConnectionModal}
                className="hover:bg-gray-100 p-2 rounded-lg transition-colors cursor-pointer"
                title="View connections"
              >
                <span
                  className="font-bold text-lg"
                  style={{ color: "#007AFF" }}
                >
                  {connectionCount}
                </span>
              </button>
              <span
                className="block text-sm"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Connections
              </span>
            </div>

            {/* Rating */}
            <div className="text-center">
              <span
                className="block text-lg font-bold"
                style={{ color: "#1F2D3D" }}
              >
                4.9
              </span>
              <span
                className="block text-sm"
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
          <div
            className="flex overflow-x-auto px-2"
            style={styles.hideScrollbar}
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-all duration-200 whitespace-nowrap relative group ${
                  activeItem === item.id ? "text-white" : "hover:opacity-80"
                }`}
                style={{
                  borderBottomColor:
                    activeItem === item.id ? "#6EA9CB" : "transparent",
                  backgroundColor:
                    activeItem === item.id ? "#B5D3E7" : "transparent",
                  color: activeItem === item.id ? "#1F2D3D" : "#1F2D3D",
                }}
              >
                {item.name}
                {/* Tooltip */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-12 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-normal w-48 text-center shadow-lg"
                  style={{ backgroundColor: "#1F2D3D" }}
                >
                  {item.description}
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 transform rotate-45"
                    style={{ backgroundColor: "#1F2D3D" }}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Background & Profile Image Modal */}
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
                      backgroundImage: `url(${coverPicUrl})`,
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
                    onClick={() => setCoverPicUrl("")}
                    className="flex-1 py-2 px-4 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Picture
                </h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden">
                      <img
                        src={profilePicUrl || "/default-avatar.png"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src = "/default-avatar.png";
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
                        onClick={() => setProfilePicUrl("")}
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
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Profile
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Professional Headline
                  </label>
                  <input
                    type="text"
                    value={editData.headline}
                    onChange={(e) =>
                      handleInputChange("headline", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="Your professional headline"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Phone
                  </label>
                  <div className="flex items-center">
                    <Phone
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Email
                  </label>
                  <div className="flex items-center">
                    <Mail
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Website
                  </label>
                  <div className="flex items-center">
                    <Globe
                      className="w-5 h-5 mr-2"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    />
                    <input
                      type="url"
                      value={editData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                        color: "#1F2D3D",
                      }}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    About
                  </label>
                  <textarea
                    value={editData.about}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                  />
                </div>
              </div>
            </div>

            <div
              className="p-6 border-t"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                  style={{
                    color: "#1F2D3D",
                    backgroundColor: "#F7FAFC",
                    borderColor: "#DCE8F2",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: "#6EA9CB" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ping Requests Modal */}
      {isPingRequestsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Connection Requests ({pingRequests.length})
                </h2>
                <button
                  onClick={() => setIsPingRequestsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {pingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Bell className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-2">No connection requests</p>
                  <p className="text-sm text-gray-400">
                    When someone sends you a connection request, it will appear
                    here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={
                            request.sender?.profilePicture ||
                            "/default-avatar.png"
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {request.sender?.firstName} {request.sender?.lastName}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {request.sender?.headline ||
                            request.sender?.collegeName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAcceptPing(request.id)}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          title="Accept"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRejectPing(request.id)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setIsPingRequestsModalOpen(false)}
                className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Connections Modal */}
      {isConnectionModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  My Connections ({connectionCount})
                </h2>
                <button
                  onClick={() => setIsConnectionModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {connections.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">No connections yet</p>
                  <p className="text-sm text-gray-400">
                    Connect with other students, colleges, and industry
                    professionals to build your network
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div
                      key={connection.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={
                            connection.connectionUser?.profilePicture ||
                            "/default-avatar.png"
                          }
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default-avatar.png";
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {connection.connectionUser?.firstName}{" "}
                          {connection.connectionUser?.lastName}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {connection.connectionUser?.headline ||
                            connection.connectionUser?.collegeName}
                        </p>
                        <p className="text-xs text-gray-400">
                          Connected on{" "}
                          {new Date(connection.updated_at).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          // Navigate to their profile
                          window.open(
                            `/student/profile/${connection.connectionUser?.id}`,
                            "_blank"
                          );
                        }}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsConnectionModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalProfileNavbar;
