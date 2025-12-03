import { GraduationCap } from "lucide-react";
import React from "react";

function EducationSection({ education = [], isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";

  const getGridClasses = () => {
    if (!education || education.length === 0) return "";
    if (education.length === 1) return "max-w-3xl mx-auto";
    return "grid md:grid-cols-2 gap-4";
  };

  return (
    <section
      id="education"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Education</h2>

        {education.length > 0 ? (
          <div className={getGridClasses()}>
            {education.map((edu, idx) => (
              <div
                key={idx}
                className={`p-4 rounded border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                      {edu.degree}
                    </h3>
                    <p className={`text-xs font-medium mb-1 text-blue-500`}>
                      {edu.institution}
                    </p>
                    {edu.field_of_study && (
                      <p className={`text-xs mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        Major: {edu.field_of_study}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {edu.start_year} - {edu.end_year || "Present"}
                      </span>
                      {edu.grade && (
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold text-[10px] ${
                            isDarkMode ? "bg-gray-700 text-gray-300" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          GPA: {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  <GraduationCap
                    className={`${isDarkMode ? "text-blue-400" : "text-blue-600"} flex-shrink-0`}
                    size={32}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <GraduationCap
              className={`mx-auto mb-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              size={36}
            />
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
              No education added yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default EducationSection;
