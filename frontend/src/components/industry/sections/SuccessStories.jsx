import React, { useState } from "react";
import {
  Edit3,
  Star,
  TrendingUp,
  Award,
  Calendar,
  ExternalLink,
  Play,
} from "lucide-react";

const SuccessStories = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "From Startup to Unicorn: The Flipkart Journey",
      company: "Flipkart",
      industry: "E-commerce",
      protagonist: "Sachin & Binny Bansal",
      timeframe: "2007-2018",
      challenge:
        "Competing with established international players in the Indian e-commerce market",
      solution:
        "Focused on local market needs, cash-on-delivery, and exceptional customer service",
      outcome:
        "Became India's largest e-commerce platform, acquired by Walmart for $16 billion",
      keyMetrics: {
        revenue: "$15B",
        users: "450M+",
        valuation: "$37.6B",
      },
      tags: ["E-commerce", "Unicorn", "Acquisition"],
      rating: 4.8,
      readTime: "8 min",
      publishedDate: "2024-01-15",
      featured: true,
    },
    {
      id: 2,
      title: "Digital Transformation: How TCS Became a Global IT Leader",
      company: "Tata Consultancy Services",
      industry: "IT Services",
      protagonist: "Rajesh Gopinathan & Team",
      timeframe: "2000-2023",
      challenge:
        "Transitioning from traditional IT services to digital transformation leader",
      solution:
        "Invested heavily in emerging technologies, upskilled workforce, and built strategic partnerships",
      outcome:
        "Achieved $25+ billion revenue and became world's most valuable IT services company",
      keyMetrics: {
        revenue: "$25.7B",
        employees: "614K+",
        marketCap: "$120B",
      },
      tags: ["Digital Transformation", "IT Services", "Global Leader"],
      rating: 4.9,
      readTime: "12 min",
      publishedDate: "2024-01-10",
      featured: true,
    },
    {
      id: 3,
      title: "Revolutionizing Healthcare: The Narayana Health Story",
      company: "Narayana Health",
      industry: "Healthcare",
      protagonist: "Dr. Devi Shetty",
      timeframe: "2000-2024",
      challenge:
        "Making quality healthcare affordable and accessible to all economic segments",
      solution:
        "Innovative cost management, high-volume procedures, and technology integration",
      outcome:
        "Performed over 2 million surgeries with world-class outcomes at fraction of global costs",
      keyMetrics: {
        hospitals: "23",
        surgeries: "2M+",
        costReduction: "90%",
      },
      tags: ["Healthcare", "Social Impact", "Innovation"],
      rating: 4.7,
      readTime: "10 min",
      publishedDate: "2024-01-08",
      featured: false,
    },
    {
      id: 4,
      title: "Sustainable Manufacturing: Mahindra's Green Revolution",
      company: "Mahindra Group",
      industry: "Automotive",
      protagonist: "Anand Mahindra",
      timeframe: "2010-2024",
      challenge:
        "Balancing industrial growth with environmental sustainability",
      solution:
        "Implemented carbon-neutral operations, renewable energy, and sustainable supply chains",
      outcome:
        "Achieved carbon neutrality across operations and became sustainability leader",
      keyMetrics: {
        carbonReduction: "100%",
        renewableEnergy: "75%",
        sustainabilityRank: "#1",
      },
      tags: ["Sustainability", "Manufacturing", "Environmental"],
      rating: 4.6,
      readTime: "9 min",
      publishedDate: "2024-01-05",
      featured: false,
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    company: "",
    industry: "",
    protagonist: "",
    timeframe: "",
    challenge: "",
    solution: "",
    outcome: "",
    tags: "",
    readTime: "",
    rating: "",
  });

  const handleEdit = (story) => {
    setEditingId(story.id);
    setEditData({
      title: story.title,
      company: story.company,
      industry: story.industry,
      protagonist: story.protagonist,
      timeframe: story.timeframe,
      challenge: story.challenge,
      solution: story.solution,
      outcome: story.outcome,
      tags: story.tags.join(", "),
      readTime: story.readTime,
      rating: story.rating.toString(),
    });
  };

  const handleSave = () => {
    setStories(
      stories.map((story) =>
        story.id === editingId
          ? {
              ...story,
              title: editData.title,
              company: editData.company,
              industry: editData.industry,
              protagonist: editData.protagonist,
              timeframe: editData.timeframe,
              challenge: editData.challenge,
              solution: editData.solution,
              outcome: editData.outcome,
              tags: editData.tags.split(",").map((tag) => tag.trim()),
              readTime: editData.readTime,
              rating: parseFloat(editData.rating),
            }
          : story
      )
    );
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      industry: "",
      protagonist: "",
      timeframe: "",
      challenge: "",
      solution: "",
      outcome: "",
      tags: "",
      readTime: "",
      rating: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      title: "",
      company: "",
      industry: "",
      protagonist: "",
      timeframe: "",
      challenge: "",
      solution: "",
      outcome: "",
      tags: "",
      readTime: "",
      rating: "",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Success Stories</h2>
          <p className="text-gray-600 mt-1">
            Inspiring journeys of industry leaders and game-changers
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Share Your Story
        </button>
      </div>

      {/* Featured Stories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Featured Stories
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stories
            .filter((story) => story.featured)
            .map((story) => (
              <div
                key={story.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {editingId === story.id ? (
                  // Edit Mode
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Story Title
                        </label>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={editData.company}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                          </label>
                          <input
                            type="text"
                            value={editData.industry}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                industry: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Key Person
                          </label>
                          <input
                            type="text"
                            value={editData.protagonist}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                protagonist: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timeframe
                          </label>
                          <input
                            type="text"
                            value={editData.timeframe}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                timeframe: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Challenge
                        </label>
                        <textarea
                          value={editData.challenge}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              challenge: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Solution
                        </label>
                        <textarea
                          value={editData.solution}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              solution: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Outcome
                        </label>
                        <textarea
                          value={editData.outcome}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              outcome: e.target.value,
                            })
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tags (comma separated)
                          </label>
                          <input
                            type="text"
                            value={editData.tags}
                            onChange={(e) =>
                              setEditData({ ...editData, tags: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating (1-5)
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={editData.rating}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                rating: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-2">
                        <Award className="w-6 h-6 text-yellow-500" />
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      {isOwner && (
                        <button
                          onClick={() => handleEdit(story)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Story"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {story.title}
                    </h3>

                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <span className="font-medium text-blue-600">
                        {story.company}
                      </span>
                      <span>•</span>
                      <span>{story.industry}</span>
                      <span>•</span>
                      <span>{story.timeframe}</span>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">
                        Challenge:
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {story.challenge}
                      </p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-1">
                        Solution:
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {story.solution}
                      </p>
                    </div>

                    <div className="mb-4 p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-1">
                        Outcome:
                      </h4>
                      <p className="text-green-700 text-sm leading-relaxed">
                        {story.outcome}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          {renderStars(story.rating)}
                          <span className="text-sm text-gray-600 ml-1">
                            {story.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {story.readTime} read
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>Read Full Story</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* All Stories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Success Stories
        </h3>
        <div className="space-y-4">
          {stories
            .filter((story) => !story.featured)
            .map((story) => (
              <div
                key={story.id}
                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {editingId === story.id ? (
                  // Edit Mode (same as above but in different layout)
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Story Title
                        </label>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) =>
                            setEditData({ ...editData, title: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={editData.company}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                company: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Industry
                          </label>
                          <input
                            type="text"
                            value={editData.industry}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                industry: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Timeframe
                          </label>
                          <input
                            type="text"
                            value={editData.timeframe}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                timeframe: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {story.title}
                          </h3>
                          {isOwner && (
                            <button
                              onClick={() => handleEdit(story)}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Story"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                          <span className="font-medium text-blue-600">
                            {story.company}
                          </span>
                          <span>•</span>
                          <span>{story.industry}</span>
                          <span>•</span>
                          <span>{story.protagonist}</span>
                          <span>•</span>
                          <span>{story.timeframe}</span>
                        </div>

                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {story.outcome}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {story.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              {renderStars(story.rating)}
                              <span className="text-sm text-gray-600 ml-1">
                                {story.rating}
                              </span>
                            </div>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                              <ExternalLink className="w-4 h-4" />
                              <span>Read More</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Success Stories Impact
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {stories.length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Success Stories</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">4.8</span>
            </div>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">2024</span>
            </div>
            <p className="text-sm text-gray-600">Latest Stories</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-purple-500 mr-2" />
              <span className="text-2xl font-bold text-gray-900">
                {stories.filter((s) => s.featured).length}
              </span>
            </div>
            <p className="text-sm text-gray-600">Featured</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
