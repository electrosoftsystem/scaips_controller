import { CalendarDays, Trophy } from "lucide-react";
import React from "react";

function AchievementsSection({ achivements, isDarkMode = true }) {
  const getGridClasses = () => {
    if (!achivements || achivements.length === 0) return "";
    if (achivements.length === 1) return "max-w-3xl mx-auto";
    if (achivements.length === 2) return "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto";
    return "grid md:grid-cols-2 lg:grid-cols-3 gap-8";
  };

  const textHeading = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <section
      id="achievements"
      className={`py-20 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* ✅ Updated heading section */}
        <div className="text-center mb-14 animate-fadeInUp">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${textHeading}`}
          >
            Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {achivements && achivements.length > 0 ? (
          <div className={getGridClasses()}>
            {achivements.map((ach, idx) => (
              <div
                key={idx}
                className="animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.12 + 0.2}s` }}
              >
                <div
                  className={`rounded-xl p-7 border shadow-lg transition-all backdrop-blur-md ${
                    isDarkMode
                      ? "bg-white/5 border-white/10 hover:border-purple-400/40 hover:shadow-purple-500/20"
                      : "bg-white border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-md">
                      <Trophy className="text-white" size={24} />
                    </div>
                    <h3
                      className={`text-xl font-semibold ${
                        isDarkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {ach.title || "Untitled Achievement"}
                    </h3>
                  </div>

                  <p
                    className={`mb-5 text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {ach.description || "No description available."}
                  </p>

                  <div
                    className={`flex items-center justify-between pt-4 border-t ${
                      isDarkMode ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <CalendarDays size={16} />
                      {ach.date
                        ? new Date(ach.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date N/A"}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
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
          <div className="text-center py-16 animate-fadeInUp">
            <div
              className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full border ${
                isDarkMode ? "border-gray-700 bg-white/5" : "border-gray-300 bg-gray-100"
              }`}
            >
              <Trophy
                size={40}
                className={`${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              />
            </div>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No achievements added yet.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp .8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default AchievementsSection;

