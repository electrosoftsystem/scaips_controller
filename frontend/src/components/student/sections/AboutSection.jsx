import React, { useState, useEffect } from "react";
import { Edit, PlusCircle, X } from "lucide-react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

const AboutSection = ({
  profileData,
  studentId,

  isOwner = false,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    if (studentId) {
      fetchAbout();
    }
  }, [studentId]);

  const fetchAbout = async () => {
    try {
      const res = await axios.get(`${API_URL}/about/${profileData.id}`);
      if (res.data.success) {
        setAboutText(res.data.data?.summary || "");
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error fetching about data:", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/about/${studentId}`, {
        about: aboutText,
      });
      setAboutText(aboutText);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating about", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6 shadow-sm border border-gray-200">
        <div
          className="flex items-center justify-between p-6"
          style={{
            backgroundColor: "#DCE8F2",
            borderBottom: "1px solid #B5D3E7",
          }}
        >
          <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
            About
          </h2>
          {isOwner && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 rounded-full transition-colors"
              style={{ color: "#1F2D3D", opacity: 0.7 }}
              title={aboutText ? "Edit about section" : "Add about section"}
            >
              {aboutText ? (
                <Edit className="w-5 h-5" />
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        <div className="p-6">
          <p className="text-gray-500 leading-relaxed">
            {aboutText ||
              "Add a summary to highlight your personality and work style."}
          </p>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-xl shadow-xl w-full max-w-2xl bg-white">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit About
              </h2>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              <textarea
                value={aboutText}
                onChange={(e) => {
                  if (e.target.value.length <= 2000) {
                    setAboutText(e.target.value);
                  }
                }}
                rows={6}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-300 outline-none resize-none"
              />
              <p className="text-xs mt-1 text-gray-500">
                {aboutText.length}/2000 characters
              </p>
            </div>

            <div className="px-6 py-4 flex justify-end gap-3 bg-gray-100 rounded-b-xl">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={aboutText.length > 2000}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutSection;
