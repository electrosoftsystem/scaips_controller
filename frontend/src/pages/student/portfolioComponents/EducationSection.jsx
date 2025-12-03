import { GraduationCap } from "lucide-react";
import React from "react";

function EducationSection({ education, isDarkMode }) {
  return (
    <>
      <section
        id="education"
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
              Education
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          {education.length > 0 ? (
            <div
              className={`grid md:grid-cols-${education.length || 1} gap-8`}
            >
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl p-8 border transition-all hover:shadow-xl ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-gray-200"
                      : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3
                        className={`text-2xl font-bold mb-2 ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {edu.degree}
                      </h3>

                      <p className="text-lg text-blue-500 font-semibold mb-1">
                        {edu.institution}
                      </p>

                      {edu.field_of_study && (
                        <p
                          className={`mb-3 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          Major: {edu.field_of_study}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {edu.start_year} - {edu.end_year || "Present"}
                        </span>

                        {edu.grade && (
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              isDarkMode
                                ? "bg-gray-700 text-gray-300"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            GPA: {edu.grade}
                          </span>
                        )}
                      </div>
                    </div>

                    <GraduationCap
                      className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} flex-shrink-0`}
                      size={40}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <GraduationCap
                className={`mx-auto mb-4 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
                size={48}
              />
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                No education added yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default EducationSection;

