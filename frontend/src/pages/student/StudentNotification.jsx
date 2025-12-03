import React, { useState } from "react";
import {
  Settings,
  MoreHorizontal,
  Briefcase,
  UserPlus,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bell,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "connection",
      avatar: "MC",
      name: "Michael Chen",
      action: "accepted your connection request",
      time: "5m ago",
      unread: true,
      icon: UserPlus,
      details: "Senior Software Engineer at Innovation Labs",
    },
    {
      id: 2,
      type: "like",
      avatar: "SJ",
      name: "Sarah Johnson",
      action: "and 12 others liked your post",
      time: "1h ago",
      unread: true,
      icon: ThumbsUp,
      postPreview: "Excited to share that we've launched our new product...",
    },
    {
      id: 3,
      type: "comment",
      avatar: "ER",
      name: "Emily Rodriguez",
      action: "commented on your post",
      time: "2h ago",
      unread: true,
      icon: MessageSquare,
      comment: "Great insights! Would love to discuss this further.",
      postPreview: "The future of AI in product design",
    },
    {
      id: 4,
      type: "job",
      avatar: "TC",
      name: "Tech Corp",
      action: "posted a new job that matches your profile",
      time: "3h ago",
      unread: false,
      icon: Briefcase,
      details: "Senior Product Manager - Remote",
    },
    {
      id: 5,
      type: "share",
      avatar: "DK",
      name: "David Kim",
      action: "shared your article",
      time: "5h ago",
      unread: false,
      icon: Share2,
      postPreview: "Building Scalable Systems: Lessons Learned",
    },
    {
      id: 6,
      type: "like",
      avatar: "JW",
      name: "Jessica Williams",
      action: "liked your comment",
      time: "1d ago",
      unread: false,
      icon: ThumbsUp,
      comment: "This is exactly what I was looking for!",
    },
    {
      id: 7,
      type: "connection",
      avatar: "RT",
      name: "Robert Taylor",
      action: "and 5 others viewed your profile",
      time: "1d ago",
      unread: false,
      icon: Eye,
      details: "VP of Engineering at StartupXYZ",
    },
    {
      id: 8,
      type: "comment",
      avatar: "AB",
      name: "Amanda Brown",
      action: "mentioned you in a comment",
      time: "2d ago",
      unread: false,
      icon: MessageSquare,
      comment: "@You might find this interesting based on your recent work",
    },
    {
      id: 9,
      type: "job",
      avatar: "GL",
      name: "Growth Labs",
      action: "posted a new job opportunity",
      time: "2d ago",
      unread: false,
      icon: Briefcase,
      details: "Lead Designer - San Francisco",
    },
    {
      id: 10,
      type: "like",
      avatar: "JA",
      name: "James Anderson",
      action: "and 23 others reacted to your article",
      time: "3d ago",
      unread: false,
      icon: ThumbsUp,
      postPreview: "The Art of Effective Communication in Remote Teams",
    },
  ]);

  const filters = [
    { name: "All", count: notifications.length },
    { name: "My posts", count: 5 },
    { name: "Mentions", count: 1 },
    { name: "Jobs", count: 2 },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIconColor = (type) => {
    switch (type) {
      case "connection":
        return "text-blue-600";
      case "like":
        return "text-red-600";
      case "comment":
        return "text-green-600";
      case "job":
        return "text-purple-600";
      case "share":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-400 rounded-full">
                  {unreadCount}
                </span>
              )}
            </h1>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-300 hover:text-blue-400 font-semibold"
                >
                  Mark all as read
                </button>
              )}
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Filter by:
              </h3>
              <ul className="space-y-2">
                {filters.map((filter) => (
                  <li key={filter.name}>
                    <button
                      onClick={() => setSelectedFilter(filter.name)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                        selectedFilter === filter.name
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{filter.name}</span>
                      {filter.count > 0 && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            selectedFilter === filter.name
                              ? "bg-blue-400 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {filter.count}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-sm text-gray-600">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-gray-50 transition-colors ${
                        notification.unread ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar with Icon Badge */}
                        <div className="relative flex-shrink-0">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-300 to-blue-400 flex items-center justify-center text-white font-semibold">
                            {notification.avatar}
                          </div>
                          <div
                            className={`absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm ${getIconColor(
                              notification.type
                            )}`}
                          >
                            <notification.icon className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Notification Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">
                                <span className="font-semibold">
                                  {notification.name}
                                </span>{" "}
                                <span className="text-gray-700">
                                  {notification.action}
                                </span>
                              </p>

                              {notification.details && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.details}
                                </p>
                              )}

                              {notification.comment && (
                                <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                                  <p className="text-sm text-gray-700 italic">
                                    "{notification.comment}"
                                  </p>
                                </div>
                              )}

                              {notification.postPreview && (
                                <div className="mt-2 p-3 bg-gray-100 rounded-lg">
                                  <p className="text-sm text-gray-700 line-clamp-2">
                                    {notification.postPreview}
                                  </p>
                                </div>
                              )}

                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-1 ml-2">
                              {notification.unread && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1.5 hover:bg-gray-200 rounded-full"
                                  title="Mark as read"
                                >
                                  <Eye className="w-4 h-4 text-gray-600" />
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="p-1.5 hover:bg-gray-200 rounded-full"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-gray-600" />
                              </button>
                              <button className="p-1.5 hover:bg-gray-200 rounded-full">
                                <MoreHorizontal className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons for specific notification types */}
                          {notification.type === "connection" &&
                            notification.action.includes(
                              "connection request"
                            ) && (
                              <div className="flex space-x-2 mt-3">
                                <button className="flex-1 bg-blue-300 text-white hover:bg-blue-400 font-semibold py-2 px-4 rounded-full transition-colors text-sm">
                                  Accept
                                </button>
                                <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-full transition-colors text-sm">
                                  Ignore
                                </button>
                              </div>
                            )}

                          {notification.type === "job" && (
                            <div className="mt-3">
                              <button className="border border-blue-400 text-blue-400 hover:bg-blue-50 font-semibold py-2 px-4 rounded-full transition-colors text-sm">
                                View Job
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="mt-4 text-center">
                <button className="text-sm text-blue-300 hover:text-blue-400 font-semibold">
                  Load more notifications
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
