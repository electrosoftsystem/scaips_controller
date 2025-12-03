import { Book } from "lucide-react";
import React from "react";

function CoursesSection({ courses, formatDate, isDarkMode }) {
  const getGridClasses = () => {
    if (courses.length === 1) return "max-w-2xl mx-auto";
    if (courses.length === 2) return "md:grid-cols-2 max-w-4xl mx-auto";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

  const bgClass = isDarkMode ? "bg-gray-900" : "bg-gray-50";
  const cardBg = isDarkMode ? "bg-gray-800" : "bg-white";
  const textHeading = isDarkMode ? "text-white" : "text-gray-800";
  const borderColor = isDarkMode ? "border-gray-700" : "border-gray-100";
  const emptyText = isDarkMode ? "text-gray-300" : "text-gray-500";

  return (
    <section id="courses" className={`py-24 px-4 transition-colors ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textHeading}`}>
            Courses & Training
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </div>

        {courses.length > 0 ? (
          <div className={`grid gap-8 ${getGridClasses()}`}>
            {courses.map((course, idx) => (
              <div
                key={idx}
                className={`${cardBg} rounded-xl p-8 shadow-lg border ${borderColor} hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Book className="text-white" size={28} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-xl mb-2 ${textHeading}`}>
                      {course.course_name}
                    </h3>
                    <p className="text-base text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {course.provider}
                    </p>
                    {course.completion_date && (
                      <span
                        className={`inline-block px-3 py-1.5 rounded-md text-sm font-medium ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
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
          <div className="text-center py-12">
            <Book className={`mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} size={48} />
            <p className={emptyText}>No courses added yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CoursesSection;
