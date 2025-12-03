import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  MessageCircle,
  TrendingUp,
  Users,
  Briefcase,
  Settings,
  FileText,
  Calendar,
  Heart,
  Share2,
  Eye,
} from "lucide-react";

const GrowthMarketing = ({ isOwner, startupData }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: "milestone",
      icon: "🎉",
      title: "Raised $500K Seed Round",
      description:
        "We're excited to announce our successful seed funding round led by TechVentures Capital.",
      timestamp: "2 hours ago",
      engagement: { likes: 24, comments: 8, shares: 3 },
      category: "Milestones",
    },
    {
      id: 2,
      type: "post",
      icon: "📝",
      title: "The Future of AI in Startups",
      description:
        "Our CEO shares insights on how artificial intelligence is transforming the startup ecosystem.",
      timestamp: "1 day ago",
      engagement: { likes: 42, comments: 15, shares: 8 },
      category: "Posts",
    },
    {
      id: 3,
      type: "hiring",
      icon: "👥",
      title: "New CTO Joins Our Team",
      description:
        "Welcome Sarah Johnson as our new Chief Technology Officer! She brings 10+ years of experience.",
      timestamp: "3 days ago",
      engagement: { likes: 18, comments: 5, shares: 2 },
      category: "Hiring",
    },
    {
      id: 4,
      type: "product",
      icon: "�",
      title: "Product Update v2.1 Released",
      description:
        "New features include advanced analytics, improved UI, and better performance.",
      timestamp: "1 week ago",
      engagement: { likes: 35, comments: 12, shares: 6 },
      category: "Product",
    },
    {
      id: 5,
      type: "event",
      icon: "🎯",
      title: "Speaking at TechCrunch Disrupt",
      description:
        "Our founder will be presenting at the Startup Battlefield competition next month.",
      timestamp: "2 weeks ago",
      engagement: { likes: 28, comments: 7, shares: 4 },
      category: "Events",
    },
  ]);

  const [newActivity, setNewActivity] = useState({
    type: "post",
    title: "",
    description: "",
    category: "Posts",
  });

  const activityTypes = [
    {
      value: "post",
      label: "Post & Announcement",
      icon: "📝",
      category: "Posts",
    },
    {
      value: "milestone",
      label: "Milestone",
      icon: "🎉",
      category: "Milestones",
    },
    {
      value: "hiring",
      label: "Hiring Activity",
      icon: "👥",
      category: "Hiring",
    },
    {
      value: "product",
      label: "Product Update",
      icon: "🔧",
      category: "Product",
    },
    {
      value: "event",
      label: "Event/Networking",
      icon: "🎯",
      category: "Events",
    },
    {
      value: "engagement",
      label: "Community Engagement",
      icon: "💬",
      category: "Engagements",
    },
    { value: "media", label: "Document/Media", icon: "🗂️", category: "Media" },
  ];

  const handleAddActivity = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveActivity = () => {
    if (newActivity.title.trim() && newActivity.description.trim()) {
      const selectedType = activityTypes.find(
        (type) => type.value === newActivity.type
      );
      const activity = {
        id: activities.length + 1,
        type: newActivity.type,
        icon: selectedType.icon,
        title: newActivity.title,
        description: newActivity.description,
        timestamp: "Just now",
        engagement: { likes: 0, comments: 0, shares: 0 },
        category: selectedType.category,
      };
      setActivities([activity, ...activities]);
      setNewActivity({
        type: "post",
        title: "",
        description: "",
        category: "Posts",
      });
      setIsAddModalOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setNewActivity({
      type: "post",
      title: "",
      description: "",
      category: "Posts",
    });
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "type") {
      const selectedType = activityTypes.find((type) => type.value === value);
      setNewActivity((prev) => ({
        ...prev,
        [field]: value,
        category: selectedType.category,
      }));
    } else {
      setNewActivity((prev) => ({ ...prev, [field]: value }));
    }
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Activity</h1>
              <p className="text-sm text-gray-600 mt-1">
                Share an update, celebrate a milestone, or announce exciting
                news
              </p>
            </div>
            <button
              onClick={handleAddActivity}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Post
            </button>
          </div>

          {/* Activity Feed */}
          <div className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{activity.icon}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                            {activity.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {activity.timestamp}
                          </span>
                        </div>
                        <h3 className="text-base font-medium text-gray-900 mb-2">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                          {activity.description}
                        </p>

                        {/* Engagement */}
                        <div className="flex items-center gap-6 text-xs text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span>{activity.engagement.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>{activity.engagement.comments}</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span>{activity.engagement.shares}</span>
                          </button>
                          <div className="flex items-center gap-1 ml-auto">
                            <Eye className="w-4 h-4" />
                            <span>
                              {Math.floor(Math.random() * 200) + 50} views
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="p-6 text-center border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Show more activity
            </button>
          </div>
        </div>
      </div>

      {/* Add Activity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create Activity Post
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Activity Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activity Type *
                </label>
                <select
                  value={newActivity.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {activityTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter a compelling title for your activity"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Share details about your activity, achievement, or announcement..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newActivity.description.length}/500 characters
                </p>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                  💡 Tips for Great Posts:
                </h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Be specific about achievements and milestones</li>
                  <li>• Include relevant details that showcase growth</li>
                  <li>
                    • Use engaging language that reflects your startup culture
                  </li>
                  <li>• Consider adding a call-to-action if appropriate</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveActivity}
                disabled={
                  !newActivity.title.trim() || !newActivity.description.trim()
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post Activity
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GrowthMarketing;
