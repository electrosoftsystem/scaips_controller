import React from "react";
import {
  Edit3,
  TrendingUp,
  TrendingDown,
  Calendar,
  FileText,
  Link,
  Image,
  Video,
  File,
} from "lucide-react";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";
import SkillsSection from "./sections/SkillsSection";
import ProjectsSection from "./sections/ProjectsSection";
import CoursesSection from "./sections/CoursesSection";
import CertificationsSection from "./sections/CertificationsSection";
import AchievementsSection from "./sections/AchievementsSection";

// Dashboard Stats Component for Posts view
const DashboardStats = ({ data }) => {
  if (!data || !data.stats) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {data.title || "Dashboard"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-600">
                {stat.label}
              </h3>
              {stat.trend && (
                <span
                  className={`flex items-center text-xs font-medium ${
                    stat.trend.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.trend.startsWith("+") ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Structured Content Component for custom content
const StructuredContent = ({ data }) => {
  if (!data || !data.sections) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {data.title || "Structured Content"}
      </h2>
      <div className="space-y-6">
        {data.sections.map((section, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {section.title}
            </h3>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Text Content Component for simple text content
const TextContent = ({ data }) => {
  if (!data || !data.content) return null;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {data.title || "Content"}
      </h2>
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </div>
  );
};

// Custom Navigation Content Renderer
const CustomNavigationContent = ({
  customNavItem,
  onEditCustomContent,
  isOwner,
}) => {
  if (!customNavItem) return null;

  const handleEdit = () => {
    if (onEditCustomContent) {
      onEditCustomContent(customNavItem);
    }
  };

  return (
    <div className="relative">
      {/* Edit Button */}
      {isOwner && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={handleEdit}
            className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            title="Edit this content"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Content based on type */}
      {customNavItem.contentType === "dashboard" && (
        <DashboardStats data={customNavItem.content} />
      )}
      {customNavItem.contentType === "structured" && (
        <StructuredContent data={customNavItem.content} />
      )}
      {customNavItem.contentType === "text" && (
        <TextContent data={customNavItem.content} />
      )}
    </div>
  );
};

const ContentRenderer = ({
  activeContent,
  activeContentName,
  customNavItem,
  onEditCustomContent,
  profileData,
  onProfileUpdate,
  experiences,
  onExperienceUpdate,
  education,
  onEducationUpdate,
  skills,
  onSkillsUpdate,
  projects,
  onProjectsUpdate,
  courses,
  onCoursesUpdate,
  certifications,
  onCertificationsUpdate,
  achievements,
  onAchievementsUpdate,
  studentId,
  isOwner = false,
}) => {
  // If it's a custom navigation item, render its content
  if (customNavItem) {
    return (
      <CustomNavigationContent
        customNavItem={customNavItem}
        onEditCustomContent={onEditCustomContent}
        isOwner={isOwner}
      />
    );
  }

  // Handle regular navigation content
  const renderContent = () => {
    switch (activeContent) {
      case "about":
        return (
          <AboutSection
            profileData={profileData}
            onProfileUpdate={onProfileUpdate}
            isOwner={isOwner}
            studentId={studentId}
          />
        );

      case "experience":
        return (
          <ExperienceSection
            experiences={experiences}
            onExperienceUpdate={onExperienceUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "education":
        return (
          <EducationSection
            education={education}
            onEducationUpdate={onEducationUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "skills":
        return (
          <SkillsSection
            skills={skills}
            onSkillsUpdate={onSkillsUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "projects":
        return (
          <ProjectsSection
            projects={projects}
            onProjectsUpdate={onProjectsUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "courses":
        return (
          <CoursesSection
            courses={courses}
            onCoursesUpdate={onCoursesUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "certifications":
        return (
          <CertificationsSection
            certifications={certifications}
            onCertificationsUpdate={onCertificationsUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      case "achivements":
        return (
          <AchievementsSection
            achievements={achievements}
            onAchievementsUpdate={onAchievementsUpdate}
            studentId={studentId}
            isOwner={isOwner}
          />
        );

      default:
        return (
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeContentName}
            </h2>
            <p className="text-gray-500">
              Content for {activeContentName} is coming soon!
            </p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-32 max-h-[80vh] overflow-y-auto">
      {renderContent()}
    </div>
  );
};

export default ContentRenderer;
