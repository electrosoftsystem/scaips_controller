import { Calendar, ExternalLink, Code } from "lucide-react";
import React from "react";

function ProjectsSection({ projects = [], formatDate, isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";
  const emptyText = isDarkMode ? "text-gray-400" : "text-gray-500";

  const getGridClasses = () => {
    if (!projects || projects.length === 0) return "";
    if (projects.length === 1) return "max-w-3xl mx-auto";
    return "grid md:grid-cols-2 gap-4";
  };

  return (
    <section
      id="projects"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Featured Projects</h2>

        {projects.length > 0 ? (
          <div className={getGridClasses()}>
            {projects.map((project, idx) => {
              const techArray = project.technologies
                ? project.technologies.split(",").map((t) => t.trim())
                : [];

              return (
                <div
                  key={idx}
                  className={`p-4 rounded border ${
                    isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                      <Code className="text-white" size={16} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${textHeading}`}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          {project.description}
                        </p>
                      )}

                      <div className={`flex items-center text-xs mb-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <Calendar size={12} className="mr-1" />
                        <span>
                          {formatDate(project.start_date)} - {project.end_date ? formatDate(project.end_date) : "Ongoing"}
                        </span>
                      </div>

                      {/* Tech Stack */}
                      {techArray.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {techArray.slice(0, 4).map((tech, i) => (
                            <span
                              key={i}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {techArray.length > 4 && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
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
                          className={`inline-flex items-center space-x-1 text-xs font-semibold ${
                            isDarkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                          }`}
                        >
                          <span>View</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Code className={`mx-auto mb-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} size={36} />
            <p className={`${emptyText} text-sm`}>No projects added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
