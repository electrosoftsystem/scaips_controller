import React, { useState } from "react";
import { TrendingUp, Users, Calendar, BookOpen, Award, ExternalLink, Bell } from "lucide-react";

const StudentSidebar = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "opportunity",
      title: "New Internship Opening",
      description: "React Developer position at TechCorp",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      type: "event",
      title: "Tech Talk: AI in Healthcare",
      description: "Tomorrow at 3:00 PM",
      time: "1 day ago",
      unread: true
    },
    {
      id: 3,
      type: "achievement",
      title: "Profile Completeness",
      description: "Your profile is 85% complete",
      time: "2 days ago",
      unread: false
    }
  ]);

  const [trending, setTrending] = useState([
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      category: "Course",
      engagement: "234 students enrolled",
      link: "#"
    },
    {
      id: 2,
      title: "React Developer Bootcamp",
      category: "Workshop",
      engagement: "89 participants",
      link: "#"
    },
    {
      id: 3,
      title: "Open Source Contribution Guide",
      category: "Resource",
      engagement: "156 views",
      link: "#"
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "Career Fair 2024",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      type: "Career"
    },
    {
      id: 2,
      title: "Coding Competition",
      date: "March 20, 2024",
      time: "2:00 PM - 6:00 PM",
      type: "Competition"
    },
    {
      id: 3,
      title: "Alumni Networking",
      date: "March 25, 2024",
      time: "6:00 PM - 8:00 PM",
      type: "Networking"
    }
  ]);

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, unread: false } : notif
    ));
  };

  const getIconForNotificationType = (type) => {
    switch (type) {
      case "opportunity":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "event":
        return <Calendar className="w-4 h-4 text-green-500" />;
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case "Career":
        return "bg-blue-100 text-blue-700";
      case "Competition":
        return "bg-red-100 text-red-700";
      case "Networking":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
          <Bell className="w-4 h-4 text-gray-400" />
        </div>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                notification.unread 
                  ? 'bg-blue-50 border border-blue-200 hover:bg-blue-100' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                {getIconForNotificationType(notification.type)}
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium ${
                    notification.unread ? 'text-gray-900' : 'text-gray-700'
                  }`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All Notifications
        </button>
      </div>

      {/* Trending Learning */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">Trending Learning</h3>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <div className="space-y-3">
          {trending.map((item) => (
            <div key={item.id} className="group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.engagement}
                  </p>
                </div>
                <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors opacity-0 group-hover:opacity-100">
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
          Explore More Resources
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 text-sm">Upcoming Events</h3>
          <Calendar className="w-4 h-4 text-blue-500" />
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xs font-medium text-gray-900 line-clamp-1">
                  {event.title}
                </h4>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${getEventTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-1">{event.date}</p>
              <p className="text-xs text-gray-500">{event.time}</p>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All Events
        </button>
      </div>

      {/* Quick Stats */}
      {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 text-sm mb-4">Your Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Profile Completeness</span>
            <span className="text-xs font-medium text-gray-900">85%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Network Connections</span>
            <span className="text-xs font-medium text-gray-900">150+</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Skills Endorsed</span>
            <span className="text-xs font-medium text-gray-900">12</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Projects Completed</span>
            <span className="text-xs font-medium text-gray-900">8</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default StudentSidebar;
