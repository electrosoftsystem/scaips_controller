import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function Footer({profile}) {
   const qrData = `${import.meta.env.VITE_API_FRONTEND_BASE_URL}/student/portfolio/${profile?.username || ""}`;
  return (
    <footer className="w-full py-4 px-4 sm:px-6 md:px-8 bg-white">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        {/* ✅ Left Side (empty for balance) */}
        <div className="w-[60px]" />

        {/* ✅ Center - Logo + Website */}
        <div className="flex flex-col items-center justify-center text-gray-600">
          <img
            src="/titlelogo.png"
            alt="SCAIPS Logo"
            width={40}
            height={30}
            className="object-contain opacity-90 mb-1"
          />
          <span className="font-semibold text-gray-700 text-sm">
            www.scaips.in
          </span>
        </div>

        {/* ✅ Right Side - QR Code */}
        <a
          href={qrData}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
          title="View Portfolio"
        >
          <QRCodeCanvas value={qrData} size={60} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
