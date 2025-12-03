import { Code } from "lucide-react";
import React from "react";

function SkillsSection({ skills = [], skillsGrouped = {}, isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <section
      id="skills"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Skills & Expertise</h2>

        {skills.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(skillsGrouped).map(
              ([proficiency, skillList]) =>
                skillList.length > 0 && (
                  <div
                    key={proficiency}
                    className={`p-4 rounded border ${
                      isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`px-2 py-1 rounded-lg text-xs font-medium border cursor-default ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-blue-400 hover:text-blue-300"
                              : "bg-gray-50 text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Code
              className={`mx-auto mb-2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
              size={36}
            />
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} text-sm`}>
              No skills added yet
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SkillsSection;
