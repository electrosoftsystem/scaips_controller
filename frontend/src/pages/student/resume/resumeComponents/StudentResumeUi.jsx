import { useState, useEffect } from "react";

import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import CoursesSection from "./CoursesSection";
import CertificationsSection from "./CertificationsSection";
import AchivementsSection from "./AchivementsSection";
import Footer from "./Footer";

export default function StudentResumeUi({ username }) {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [studentData, setStudentData] = useState({
    profile: null,
    about: null,
    skills: [],
    experience: [],
    education: [],
    projects: [],
    courses: [],
    certifications: [],
    achivements: [],
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") setIsDarkMode(false);
  }, []);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      if (!username) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Missing username in URL");
        }
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/students/portfolio/${username}`
      );
      const result = await response.json();

      if (!result.success)
        throw new Error(result.message || "Failed to fetch student data");

      const apiData = result.data;

      const transformedData = {
        profile: {
          firstName: apiData.firstName || null,
          username: apiData.username || null,
          lastName: apiData.lastName || null,
          email: apiData.email || null,
          contactNo: apiData.contactNo || null,
          collegeName: apiData.collegeName || null,
          interestedField: apiData.interestedField || null,
          githubUrl: apiData.githubUrl || null,
          linkedinUrl: apiData.linkedinUrl || null,
          profilePicture: apiData.profilePicture || null,
          coverPicture: apiData.coverPicture || null,
          location: apiData.location || null,
          headline: apiData.headline || null,
          githubId: apiData.githubId || "",
        },
        about: {
          summary: apiData.about?.[0]?.summary || apiData.about?.summary || "",
        },
        skills: apiData.skills || [],
        experience: apiData.experience || [],
        education: apiData.education || [],
        projects: apiData.projects || [],
        courses: apiData.courses || [],
        certifications: apiData.certifications || [],
        achivements: apiData.achivements || [],
      };

      setStudentData(transformedData);
      setLoading(false);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error fetching student data:", error);
      }
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const groupSkillsByProficiency = () => {
    const grouped = {
      Expert: [],
      Advanced: [],
      Intermediate: [],
      Beginner: [],
    };
    studentData.skills.forEach((skill) => {
      const proficiency = skill.proficiency || "Intermediate";
      if (grouped[proficiency]) grouped[proficiency].push(skill.skill_name);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Loading portfolio...
          </p>
        </div>
      </div>
    );
  }

  const {
    profile,
    about,
    skills,
    experience,
    education,
    projects,
    courses,
    certifications,
    achivements,
  } = studentData;
  const skillsGrouped = groupSkillsByProficiency();

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Hero Section */}
      <HeroSection profile={profile} about={about} isDarkMode={isDarkMode} />

      {/* About Section */}
      {profile?.length > 0 && about?.length > 0 && (
        <AboutSection profile={profile} about={about} isDarkMode={isDarkMode} />
      )}

      {/* Education Section */}
      {education?.length > 0 && (
        <EducationSection education={education} isDarkMode={isDarkMode} />
      )}

      {/* Skills Section */}
      {skills?.length > 0 && (
        <SkillsSection
          skills={skills}
          skillsGrouped={skillsGrouped}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Experience Section */}
      {experience?.length > 0 && (
        <ExperienceSection
          formatDate={formatDate}
          experience={experience}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Projects Section */}
      {projects?.length > 0 && (
        <ProjectsSection
          projects={projects}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Courses Section */}
      {courses?.length > 0 && (
        <CoursesSection
          courses={courses}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Certifications Section */}
      {certifications?.length > 0 && (
        <CertificationsSection
          certifications={certifications}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Achievements Section */}
      {achivements?.length > 0 && (
        <AchivementsSection achivements={achivements} isDarkMode={isDarkMode} />
      )}

      {/* Footer */}
      <Footer profile={profile} about={about} isDarkMode={isDarkMode} />

      {/* Inline Animation Style */}
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
