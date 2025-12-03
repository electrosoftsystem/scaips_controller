import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Clock,
  Users,
  Image as ImageIcon,
  Video,
  Loader2,
  AlertCircle,
} from "lucide-react";
import apiService from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";

const FeedArea = ({
  refreshTrigger,
  onRefreshReady,
  isOwner = false,
  userId = null,
  userRole = null,
}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({}); // Store comment text for each post
  const [showComments, setShowComments] = useState({}); // Show/hide comments for each post
  const [postComments, setPostComments] = useState({}); // Store comments for each post
  const [commentLoading, setCommentLoading] = useState({}); // Loading state for comments
  const { isAuthenticated, user } = useAuth();

  // Helper functions for author display
  const getAuthorInitials = (author) => {
    if (!author || !author.fullName) return "U";

    return author.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2); // Limit to 2 characters
  };

  const getAuthorDisplayName = (author) => {
    if (!author) return "Unknown User";
    return author.fullName || author.name || "Unknown User";
  };

  const getAuthorRole = (author) => {
    if (!author) return "Student";
    const userType = author.userType || author.role || "student";
    return userType.charAt(0).toUpperCase() + userType.slice(1);
  };

  // Helper function to parse media field
  const parseMediaField = (media) => {
    if (!media) return [];
    if (Array.isArray(media)) return media;
    if (typeof media === "string") {
      try {
        return JSON.parse(media);
      } catch (e) {
        console.error("Failed to parse media JSON:", e);
        return [];
      }
    }
    return [];
  };

  // Component for image fallback
  const ImageFallback = ({ className, size = "large", error }) => (
    <div
      className={`${className} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}
    >
      <div className="text-center p-4">
        <AlertCircle
          className={`${
            size === "large" ? "w-12 h-12" : "w-6 h-6"
          } text-red-400 mx-auto mb-2`}
        />
        <p className="text-gray-500 text-sm">Image failed to load</p>
        {error && (
          <p className="text-red-500 text-xs mt-1 max-w-xs break-words">
            {error}
          </p>
        )}
      </div>
    </div>
  );

  // Enhanced image component with better error handling
  const MediaImage = ({ media, className, alt, onError, onLoad }) => {
    const [imageError, setImageError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleError = (e) => {
      const errorMsg = `Failed to load: ${e.target.src}`;
      console.error("❌ Image load error:", errorMsg);
      setImageError(errorMsg);
      setIsLoading(false);
      if (onError) onError(e);
    };

    const handleLoad = (e) => {
      console.log("✅ Image loaded successfully:", e.target.src);
      setIsLoading(false);
      if (onLoad) onLoad(e);
    };

    const imageUrl = apiService.getMediaUrl(media.media_url);

    if (failedImages.has(media.media_url) || imageError) {
      return <ImageFallback className={className} error={imageError} />;
    }

    return (
      <div className="relative">
        {isLoading && (
          <div
            className={`${className} bg-gray-200 flex items-center justify-center`}
          >
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={alt}
          className={`${className} ${isLoading ? "hidden" : ""}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    );
  };

  // Fetch posts from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    } else {
      setLoading(false);
      setError("Please log in to view posts");
    }
  }, [isAuthenticated, refreshTrigger, userId, userRole]);

  // Expose refresh function to parent component
  useEffect(() => {
    if (onRefreshReady) {
      onRefreshReady(fetchPosts);
    }
  }, [onRefreshReady]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      // If userId and userRole are provided, fetch that user's posts
      // Otherwise, fetch current user's posts
      if (userId && userRole) {
        console.log(
          `🔄 Fetching posts for user ${userId} with role ${userRole}...`
        );
        response = await apiService.getUserPosts(userId, userRole, {
          limit: 50,
        });
      } else {
        response = await apiService.getMyPosts({
          limit: 50,
        });
      }

      if (response.data && response.data.length > 0) {
        const firstPost = response.data[0];

        const parsedMedia = parseMediaField(firstPost.media);

        if (parsedMedia && parsedMedia.length > 0) {
          const originalUrl = parsedMedia[0].media_url;
          const constructedUrl = apiService.getMediaUrl(originalUrl);
        }
      }

      setPosts(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
      setError(`Failed to load posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Format time ago with proper validation
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Just now";

    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date string:", dateString);
      return "Recently";
    }

    const now = new Date();
    const diffInMs = now - date;

    // Handle negative differences (future dates)
    if (diffInMs < 0) {
      return "Just now";
    }

    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const handleLike = async (postId) => {
    try {
      await apiService.reactToPost(postId, { reactionType: "like" });
      setPosts(
        posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                liked: !post.liked,
                reaction_count: post.liked
                  ? parseInt(post.reaction_count) - 1
                  : parseInt(post.reaction_count) + 1,
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) =>
        post.post_id === postId
          ? { ...post, bookmarked: !post.bookmarked }
          : post
      )
    );
  };

  const handleCommentToggle = async (postId) => {
    const isCurrentlyShown = showComments[postId];

    // Toggle visibility
    setShowComments((prev) => ({
      ...prev,
      [postId]: !isCurrentlyShown,
    }));

    // If we're showing comments for the first time, fetch them
    if (!isCurrentlyShown && !postComments[postId]) {
      await fetchComments(postId);
    }
  };

  const fetchComments = async (postId) => {
    try {
      setCommentLoading((prev) => ({ ...prev, [postId]: true }));
      const response = await apiService.getPostComments(postId);

      setPostComments((prev) => ({
        ...prev,
        [postId]: response.data || [],
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentLoading((prev) => ({ ...prev, [postId]: false }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    try {
      const response = await apiService.addComment(postId, {
        commentText: commentText.trim(),
      });

      // Add the new comment to the local state
      setPostComments((prev) => ({
        ...prev,
        [postId]: [response.data, ...(prev[postId] || [])],
      }));

      // Update the comment count in posts
      setPosts(
        posts.map((post) =>
          post.post_id === postId
            ? { ...post, comment_count: (post.comment_count || 0) + 1 }
            : post
        )
      );

      // Clear the input
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const renderPost = (post) => {
    // Use the author information from backend instead of placeholder
    const author = post.author || {
      fullName: "Unknown User",
      userType: "student",
      profilePicture: null,
    };

    // Debug: Log the complete post object to understand the structure
    // console.log(`🔍 Complete post object ${post.post_id}:`, post);
    // console.log(`👤 Author data:`, author);

    // Parse media field properly
    const mediaArray = parseMediaField(post.post_media);
    const hasMedia = mediaArray && mediaArray.length > 0;

    return (
      <div
        key={post.post_id}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-sm transition-shadow"
      >
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden relative">
              {author?.profilePicture ? (
                <img
                  src={apiService.getMediaUrl(author.profilePicture)}
                  alt={getAuthorDisplayName(author)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.warn(
                      "❌ Profile picture failed to load:",
                      author.profilePicture
                    );
                    // Hide the failed image and show initials
                    e.target.style.display = "none";
                    e.target.parentNode.querySelector(
                      ".initials-fallback"
                    ).style.display = "flex";
                  }}
                  onLoad={() => {
                    // console.log(
                    //   "✅ Profile picture loaded:",
                    //   author.profilePicture
                    // );
                    // Hide initials when image loads
                    const initialsEl =
                      e.target.parentNode.querySelector(".initials-fallback");
                    if (initialsEl) initialsEl.style.display = "none";
                  }}
                />
              ) : null}
              <span
                className={`initials-fallback absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 ${
                  author?.profilePicture ? "hidden" : ""
                }`}
              >
                {getAuthorInitials(author)}
              </span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {getAuthorDisplayName(author)}
              </h4>
              <p className="text-gray-600 text-xs">{getAuthorRole(author)}</p>
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.createdAt || post.created_at)}</span>
              </div>
            </div>
          </div>
          {isOwner && (
            <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Post Content */}
        <div className="mb-4">
          {post.content && (
            <p className="text-gray-800 text-sm leading-relaxed mb-3">
              {post.content}
            </p>
          )}

          {/* Enhanced Media Display */}
          {hasMedia && (
            <div className="mt-3">
              {mediaArray.length === 1 ? (
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  {mediaArray[0].media_type === "image" ? (
                    <MediaImage
                      media={mediaArray[0]}
                      className="w-full max-h-96 object-cover"
                      alt="Post media"
                      onError={(e) => {
                        setFailedImages(
                          (prev) => new Set([...prev, mediaArray[0].media_url])
                        );
                      }}
                    />
                  ) : (
                    <video
                      src={apiService.getMediaUrl(mediaArray[0].media_url)}
                      controls
                      className="w-full max-h-96"
                      onError={(e) => {
                        console.error("❌ Failed to load video:", e.target.src);
                      }}
                      onLoadedData={() => {
                        console.log("✅ Video loaded successfully");
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                  {mediaArray.slice(0, 4).map((media, index) => (
                    <div
                      key={media.media_id || index}
                      className="relative border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {media.media_type === "image" ? (
                        <MediaImage
                          media={media}
                          className="w-full h-32 object-cover"
                          alt={`Post media ${index + 1}`}
                          onError={(e) => {
                            setFailedImages(
                              (prev) => new Set([...prev, media.media_url])
                            );
                          }}
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-900 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {index === 3 && mediaArray.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                          +{mediaArray.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLike(post.post_id)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                post.liked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-500 hover:text-red-500"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`}
              />
              <span>{post.reaction_count || 0}</span>
            </button>

            <button
              onClick={() => handleCommentToggle(post.post_id)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                showComments[post.post_id]
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.comment_count || 0}</span>
            </button>

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>{post.share_count || 0}</span>
            </button>
          </div>

          <button
            onClick={() => handleBookmark(post.post_id)}
            className={`p-2 rounded-full transition-colors ${
              post.bookmarked
                ? "text-blue-500 bg-blue-50 hover:bg-blue-100"
                : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
            }`}
            title={post.bookmarked ? "Remove bookmark" : "Bookmark post"}
          >
            <BookmarkPlus
              className={`w-4 h-4 ${post.bookmarked ? "fill-current" : ""}`}
            />
          </button>
        </div>

        {/* Comments Section */}
        {showComments[post.post_id] && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Comment Input */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                {user?.firstName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInputs[post.post_id] || ""}
                  onChange={(e) =>
                    handleCommentInputChange(post.post_id, e.target.value)
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCommentSubmit(post.post_id);
                    }
                  }}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => handleCommentSubmit(post.post_id)}
                  disabled={!commentInputs[post.post_id]?.trim()}
                  className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Post
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {commentLoading[post.post_id] ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-500 text-sm">
                    Loading comments...
                  </span>
                </div>
              ) : (
                postComments[post.post_id]?.map((comment) => (
                  <div
                    key={comment.comment_id}
                    className="flex items-start gap-3"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-xs overflow-hidden">
                      {comment.author?.profilePicture ? (
                        <img
                          src={apiService.getMediaUrl(
                            comment.author.profilePicture
                          )}
                          alt={comment.author.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getAuthorInitials(comment.author)
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">
                            {getAuthorDisplayName(comment.author)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getAuthorRole(comment.author)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800">
                          {comment.comment_text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 ml-3">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(comment.created_at)}
                        </span>
                        <button className="text-xs text-gray-500 hover:text-blue-500 font-medium">
                          Like
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-500 font-medium">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Error Loading Posts
          </h3>
          <p className="text-gray-500 text-sm mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : posts.length > 0 ? (
        posts.map(renderPost)
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No posts yet
          </h3>
          <p className="text-gray-500 text-sm">
            {isOwner
              ? "Start connecting with your network to see posts and updates here."
              : "This user hasn't posted anything yet."}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedArea;
