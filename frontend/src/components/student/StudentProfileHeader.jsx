import { uploadFile } from "../../utils/simpleUpload";
import React, { useState, useEffect } from "react";
import {
  Edit3,
  X,
  MapPin,
  Camera,
  Bell,
  Check,
  UserPlus,
  Clock,
} from "lucide-react";
import { toast } from "react-toastify";
import apiService from "../../services/apiService";
import QRCodePopup from "./QRCode";
import UsernameCheck from "./CheckUserNameUpdate";
import axios from "axios";
import NotificationPermission from "./NotificationPermission";
import { useAuth } from "../../contexts/AuthContext";

const StudentProfileHeader = ({
  profileData,
  onNavigationChange,
  customNavigations,
  onCustomNavigationUpdate,
  isOwner = false,
}) => {
  // ✅ ADD THIS LINE
  const { user, refreshUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isImageEditModalOpen, setIsImageEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [loading, setLoading] = useState({
    profileload: false,
    coverload: false,
  });
  const [activeItem, setActiveItem] = useState("about");
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
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null);

  // Rating state
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [averageRating, setAverageRating] = useState(4.9);
  // Profile picture and cover photo URLs
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [coverPicUrl, setCoverPicUrl] = useState("");

  // Ping/Connection state
  const [pingStatus, setPingStatus] = useState("none"); // none, sent, received, accepted
  const [connectionCount, setConnectionCount] = useState(0);
  const [pingRequests, setPingRequests] = useState([]);
  const [isPingRequestsModalOpen, setIsPingRequestsModalOpen] = useState(false);
  const [isLoadingPing, setIsLoadingPing] = useState(false);

  // Connection modal state
  const [connections, setConnections] = useState([]);
  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false);

  // Project state
  const [projects, setProjects] = useState([]);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [originalUser, setOriginalUser] = useState(null);

  // const fetchUserData = async () => {
  //   try {
  //     await apiService.getCurrentUser();
  //   } catch (error) {
  //     if (import.meta.env.NODE_ENV !== "production") {
  //       console.error("Failed to fetch user data:", error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!hasFetched) {
  //     fetchUserData();
  //     setHasFetched(true);
  //   }
  // }, [hasFetched]);

  // ✅ UPDATED - Simple URL loading
  useEffect(() => {
    if (profileData) {
      // console.log('📸 Loading images from profileData');

      // Get image URLs directly - they're already full URLs from new system
      const profilePic = profileData.profilePicture || "";
      const coverPic = profileData.coverPicture || "";

      // console.log('📷 Profile pic:', profilePic);
      // console.log('🎨 Cover pic:', coverPic);

      // ✅ Use URLs directly - no concatenation needed
      setProfilePicUrl(profilePic || "/default-avatar.png");
      setCoverPicUrl(coverPic || "/banner-placeholder.jpg");
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
      id: "about",
      name: "About",
      shortName: "About",
    },
    {
      id: "experience",
      name: "Experience",
      shortName: "Experience",
    },
    {
      id: "education",
      name: "Education",
      shortName: "Education",
    },
    {
      id: "skills",
      name: "Skills",
      shortName: "Skills",
    },
    {
      id: "projects",
      name: "Projects",
      shortName: "Projects",
    },
    {
      id: "courses",
      name: "Courses",
      shortName: "Courses",
    },
    {
      id: "certifications",
      name: "Certifications",
      shortName: "Certifications",
    },
    {
      id: "achivements",
      name: "Achivements",
      shortName: "Achivements",
    },
  ];

  // Profile handlers
  const handleEditClick = () => {
    const normalizedData = {
      ...profileData,
      headline: profileData.headline || profileData.interestedField || "",
      interestedField: profileData.interestedField || "",
      location: profileData.location || profileData.city || "",
      githubUrl: profileData.githubUrl || "",
      linkedinUrl: profileData.linkedinUrl || "",
    };
    setEditData(normalizedData);
    setIsEditModalOpen(true);
    setOriginalUser(normalizedData);
  };

  const handleImageEditClick = () => {
    setIsImageEditModalOpen(true);
  };

  const handleSaveProfile = async () => {
    try {
      // Wait until originalUser is available
      if (!originalUser) {
        toast.error("Something went wrong. Try again.");
        return;
      }

      const usernameChanged =
        editData.username.trim() !== originalUser.username.trim();

      // Case 1 → username changed
      if (usernameChanged) {
        if (!isUsernameAvailable) {
          toast.error("Username already taken. Please choose another.");
          return;
        }

        if (editData.username.trim() === "" || isUsernameAvailable === null) {
          toast.error("Please check username availability before saving.");
          return;
        }
      }

      const payload = {
        id: editData.id,
        firstName: editData.firstName,
        username: editData.username,
        lastName: editData.lastName,
        contactNo: editData.contactNo,
        collegeName: editData.collegeName,
        interestedField: editData.interestedField,
        location: editData.location,
        headline: editData.headline,
        otherField: editData.otherField,
        about: editData.about,
        githubUrl: editData.githubUrl,
        linkedinUrl: editData.linkedinUrl,
      };

      await apiService.updateStudentProfile(payload);
      toast.success("Profile updated successfully!");

      setIsEditModalOpen(false);

      if (refreshUser) await refreshUser();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // ✅ UPDATED - Profile picture upload
  const handleUploadProfilePic = async (file) => {
    try {
      // console.log("🚀 Starting profile picture upload...");
      setLoading((prev) => ({ ...prev, profileload: true }));

      // Upload file and get URL
      const url = await uploadFile(file);
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("✅ Got URL:", url);
      }

      // Update database with new URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/update-profile-pic`,
        { profilePicture: url },
        {
          withCredentials: true,
        }
      );

      if (import.meta.env.NODE_ENV !== "production") {
        console.log("✅ Database updated");
      }

      if (response.data.success) {
        setProfilePicUrl(url);
        toast.success("Profile picture updated!");
        setIsImageEditModalOpen(false);

        // ✅ ADD THESE LINES:
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Error:", error);
      }
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading((prev) => ({ ...prev, profileload: false }));
    }
  };

  // ✅ UPDATED - Cover picture upload
  const handleUploadCoverPic = async (file) => {
    try {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("🚀 Starting cover picture upload...");
      }
      setLoading((prev) => ({ ...prev, coverload: true }));

      // Upload file and get URL
      const url = await uploadFile(file);
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("✅ Got URL:", url);
      }

      // Update database with new URL
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/update-cover-pic`,
        { coverPicture: url },
        {
          withCredentials: true,
        }
      );

      if (import.meta.env.NODE_ENV !== "production") {
        console.log("✅ Database updated");
      }

      if (response.data.success) {
        setCoverPicUrl(url);
        toast.success("Cover picture updated!");
        setIsImageEditModalOpen(false);

        // ✅ ADD THESE LINES:
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Error:", error);
      }
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading((prev) => ({ ...prev, coverload: false }));
    }
  };

  // ✅ UPDATED - Remove profile picture
  const handleRemoveProfilePic = async () => {
    if (
      !window.confirm("Are you sure you want to remove your profile picture?")
    ) {
      return;
    }

    const previousPic = profilePicUrl;
    setProfilePicUrl("/default-avatar.png");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/remove-profile-pic`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Profile picture removed");

        // ✅ ADD THESE LINES:
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Remove failed:", error);
      }
      setProfilePicUrl(previousPic);
      toast.error("Failed to remove picture");
    }
  };

  // ✅ UPDATED - Remove cover picture
  const handleRemoveCoverPic = async () => {
    if (
      !window.confirm("Are you sure you want to remove your cover picture?")
    ) {
      return;
    }

    setLoading((prev) => ({ ...prev, coverload: true }));
    const previousCover = coverPicUrl;
    setCoverPicUrl("/banner-placeholder.jpg");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/students/remove-cover-pic`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Cover picture removed");

        // ✅ ADD THESE LINES:
        if (refreshUser) {
          await refreshUser();
        }
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Remove failed:", error);
      }
      setCoverPicUrl(previousCover);
      toast.error("Failed to remove cover picture");
    } finally {
      setLoading((prev) => ({ ...prev, coverload: false }));
    }
  };

  const fetchConnectionCount = async () => {
    // Pass profileData.id if viewing another profile, otherwise, it's for the owner.
    const targetId = !isOwner ? profileData?.id : null;
    try {
      const response = await apiService.getConnectionCount(targetId);
      setConnectionCount(response.count);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Failed to fetch connection count:", error);
      }
    }
  };

  const fetchPingRequests = async () => {
    if (!isOwner) return; // Should only be fetched by the profile owner
    try {
      const response = await apiService.getPingRequests();
      setPingRequests(response.data);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Failed to fetch ping requests:", error);
      }
      toast.error("Failed to load ping requests");
    }
  };

  const handleSendPing = async () => {
    if (!profileData?.id) return;

    setIsLoadingPing(true);
    try {
      await apiService.sendPingRequest(profileData.id);
      setPingStatus("sent");
      toast.success("Ping request sent successfully!");
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Failed to send ping:", error);
      }
      toast.error(error.message || "Failed to send ping request");
    } finally {
      setIsLoadingPing(false);
    }
  };

  const handleAcceptPing = async (requestId) => {
    try {
      await apiService.acceptPingRequest(requestId);
      await fetchPingRequests();
      await fetchConnectionCount();
      toast.success("Ping request accepted!");
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Failed to accept ping:", error);
      }
      toast.error("Failed to accept ping request");
    }
  };

  const handleRejectPing = async (requestId) => {
    try {
      await apiService.rejectPingRequest(requestId);
      await fetchPingRequests();
      toast.success("Ping request rejected");
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Failed to reject ping:", error);
      }
      toast.error("Failed to reject ping request");
    }
  };

  const openPingRequestsModal = () => {
    setIsPingRequestsModalOpen(true);
    fetchPingRequests();
  };

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
  const handleGenerate = (editData) => {
    if (!editData?.username) {
      alert("Please Fill Profile Details");
      const normalizedData = {
        ...profileData,
        headline: profileData.headline || profileData.interestedField || "",
        interestedField: profileData.interestedField || "",
        location: profileData.location || profileData.city || "",
        githubUrl: profileData.githubUrl || "",
        linkedinUrl: profileData.linkedinUrl || "",
      };
      setEditData(normalizedData);
      setIsEditModalOpen(true);
      return;
    }

    const portfolioUrl = `${
      import.meta.env.VITE_API_FRONTEND_BASE_URL
    }/student/portfolio/${editData.username}`;
    window.location.href = portfolioUrl;
  };

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

      <NotificationPermission studentId={user?.id || editData.id} />

      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Photo */}
          <div
            className="h-44 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl shadow-md"
            style={{
              backgroundImage:
                coverPicUrl && coverPicUrl !== "/banner-placeholder.jpg"
                  ? `url("${coverPicUrl}")`
                  : 'url("/banner-placeholder.jpg")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Loading overlay if uploading */}
            {loading.coverload && (
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-xl">
                <div className="text-white text-sm">Uploading...</div>
              </div>
            )}
          </div>

          {/* Edit Button */}
          {isOwner && (
            <button
              onClick={handleImageEditClick}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Edit Background & Profile Image"
            >
              <Camera className="w-7 h-7 invert" color="white" />
            </button>
          )}

          {/* Hidden file inputs */}
          <input
            type="file"
            id="coverPicInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files?.[0]) {
                handleUploadCoverPic(e.target.files[0]);
              }
            }}
          />

          {/* Profile Image */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden relative">
                <img
                  src={profilePicUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />

                {/* Loading overlay if uploading */}
                {loading.profileload && (
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden profile input */}
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleUploadProfilePic(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-8 pb-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">
                {editData?.firstName ||
                  editData?.basicInfo?.first_name ||
                  profileData?.firstName ||
                  profileData?.basicInfo?.first_name}{" "}
                {editData?.lastName ||
                  editData?.basicInfo?.last_name ||
                  profileData?.lastName ||
                  profileData?.basicInfo?.last_name}
              </h3>

              <p className="text-md text-gray-600 mt-1">
                {editData?.headline ||
                  editData?.interestedField ||
                  editData?.basicInfo?.interested_field ||
                  profileData?.headline ||
                  profileData?.interestedField ||
                  profileData?.basicInfo?.interested_field}
              </p>

              {(editData?.city ||
                editData?.location ||
                profileData?.city ||
                profileData?.location) && (
                <button
                  onClick={() => {
                    const location =
                      editData?.city || editData?.location || profileData?.city;
                    if (location && location !== "Location not specified") {
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          location
                        )}`,
                        "_blank"
                      );
                    }
                  }}
                  title="get my current location"
                  className="flex text-justify items-center text-sm text-gray-500 mt-2 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {editData?.location || profileData?.location}
                </button>
              )}

              {(editData?.collegeName ||
                editData?.basicInfo?.collegeName ||
                profileData?.collegeName ||
                profileData?.basicInfo?.collegeName ||
                profileData?.showSchool) && (
                <p className="text-sm text-gray-600 mt-1">
                  {editData?.collegeName ||
                    editData?.basicInfo?.collegeName ||
                    profileData?.collegeName ||
                    profileData?.basicInfo?.collegeName ||
                    profileData?.school}
                </p>
              )}
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              {/* Profile Info Edit Button - Above Connect button */}

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
                      {isLoadingPing ? "Sending..." : "Ping"}
                    </button>
                  )}

                  {pingStatus === "sent" && (
                    <button
                      disabled
                      className="py-2 px-5 bg-gray-400 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4" />
                      Ping Sent
                    </button>
                  )}

                  {pingStatus === "received" && (
                    <button
                      onClick={openPingRequestsModal}
                      className="py-2 px-5 bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Bell className="w-4 h-4" />
                      Respond to Ping
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

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  {isOwner && (
                    <button
                      onClick={handleEditClick}
                      className="text-center py-3 px-3 rounded-lg bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center gap-1.5"
                      title="Edit Profile Info"
                    >
                      <Edit3 className="w-5 h-5" /> Edit Profile
                    </button>
                  )}
                  <QRCodePopup
                    link={`${
                      import.meta.env.VITE_API_FRONTEND_BASE_URL
                    }/student/portfolio/${editData?.username}`}
                    user={`${editData?.username}`}
                  />
                </div>
                <button
                  onClick={() => {
                    handleGenerate(editData);
                  }}
                  className="py-2 px-5 text-white justify-center rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: "#6EA9CB" }}
                >
                  Generate Portfolio
                </button>
              </div>
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
              {customNavigations.map((customNav) => (
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

            <div className="flex items-center space-x-2"></div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Profile
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={editData.firstName || ""}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={editData.lastName || ""}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <UsernameCheck
                editData={editData}
                handleInputChange={handleInputChange}
                setIsUsernameAvailable={setIsUsernameAvailable}
                originalUsername={profileData?.username}
              />
              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={editData.headline || ""}
                  onChange={(e) =>
                    handleInputChange("headline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your professional headline"
                />
              </div>
              {/* Location and School */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>

                <div className="relative">
                  <input
                    type="text"
                    value={editData.location || ""}
                    onChange={(e) => {
                      handleInputChange("location", e.target.value);
                      handleInputChange("city", e.target.value); // keep city in sync
                    }}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter or detect location"
                  />

                  {/* 📍 Location icon inside input */}
                  <button
                    type="button"
                    onClick={async () => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          async (position) => {
                            const { latitude, longitude } = position.coords;
                            try {
                              const response = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                              );
                              const data = await response.json();

                              // 🧭 Full address string
                              const fullAddress =
                                data?.display_name || "Unknown location";

                              handleInputChange("location", fullAddress);
                              handleInputChange(
                                "city",
                                data?.address?.city || ""
                              );
                            } catch (err) {
                              if (import.meta.env.NODE_ENV !== "production") {
                                console.error("Error fetching location:", err);
                              }
                              alert("Unable to fetch location details.");
                            }
                          },
                          (error) => {
                            if (import.meta.env.NODE_ENV !== "production") {
                              console.error("Geolocation error:", error);
                            }
                            alert("Unable to access your location.");
                          }
                        );
                      } else {
                        alert("Geolocation is not supported by your browser.");
                      }
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                  >
                    <MapPin size={18} />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  value={editData.collegeName || editData.school || ""}
                  onChange={(e) => {
                    handleInputChange("collegeName", e.target.value);
                    handleInputChange("school", e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter college name"
                />
              </div>
              {/* Contact and Field */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interested Field *
                  </label>
                  <input
                    type="text"
                    value={editData.interestedField || ""}
                    onChange={(e) =>
                      handleInputChange("interestedField", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter interested field"
                  />
                </div>
              </div>

              {/* github url */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Linkedin Url
                </label>
                <input
                  type="url"
                  value={editData.linkedinUrl || ""}
                  onChange={(e) =>
                    handleInputChange("linkedinUrl", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter linkedin Url"
                />
              </div>
              {/* linkedin url */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Github Url
                </label>
                <input
                  type="url"
                  value={editData.githubUrl || ""}
                  onChange={(e) =>
                    handleInputChange("githubUrl", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter github Url"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DCE8F2";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={
                  editData.username !== profileData.username &&
                  isUsernameAvailable !== true
                }
                className={`px-4 py-2 rounded-lg text-white ${
                  editData.username !== profileData.username &&
                  isUsernameAvailable !== true
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

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
                      backgroundImage:
                        coverPicUrl && coverPicUrl !== "/banner-placeholder.jpg"
                          ? `url("${coverPicUrl}")`
                          : 'url("/banner-placeholder.jpg")',
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
                    disabled={loading.coverload}
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
                        disabled={loading.profileload}
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
                disabled={loading.coverload || loading.profileload}
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

      {/* Add Custom Navigation Modal */}
      {isNewNavModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Custom Section
              </h2>
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name *
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    setNewNavData({ ...newNavData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    setNewNavData({
                      ...newNavData,
                      contentType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="text">Text</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {newNavData.contentType === "text" ? (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter content for this section"
                  />
                ) : (
                  <input
                    type="text"
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter link URL"
                  />
                )}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => setIsNewNavModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCustomNav}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Navigation Modal */}
      {isNavEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Navigation Settings
              </h2>
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="mb-2 text-sm text-gray-700 font-medium">
                Show/Hide Sections
              </div>
              <div className="flex flex-col gap-2">
                {navigationItems.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!hiddenNavItems.includes(item.id)}
                      onChange={() => handleToggleNavItem(item.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{item.name}</span>
                  </label>
                ))}
                {/* Show custom navigation items too */}
                {customNavigations.map((customNav) => (
                  <label
                    key={customNav.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={!hiddenNavItems.includes(customNav.id)}
                      onChange={() => handleToggleNavItem(customNav.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{customNav.name}</span>
                  </label>
                ))}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => setIsNavEditModalOpen(false)}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Custom Navigation Modal */}
      {isEditingCustomNav && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Edit Custom Section
              </h2>
              <button
                onClick={() => {
                  setIsEditingCustomNav(false);
                  setEditingCustomNav(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section Name *
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    setNewNavData({ ...newNavData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter section name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    setNewNavData({
                      ...newNavData,
                      contentType: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="text">Text</option>
                  <option value="link">Link</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                {newNavData.contentType === "text" ? (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter content for this section"
                  />
                ) : (
                  <input
                    type="text"
                    value={newNavData.content}
                    onChange={(e) =>
                      setNewNavData({ ...newNavData, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter link URL"
                  />
                )}
              </div>
            </div>
            <div
              className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
            >
              <button
                onClick={() => {
                  setIsEditingCustomNav(false);
                  setEditingCustomNav(null);
                }}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-80"
                style={{ borderColor: "#DCE8F2", color: "#1F2D3D" }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCustomNav}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ping Requests Modal */}
      {isPingRequestsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Ping Requests
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
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No ping requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
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

      {/* Project Quick View Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  My Projects
                </h2>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {projects.length === 0 ? (
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-4">No projects yet</p>
                  <p className="text-sm text-gray-400">
                    Add your first project in the Projects section to showcase
                    your work
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {project.description}
                          </p>

                          {/* Technologies */}
                          {project.technologies && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {(typeof project.technologies === "string"
                                ? project.technologies.split(", ")
                                : project.technologies || []
                              )
                                .slice(0, 3)
                                .map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              {(typeof project.technologies === "string"
                                ? project.technologies.split(", ").length
                                : project.technologies?.length || 0) > 3 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                  +
                                  {(typeof project.technologies === "string"
                                    ? project.technologies.split(", ").length
                                    : project.technologies?.length || 0) -
                                    3}{" "}
                                  more
                                </span>
                              )}
                            </div>
                          )}

                          {/* Links */}
                          <div className="flex gap-3">
                            {project.project_link && (
                              <a
                                href={project.project_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                                View Project
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Project Date */}
                        <div className="text-xs text-gray-400 ml-4">
                          {project.start_date
                            ? new Date(project.start_date).toLocaleDateString()
                            : project.created_at
                            ? new Date(project.created_at).toLocaleDateString()
                            : "No date"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsProjectModalOpen(false);
                    // Navigate to projects section
                    if (onNavigationChange) {
                      onNavigationChange("projects", "Projects");
                    }
                  }}
                  className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#6EA9CB" }}
                >
                  Manage Projects
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Rating Modal */}
      {isRatingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ratings & Reviews
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {averageRating}
                    </span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= Math.round(averageRating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      ({ratings.length}{" "}
                      {ratings.length === 1 ? "review" : "reviews"})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsRatingModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {ratings.length === 0 ? (
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
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 mb-2">No ratings yet</p>
                  <p className="text-sm text-gray-400">
                    Be the first to rate this profile
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ratings.map((rating) => (
                    <div
                      key={rating.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src={
                              rating.reviewer?.profilePicture ||
                              "/default-avatar.png"
                            }
                            alt="Reviewer"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/default-avatar.png";
                            }}
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {rating.reviewer?.firstName}{" "}
                              {rating.reviewer?.lastName}
                            </h4>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= rating.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          {rating.review && (
                            <p className="text-sm text-gray-600 mb-2">
                              {rating.review}
                            </p>
                          )}

                          <p className="text-xs text-gray-400">
                            {new Date(rating.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
              <button
                onClick={() => setIsRatingModalOpen(false)}
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

export default StudentProfileHeader;
