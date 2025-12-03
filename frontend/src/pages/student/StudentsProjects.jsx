import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Star,
  Bookmark,
  X,
  Calendar,
  TrendingUp,
} from "lucide-react";
import apiService from "../../services/apiService";
import { fetchProjects } from "../../services/projectService";

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All Projects");
  const [savedProjects, setSavedProjects] = useState([]);
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Platform Redesign",
      description:
        "We are looking for an experienced UI/UX designer to redesign our e-commerce platform. The ideal candidate should have strong experience with modern design tools and user-centered design principles.",
      technologies: ["UI/UX Design", "Figma", "React", "Responsive Design"],
      duration: "3-6 months",
      url: "avsarmarg.vercel.app",
      githubUrl: "avsarmarg.vercel.app",
      startDate: "25 may",
      endDate: "29 may",
      isOngoing: "true",
      customFields: ["hello", "hello2"],
      images: ["/something.png", "ok.png"],
      users: "users",
      updatedAt: "16:26:66",
      createdAt: "25:55:55",
    },
    {
      id: 2,
      title: "Avsarmarg-your journy form company to campus start here",
      description:
        "We are looking for an experienced UI/UX designer to redesign our e-commerce platform. The ideal candidate should have strong experience with modern design tools and user-centered design principles.",
      technologies: ["UI/UX Design", "Figma", "React", "Responsive Design"],
      duration: "3-6 months",
      url: "avsarmarg.vercel.app",
      githubUrl: "avsarmarg.vercel.app",
      startDate: "25 may",
      endDate: "29 may",
      isOngoing: "true",
      customFields: ["hello", "hello2"],
      images: ["/something.png"],
      users: "users",
      updatedAt: "16:26:66",
      createdAt: "25:55:55",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();

        // Ensure data is an array
        if (!Array.isArray(data)) {
          if (import.meta.env.NODE_ENV !== "production") {
            console.log("No data found or invalid response");
          }
          setProjects([]); // set empty array to avoid errors
          return;
        }

        if (data.length === 0) {
          if (import.meta.env.NODE_ENV !== "production") {
            console.log("No data found");
          }
        }

        setProjects(data); // store array of projects
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Failed to fetch projects:", error);
        }
        setProjects([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    getAllProjects();
  }, []);

  const filters = ["All Projects", "Recently Posted"];
  const toggleSaveProject = (id) => {
    if (savedProjects.includes(id)) {
      setSavedProjects(savedProjects.filter((pid) => pid !== id));
    } else {
      setSavedProjects([...savedProjects, id]);
    }
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Projects & Opportunities
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search projects"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by:
                </h3>
                <ul className="space-y-2">
                  {filters?.map((filter) => (
                    <li key={filter}>
                      <button
                        onClick={() => setSelectedFilter(filter)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedFilter === filter
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {filter}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Saved Projects
                </h3>
                <p className="text-sm text-gray-600">
                  {savedProjects?.length} saved
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3">
            {filteredProjects.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No projects found
                </h3>
                <p className="text-sm text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects?.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-semibold text-gray-900 mb-1 hover:text-blue-600 cursor-pointer">
                              {project?.title}
                            </h2>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleSaveProject(project.id)}
                          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              savedProjects.includes(project.id)
                                ? "fill-blue-400 text-blue-400"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>

                      <img src="/college-bg.jpg" />

                      {/* Description */}
                      <p className="text-gray-700 text-sm mb-4 line-clamp-2 mt-4">
                        {project.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project?.technologies?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Project Details Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">URL</p>
                          <p className="text-sm font-semibold text-gray-900 flex items-center">
                            <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                            {project.url}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Start Date
                          </p>
                          <p className="text-sm font-semibold text-gray-900 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1 text-orange-600" />
                            {project.startDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">End Date</p>
                          <p className="text-sm font-semibold text-gray-900 flex items-center">
                            <Briefcase className="w-4 h-4 mr-1 text-purple-600" />
                            {project.endDate}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Ongoing</p>
                          <p className="text-sm font-semibold text-gray-900 flex items-center">
                            <Users className="w-4 h-4 mr-1 text-blue-600" />
                            {project.isOngoing ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="flex-1 bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600 font-semibold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-md">
                          Apply Now
                        </button>
                        <button className="flex-1 sm:flex-initial border-2 border-blue-400 text-blue-500 hover:bg-blue-50 font-semibold py-3 px-6 rounded-full transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProjects?.length > 0 && (
              <div className="mt-6 text-center">
                <button className="text-sm text-blue-500 hover:text-blue-600 font-semibold py-2 px-6 border border-blue-400 rounded-full hover:bg-blue-50 transition-colors">
                  Load More Projects
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
