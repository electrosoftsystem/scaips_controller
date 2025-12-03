import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  BookmarkPlus,
  MoreHorizontal,
  Clock,
  Loader2,
  Video,
} from "lucide-react";
import apiService from "../../services/apiService";
import { useAuth } from "../../contexts/AuthContext";

const AllPostsFeed = ({ refreshTrigger, onRefreshReady }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Fetch all posts from backend
  useEffect(() => {
    if (isAuthenticated) {
      fetchAllPosts();
    } else {
      setLoading(false);
      setError("Please log in to view posts");
    }
  }, [isAuthenticated, refreshTrigger]);

  // Expose refresh function to parent component
  useEffect(() => {
    if (onRefreshReady) {
      onRefreshReady(fetchAllPosts);
    }
  }, [onRefreshReady]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Fetching all posts...");

      // Fetch all posts (no userId/userType filter)
      const response = await apiService.getPosts({ limit: 100 });
      const postsData = response.data || [];

      console.log("📦 Received posts:", postsData);

      // Transform the data to match expected format
      const transformedPosts = postsData.map((post) => ({
        ...post,
        // Map API fields to component fields
        created_at: post.createdAt || post.created_at,
        media: post.post_media || post.media || [],
        // Add user data from author
        user: post.author || {
          first_name: post.author?.name?.split(" ")[0] || "Anonymous",
          last_name: post.author?.name?.split(" ").slice(1).join(" ") || "",
          profile_pic: post.author?.profilePicture,
          email: post.author?.email,
          fullName: post.author?.fullName || post.author?.name,
        },
        // Keep bookmarked state in local state
        bookmarked: false,
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error("❌ Error fetching all posts:", error);
      console.error("❌ Error message:", error.message);
      setError(`Failed to load posts: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    }
  };

  const handleLike = async (postId) => {
    try {
      await apiService.reactToPost(postId, { reactionType: "like" });
      // Update local state
      setPosts(
        posts.map((post) =>
          post.post_id === postId
            ? {
                ...post,
                liked: !post.liked,
                reaction_count: post.liked
                  ? parseInt(post.reaction_count || 0) - 1
                  : parseInt(post.reaction_count || 0) + 1,
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

  const renderPost = (post, index) => {
    const user = post.user || post.author;
    const hasMedia = post.media && post.media.length > 0;

    // Get display name from author data
    const displayName =
      user?.fullName ||
      user?.name ||
      `${user?.first_name || ""} ${user?.last_name || ""}`.trim() ||
      "Anonymous User";

    const profilePic = user?.profilePicture || user?.profile_pic;
    const userType = post.authorType || "User";
    const userEmail = user?.email;

    return (
      <div
        key={post.post_id || index}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-4 hover:shadow-sm transition-shadow"
      >
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm overflow-hidden">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt={displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.textContent = displayName
                      .charAt(0)
                      .toUpperCase();
                  }}
                />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {displayName}
              </h4>

              <p className="text-gray-600 text-xs capitalize">{userType}</p>
              {userEmail && (
                <p className="text-gray-500 text-xs">{userEmail}</p>
              )}
              <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(post.created_at)}</span>
              </div>
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          {post.title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {post.title}
            </h3>
          )}

          {post.content && (
            <p className="text-gray-800 text-sm leading-relaxed mb-3">
              {post.content}
            </p>
          )}

          {/* Media Display */}
          {hasMedia && (
            <div className="mt-3">
              {post.media.length === 1 ? (
                // Single media item
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  {post.media[0].media_type === "image" ||
                  post.media[0].type === "image" ? (
                    <img
                      src={apiService.getMediaUrl(
                        post.media[0].media_url || post.media[0].url
                      )}
                      alt="Post media"
                      className="w-full max-h-96 object-cover"
                      onError={(e) => {
                        console.error("Failed to load image:", e.target.src);
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <video
                      src={apiService.getMediaUrl(
                        post.media[0].media_url || post.media[0].url
                      )}
                      controls
                      className="w-full max-h-96"
                    />
                  )}
                </div>
              ) : (
                // Multiple media items
                <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                  {post.media.slice(0, 4).map((media, idx) => (
                    <div
                      key={media.media_id || media.id || idx}
                      className="relative border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {media.media_type === "image" ||
                      media.type === "image" ? (
                        <img
                          src={apiService.getMediaUrl(
                            media.media_url || media.url
                          )}
                          alt={`Post media ${idx + 1}`}
                          className="w-full h-32 object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-900 flex items-center justify-center">
                          <Video className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {idx === 3 && post.media.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                          +{post.media.length - 4}
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

            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
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
            onClick={fetchAllPosts}
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
            Be the first to share something with the community!
          </p>
        </div>
      )}
    </div>
  );
};

export default AllPostsFeed;
