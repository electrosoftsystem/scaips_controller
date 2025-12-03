import { Book } from "lucide-react";
import React from "react";

function CoursesSection({ courses = [], formatDate, isDarkMode = true }) {
  const textHeading = isDarkMode ? "text-white" : "text-gray-900";
  const emptyText = isDarkMode ? "text-gray-400" : "text-gray-500";

  const getGridClasses = () => {
    if (!courses || courses.length === 0) return "";
    if (courses.length === 1) return "max-w-3xl mx-auto";
    return "grid md:grid-cols-2 gap-4";
  };

  return (
    <section
      id="courses"
      className={`py-6 px-4 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2 className={`text-2xl font-bold mb-4 ${textHeading}`}>Courses & Training</h2>

        {courses.length > 0 ? (
          <div className={getGridClasses()}>
            {courses.map((course, idx) => (
              <div
                key={idx}
                className={`p-4 rounded border ${
                  isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center flex-shrink-0">
                    <Book className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm mb-1 ${textHeading}`}>
                      {course.course_name}
                    </h3>
                    <p className="text-xs font-medium text-blue-500 mb-1">{course.provider}</p>
                    {course.completion_date && (
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${
                          isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        Completed: {formatDate(course.completion_date)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Book className={`mx-auto mb-2 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} size={36} />
            <p className={`${emptyText} text-sm`}>No courses added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesSection;
