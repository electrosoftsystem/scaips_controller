import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import React from "react";

function HeroSection({
  profile = {},
  scrollToSection = () => {},
  isDarkMode = false,
}) {
  // defensive values
  const firstName = profile?.firstName || "";
  const lastName = profile?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const hasPicture =
    typeof profile?.profilePicture === "string" &&
    profile.profilePicture.trim().length > 0;

  return (
    <>
      <section
        className={`relative pt-32 pb-24 px-4 overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
            : "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700"
        }`}
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div
                className={`inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium mb-6 ${
                  isDarkMode ? "bg-purple-900/40 text-purple-200" : "bg-white/20 text-white"
                }`}
              >
                👋 Welcome to my portfolio
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                Hi, I'm{" "}
                <span
                  className={`${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
                      : "text-yellow-300"
                  }`}
                >
                  {fullName || "Your Name"}
                </span>
              </h1>

              <p className={`text-2xl mb-3 ${isDarkMode ? "text-blue-300" : "text-blue-100"}`}>
                {profile?.headline || "Headline not added yet"}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`px-8 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2 ${
                    isDarkMode ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-white text-blue-600"
                  }`}
                >
                  <span>View My Work</span>
                  <ArrowRight size={18} />
                </button>

                <a
                  href={`mailto:${profile?.email || ""}`}
                  className={`px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 rounded-lg font-semibold hover:bg-white/20 transition-all ${
                    isDarkMode ? "border-purple-500/50" : "border-white"
                  }`}
                >
                  Contact Me
                </a>
              </div>

              <div className="flex space-x-4">
                {profile?.githubUrl ? (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <Github size={20} className="text-white" />
                  </a>
                ) : null}

                {profile?.linkedinUrl ? (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <Linkedin size={20} className="text-white" />
                  </a>
                ) : null}

                {profile?.email ? (
                  <a
                    href={`mailto:${profile.email}`}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110"
                  >
                    <Mail size={20} className="text-white" />
                  </a>
                ) : null}
              </div>
            </div>

            {/* RIGHT SIDE: PROFILE IMAGE OR Coder EMOJI */}
            <div className="hidden md:flex justify-center">
              <div className="relative">
                {hasPicture ? (
                  <img
                    src={profile.profilePicture}
                    alt={fullName || "User"}
                    className="w-80 h-80 rounded-full object-cover shadow-2xl"
                  />
                ) : (
                  <div className="w-80 h-80 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-full flex items-center justify-center text-9xl shadow-2xl">
                    🧑‍💻
                  </div>
                )}

                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center text-4xl shadow-xl animate-bounce">
                  ⚡
                </div>

                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pink-300 rounded-full flex items-center justify-center text-4xl shadow-xl">
                  🚀
                </div>
              </div>
            </div>
            {/* END RIGHT SIDE */}
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
