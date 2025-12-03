import React, { useState } from "react";
import { Edit3, Cpu, Zap, TrendingUp, Star, ExternalLink } from "lucide-react";

const Technology = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [technologies, setTechnologies] = useState([
    {
      id: 1,
      name: "Artificial Intelligence & Machine Learning",
      description:
        "Advanced AI algorithms, machine learning models, and deep learning systems transforming decision-making processes.",
      maturityLevel: "Mature",
      adoptionRate: "78%",
      investmentGrowth: "+45%",
      keyApplications: [
        "Predictive Analytics",
        "Automation",
        "Natural Language Processing",
        "Computer Vision",
      ],
      marketSize: "$125B",
      icon: "🤖",
      trending: true,
    },
    {
      id: 2,
      name: "Internet of Things (IoT)",
      description:
        "Connected devices, sensors, and smart systems enabling data collection and remote monitoring across industries.",
      maturityLevel: "Growing",
      adoptionRate: "65%",
      investmentGrowth: "+32%",
      keyApplications: [
        "Smart Manufacturing",
        "Asset Tracking",
        "Predictive Maintenance",
        "Environmental Monitoring",
      ],
      marketSize: "$87B",
      icon: "📡",
      trending: true,
    },
    {
      id: 3,
      name: "Cloud Computing & Edge Computing",
      description:
        "Scalable computing infrastructure, distributed processing, and edge computing solutions for real-time applications.",
      maturityLevel: "Mature",
      adoptionRate: "82%",
      investmentGrowth: "+28%",
      keyApplications: [
        "Data Storage",
        "Application Hosting",
        "Real-time Processing",
        "Disaster Recovery",
      ],
      marketSize: "$156B",
      icon: "☁️",
      trending: false,
    },
    {
      id: 4,
      name: "Blockchain & Distributed Ledger",
      description:
        "Decentralized systems, smart contracts, and transparent transaction recording for secure business processes.",
      maturityLevel: "Emerging",
      adoptionRate: "25%",
      investmentGrowth: "+85%",
      keyApplications: [
        "Supply Chain",
        "Digital Identity",
        "Smart Contracts",
        "Cryptocurrency",
      ],
      marketSize: "$23B",
      icon: "⛓️",
      trending: true,
    },
    {
      id: 5,
      name: "Robotics & Automation",
      description:
        "Industrial robots, process automation, and intelligent manufacturing systems improving efficiency and safety.",
      maturityLevel: "Mature",
      adoptionRate: "58%",
      investmentGrowth: "+22%",
      keyApplications: [
        "Manufacturing",
        "Logistics",
        "Quality Control",
        "Material Handling",
      ],
      marketSize: "$94B",
      icon: "🤖",
      trending: false,
    },
    {
      id: 6,
      name: "Augmented Reality & Virtual Reality",
      description:
        "Immersive technologies enabling enhanced visualization, training, and remote collaboration experiences.",
      maturityLevel: "Growing",
      adoptionRate: "35%",
      investmentGrowth: "+55%",
      keyApplications: [
        "Training & Simulation",
        "Remote Assistance",
        "Product Visualization",
        "Quality Inspection",
      ],
      marketSize: "$18B",
      icon: "🥽",
      trending: true,
    },
  ]);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    maturityLevel: "Emerging",
    adoptionRate: "",
    investmentGrowth: "",
    keyApplications: "",
    marketSize: "",
  });

  const handleEdit = (tech) => {
    setEditingId(tech.id);
    setEditData({
      name: tech.name,
      description: tech.description,
      maturityLevel: tech.maturityLevel,
      adoptionRate: tech.adoptionRate,
      investmentGrowth: tech.investmentGrowth,
      keyApplications: tech.keyApplications.join(", "),
      marketSize: tech.marketSize,
    });
  };

  const handleSave = () => {
    setTechnologies(
      technologies.map((tech) =>
        tech.id === editingId
          ? {
              ...tech,
              name: editData.name,
              description: editData.description,
              maturityLevel: editData.maturityLevel,
              adoptionRate: editData.adoptionRate,
              investmentGrowth: editData.investmentGrowth,
              keyApplications: editData.keyApplications
                .split(",")
                .map((app) => app.trim()),
              marketSize: editData.marketSize,
            }
          : tech
      )
    );
    setEditingId(null);
    setEditData({
      name: "",
      description: "",
      maturityLevel: "Emerging",
      adoptionRate: "",
      investmentGrowth: "",
      keyApplications: "",
      marketSize: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      name: "",
      description: "",
      maturityLevel: "Emerging",
      adoptionRate: "",
      investmentGrowth: "",
      keyApplications: "",
      marketSize: "",
    });
  };

  const getMaturityColor = (level) => {
    switch (level) {
      case "Emerging":
        return "bg-yellow-100 text-yellow-800";
      case "Growing":
        return "bg-blue-100 text-blue-800";
      case "Mature":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Technology Landscape
          </h2>
          <p className="text-gray-600 mt-1">
            Explore cutting-edge technologies shaping the industry
          </p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Technology
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technologies.map((tech) => (
          <div
            key={tech.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            {editingId === tech.id ? (
              // Edit Mode
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Technology Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Maturity Level
                      </label>
                      <select
                        value={editData.maturityLevel}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            maturityLevel: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Emerging">Emerging</option>
                        <option value="Growing">Growing</option>
                        <option value="Mature">Mature</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Adoption Rate
                      </label>
                      <input
                        type="text"
                        value={editData.adoptionRate}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            adoptionRate: e.target.value,
                          })
                        }
                        placeholder="e.g., 78%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Investment Growth
                      </label>
                      <input
                        type="text"
                        value={editData.investmentGrowth}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            investmentGrowth: e.target.value,
                          })
                        }
                        placeholder="e.g., +45%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Market Size
                      </label>
                      <input
                        type="text"
                        value={editData.marketSize}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            marketSize: e.target.value,
                          })
                        }
                        placeholder="e.g., $125B"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Applications (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.keyApplications}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          keyApplications: e.target.value,
                        })
                      }
                      placeholder="Predictive Analytics, Automation, NLP"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
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
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{tech.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {tech.name}
                        </h3>
                        {tech.trending && (
                          <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </span>
                        )}
                      </div>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${getMaturityColor(
                          tech.maturityLevel
                        )}`}
                      >
                        {tech.maturityLevel}
                      </span>
                    </div>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => handleEdit(tech)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Technology"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                  {tech.description}
                </p>

                {/* Key Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center bg-blue-50 p-3 rounded-lg">
                    <p className="text-lg font-bold text-blue-600">
                      {tech.adoptionRate}
                    </p>
                    <p className="text-xs text-blue-700">Adoption</p>
                  </div>
                  <div className="text-center bg-green-50 p-3 rounded-lg">
                    <p className="text-lg font-bold text-green-600">
                      {tech.investmentGrowth}
                    </p>
                    <p className="text-xs text-green-700">Growth</p>
                  </div>
                  <div className="text-center bg-purple-50 p-3 rounded-lg">
                    <p className="text-lg font-bold text-purple-600">
                      {tech.marketSize}
                    </p>
                    <p className="text-xs text-purple-700">Market</p>
                  </div>
                </div>

                {/* Key Applications */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Key Applications:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {tech.keyApplications.map((app, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center space-x-1">
                    <ExternalLink className="w-4 h-4" />
                    <span>Learn More</span>
                  </button>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors">
                      Compare
                    </button>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Technology Trends Summary */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Technology Investment Trends
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">6</span>
            </div>
            <p className="text-sm text-gray-600">Core Technologies</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-green-600">4</span>
            </div>
            <p className="text-sm text-gray-600">Trending Now</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">$503B</span>
            </div>
            <p className="text-sm text-gray-600">Total Market</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">+39%</span>
            </div>
            <p className="text-sm text-gray-600">Avg Growth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Technology;
