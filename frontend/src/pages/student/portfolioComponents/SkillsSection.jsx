import { Code } from "lucide-react";
import React from "react";

function SkillsSection({ skills, skillsGrouped, isDarkMode }) {
  return (
    <>
      <section
        id="skills"
        className={`py-24 px-4 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        } transition-all`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          {skills.length > 0 ? (
            <div className="grid md:grid-cols-1 gap-8">
              {Object.entries(skillsGrouped).map(
                ([proficiency, skillList]) =>
                  skillList.length > 0 && (
                    <div
                      key={proficiency}
                      className={`rounded-2xl p-8 border shadow-lg hover:shadow-xl transition-all ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-700 text-gray-200"
                          : "bg-white border-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex flex-wrap gap-3">
                        {skillList.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`px-4 py-2 rounded-lg font-medium cursor-default border transition-all
                              ${
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
            <div className="text-center py-12">
              <Code
                className={`mx-auto mb-4 ${
                  isDarkMode ? "text-gray-500" : "text-gray-400"
                }`}
                size={48}
              />
              <p className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
                No skills added yet
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default SkillsSection;

