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
  Star,
} from "lucide-react";

const HorizontalProfileNavbar = ({
  onNavigationChange,
  navigationOptions,
  customNavigations = [],
  onCustomNavigationUpdate,
  isOwner = false,
  onUpdate,
}) => {
  const [activeItem, setActiveItem] = useState("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewNavModalOpen, setIsNewNavModalOpen] = useState(false);
  const [hiddenNavItems, setHiddenNavItems] = useState([]);
  const [newNavData, setNewNavData] = useState({
    name: "",
    contentType: "text",
    content: "",
  });
  const [editingCustomNav, setEditingCustomNav] = useState(null);
  const [isEditingCustomNav, setIsEditingCustomNav] = useState(false);
  // State to track hidden navigation items
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

  const [profileData, setProfileData] = useState({
    firstName: "Electrosoft",
    username: "Electrosoft",
    lastName: "",
    headline: "Startup Founder, Innovator, and Entrepreneur",

    location: "Mumbai",
    city: "Maharashtra",
    phone: "+91 98765 43210",
    email: "electrosoft@startup.com",
    website: "www.startup.com",
    about:
      "Passionate entrepreneur with 15+ years of experience in building innovative tech solutions. Founded multiple successful startups and helped scale businesses from idea to IPO.",
  });
  const [editData, setEditData] = useState({ ...profileData });

  const navigationItems = [
    {
      id: "posts",
      name: "Posts",
      shortName: "Posts",
    },
    {
      id: "startup-ecosystem",
      name: "Startup Ecosystem Overview",
      shortName: "Overview",
    },
    // {
    //   id: "growth-marketing",
    //   name: "Growth & Marketing Strategies",
    //   shortName: "Growth",
    // },
    {
      id: "funding-investment",
      name: "Funding and Investment",
      shortName: "Funding",
    },
    {
      id: "tools-resources",
      name: "Tools & Resources",
      shortName: "Resources",
    },
    // {
    //   id: "faqs",
    //   name: "FAQs",
    //   shortName: "FAQs",
    // },
    // {
    //   id: "government-policies",
    //   name: "Government Policies & Tax Benefits",
    //   shortName: "Policies",
    // },
    {
      id: "launch-steps",
      name: "Steps to Launch",
      shortName: "Launch",
    },
    // {
    //   id: "startup-quiz",
    //   name: "Startup Quiz",
    //   shortName: "Quiz",
    // },
    {
      id: "how-it-works",
      name: "How It Works",
      shortName: "How-To",
    },
    // {
    //   id: "industries",
    //   name: "Industries",
    //   shortName: "Sectors",
    // },
    {
      id: "jobs-skills",
      name: "Jobs & Trending Skills",
      shortName: "Jobs",
    },
  ];

  // Filter out hidden navigation items
  const filteredNavigationItems = navigationItems.filter(
    (item) => !hiddenNavItems.includes(item.id)
  );

  // Combine default and custom navigation items
  const allNavigationItems = [...filteredNavigationItems, ...customNavigations];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    if (onNavigationChange) {
      // Pass the full custom navigation item if it's a custom navigation
      if (item.isCustom) {
        onNavigationChange(item.id, item.name, item);
      } else {
        onNavigationChange(item.id, item.name);
      }
    }
  };

  const handleAddNewNavigation = () => {
    setIsNewNavModalOpen(true);
  };

  const handleSaveNewNavigation = () => {
    if (newNavData.name.trim()) {
      const newNavItem = {
        id: `custom-${Date.now()}`,
        name: newNavData.name,
        shortName:
          newNavData.name.length > 15
            ? newNavData.name.substring(0, 12) + "..."
            : newNavData.name,
        contentType: newNavData.contentType,
        content: newNavData.content,
        isCustom: true,
      };

      // Update the parent component's custom navigation state
      if (onCustomNavigationUpdate) {
        onCustomNavigationUpdate((prev) => [...prev, newNavItem]);
      }

      setNewNavData({ name: "", contentType: "text", content: "" });
      setIsNewNavModalOpen(false);

      // Automatically switch to the new navigation
      setActiveItem(newNavItem.id);
      if (onNavigationChange) {
        onNavigationChange(newNavItem.id, newNavItem.name, newNavItem);
      }
    }
  };

  const handleCancelNewNavigation = () => {
    setNewNavData({ name: "", contentType: "text", content: "" });
    setIsNewNavModalOpen(false);
    setIsEditingCustomNav(false);
    setEditingCustomNav(null);
  };

  const handleSaveCustomNavEdit = () => {
    if (editingCustomNav && newNavData.name.trim()) {
      // Update the custom navigation item
      const updatedNavItem = {
        ...editingCustomNav,
        name: newNavData.name,
        contentType: newNavData.contentType,
        content: newNavData.content,
      };

      // Update the parent component's custom navigation state
      if (onCustomNavigationUpdate) {
        onCustomNavigationUpdate((prev) =>
          prev.map((nav) =>
            nav.id === editingCustomNav.id ? updatedNavItem : nav
          )
        );
      }

      setNewNavData({ name: "", contentType: "text", content: "" });
      setIsEditingCustomNav(false);
      setEditingCustomNav(null);

      // Refresh the current view if this was the active navigation
      if (activeItem === editingCustomNav.id && onNavigationChange) {
        onNavigationChange(
          updatedNavItem.id,
          updatedNavItem.name,
          updatedNavItem
        );
      }
    }
  };

  const handleNewNavInputChange = (field, value) => {
    setNewNavData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditClick = () => {
    setEditData({ ...profileData });
    setIsEditModalOpen(true);
  };

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

  // Listen for hide navigation events
  useEffect(() => {
    const handleHideNavigation = (event) => {
      const { id } = event.detail;
      setHiddenNavItems((prev) => [...prev, id]);
      // If the hidden item is the active one, switch to "posts"
      if (activeItem === id) {
        setActiveItem("posts");
        if (onNavigationChange) {
          onNavigationChange("posts", "Posts");
        }
      }
    };

    window.addEventListener("hideNavigation", handleHideNavigation);

    return () => {
      window.removeEventListener("hideNavigation", handleHideNavigation);
    };
  }, [activeItem, onNavigationChange]);

  return (
    <>
      <div
        className="rounded-xl shadow-sm border overflow-hidden mb-6"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Profile Header - Horizontal */}
        <div className="relative">
          {/* Increased height from h-24 to h-32 */}
          <div
            className="h-44"
            style={{
              background: "linear-gradient(135deg, #B5D3E7 0%, #6EA9CB 100%)",
            }}
          ></div>
          {/* Edit Button - Only show if user is owner */}
          {isOwner && (
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-full transition-all duration-200 backdrop-blur-sm"
              title="Edit Profile"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          )}
          {/* Larger profile image, adjusted positioning */}
          <div className="absolute -bottom-14 left-8">
            <div className="w-28 h-28 bg-white rounded-full p-1.5 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">
                <img
                  src="/api/placeholder/112/112"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            </div>
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
                {profileData.firstName} {profileData.lastName}
              </h3>
              <p
                className="text-md mt-1"
                style={{ color: "#1F2D3D", opacity: 0.8 }}
              >
                {profileData.headline}
              </p>
              <div
                className="flex items-center text-sm mt-2"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                <MapPin className="w-4 h-4 mr-1.5" />
                {profileData.location}, {profileData.city}
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <button
                className="py-2 px-5 text-white rounded-lg text-sm font-semibold transition-colors duration-200 hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Connect
              </button>
            </div>
          </div>

          {/* Quick Stats - Simplified Layout */}
          <div
            className="flex items-center gap-x-8 mt-6 pt-4 border-t"
            style={{ borderColor: "#DCE8F2" }}
          >
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                250+
              </span>
              <span
                className="text-sm ml-1.5"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Projects
              </span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                500+
              </span>
              <span
                className="text-sm ml-1.5"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Connections
              </span>
            </div>
            <div className="text-left">
              <span className="font-bold" style={{ color: "#1F2D3D" }}>
                4.8
              </span>
              <span
                className="text-sm ml-1.5"
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
          <div className="flex overflow-x-auto">
            {allNavigationItems
              .filter((item) => !hiddenNavItems.includes(item.id))
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 whitespace-nowrap ${
                    activeItem === item.id
                      ? "text-white"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  style={
                    activeItem === item.id
                      ? { borderColor: "#6EA9CB", backgroundColor: "#6EA9CB" }
                      : { color: "#1F2D3D" }
                  }
                >
                  {item.shortName}
                </button>
              ))}
            {/* Add New Navigation Button */}
            <button
              onClick={handleAddNewNavigation}
              className="flex-shrink-0 px-4 py-4 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 transition-colors duration-200 whitespace-nowrap"
              style={{ color: "#1F2D3D", opacity: 0.6 }}
              title="Add new navigation"
            >
              <Plus className="w-4 h-4" />
            </button>

            {/* Show Hidden Items Button (if any items are hidden) */}
            {hiddenNavItems.length > 0 && (
              <button
                onClick={() => setHiddenNavItems([])}
                className="flex-shrink-0 px-4 py-4 text-sm font-medium border-b-2 border-transparent hover:border-gray-300 transition-colors duration-200 whitespace-nowrap"
                style={{ color: "#6EA9CB" }}
                title="Restore hidden navigation items"
              >
                <span>Show Hidden ({hiddenNavItems.length})</span>
              </button>
            )}
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
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="/api/placeholder/80/80"
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                  <button
                    className="absolute -bottom-1 -right-1 p-1.5 text-white rounded-full hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: "#6EA9CB" }}
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Profile Photo
                  </h3>
                  <p className="text-xs text-gray-500">
                    JPG, PNG or GIF (max. 2MB)
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={editData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={editData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  UserName *
                </label>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your UserName"
                />
              </div>
              {/* Headline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Headline *
                </label>
                <input
                  type="text"
                  value={editData.headline}
                  onChange={(e) =>
                    handleInputChange("headline", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter your professional headline"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Region *
                  </label>
                  <input
                    type="text"
                    value={editData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter state or region"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    Website
                  </label>
                  <input
                    type="url"
                    value={editData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter website URL"
                  />
                </div>
              </div>

              {/* About Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  About
                </label>
                <textarea
                  value={editData.about || ""}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Write a brief description about yourself and your startup journey..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editData.about ? editData.about.length : 0}/2000 characters
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Navigation Modal */}
      {(isNewNavModalOpen || isEditingCustomNav) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isEditingCustomNav
                    ? "Edit Navigation"
                    : "Add New Navigation"}
                </h2>
                <button
                  onClick={handleCancelNewNavigation}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Navigation Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Navigation Name *
                </label>
                <input
                  type="text"
                  value={newNavData.name}
                  onChange={(e) =>
                    handleNewNavInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter navigation name"
                  maxLength={50}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newNavData.name.length}/50 characters
                </p>
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Type *
                </label>
                <select
                  value={newNavData.contentType}
                  onChange={(e) =>
                    handleNewNavInputChange("contentType", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="text">Simple Text Content</option>
                  <option value="html">Rich Text/HTML</option>
                  <option value="structured">
                    Structured Section (Cards/Lists)
                  </option>
                  <option value="dashboard">Dashboard with Stats</option>
                  <option value="form">Interactive Form</option>
                  <option value="gallery">Image/Video Gallery</option>
                  <option value="timeline">Timeline/Steps</option>
                  <option value="link">External Link</option>
                  <option value="document">Document Collection</option>
                </select>
              </div>

              {/* Section Layout (for structured content) */}
              {newNavData.contentType === "structured" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Layout Style
                  </label>
                  <select
                    value={newNavData.layoutStyle || "cards"}
                    onChange={(e) =>
                      handleNewNavInputChange("layoutStyle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="cards">Card Layout</option>
                    <option value="list">List Layout</option>
                    <option value="grid">Grid Layout</option>
                    <option value="table">Table Layout</option>
                  </select>
                </div>
              )}

              {/* Background Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Style
                </label>
                <select
                  value={newNavData.bgStyle || "default"}
                  onChange={(e) =>
                    handleNewNavInputChange("bgStyle", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="default">Default (Light)</option>
                  <option value="gradient">Gradient Background</option>
                  <option value="dark">Dark Theme</option>
                  <option value="colorful">Colorful Cards</option>
                  <option value="minimal">Minimal White</option>
                </select>
              </div>

              {/* Dynamic Content Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>

                {/* Simple Text Content */}
                {newNavData.contentType === "text" && (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      handleNewNavInputChange("content", e.target.value)
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter your text content..."
                  />
                )}

                {/* HTML Content */}
                {newNavData.contentType === "html" && (
                  <textarea
                    value={newNavData.content}
                    onChange={(e) =>
                      handleNewNavInputChange("content", e.target.value)
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none font-mono text-sm"
                    placeholder="Enter HTML content..."
                  />
                )}

                {/* Structured Section Content */}
                {newNavData.contentType === "structured" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={newNavData.sectionTitle || ""}
                        onChange={(e) =>
                          handleNewNavInputChange(
                            "sectionTitle",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., Our Services, Features, Benefits"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Template Type
                      </label>
                      <select
                        value={newNavData.structuredTemplate || "services"}
                        onChange={(e) => {
                          const template = e.target.value;
                          handleNewNavInputChange(
                            "structuredTemplate",
                            template
                          );
                          // Auto-populate with template data
                          if (template === "services") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title:
                                  newNavData.sectionTitle || "Our Services",
                                items: [
                                  {
                                    name: "Web Development",
                                    description: "Custom web applications",
                                  },
                                  {
                                    name: "Mobile Apps",
                                    description: "iOS and Android development",
                                  },
                                  {
                                    name: "Consulting",
                                    description: "Strategic technology advice",
                                  },
                                ],
                              })
                            );
                          } else if (template === "features") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title:
                                  newNavData.sectionTitle || "Key Features",
                                items: [
                                  {
                                    name: "Fast Performance",
                                    description: "Lightning-fast loading times",
                                  },
                                  {
                                    name: "Secure",
                                    description:
                                      "Bank-level security protocols",
                                  },
                                  {
                                    name: "Scalable",
                                    description: "Grows with your business",
                                  },
                                ],
                              })
                            );
                          } else if (template === "team") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title: newNavData.sectionTitle || "Our Team",
                                items: [
                                  {
                                    name: "John Doe",
                                    description: "CEO & Founder",
                                  },
                                  { name: "Jane Smith", description: "CTO" },
                                  {
                                    name: "Mike Johnson",
                                    description: "Lead Developer",
                                  },
                                ],
                              })
                            );
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="services">Services/Products</option>
                        <option value="features">Features/Benefits</option>
                        <option value="team">Team Members</option>
                        <option value="steps">Process Steps</option>
                        <option value="custom">Custom Items</option>
                      </select>
                    </div>

                    {/* Custom Items Builder */}
                    {newNavData.structuredTemplate === "custom" && (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Add Items (up to 6)
                        </label>
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className="grid grid-cols-1 gap-2 p-3 border border-gray-200 rounded-lg"
                          >
                            <input
                              type="text"
                              placeholder="Item Name/Title"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              onChange={(e) => {
                                const items =
                                  JSON.parse(
                                    newNavData.content || '{"items":[]}'
                                  ).items || [];
                                items[num - 1] = {
                                  ...(items[num - 1] || {}),
                                  name: e.target.value,
                                };
                                handleNewNavInputChange(
                                  "content",
                                  JSON.stringify({
                                    title:
                                      newNavData.sectionTitle ||
                                      "Custom Section",
                                    items: items.filter((s) => s.name),
                                  })
                                );
                              }}
                            />
                            <textarea
                              rows={2}
                              placeholder="Description/Details"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              onChange={(e) => {
                                const items =
                                  JSON.parse(
                                    newNavData.content || '{"items":[]}'
                                  ).items || [];
                                items[num - 1] = {
                                  ...(items[num - 1] || {}),
                                  description: e.target.value,
                                };
                                handleNewNavInputChange(
                                  "content",
                                  JSON.stringify({
                                    title:
                                      newNavData.sectionTitle ||
                                      "Custom Section",
                                    items: items.filter((s) => s.name),
                                  })
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 bg-green-50 p-3 rounded-lg">
                      <p>
                        💡 <strong>Preview:</strong> Your content will display
                        as cards with titles and descriptions
                      </p>
                    </div>
                  </div>
                )}

                {/* Dashboard Content */}
                {newNavData.contentType === "dashboard" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dashboard Title
                      </label>
                      <input
                        type="text"
                        value={newNavData.dashboardTitle || ""}
                        onChange={(e) =>
                          handleNewNavInputChange(
                            "dashboardTitle",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., Performance Dashboard"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dashboard Template
                      </label>
                      <select
                        value={newNavData.dashboardTemplate || "business"}
                        onChange={(e) => {
                          const template = e.target.value;
                          handleNewNavInputChange(
                            "dashboardTemplate",
                            template
                          );
                          // Auto-populate with template data
                          if (template === "business") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title:
                                  newNavData.dashboardTitle ||
                                  "Business Dashboard",
                                stats: [
                                  {
                                    label: "Revenue",
                                    value: "$45,230",
                                    trend: "+12%",
                                  },
                                  {
                                    label: "Users",
                                    value: "1,847",
                                    trend: "+8%",
                                  },
                                  {
                                    label: "Projects",
                                    value: "23",
                                    trend: "+3",
                                  },
                                  {
                                    label: "Rating",
                                    value: "4.9/5",
                                    trend: "+0.2",
                                  },
                                ],
                              })
                            );
                          } else if (template === "startup") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title:
                                  newNavData.dashboardTitle ||
                                  "Startup Metrics",
                                stats: [
                                  {
                                    label: "Total Users",
                                    value: "12,847",
                                    trend: "+15.2%",
                                  },
                                  {
                                    label: "Monthly Revenue",
                                    value: "$89,234",
                                    trend: "+23.5%",
                                  },
                                  {
                                    label: "Active Projects",
                                    value: "47",
                                    trend: "+8.1%",
                                  },
                                  {
                                    label: "Team Members",
                                    value: "24",
                                    trend: "+2",
                                  },
                                ],
                              })
                            );
                          } else if (template === "simple") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title:
                                  newNavData.dashboardTitle || "Quick Stats",
                                stats: [
                                  {
                                    label: "Total",
                                    value: "100",
                                    trend: "+5%",
                                  },
                                  {
                                    label: "Active",
                                    value: "85",
                                    trend: "+3%",
                                  },
                                ],
                              })
                            );
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="business">
                          Business Dashboard (4 stats)
                        </option>
                        <option value="startup">
                          Startup Metrics (4 stats)
                        </option>
                        <option value="simple">Simple Stats (2 stats)</option>
                        <option value="custom">Custom (manual entry)</option>
                      </select>
                    </div>

                    {/* Custom Stats Builder */}
                    {newNavData.dashboardTemplate === "custom" && (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Add Statistics (up to 6)
                        </label>
                        {[1, 2, 3, 4].map((num) => (
                          <div
                            key={num}
                            className="grid grid-cols-3 gap-2 p-3 border border-gray-200 rounded-lg"
                          >
                            <input
                              type="text"
                              placeholder="Label (e.g., Revenue)"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              onChange={(e) => {
                                const stats =
                                  JSON.parse(
                                    newNavData.content || '{"stats":[]}'
                                  ).stats || [];
                                stats[num - 1] = {
                                  ...(stats[num - 1] || {}),
                                  label: e.target.value,
                                };
                                handleNewNavInputChange(
                                  "content",
                                  JSON.stringify({
                                    title:
                                      newNavData.dashboardTitle ||
                                      "Custom Dashboard",
                                    stats: stats.filter(
                                      (s) => s.label && s.value
                                    ),
                                  })
                                );
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Value (e.g., $45K)"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              onChange={(e) => {
                                const stats =
                                  JSON.parse(
                                    newNavData.content || '{"stats":[]}'
                                  ).stats || [];
                                stats[num - 1] = {
                                  ...(stats[num - 1] || {}),
                                  value: e.target.value,
                                };
                                handleNewNavInputChange(
                                  "content",
                                  JSON.stringify({
                                    title:
                                      newNavData.dashboardTitle ||
                                      "Custom Dashboard",
                                    stats: stats.filter(
                                      (s) => s.label && s.value
                                    ),
                                  })
                                );
                              }}
                            />
                            <input
                              type="text"
                              placeholder="Trend (e.g., +12%)"
                              className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              onChange={(e) => {
                                const stats =
                                  JSON.parse(
                                    newNavData.content || '{"stats":[]}'
                                  ).stats || [];
                                stats[num - 1] = {
                                  ...(stats[num - 1] || {}),
                                  trend: e.target.value,
                                };
                                handleNewNavInputChange(
                                  "content",
                                  JSON.stringify({
                                    title:
                                      newNavData.dashboardTitle ||
                                      "Custom Dashboard",
                                    stats: stats.filter(
                                      (s) => s.label && s.value
                                    ),
                                  })
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                      <p>
                        💡 <strong>Dashboard Preview:</strong> Your dashboard
                        will display beautiful stat cards with the data above
                      </p>
                    </div>
                  </div>
                )}

                {/* Form Content */}
                {newNavData.contentType === "form" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Title
                      </label>
                      <input
                        type="text"
                        value={newNavData.formTitle || ""}
                        onChange={(e) =>
                          handleNewNavInputChange("formTitle", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., Contact Us, Registration Form"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Form Template
                      </label>
                      <select
                        value={newNavData.formTemplate || "contact"}
                        onChange={(e) => {
                          const template = e.target.value;
                          handleNewNavInputChange("formTemplate", template);
                          // Auto-populate with template data
                          if (template === "contact") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title: newNavData.formTitle || "Contact Us",
                                fields: [
                                  {
                                    type: "text",
                                    label: "Full Name",
                                    required: true,
                                  },
                                  {
                                    type: "email",
                                    label: "Email Address",
                                    required: true,
                                  },
                                  {
                                    type: "tel",
                                    label: "Phone Number",
                                    required: false,
                                  },
                                  {
                                    type: "textarea",
                                    label: "Message",
                                    required: true,
                                  },
                                ],
                              })
                            );
                          } else if (template === "registration") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title: newNavData.formTitle || "Registration",
                                fields: [
                                  {
                                    type: "text",
                                    label: "First Name",
                                    required: true,
                                  },
                                  {
                                    type: "text",
                                    label: "Last Name",
                                    required: true,
                                  },
                                  {
                                    type: "email",
                                    label: "Email",
                                    required: true,
                                  },
                                  {
                                    type: "password",
                                    label: "Password",
                                    required: true,
                                  },
                                  {
                                    type: "tel",
                                    label: "Phone",
                                    required: false,
                                  },
                                ],
                              })
                            );
                          } else if (template === "feedback") {
                            handleNewNavInputChange(
                              "content",
                              JSON.stringify({
                                title: newNavData.formTitle || "Feedback Form",
                                fields: [
                                  {
                                    type: "text",
                                    label: "Name",
                                    required: true,
                                  },
                                  {
                                    type: "select",
                                    label: "Rating",
                                    options: [
                                      "Excellent",
                                      "Good",
                                      "Average",
                                      "Poor",
                                    ],
                                    required: true,
                                  },
                                  {
                                    type: "textarea",
                                    label: "Comments",
                                    required: true,
                                  },
                                ],
                              })
                            );
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="contact">Contact Form</option>
                        <option value="registration">Registration Form</option>
                        <option value="feedback">Feedback/Survey</option>
                        <option value="newsletter">Newsletter Signup</option>
                        <option value="custom">Custom Form</option>
                      </select>
                    </div>

                    <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded-lg">
                      <p>
                        💡 <strong>Form Preview:</strong> Creates an interactive
                        form with the selected fields
                      </p>
                    </div>
                  </div>
                )}

                {/* Gallery Content */}
                {newNavData.contentType === "gallery" && (
                  <div className="space-y-4">
                    <textarea
                      value={newNavData.content}
                      onChange={(e) =>
                        handleNewNavInputChange("content", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="Enter gallery items as JSON...&#10;Example:&#10;{&#10;  'title': 'Project Gallery',&#10;  'items': [&#10;    {'type': 'image', 'url': 'https://...', 'title': 'Project 1'},&#10;    {'type': 'video', 'url': 'https://...', 'title': 'Demo Video'}&#10;  ]&#10;}"
                    />
                    <div className="text-xs text-gray-500">
                      <p>💡 Supports: Images, videos, mixed media galleries</p>
                    </div>
                  </div>
                )}

                {/* Timeline Content */}
                {newNavData.contentType === "timeline" && (
                  <div className="space-y-4">
                    <textarea
                      value={newNavData.content}
                      onChange={(e) =>
                        handleNewNavInputChange("content", e.target.value)
                      }
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="Enter timeline steps as JSON...&#10;Example:&#10;{&#10;  'title': 'Product Development',&#10;  'steps': [&#10;    {'step': 1, 'title': 'Research', 'description': 'Market research phase'},&#10;    {'step': 2, 'title': 'Design', 'description': 'UI/UX design phase'}&#10;  ]&#10;}"
                    />
                    <div className="text-xs text-gray-500">
                      <p>
                        💡 Perfect for: Process flows, roadmaps, step-by-step
                        guides
                      </p>
                    </div>
                  </div>
                )}

                {/* Link/Document URL Input */}
                {(newNavData.contentType === "link" ||
                  newNavData.contentType === "document") && (
                  <input
                    type="url"
                    value={newNavData.content}
                    onChange={(e) =>
                      handleNewNavInputChange("content", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder={`Enter ${newNavData.contentType} URL...`}
                  />
                )}

                {/* Character/Content Length Display */}
                {(newNavData.contentType === "text" ||
                  newNavData.contentType === "html") && (
                  <p className="text-xs text-gray-500 mt-1">
                    {newNavData.content.length}/2000 characters
                  </p>
                )}
              </div>

              {/* Content Preview */}
              {newNavData.content && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="border border-gray-200 rounded-lg p-3 bg-gray-50 max-h-32 overflow-y-auto">
                    {newNavData.contentType === "text" && (
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">
                        {newNavData.content}
                      </p>
                    )}
                    {newNavData.contentType === "html" && (
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: newNavData.content }}
                      />
                    )}
                    {newNavData.contentType === "link" && (
                      <a
                        href={newNavData.content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {newNavData.content}
                      </a>
                    )}
                    {newNavData.contentType === "image" && (
                      <img
                        src={newNavData.content}
                        alt="Preview"
                        className="max-w-full h-20 object-cover rounded"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    {(newNavData.contentType === "video" ||
                      newNavData.contentType === "document") && (
                      <p className="text-sm text-gray-600">
                        {newNavData.contentType}: {newNavData.content}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelNewNavigation}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                }}
              >
                Cancel
              </button>
              <button
                onClick={
                  isEditingCustomNav
                    ? handleSaveCustomNavEdit
                    : handleSaveNewNavigation
                }
                disabled={!newNavData.name.trim() || !newNavData.content.trim()}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                {isEditingCustomNav ? "Save Changes" : "Add Navigation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HorizontalProfileNavbar;
