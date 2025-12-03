import React from "react";
import { TrendingUp, Eye } from "lucide-react";

const NewsSidebar = ({ isOwner }) => {
  const trendingNews = [
    {
      id: 1,
      title: "Industry 4.0: Automation Trends",
      subtitle: "Manufacturing sector leads innovation",
      time: "1h ago",
      views: "1,100 readers",
    },
    {
      id: 2,
      title: "Green Energy Expansion",
      subtitle: "Renewables gain momentum",
      time: "3h ago",
      views: "900 readers",
    },
    {
      id: 3,
      title: "Tech Skills in Demand",
      subtitle: "Upskilling for the future",
      time: "5h ago",
      views: "1,500 readers",
    },
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Priya Singh",
      title: "Industry Analyst",
      mutualConnections: 10,
      avatar: "P",
    },
    {
      id: 2,
      name: "Rahul Mehta",
      title: "Plant Manager",
      mutualConnections: 7,
      avatar: "R",
    },
  ];

  return (
    <div className="space-y-4 sticky top-20">
      {/* Trending News */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div
          className="p-4"
          style={{
            backgroundColor: "#DCE8F2",
            borderBottom: "1px solid #B5D3E7",
          }}
        >
          <h3
            className="text-lg font-semibold flex items-center"
            style={{ color: "#1F2D3D" }}
          >
            <TrendingUp className="w-5 h-5 mr-2" style={{ color: "#6EA9CB" }} />
            Industry News
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {trendingNews.map((news) => (
            <div key={news.id} className="cursor-pointer group">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                {news.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{news.subtitle}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{news.time}</span>
                <div className="flex items-center text-xs text-gray-500">
                  <Eye className="w-3 h-3 mr-1" />
                  {news.views}
                </div>
              </div>
            </div>
          ))}
          <button className="w-full text-left text-sm text-green-600 hover:text-green-700 font-medium pt-2 border-t border-gray-200">
            Show more news →
          </button>
        </div>
      </div>
      {/* Suggested Connections */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div
          className="p-4"
          style={{
            backgroundColor: "#DCE8F2",
            borderBottom: "1px solid #B5D3E7",
          }}
        >
          <h3 className="text-lg font-semibold" style={{ color: "#1F2D3D" }}>
            Suggested Connections
          </h3>
        </div>
        <div className="p-4 space-y-4">
          {suggestedConnections.map((conn) => (
            <div key={conn.id} className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{
                  background:
                    "linear-gradient(135deg, #6EA9CB 0%, #B5D3E7 100%)",
                }}
              >
                {conn.avatar}
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  {conn.name}
                </h4>
                <p className="text-xs text-gray-500">{conn.title}</p>
                <p className="text-xs text-gray-400">
                  {conn.mutualConnections} mutual connections
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
