import React, { useState, useRef } from "react";
import { Image, Video, FileText, MapPin, Users, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import apiService from "../../services/apiService";

const PostCreator = ({ onPostCreated }) => {
  const [postText, setPostText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPollOptions, setShowPollOptions] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim() && selectedFiles.length === 0) {
      alert("Please add some content or media to your post");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("🚀 Starting post creation...");
      console.log("📝 Post text:", postText.trim());
      console.log("📎 Selected files:", selectedFiles.length);
      console.log("🗳️ Poll options:", showPollOptions ? pollOptions : "none");

      // Create post data object
      const postData = {
        content: postText.trim(),
      };

      // Add poll options if present
      if (showPollOptions && pollOptions.some((opt) => opt.trim())) {
        postData.pollOptions = pollOptions.filter((opt) => opt.trim());
        console.log("🗳️ Adding poll options:", postData.pollOptions);
      }

      // Log file details for debugging
      if (selectedFiles.length > 0) {
        console.log("📎 File details:");
        selectedFiles.forEach((file, index) => {
          console.log(
            `  File ${index + 1}: ${file.name} (${file.type}, ${(
              file.size /
              1024 /
              1024
            ).toFixed(2)}MB)`
          );
        });
      }

      // Use apiService to create post
      const data = await apiService.createPost(postData, selectedFiles);

      console.log("✅ Post created successfully:", data);

      // Reset form
      setPostText("");
      setIsExpanded(false);
      setShowPollOptions(false);
      setPollOptions(["", ""]);
      setSelectedFiles([]);

      // Notify parent component
      if (onPostCreated) {
        onPostCreated(data);
      }

      alert("Post created successfully!");
    } catch (error) {
      console.error("❌ Error creating post:", error);

      // Use the improved error messages from apiService
      let errorMessage = error.message || "Failed to create post";

      // Show user-friendly error message
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handleFileSelect = (type) => {
    if (fileInputRef.current) {
      // Set specific file types based on what the backend supports
      switch (type) {
        case "image":
          fileInputRef.current.accept =
            "image/jpeg,image/jpg,image/png,image/webp";
          break;
        case "video":
          fileInputRef.current.accept = "video/mp4,video/webm,video/quicktime";
          break;
        case "document":
          // For now, limit documents to common types
          fileInputRef.current.accept = "application/pdf,text/plain,.doc,.docx";
          break;
        default:
          fileInputRef.current.accept = "*/*";
      }
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      // Check file size (50MB limit to match backend)
      if (file.size > 50 * 1024 * 1024) {
        alert(`File "${file.name}" is too large. Maximum size is 50MB.`);
        return false;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "video/mp4",
        "video/webm",
        "video/quicktime",
        "application/pdf",
        "text/plain",
      ];

      if (
        !allowedTypes.includes(file.type) &&
        !file.name.match(/\.(doc|docx)$/i)
      ) {
        alert(`File "${file.name}" is not a supported file type.`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => {
        const newFiles = [...prev, ...validFiles];
        // Limit to 5 files total
        if (newFiles.length > 5) {
          alert(
            "Maximum 5 files allowed. Only the first 5 files will be kept."
          );
          return newFiles.slice(0, 5);
        }
        return newFiles;
      });
    }

    // Clear the input so the same file can be selected again if needed
    e.target.value = "";
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getUserInitials = () => {
    if (user) {
      // Handle different user object structures
      const firstName = user.firstName || user.first_name || "";
      const lastName = user.lastName || user.last_name || "";
      const fullName =
        user.fullName || user.full_name || `${firstName} ${lastName}`.trim();

      if (fullName) {
        return fullName
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()
          .slice(0, 2); // Limit to 2 characters
      }
    }
    return "U";
  };

  const getUserProfilePicture = () => {
    if (user) {
      return (
        user.profilePicture || user.profile_picture || user.profilePic || null
      );
    }
    return null;
  };

  const getUserFullName = () => {
    if (user) {
      const firstName = user.firstName || user.first_name || "";
      const lastName = user.lastName || user.last_name || "";
      return (
        user.fullName ||
        user.full_name ||
        `${firstName} ${lastName}`.trim() ||
        "User"
      );
    }
    return "User";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture and Text Input */}
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
            {getUserProfilePicture() ? (
              <img
                src={apiService.getMediaUrl(getUserProfilePicture())}
                alt={getUserFullName()}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <span
              className={`w-full h-full flex items-center justify-center ${
                getUserProfilePicture() ? "hidden" : ""
              }`}
            >
              {getUserInitials()}
            </span>
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share your thoughts, achievements, or ask a question..."
              className="w-full border-none outline-none resize-none text-gray-700 placeholder-gray-500 text-sm"
              rows={isExpanded ? 3 : 1}
              disabled={isSubmitting}
            />

            {/* Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Selected Files ({selectedFiles.length}):
                </h4>
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    {file.type.startsWith("image/") ? (
                      <Image className="w-4 h-4 text-blue-500" />
                    ) : file.type.startsWith("video/") ? (
                      <Video className="w-4 h-4 text-purple-500" />
                    ) : (
                      <FileText className="w-4 h-4 text-gray-500" />
                    )}
                    <div className="flex-1">
                      <span className="text-sm text-gray-700 block">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      disabled={isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {selectedFiles.length >= 5 && (
                  <p className="text-xs text-amber-600">
                    Maximum 5 files allowed. Additional files will not be
                    uploaded.
                  </p>
                )}
              </div>
            )}

            {/* Poll Options */}
            {showPollOptions && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Poll Options:
                </h4>
                {pollOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      disabled={isSubmitting}
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(index)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        disabled={isSubmitting}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={addPollOption}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    disabled={isSubmitting}
                  >
                    + Add Option
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isExpanded && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleFileSelect("image")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add Image"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <Image className="w-4 h-4" />
                <span className="hidden sm:block">Photo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("video")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add Video"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:block">Video</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("document")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add Document"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:block">Document</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPollOptions(!showPollOptions)}
                className={`flex items-center gap-2 transition-colors text-sm ${
                  showPollOptions
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                title="Create Poll"
                disabled={isSubmitting}
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:block">Poll</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setPostText("");
                  setIsExpanded(false);
                  setShowPollOptions(false);
                  setPollOptions(["", ""]);
                  setSelectedFiles([]);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  (!postText.trim() &&
                    selectedFiles.length === 0 &&
                    !(
                      showPollOptions && pollOptions.some((opt) => opt.trim())
                    )) ||
                  isSubmitting
                }
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
        multiple
      />
    </div>
  );
};

export default PostCreator;
