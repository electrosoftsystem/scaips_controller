import { Github, Linkedin, Mail, Phone } from "lucide-react";
import React from "react";

function HeroSection({ profile, isDarkMode = false }) {
  return (
    <section
      id="hero"
      className={`
        relative py-6 px-4 sm:px-6 md:px-8 overflow-hidden
        w-full max-w-4xl mx-auto flex justify-center items-center rounded-xl transition-all
        ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
            : "bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 text-white"
        }
      `}
    >
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-3">

        {/* LEFT SIDE — TEXT DETAILS */}
        <div className="flex-1 text-left min-w-[220px]">
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-1 tracking-tight">
            <span className="text-yellow-400">
              {profile?.firstName || "F"} {profile?.lastName || "L"}
            </span>
          </h1>

          <p
            className={`text-xs sm:text-sm mb-2 font-medium italic ${
              isDarkMode ? "text-gray-300" : "text-blue-100"
            }`}
          >
            {profile?.interestedField || "NA"}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-2 text-xs sm:text-sm">
            {/** LOCATION */}
            {profile?.location && (
              <div className="flex items-center gap-1 flex-wrap">
                <span>{profile?.location}</span>
              </div>
            )}

            {/** PHONE */}
            {profile?.contactNo && (
              <div className="flex items-center gap-1 flex-wrap">
                <Phone size={12} className="text-green-300 shrink-0" />
                <span>{profile.contactNo}</span>
              </div>
            )}

            {/** EMAIL */}
            <div className="flex items-center gap-1 flex-wrap">
              <Mail size={12} className="text-white shrink-0" />
              <a
                href={`mailto:${profile?.email || ""}`}
                className="hover:underline hover:text-blue-200 transition-colors"
              >
                {profile?.email || "NA"}
              </a>
            </div>

            {/** GITHUB */}
            {profile?.githubUrl && (
              <div className="flex items-center gap-1 flex-wrap">
                <Github size={12} className="text-white shrink-0" />
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-gray-200"
                >
                  {profile.githubUrl}
                </a>
              </div>
            )}

            {/** LINKEDIN */}
            {profile?.linkedinUrl && (
              <div className="flex items-center gap-1 flex-wrap">
                <Linkedin size={12} className="text-blue-300 shrink-0" />
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:text-blue-200"
                >
                  {profile.linkedinUrl}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE — PROFILE PICTURE */}
        <div className="flex-shrink-0">
          {profile?.profilePicture ? (
            <img
              src={profile.profilePicture}
              alt={`${profile.firstName || "User"} ${
                profile.lastName || ""
              }`}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-white/20"
            />
          ) : (
            <div
              className="
                w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
                bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400
                rounded-full flex items-center justify-center text-3xl font-bold text-white
              "
            >
              {(profile?.firstName?.[0] || "S") +
                (profile?.lastName?.[0] || "A")}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
