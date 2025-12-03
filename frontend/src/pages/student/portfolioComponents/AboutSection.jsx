import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

function AboutSection({ profile, about, isDarkMode }) {
  return (
    <section
      id="about"
      className={`py-24 px-4 transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* ====== SECTION TITLE ====== */}
        <div className="text-center mb-16">
         <h2
  className={`text-4xl md:text-5xl font-bold mb-4 ${
    isDarkMode ? "text-white" : "text-gray-800"
  }`}
>
  About Me
</h2>


          <div
            className={`w-20 h-1 mx-auto rounded-xl ${
              isDarkMode
                ? "bg-gradient-to-r from-blue-500 to-purple-500"
                : "bg-gradient-to-r from-blue-600 to-purple-600"
            }`}
          ></div>
        </div>

        {/* ====== CONTENT WRAPPER ====== */}
        <div>
          {/* ====== BIO CARD ====== */}
          <div
            className={`rounded-2xl p-8 border shadow-md transition-all mb-8 ${
              isDarkMode
                ? "bg-white/5 border-white/10 backdrop-blur-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-100 hover:shadow-lg"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-4 flex items-center ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <span
                className={`w-1 h-6 rounded-full mr-3 ${
                  isDarkMode
                    ? "bg-gradient-to-b from-blue-400 to-purple-400"
                    : "bg-gradient-to-b from-blue-600 to-purple-600"
                }`}
              ></span>
              My Story
            </h3>

            <p
              className={`text-lg leading-relaxed whitespace-pre-line ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {about?.summary || "No bio available yet."}
            </p>
          </div>

          {/* ====== INFO + CONTACT GRID ====== */}
          <div className="space-y-6 md:flex mt-5 md:gap-5">
           
            <div
              className={`rounded-2xl p-6 shadow-lg border transition-all md:w-1/2 ${
                isDarkMode
                  ? "bg-white/5 text-white border-white/10 backdrop-blur-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]"
                  : "bg-white text-gray-800 border-gray-100 hover:shadow-xl"
              }`}
            >
              <h3
                className={`text-lg font-bold mb-6 pb-3 border-b ${
                  isDarkMode
                    ? "border-white/10 text-white"
                    : "border-gray-100 text-gray-800"
                }`}
              >
                Contact Information
              </h3>

              <div className="space-y-5">
                {profile?.location && (
                  <InfoRow
                    icon={<MapPin size={20} />}
                    label="Location"
                    value={profile.location}
                    color="blue"
                    isDarkMode={isDarkMode}
                  />
                )}

                {profile?.collegeName && (
                  <InfoRow
                    icon={<GraduationCap size={20} />}
                    label="College"
                    value={profile.collegeName}
                    color="purple"
                    isDarkMode={isDarkMode}
                  />
                )}

                {profile?.contactNo && (
                  <InfoRow
                    icon={<Phone size={20} />}
                    label="Contact"
                    value={profile.contactNo}
                    color="green"
                    isDarkMode={isDarkMode}
                  />
                )}

                {profile?.email && (
                  <InfoRow
                    icon={<Mail size={20} />}
                    label="Email"
                    value={profile.email}
                    color="red"
                    isDarkMode={isDarkMode}
                  />
                )}
              </div>
            </div>

            {/* ====== INTEREST CARD ====== */}
            <div
              className={`rounded-2xl p-6 shadow-lg transition-all md:w-1/2 ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-700 to-purple-700 text-white hover:shadow-[0_0_25px_rgba(120,200,255,0.3)]"
                  : "bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:shadow-xl"
              }`}
            >
              <div className="mb-6">
                <p className="text-sm opacity-80 uppercase tracking-wide mb-2">
                  Interested In
                </p>
                <p className="text-xl font-bold">
                  {profile?.interestedField || "Web Development"}
                </p>
              </div>

              <a
                href={`mailto:${profile?.email}`}
                className="block w-full py-3 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all text-center"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Reusable Info Row Component ===== */
function InfoRow({ icon, label, value, color, isDarkMode }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex items-start space-x-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isDarkMode
            ? "bg-white/10 text-white"
            : colorMap[color] || "bg-gray-100 text-gray-700"
        }`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`text-xs uppercase tracking-wide mb-1 ${
            isDarkMode ? "text-gray-300" : "text-gray-500"
          }`}
        >
          {label}
        </p>
        <p className={`font-semibold ${isDarkMode ? "text-white" : "text-gray-800"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

export default AboutSection;

