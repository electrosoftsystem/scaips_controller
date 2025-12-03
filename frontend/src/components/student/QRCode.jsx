import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { X, Download, Share2, QrCode } from "lucide-react";

const QRCodePopup = ({ link, user }) => {
  const [showQRModal, setShowQRModal] = useState(false);
  const qrRef = useRef();

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user}_scaips_portfolio.png`;
    a.click();
  };

  const handleShare = async () => {
    try {
      const canvas = qrRef.current.querySelector("canvas");
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      const file = new File([blob], "portfolio_qr.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Portfolio",
          text: "Scan this QR to visit my portfolio!",
          files: [file],
        });
      } else {
        alert("Sharing not supported on this device.");
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Share failed:", error);
      }
    }
  };

  return (
    <>
      {/* ✅ Trigger Button */}
      <button
        onClick={() => setShowQRModal(true)}
        style={{ backgroundColor: "#6EA9CB" }}
        className="flex items-center gap-2  text-white px-4 py-2 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <QrCode size={18} />
        <span className="font-medium text-sm">QR Code</span>
      </button>

      {/* ✅ Modal */}
      {showQRModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-fadeIn">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm border border-gray-200 dark:border-gray-700 text-center transition-all duration-300 scale-in">
            {/* Close Button */}
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Scan to View My Portfolio
            </h2>

            {/* QR Section */}
            <div
              ref={qrRef}
              className="flex justify-center items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-inner mb-5"
            >
              <QRCodeCanvas value={link} size={200} />
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:scale-95 transition-all duration-200"
              >
                <Download size={16} /> Download
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 active:scale-95 transition-all duration-200"
              >
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Subtext */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              Works best on mobile devices.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default QRCodePopup;
