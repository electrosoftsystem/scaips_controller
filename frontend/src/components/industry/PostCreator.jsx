import React, { useState, useRef, useEffect } from "react";
import { Image, Video, FileText, Users, X } from "lucide-react";
import apiService from "../../services/apiService";
import instustryapiService from "../../services/industryapiservices";
import { useParams } from "react-router-dom";

const PostCreator = ({ onPostCreated }) => {
  const [industry, setIndustry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPollOptions, setShowPollOptions] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const { routeId } = useParams();

  // ✅ Fetch current industry profile
  useEffect(() => {
    const fetchIndustryProfile = async () => {
      try {
        const data = await instustryapiService.getIndustryProfile(routeId); // GET /api/industries/me
        setIndustry(data);
      } catch (error) {
        console.error("Failed to fetch industry profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustryProfile();
  }, [routeId]);

  // ✅ Handle post submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() && selectedFiles.length === 0) {
      alert("Please add content or media to your post");
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        content: postText.trim(),
        authorType: "industry",
        authorId: industry?.id,
      };

      if (showPollOptions && pollOptions.some((opt) => opt.trim())) {
        postData.pollOptions = pollOptions.filter((opt) => opt.trim());
      }

      const data = await apiService.createPost(postData, selectedFiles);

      // ✅ Reset form after post success
      setPostText("");
      setIsExpanded(false);
      setShowPollOptions(false);
      setPollOptions(["", ""]);
      setSelectedFiles([]);

      if (onPostCreated) onPostCreated(data);

      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`Error: ${error.message || "Failed to create post"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ File input & poll handlers
  const addPollOption = () => setPollOptions([...pollOptions, ""]);
  const updatePollOption = (i, v) => {
    const opts = [...pollOptions];
    opts[i] = v;
    setPollOptions(opts);
  };
  const removePollOption = (i) =>
    pollOptions.length > 2 &&
    setPollOptions(pollOptions.filter((_, idx) => idx !== i));

  const handleFileSelect = (type) => {
    if (!fileInputRef.current) return;
    switch (type) {
      case "image":
        fileInputRef.current.accept =
          "image/jpeg,image/jpg,image/png,image/webp";
        break;
      case "video":
        fileInputRef.current.accept = "video/mp4,video/webm,video/quicktime";
        break;
      case "document":
        fileInputRef.current.accept = "application/pdf,text/plain,.doc,.docx";
        break;
      default:
        fileInputRef.current.accept = "*/*";
    }
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const valid = files.filter((file) => {
      if (file.size > 50 * 1024 * 1024) {
        alert(`${file.name} exceeds 50MB limit.`);
        return false;
      }
      const allowed = [
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
      if (!allowed.includes(file.type) && !file.name.match(/\.(doc|docx)$/i)) {
        alert(`${file.name} is not a supported file type.`);
        return false;
      }
      return true;
    });
    setSelectedFiles(
      (prev) => [...prev, ...valid].slice(0, 5) // max 5
    );
    e.target.value = "";
  };

  const removeFile = (index) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));

  // ✅ Helpers for initials & picture
  const getIndustryInitials = () => {
    if (!industry) return "I";
    const name =
      industry.companyName ||
      `${industry.firstName || ""} ${industry.lastName || ""}`.trim();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getProfilePicture = () => industry?.profilePicture || industry?.logoUrl;

  if (loading)
    return (
      <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-gray-500 text-sm">
        Loading industry profile...
      </div>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Header: Industry profile + text area */}
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
            {getProfilePicture() ? (
              <img
                src={apiService.getMediaUrl(getProfilePicture())}
                alt={industry.companyName}
                className="w-full h-full object-cover"
              />
            ) : (
              getIndustryInitials()
            )}
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share updates, opportunities, or announcements..."
              className="w-full border-none outline-none resize-none text-gray-700 placeholder-gray-500 text-sm"
              rows={isExpanded ? 3 : 1}
              disabled={isSubmitting}
            />

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Selected Files ({selectedFiles.length})
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
                        {(file.size / 1024 / 1024).toFixed(2)} MB
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
              </div>
            )}

            {/* Poll Options */}
            {showPollOptions && (
              <div className="mt-3 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">
                  Poll Options:
                </h4>
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => updatePollOption(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removePollOption(i)}
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

        {/* Action buttons */}
        {isExpanded && (
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handleFileSelect("image")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm disabled:opacity-50"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <Image className="w-4 h-4" />
                <span className="hidden sm:block">Photo</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("video")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm disabled:opacity-50"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <Video className="w-4 h-4" />
                <span className="hidden sm:block">Video</span>
              </button>
              <button
                type="button"
                onClick={() => handleFileSelect("document")}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 text-sm disabled:opacity-50"
                disabled={isSubmitting || selectedFiles.length >= 5}
              >
                <FileText className="w-4 h-4" />
                <span className="hidden sm:block">Document</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPollOptions(!showPollOptions)}
                className={`flex items-center gap-2 text-sm ${
                  showPollOptions
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
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
                    !pollOptions.some((opt) => opt.trim())) ||
                  isSubmitting
                }
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Hidden File Input */}
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
