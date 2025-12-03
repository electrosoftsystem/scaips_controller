import React, { useState, useEffect } from "react";
import IndustryProfileHeader from "../../components/industry/IndustryProfileHeader";
import PostCreator from "../../components/industry/PostCreator";
import FeedArea from "../../components/industry/FeedArea";
import NewsSidebar from "../../components/industry/NewsSidebar";
import ContentRenderer from "../../components/industry/ContentRenderer";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../services/apiService";
import instustryapiService from "../../services/industryapiservices";

const IndustryProfilePage = () => {
  // Navigation state
  const [activeContent, setActiveContent] = useState("posts");
  const [activeContentName, setActiveContentName] = useState("Posts");
  const [activeCustomContent, setActiveCustomContent] = useState(null);
  const [customNavigations, setCustomNavigations] = useState([]);

  // Profile data state
  const [profileData, setProfileData] = useState({
    id: null,
    industry_name: "",
    email: "",
    contact_no: "",
    location: "",
    description: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for refreshing posts
  const [postRefreshTrigger, setPostRefreshTrigger] = useState(0);

  const { id: routeId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // If no routeId and user is an industry, redirect to their own profile
  useEffect(() => {
    if (!routeId && user?.role === "industry" && user?.id) {
      navigate(`/industry/profile/${user.id}`, { replace: true });
      return;
    }
  }, [routeId, user, navigate]);

  // Check if current user is the owner of this profile
  // For industry profiles, user.id should match the industry.id
  const isOwner =
    user?.role === "industry" &&
    ((!routeId && user?.id === profileData?.id) ||
      (routeId && user?.id === parseInt(routeId)));

  // Debug ownership check
  // console.log("🔍 Ownership Debug:", {
  //   userRole: user?.role,
  //   userId: user?.id,
  //   profileId: profileData?.id,
  //   routeId: routeId,
  //   isOwner: isOwner
  // });

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
        // Fetch specific industry profile by ID
        response = await instustryapiService.getIndustryProfile(routeId);
      } else {
        // Only fetch current user's profile if the user is actually an industry
        if (user?.role === "industry") {
          response = await instustryapiService.getCurrentIndustryProfile();
        } else {
          // If user is not an industry and no routeId provided, provide helpful guidance
          if (user?.role === "student") {
            setError(
              "This is the industry profile section. You can browse industry profiles from the search page or industry directory."
            );
          } else if (user?.role === "college") {
            setError(
              "This is the industry profile section. You can browse industry profiles from the search page or industry directory."
            );
          } else {
            setError(
              "Please specify an industry ID in the URL to view an industry profile, or login as an industry to view your own profile."
            );
          }
          return;
        }
      }

      // console.log("📊 Industry profile data loaded:", response);

      if (response.success && response.data) {
        const data = response.data;

        // Map backend data to frontend structure
        const mappedData = {
          ...data,
          id: data.id,
          owner_id: data.id, // For industries, the id IS the owner_id
          companyName: data.companyName || data.industry_name || "",
          industryType: data.industryType || "",
          email: data.email || "",
          contact_no: data.contact_no || data.contactNo || "",
          location: data.location || "",
          description: data.description || "",
        };

        setProfileData(mappedData);
        // console.log("✅ Industry profile data loaded successfully");
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
        industry_name: updatedProfileData.industry_name,
        email: updatedProfileData.email,
        contact_no: updatedProfileData.contact_no,
        location: updatedProfileData.location,
        description: updatedProfileData.description,
      };

      await instustryapiService.updateIndustryProfile(profileUpdateData);
      setProfileData(updatedProfileData);
      // console.log("✅ Industry profile updated successfully");
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
      <h1 className="text-3xl font-bold text-center my-8">
        Electrosoft Alumni Platform
      </h1>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-6">
        <IndustryProfileHeader
          onNavigationChange={handleNavigationChange}
          navigationOptions={[
            "Industry Overview",
            "Sector / Category",
            "Job Career Opportunities",
            "Technology",
            "Challenges / Solutions",
            "Success Stories",
            "Post News and Jobs",
            "Expert Opinions/Interview",
            "Poll/Comment Section",
            "Internship or Training Requests",
            "Live Projects",
          ]}
          industryData={profileData}
          isOwner={isOwner}
          onUpdate={handleProfileUpdate}
        />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {/* Show PostCreator only if owner and activeContent === posts */}
              {activeContent === "posts" && isOwner && (
                <PostCreator
                  isIndustry={true}
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
                    isIndustryProfile={true}
                    isOwner={isOwner}
                    industryData={profileData}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <NewsSidebar isIndustry={true} isOwner={isOwner} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndustryProfilePage;
