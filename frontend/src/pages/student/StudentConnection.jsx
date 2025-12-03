import React, { useEffect, useState } from "react";
import { Search, MoreHorizontal, MessageSquare, X } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const ConnectionsPage = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connections, setConnections] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Product Manager at Tech Corp",
      location: "San Francisco, CA",
      avatar: "SJ",
      mutualConnections: 12,
      connected: "2w",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Senior Software Engineer at Innovation Labs",
      location: "New York, NY",
      avatar: "MC",
      mutualConnections: 8,
      connected: "1mo",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "UX Designer at Creative Studio",
      location: "Austin, TX",
      avatar: "ER",
      mutualConnections: 15,
      connected: "3w",
    },
    {
      id: 4,
      name: "David Kim",
      title: "Marketing Director at Growth Inc",
      location: "Seattle, WA",
      avatar: "DK",
      mutualConnections: 23,
      connected: "2mo",
    },
    {
      id: 5,
      name: "Jessica Williams",
      title: "Data Scientist at AI Research",
      location: "Boston, MA",
      avatar: "JW",
      mutualConnections: 19,
      connected: "1w",
    },
    {
      id: 6,
      name: "Robert Taylor",
      title: "VP of Engineering at StartupXYZ",
      location: "Los Angeles, CA",
      avatar: "RT",
      mutualConnections: 31,
      connected: "4mo",
    },
    {
      id: 7,
      name: "Amanda Brown",
      title: "HR Manager at People First",
      location: "Chicago, IL",
      avatar: "AB",
      mutualConnections: 7,
      connected: "2w",
    },
    {
      id: 8,
      name: "James Anderson",
      title: "Business Analyst at Consulting Group",
      location: "Denver, CO",
      avatar: "JA",
      mutualConnections: 14,
      connected: "3mo",
    },
  ]);

  // useEffect(() => {
  //   if (!user?.id) return;

  //   const fetchConnections = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(`/api/students/connections`, {
  //         withCredentials: true,
  //       });
  //       const connections = response.data.connections || [];
  //       setConnections(connections);

  //       if (connections.length === 0) {
  //         console.log("No connections found");
  //       }
  //     } catch (err) {
  //       setError(err.response?.data?.message || "Failed to fetch connections");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchConnections();
  // }, [user]);

  const filters = [
    "All",
    "Recently added",
    "By location",
    "By company",
    "By school",
  ];

  const filteredConnections = connections.filter(
    (conn) =>
      conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conn.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {connections.length} Connections
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 sticky top-24">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Sort by:
                </h3>
                <ul className="space-y-2">
                  {filters.map((filter) => (
                    <li key={filter}>
                      <button
                        onClick={() => setSelectedFilter(filter)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedFilter === filter
                            ? "bg-blue-50 text-blue-400 font-semibold"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {filter}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content - Connections Grid */}
          <div className="lg:col-span-3">
            {filteredConnections.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">
                  No connections found matching your search.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredConnections.map((connection) => (
                  <div
                    key={connection.id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-400 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                            {connection.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate">
                              {connection.name}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Connected {connection.connected} ago
                            </p>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                        {connection.title}
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        {connection.location}
                      </p>
                      <p className="text-xs text-gray-600 mb-4">
                        {connection.mutualConnections} mutual connections
                      </p>

                      <button className="w-full flex items-center justify-center space-x-2 border border-blue-600 text-blue-400 hover:bg-blue-50 font-semibold py-2 px-4 rounded-full transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Message</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
