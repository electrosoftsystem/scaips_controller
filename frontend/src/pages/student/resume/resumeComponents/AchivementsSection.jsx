import { CalendarDays, Trophy } from "lucide-react";
import React from "react";

function AchievementsSection({ achivements = [], isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";
  const lightText = isDarkMode ? "text-gray-300" : "text-gray-600";
  const emptyText = isDarkMode ? "text-gray-400" : "text-gray-500";

  const getGridClasses = () => {
    if (!achivements || achivements.length === 0) return "";
    if (achivements.length === 1) return "max-w-3xl mx-auto";
    return "grid md:grid-cols-2 lg:grid-cols-3 gap-4";
  };

  return (
    <section
      id="achievements"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">

        {/* ====== SECTION TITLE ====== */}
        <hr
          className={`border-t-2 mb-2 ${
            isDarkMode ? "border-white/40" : "border-gray-400"
          }`}
        />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Achievements</h2>

        {/* ====== GRID ====== */}
        {achivements.length > 0 ? (
          <div className={getGridClasses()}>
            {achivements.map((ach, idx) => (
              <div key={idx}>
                <div
                  className={`p-4 rounded border ${
                    isDarkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start space-x-3 mb-2">

                    {/* ICON MATCHING COURSES + CERTIFICATIONS */}
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center flex-shrink-0">
                      <Trophy className="text-white" size={20} />
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`text-sm font-semibold ${
                          isDarkMode ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {ach.title || "Untitled Achievement"}
                      </h3>

                      <p
                        className={`text-xs mt-1 ${lightText}`}
                      >
                        {ach.description || "No description available."}
                      </p>
                    </div>
                  </div>

                  {/* DATE + TAG */}
                  <div
                    className={`flex justify-between items-center text-xs pt-2 border-t ${
                      isDarkMode
                        ? "border-gray-700 text-gray-400"
                        : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} />
                      {ach.date
                        ? new Date(ach.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date N/A"}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                        isDarkMode
                          ? "border-purple-400/40 text-purple-300 bg-purple-500/10"
                          : "border-purple-200 text-purple-700 bg-purple-100"
                      }`}
                    >
                      {ach.tag || "General"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Trophy
              className={`mx-auto mb-2 ${
                isDarkMode ? "text-gray-600" : "text-gray-400"
              }`}
              size={36}
            />
            <p className={`${emptyText} text-sm`}>
              No achievements added yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default AchievementsSection;
