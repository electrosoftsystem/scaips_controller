import { Briefcase, Calendar, MapPin } from "lucide-react";
import React from "react";

function ExperienceSection({ formatDate, experience, isDarkMode }) {
  return (
    <section
      id="experience"
      className={`py-16 px-4 sm:px-6 md:px-12 lg:px-16 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      } transition-all`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Work Experience
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {experience.length > 0 ? (
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vertical timeline line for desktop */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600"></div>

            {experience.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-6 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg top-4"></div>

                {/* Experience Card */}
                <div
                  className={`md:ml-20 rounded-2xl p-6 sm:p-8 border transition-all shadow-lg hover:shadow-xl w-full ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-200"
                      : "bg-white border-gray-100 text-gray-700"
                  }`}
                >
                  <div className="mb-4">
                    <div className="flex flex-wrap items-center space-x-2 mb-2">
                      <h3
                        className={`text-xl sm:text-2xl md:text-2xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {exp.title}
                      </h3>
                      {exp.currently_working && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="text-base sm:text-lg text-blue-500 font-semibold mb-1">
                      {exp.company}
                    </p>

                    <div
                      className={`flex flex-wrap items-center text-xs sm:text-sm space-x-2 sm:space-x-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {exp.location && (
                        <span className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </span>
                      )}

                      <span className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>
                          {formatDate(exp.start_date)} -{" "}
                          {exp.currently_working
                            ? "Present"
                            : formatDate(exp.end_date)}
                        </span>
                      </span>

                      {exp.employment_type && (
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {exp.employment_type}
                        </span>
                      )}
                    </div>
                  </div>

                  {exp.description && (
                    <p
                      className={`leading-relaxed text-sm sm:text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Briefcase
              className={`mx-auto mb-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              size={48}
            />
            <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
              No experience added yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;
