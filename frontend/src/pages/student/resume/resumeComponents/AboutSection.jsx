import React from "react";

function AboutSection({ about, isDarkMode }) {
  return (
    <section
      id="about"
      className={`py-6 px-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <hr className={`border-t-2 mb-2 ${isDarkMode ? "border-white/40" : "border-gray-400"}`} />
        <h2
          className={`text-2xl font-bold mb-4 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          About Me
        </h2>

        {/* ====== BIO ONLY ====== */}
        <p
          className={`text-sm leading-relaxed whitespace-pre-line ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {about?.summary || "No bio available yet."}
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
