import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../services/apiService";
import StartupProfileHeader from "../../components/startup/StartupProfileHeader";
import PostCreator from "../../components/startup/PostCreator";
import FeedArea from "../../components/startup/FeedArea";
import ContentRenderer from "../../components/startup/ContentRenderer";
import StartupQuizSidebar from "../../components/startup/StartupQuizSidebar";

const StartupProfilePage = () => {
  const { routeId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeContent, setActiveContent] = useState("overview");
  const [activeContentName, setActiveContentName] =
    useState("Startup Overview");
  const [customNavigations, setCustomNavigations] = useState([]);
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [postRefreshTrigger, setPostRefreshTrigger] = useState(0);

  // Determine if current user is the profile owner
  const currentUser = apiService.getCurrentUser();
  const isOwner =
    !routeId || (currentUser && currentUser.id === parseInt(routeId));

  // Function to refresh posts when a new post is created
  const handlePostCreated = (newPost) => {
    console.log("✅ New post created:", newPost);
    setPostRefreshTrigger((prev) => prev + 1);
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, [routeId]);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!apiService.isAuthenticated()) {
        setError("Please log in to view this profile");
        return;
      }

      let response;
      if (routeId) {
        // Fetch specific startup profile by ID
        response = await apiService.getStartupProfile(routeId);
      } else {
        // Fetch current user's startup profile
        response = await apiService.getStartupProfile();
      }

      console.log("📊 Startup profile data loaded:", response);

      if (response.success && response.data) {
        const data = response.data;

        // Map backend data to frontend structure
        const mappedData = {
          ...data,
          id: data.id,
          startup_name: data.startup_name || data.startupName || "",
          email: data.email || "",
          contact_no: data.contact_no || data.contactNo || "",
          location: data.location || "",
          description: data.description || "",
        };

        setProfileData(mappedData);
        console.log("✅ Startup profile data loaded successfully");
      } else {
        console.error("❌ API returned error:", response.message);
        setError(response.message || "Failed to load profile data");
      }
    } catch (error) {
      console.error("❌ Error fetching profile data:", error);
      setError(
        error.message || "Failed to load profile data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (updatedProfileData) => {
    try {
      // Map frontend data back to backend structure
      const profileUpdateData = {
        startup_name: updatedProfileData.startup_name,
        email: updatedProfileData.email,
        contact_no: updatedProfileData.contact_no,
        location: updatedProfileData.location,
        description: updatedProfileData.description,
      };

      await apiService.updateStartupProfile(profileUpdateData);
      setProfileData(updatedProfileData);
      console.log("✅ Startup profile updated successfully");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  };

  // Navigation handlers
  const handleNavigationChange = (
    contentId,
    contentName,
    customNavItem = null
  ) => {
    setActiveContent(contentId);
    setActiveContentName(contentName);
    setActiveCustomContent(customNavItem);
  };

  const handleCustomContentUpdate = (customNavId, newContent) => {
    setCustomNavigations((prev) =>
      prev.map((nav) =>
        nav.id === customNavId ? { ...nav, content: newContent } : nav
      )
    );

    if (activeCustomContent && activeCustomContent.id === customNavId) {
      setActiveCustomContent((prev) => ({ ...prev, content: newContent }));
    }
  };

  const handleEditCustomContent = (customNavItem) => {
    const event = new CustomEvent("editCustomNavigation", {
      detail: { customNavItem },
    });
    window.dispatchEvent(event);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    );
  }

  // Show profile data
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <div className="w-full mb-6">
          <StartupProfileHeader
            onNavigationChange={handleNavigationChange}
            navigationOptions={[
              "Posts",
              "Startup Ecosystem Overview",
              "Growth & Marketing Strategies",
              "Funding and Investment",
              "Tools & Resources",
              "FAQs",
              "Government Policies & Tax Benefits",
              "Steps to Launch",
              "Startup Quiz",
              "How It Works",
              "Industries",
              "Jobs & Trending Skills",
            ]}
            isOwner={isOwner}
            onUpdate={handleProfileUpdate}
          />
        </div>

        <div className="flex gap-6">
          {/* Main Content Area - 70% width */}
          <div className="w-full lg:w-[70%] flex flex-col">
            <div className="space-y-6 w-full">
              {/* Post Creator - Only show when on posts view and if owner */}
              {activeContent === "posts" && isOwner && (
                <PostCreator
                  isOwner={isOwner}
                  onPostCreated={handlePostCreated}
                />
              )}

              {/* Content Area */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                {activeContent === "posts" ? (
                  <FeedArea
                    postRefreshTrigger={postRefreshTrigger}
                    isOwner={isOwner}
                  />
                ) : (
                  <ContentRenderer
                    activeContent={activeContent}
                    activeContentName={activeContentName}
                    isOwner={isOwner}
                    startupData={profileData}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - News - 30% width */}
          <div className="hidden lg:block w-[30%]">
            <StartupQuizSidebar isOwner={isOwner} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default StartupProfilePage;
