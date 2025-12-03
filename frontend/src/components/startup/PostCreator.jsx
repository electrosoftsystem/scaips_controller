import React, { useState, useRef } from "react";
import {
  Camera,
  Video,
  FileText,
  Smile,
  MoreHorizontal,
  X,
  Upload,
} from "lucide-react";

const PostCreator = ({ isOwner, onPostCreated }) => {
  const [postText, setPostText] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);
  const photoInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handleFileUpload = (event, fileType) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      // Check file size (different limits for different types)
      let maxSize;
      let maxSizeText;

      if (fileType === "photo") {
        maxSize = 5 * 1024 * 1024; // 5MB for photos
        maxSizeText = "5MB";
      } else if (fileType === "video") {
        maxSize = 5 * 1024 * 1024; // 5MB for videos
        maxSizeText = "5MB";
      } else {
        maxSize = 5 * 1024 * 1024; // 5MB for documents (including PDFs)
        maxSizeText = "5MB";
      }

      if (file.size > maxSize) {
        alert(
          `File "${file.name}" is too large. Please select ${fileType}s smaller than ${maxSizeText}.`
        );
        return;
      }

      if (fileType === "photo") {
        // Store smaller photos in localStorage, larger ones as URL objects
        if (file.size <= 1 * 1024 * 1024) {
          // 1MB limit for localStorage
          const reader = new FileReader();
          reader.onload = (e) => {
            const newFile = {
              id: Date.now() + Math.random(),
              file: file,
              type: fileType,
              name: file.name,
              size: file.size,
              url: e.target.result,
              fileData: null,
              storedLocally: true,
            };
            setAttachedFiles((prev) => [...prev, newFile]);
          };
          reader.readAsDataURL(file);
        } else {
          // For larger photos, create object URL (temporary but works for session)
          const newFile = {
            id: Date.now() + Math.random(),
            file: file,
            type: fileType,
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            fileData: null,
            storedLocally: false,
          };
          setAttachedFiles((prev) => [...prev, newFile]);
        }
      } else if (fileType === "document") {
        // Only store very small documents to avoid quota issues
        if (file.size <= 500 * 1024) {
          // 500KB limit for documents
          const reader = new FileReader();
          reader.onload = (e) => {
            const newFile = {
              id: Date.now() + Math.random(),
              file: file,
              type: fileType,
              name: file.name,
              size: file.size,
              url: null,
              fileData: e.target.result,
              storedLocally: true,
            };
            setAttachedFiles((prev) => [...prev, newFile]);
          };
          reader.readAsDataURL(file);
        } else {
          // For larger documents, store metadata only
          const newFile = {
            id: Date.now() + Math.random(),
            file: file,
            type: fileType,
            name: file.name,
            size: file.size,
            url: null,
            fileData: `document_placeholder_${Date.now()}`,
            storedLocally: false,
          };
          setAttachedFiles((prev) => [...prev, newFile]);
        }
      } else if (fileType === "video") {
        // For videos, create object URL for preview but don't store in localStorage
        const newFile = {
          id: Date.now() + Math.random(),
          file: file,
          type: fileType,
          name: file.name,
          size: file.size,
          url: URL.createObjectURL(file),
          fileData: `video_placeholder_${Date.now()}`,
          storedLocally: false,
        };
        setAttachedFiles((prev) => [...prev, newFile]);
      }
    });

    // Reset input value to allow same file upload again
    event.target.value = "";
  };

  const removeFile = (fileId) => {
    setAttachedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handlePost = () => {
    if (postText.trim() || attachedFiles.length > 0) {
      try {
        // Create a new post object
        const newPost = {
          id: Date.now(),
          author: {
            name: "User",
            title: "Student/Alumni",
            avatar: "U",
            verified: false,
          },
          content: postText,
          timestamp: "now",
          likes: 0,
          comments: 0,
          shares: 0,
          liked: false,
          attachments: attachedFiles.map((file) => ({
            id: file.id,
            name: file.name,
            type: file.type,
            size: file.size,
            url: file.storedLocally ? file.url : null, // Only store URLs for files that are stored locally
            fileData: file.storedLocally ? file.fileData : file.fileData, // Store placeholders for large files
            storedLocally: file.storedLocally,
            previewText:
              file.type === "video"
                ? "🎥 Video file (session only)"
                : file.type === "document" && !file.storedLocally
                ? "📄 Document file (not stored)"
                : file.type === "document"
                ? "📄 Document file"
                : null,
          })),
        };

        // Get existing posts from localStorage
        const existingPosts = JSON.parse(
          localStorage.getItem("feedPosts") || "[]"
        );

        // Add new post to the beginning of the array
        existingPosts.unshift(newPost);

        // Try to save to localStorage with error handling
        try {
          // Check if the data is too large before saving
          const dataSize = JSON.stringify(existingPosts).length;
          if (dataSize > 4.5 * 1024 * 1024) {
            // 4.5MB limit to be safe
            // Remove oldest posts to make space
            const reducedPosts = existingPosts.slice(
              0,
              Math.max(1, existingPosts.length - 10)
            );
            localStorage.setItem("feedPosts", JSON.stringify(reducedPosts));
            alert("Storage limit reached. Removed oldest posts to make space.");
          } else {
            localStorage.setItem("feedPosts", JSON.stringify(existingPosts));
          }
        } catch (quotaError) {
          if (quotaError.name === "QuotaExceededError") {
            // Aggressively remove posts to make space
            const reducedPosts = existingPosts.slice(
              0,
              Math.max(1, Math.floor(existingPosts.length / 2))
            );
            try {
              localStorage.setItem("feedPosts", JSON.stringify(reducedPosts));
              alert(
                "Storage limit reached. Removed many old posts to make space."
              );
            } catch (stillError) {
              // If still failing, clear all posts except the new one
              localStorage.setItem("feedPosts", JSON.stringify([newPost]));
              alert(
                "Storage severely limited. Cleared old posts to save your new post."
              );
            }
          } else {
            throw quotaError;
          }
        }

        // Reset form after posting
        setPostText("");
        setAttachedFiles([]);

        // Show success message
        alert("Post created successfully!");

        // Trigger a custom event to notify FeedArea of new post
        window.dispatchEvent(new Event("newPost"));
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Failed to create post. Please try with smaller files.");
      }
    }
  };

  return (
    <div
      className="rounded-xl shadow-sm border p-4"
      style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
    >
      <div className="flex items-start space-x-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
          style={{ backgroundColor: "#6EA9CB" }}
        >
          P
        </div>

        <div className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Start a post..."
            className="w-full min-h-[60px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:border-transparent text-sm"
            style={{
              borderColor: "#DCE8F2",
              backgroundColor: "#F7FAFC",
              color: "#1F2D3D",
              "--tw-ring-color": "#6EA9CB",
            }}
            rows="3"
          />

          {/* File Attachments Preview */}
          {attachedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachedFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative border rounded-lg p-3"
                  style={{ borderColor: "#DCE8F2", backgroundColor: "#F7FAFC" }}
                >
                  <button
                    onClick={() => removeFile(file.id)}
                    className="absolute top-2 right-2 p-1 rounded-full transition-colors"
                    style={{ backgroundColor: "#DCE8F2" }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#B5D3E7")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#DCE8F2")
                    }
                  >
                    <X className="w-4 h-4" style={{ color: "#1F2D3D" }} />
                  </button>

                  {file.type === "photo" && (
                    <div className="flex items-center space-x-3">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#1F2D3D" }}
                        >
                          {file.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "#1F2D3D", opacity: "0.6" }}
                        >
                          {formatFileSize(file.size)}
                        </p>
                        {file.storedLocally ? (
                          <p className="text-xs" style={{ color: "#6EA9CB" }}>
                            Stored locally
                          </p>
                        ) : (
                          <p
                            className="text-xs"
                            style={{ color: "#6EA9CB", opacity: "0.8" }}
                          >
                            Preview only (session)
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {file.type === "video" && (
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#DCE8F2" }}
                      >
                        <Video
                          className="w-8 h-8"
                          style={{ color: "#1F2D3D" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#1F2D3D" }}
                        >
                          {file.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "#1F2D3D", opacity: "0.6" }}
                        >
                          {formatFileSize(file.size)}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "#6EA9CB", opacity: "0.8" }}
                        >
                          Preview only (session)
                        </p>
                      </div>
                    </div>
                  )}

                  {file.type === "document" && (
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-16 h-16 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "#DCE8F2" }}
                      >
                        <FileText
                          className="w-8 h-8"
                          style={{ color: "#1F2D3D" }}
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: "#1F2D3D" }}
                        >
                          {file.name}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "#1F2D3D", opacity: "0.6" }}
                        >
                          {formatFileSize(file.size)}
                        </p>
                        {file.storedLocally ? (
                          <p className="text-xs" style={{ color: "#6EA9CB" }}>
                            Will be stored and downloadable
                          </p>
                        ) : (
                          <p
                            className="text-xs"
                            style={{ color: "#6EA9CB", opacity: "0.8" }}
                          >
                            Metadata only (not downloadable)
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Hidden file inputs */}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileUpload(e, "photo")}
            className="hidden"
          />
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            multiple
            onChange={(e) => handleFileUpload(e, "video")}
            className="hidden"
          />
          <input
            ref={documentInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
            multiple
            onChange={(e) => handleFileUpload(e, "document")}
            className="hidden"
          />

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#1F2D3D" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#DCE8F2")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Photo</span>
              </button>
              <button
                onClick={() => videoInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#1F2D3D" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#DCE8F2")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <Video className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Video</span>
              </button>
              <button
                onClick={() => documentInputRef.current?.click()}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#1F2D3D" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#DCE8F2")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Document</span>
              </button>
              <button
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: "#1F2D3D" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#DCE8F2")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                <Smile className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handlePost}
              disabled={!postText.trim() && attachedFiles.length === 0}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                postText.trim() || attachedFiles.length > 0
                  ? "text-white"
                  : "cursor-not-allowed"
              }`}
              style={
                postText.trim() || attachedFiles.length > 0
                  ? { backgroundColor: "#6EA9CB" }
                  : {
                      backgroundColor: "#DCE8F2",
                      color: "#1F2D3D",
                      opacity: "0.5",
                    }
              }
              onMouseEnter={(e) => {
                if (postText.trim() || attachedFiles.length > 0) {
                  e.target.style.backgroundColor = "#5A8FB3";
                }
              }}
              onMouseLeave={(e) => {
                if (postText.trim() || attachedFiles.length > 0) {
                  e.target.style.backgroundColor = "#6EA9CB";
                }
              }}
            >
              Post
            </button>
          </div>

          {/* Storage Information */}
          <div
            className="mt-2 text-xs text-center"
            style={{ color: "#1F2D3D", opacity: "0.6" }}
          >
            💡 Small files (photos ≤1MB, documents ≤500KB) stored locally.
            Larger files shown as previews only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
