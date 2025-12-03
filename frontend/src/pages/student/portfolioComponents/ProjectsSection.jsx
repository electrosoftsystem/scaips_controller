import { Calendar, Code, ExternalLink } from "lucide-react";
import React from "react";

function ProjectsSection({ projects, formatDate, isDarkMode }) {
  const getGridClasses = () => {
    if (projects.length === 1) return "max-w-2xl mx-auto";
    if (projects.length === 2) return "md:grid-cols-2 max-w-4xl mx-auto";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <>
      <section
        id="projects"
        className={`py-24 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } transition-all`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          {projects.length > 0 ? (
            <div className={`grid gap-8 ${getGridClasses()}`}>
              {projects.map((project, idx) => {
                const techArray = project.technologies
                  ? project.technologies.split(",").map((t) => t.trim())
                  : [];

                return (
                  <div
                    key={idx}
                    className={`rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all group ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200"
                    }`}
                  >
                    {/* Project Banner */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-12 text-center">
                      <span className="text-6xl">💻</span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3
                        className={`text-xl font-bold mb-3 transition-colors ${
                          isDarkMode
                            ? "text-white group-hover:text-blue-400"
                            : "text-gray-800 group-hover:text-blue-600"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {project.description && (
                        <p
                          className={`mb-4 leading-relaxed line-clamp-3 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {project.description}
                        </p>
                      )}

                      <div
                        className={`flex items-center text-sm mb-4 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <Calendar size={14} className="mr-1" />
                        <span>
                          {formatDate(project.start_date)} -{" "}
                          {project.end_date
                            ? formatDate(project.end_date)
                            : "Ongoing"}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      {techArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {techArray.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                isDarkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}

                          {techArray.length > 4 && (
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                isDarkMode
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              +{techArray.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Link */}
                      {project.project_link && (
                        <a
                          href={project.project_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center space-x-2 font-semibold group transition-colors ${
                            isDarkMode
                              ? "text-blue-400 hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          <span>View Project</span>
                          <ExternalLink
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Code
                className={`mx-auto mb-4 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
                size={48}
              />
              <p
                className={isDarkMode ? "text-gray-400" : "text-gray-500"}
              >
                No projects added yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProjectsSection;

