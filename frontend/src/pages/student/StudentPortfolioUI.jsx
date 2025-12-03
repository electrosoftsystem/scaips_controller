import { useState, useEffect } from "react";
import { Moon, Sun, ArrowLeft, Download } from "lucide-react";

import NavBar from "./portfolioComponents/NavBar";
import HeroSection from "./portfolioComponents/HeroSection";
import AboutSection from "./portfolioComponents/AboutSection";
import ExperienceSection from "./portfolioComponents/ExperienceSection";
import EducationSection from "./portfolioComponents/EducationSection";
import SkillsSection from "./portfolioComponents/SkillsSection";
import ProjectsSection from "./portfolioComponents/ProjectsSection";
import CoursesSection from "./portfolioComponents/CoursesSection";
import CertificationsSection from "./portfolioComponents/CertificationsSection";
import AchivementsSection from "./portfolioComponents/AchivementsSection";
import ContactCTASection from "./portfolioComponents/ContactCTASection";
import Footer from "./portfolioComponents/Footer";

export default function Portfolio({ username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const handleDownload = () => {
    if (
      profile?.username <= 0 ||
      profile?.education <= 0 ||
      profile?.about <= 0 ||
      profile?.projects <= 0 ||
      profile?.skills <= 0
    ) {
      alert("Please complete your profile");
      return;
    }

    const portfolioUrl = `${
      import.meta.env.VITE_API_FRONTEND_BASE_URL
    }/student/resume/${profile?.username}`;

    // Read user's selected theme from localStorage (light/dark)
    const theme = localStorage.getItem("theme") || "light";

    const pdfUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }/generate-pdf?url=${encodeURIComponent(portfolioUrl)}&theme=${theme}`;

    window.open(pdfUrl, "_blank");
  };

  const handleBackClick = () => window.history.back();

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
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
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
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Fixed Buttons */}
      <div className="fixed top-2 right-4 z-50 flex items-center gap-3">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
              : "bg-gradient-to-br from-blue-600 text-white to-indigo-700"
          }`}
        >
          <ArrowLeft size={16} /> Back
        </button>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-600"
              : "bg-gradient-to-br from-blue-600 text-white to-indigo-700"
          }`}
        >
          <Download size={16} /> Download
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 hover:scale-110 ${
            isDarkMode
              ? "bg-gray-800 border border-gray-600"
              : "bg-white border border-gray-300"
          }`}
        >
          {isDarkMode ? (
            <Sun className="text-yellow-400" size={18} />
          ) : (
            <Moon className="text-blue-600" size={18} />
          )}
        </button>
      </div>

      <NavBar
        scrolled={scrolled}
        isMenuOpen={isMenuOpen}
        isDarkMode={isDarkMode}
      />

      <HeroSection
        profile={profile}
        about={about}
        scrollToSection={scrollToSection}
        isDarkMode={isDarkMode}
      />

      <AboutSection profile={profile} about={about} isDarkMode={isDarkMode} />

      {experience?.length > 0 && (
        <ExperienceSection
          formatDate={formatDate}
          experience={experience}
          isDarkMode={isDarkMode}
        />
      )}

      <EducationSection education={education} isDarkMode={isDarkMode} />

      <SkillsSection
        skills={skills}
        skillsGrouped={skillsGrouped}
        isDarkMode={isDarkMode}
      />

      <ProjectsSection
        projects={projects}
        formatDate={formatDate}
        isDarkMode={isDarkMode}
      />

      {courses?.length > 0 && (
        <CoursesSection
          courses={courses}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
        />
      )}

      {certifications?.length > 0 && (
        <CertificationsSection
          certifications={certifications}
          formatDate={formatDate}
          isDarkMode={isDarkMode}
        />
      )}

      {achivements?.length > 0 && (
        <AchivementsSection achivements={achivements} isDarkMode={isDarkMode} />
      )}

      <div className="pb-0">
        <ContactCTASection
          profile={profile}
          resumeData={studentData}
          isDarkMode={isDarkMode}
          username={username}
        />
        <Footer
          profile={profile}
          scrollToSection={scrollToSection}
          about={about}
          isDarkMode={isDarkMode}
        />
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
}
