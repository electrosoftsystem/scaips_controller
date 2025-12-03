import { Briefcase, Calendar, MapPin } from "lucide-react";
import React from "react";

function ExperienceSection({ formatDate, experience = [], isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <section
      id="experience"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr
          className={`border-t-2 mb-2 ${
            isDarkMode ? "border-white/40" : "border-gray-400"
          }`}
        />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>
          Work Experience
        </h2>

        {experience.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className={`p-4 rounded border ${
                  isDarkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* ====== JOB TITLE ====== */}
                <div className="flex items-center justify-between mb-1">
                  <h3
                    className={`text-sm font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {exp.title}
                  </h3>
                  {exp.currently_working && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Current
                    </span>
                  )}
                </div>

                {/* ====== COMPANY + EMPLOYMENT TYPE ====== */}
                <div
                  className={`flex flex-wrap items-center gap-2 mb-1 text-xs font-medium ${
                    isDarkMode ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  <span>{exp.company}</span>
                  {exp.employment_type && (
                    <span
                      className={`px-2 py-0.5 rounded border text-[10px] ${
                        isDarkMode
                          ? "border-blue-400 text-blue-300"
                          : "border-blue-300 text-blue-600"
                      }`}
                    >
                      {exp.employment_type}
                    </span>
                  )}
                </div>

                {/* ====== LOCATION + DATES ====== */}
                <div
                  className={`flex flex-wrap text-xs mb-2 gap-3 ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {exp.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(exp.start_date)} -{" "}
                    {exp.currently_working ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {/* ====== DESCRIPTION ====== */}
                {exp.description && (
                  <p
                    className={`text-xs leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase
              className={`mx-auto mb-2 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
              size={36}
            />
            <p
              className={`${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              } text-sm`}
            >
              No experience added yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExperienceSection;
