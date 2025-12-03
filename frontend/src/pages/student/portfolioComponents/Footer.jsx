import { Linkedin, Mail, QrCode } from "lucide-react";
import React, { useState } from "react";
import { FaGithub, FaWhatsapp } from "react-icons/fa";
import QRCodePopup from "../../../components/student/QRCode";
 // 👈 Import your existing component

function Footer({ profile, scrollToSection }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* Use your imported QR component */}
     

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Left Side */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {profile?.firstName?.[0]}
                    {profile?.lastName?.[0]}
                  </span>
                </div>
                <span className="text-xl font-bold">
                  {profile?.firstName} {profile?.lastName}
                </span>
              </div>
              <p className="text-gray-400">
                {profile?.headline ||
                  "Passionate developer building amazing web experiences."}
              </p>
            </div>

            {/* Middle Section */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Quick Links</h3>
              <div className="space-y-2">
                {["About", "Experience", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div>
              <h3 className="font-bold mb-4 text-lg">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {profile.githubUrl && (
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                {profile.linkedinUrl && (
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                <a
                  href={`mailto:${profile?.email}`}
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-all"
                >
                  <Mail size={20} />
                </a>
                <a
                  href={`https://wa.me/${profile?.contactNo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-all"
                >
                  <FaWhatsapp size={20} />
                </a>

                {/* 👇 QR Modal Trigger Button */}
                <QRCodePopup isOpen={showQR} onClose={() => setShowQR(false)} />
               
                
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p className="flex gap-1 justify-center items-center">
              ©{" "}
              <img
                src="/titlelogo.png"
                alt="logo"
                width={30}
                height={20}
                className="inline-block"
              />{" "}
              2025 scaips.in — All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
