import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  TrendingUp,
  Building,
  Users,
  Globe,
} from "lucide-react";

const Industries = ({ isOwner, startupData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndustryIndex, setEditingIndustryIndex] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [content, setContent] = useState({
    title: "Industries & Sectors",
    description:
      "Explore thriving industries and discover opportunities for your startup across various sectors.",
    industries: [
      {
        name: "Technology & Software",
        icon: "💻",
        growth: "+25%",
        startups: "15,000+",
        funding: "$45B",
        description:
          "Leading innovation in AI, SaaS, mobile apps, and enterprise software solutions.",
        trends: [
          "Artificial Intelligence",
          "Machine Learning",
          "Cloud Computing",
          "Cybersecurity",
          "DevOps",
        ],
        opportunities: [
          "B2B SaaS platforms",
          "AI-powered tools",
          "Mobile applications",
          "Enterprise automation",
        ],
        challenges: [
          "High competition",
          "Talent acquisition",
          "Rapid technology changes",
          "Data privacy regulations",
        ],
        keyPlayers: ["Microsoft", "Google", "Amazon", "Meta", "Apple"],
      },
      {
        name: "Healthcare & Biotech",
        icon: "🏥",
        growth: "+18%",
        startups: "8,500+",
        funding: "$29B",
        description:
          "Revolutionizing healthcare through digital health, biotech innovations, and medical devices.",
        trends: [
          "Telemedicine",
          "Digital Therapeutics",
          "Personalized Medicine",
          "Medical AI",
          "Biomarkers",
        ],
        opportunities: [
          "Remote patient monitoring",
          "Drug discovery platforms",
          "Mental health apps",
          "Surgical robotics",
        ],
        challenges: [
          "Regulatory compliance",
          "Clinical trials",
          "Insurance coverage",
          "Data security",
        ],
        keyPlayers: [
          "Johnson & Johnson",
          "Pfizer",
          "Roche",
          "Novartis",
          "Moderna",
        ],
      },
      {
        name: "Fintech & Payments",
        icon: "💳",
        growth: "+22%",
        startups: "12,000+",
        funding: "$38B",
        description:
          "Transforming financial services with digital banking, payments, and investment platforms.",
        trends: [
          "Digital Banking",
          "Cryptocurrency",
          "Buy Now Pay Later",
          "Robo-advisors",
          "RegTech",
        ],
        opportunities: [
          "Neobanking",
          "Payment processing",
          "Investment apps",
          "Insurance tech",
        ],
        challenges: [
          "Regulatory requirements",
          "Security concerns",
          "Market saturation",
          "Customer trust",
        ],
        keyPlayers: ["PayPal", "Square", "Stripe", "Coinbase", "Robinhood"],
      },
      {
        name: "E-commerce & Retail",
        icon: "🛒",
        growth: "+15%",
        startups: "20,000+",
        funding: "$25B",
        description:
          "Reshaping retail with online marketplaces, D2C brands, and omnichannel experiences.",
        trends: [
          "Social Commerce",
          "Sustainable Products",
          "AR/VR Shopping",
          "Subscription Models",
          "Personalization",
        ],
        opportunities: [
          "Niche marketplaces",
          "Sustainable brands",
          "B2B commerce",
          "Logistics solutions",
        ],
        challenges: [
          "Customer acquisition costs",
          "Supply chain issues",
          "Market competition",
          "Inventory management",
        ],
        keyPlayers: ["Amazon", "Shopify", "Alibaba", "eBay", "Etsy"],
      },
      {
        name: "Clean Energy & Sustainability",
        icon: "🌱",
        growth: "+30%",
        startups: "6,500+",
        funding: "$32B",
        description:
          "Driving the green revolution with renewable energy, carbon capture, and sustainable solutions.",
        trends: [
          "Solar Technology",
          "Energy Storage",
          "Carbon Capture",
          "Green Hydrogen",
          "Circular Economy",
        ],
        opportunities: [
          "Renewable energy systems",
          "Carbon tracking",
          "Sustainable materials",
          "Energy efficiency",
        ],
        challenges: [
          "High capital requirements",
          "Regulatory hurdles",
          "Technology scalability",
          "Market adoption",
        ],
        keyPlayers: [
          "Tesla",
          "NextEra Energy",
          "Vestas",
          "First Solar",
          "Orsted",
        ],
      },
      {
        name: "Education & EdTech",
        icon: "🎓",
        growth: "+20%",
        startups: "9,000+",
        funding: "$16B",
        description:
          "Revolutionizing learning with online education, skill development, and educational technology.",
        trends: [
          "Online Learning",
          "Microlearning",
          "AI Tutoring",
          "VR Education",
          "Skills Assessment",
        ],
        opportunities: [
          "Corporate training",
          "K-12 platforms",
          "Language learning",
          "Professional certification",
        ],
        challenges: [
          "User engagement",
          "Content quality",
          "Pricing pressure",
          "Technology adoption",
        ],
        keyPlayers: ["Coursera", "Udemy", "Khan Academy", "Duolingo", "Chegg"],
      },
    ],
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving industries content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEditIndustry = (index) => {
    setEditingIndustryIndex(index);
    setSelectedIndustry(null); // Close details view when editing
  };

  const handleSaveIndustry = (index, updatedIndustry) => {
    const updatedIndustries = [...content.industries];
    updatedIndustries[index] = updatedIndustry;
    setContent({ ...content, industries: updatedIndustries });
    setEditingIndustryIndex(null);
  };

  const handleCancelIndustryEdit = () => {
    setEditingIndustryIndex(null);
  };

  const updateIndustry = (index, field, value) => {
    const newIndustries = [...content.industries];
    newIndustries[index] = { ...newIndustries[index], [field]: value };
    setContent({ ...content, industries: newIndustries });
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{content.title}</h1>
          <p className="text-gray-600 text-sm mt-1">{content.description}</p>
        </div>
      </div>

      {/* Industry Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {content.industries.map((industry, index) => (
          <div
            key={index}
            className={`bg-white border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
              selectedIndustry === index
                ? "border-blue-500 shadow-sm"
                : "border-gray-200"
            }`}
          >
            {editingIndustryIndex === index ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Industry Name
                    </label>
                    <input
                      type="text"
                      value={industry.name}
                      onChange={(e) =>
                        updateIndustry(index, "name", e.target.value)
                      }
                      className="w-full text-base font-semibold p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Industry name"
                    />
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleSaveIndustry(index, industry)}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 transition-all duration-200 shadow-md border border-blue-600 min-w-[70px]"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelIndustryEdit}
                      className="flex items-center justify-center gap-1 px-3 py-2 bg-gray-500 text-white rounded-lg text-sm font-medium hover:bg-gray-600 focus:ring-2 focus:ring-gray-300 transition-all duration-200 shadow-md border border-gray-500 min-w-[70px]"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon (Emoji)
                    </label>
                    <input
                      type="text"
                      value={industry.icon}
                      onChange={(e) =>
                        updateIndustry(index, "icon", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                      placeholder="💻"
                      maxLength="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Growth Rate
                    </label>
                    <input
                      type="text"
                      value={industry.growth}
                      onChange={(e) =>
                        updateIndustry(index, "growth", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+25%"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={industry.description}
                    onChange={(e) =>
                      updateIndustry(index, "description", e.target.value)
                    }
                    rows="2"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                    placeholder="Industry description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Startups Count
                    </label>
                    <input
                      type="text"
                      value={industry.startups}
                      onChange={(e) =>
                        updateIndustry(index, "startups", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="15,000+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Funding Amount
                    </label>
                    <input
                      type="text"
                      value={industry.funding}
                      onChange={(e) =>
                        updateIndustry(index, "funding", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="$45B"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trends (comma-separated)
                    </label>
                    <textarea
                      value={industry.trends.join(", ")}
                      onChange={(e) =>
                        updateIndustry(
                          index,
                          "trends",
                          e.target.value
                            .split(",")
                            .map((t) => t.trim())
                            .filter((t) => t.length > 0)
                        )
                      }
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      placeholder="Trend 1, Trend 2, Trend 3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Opportunities (comma-separated)
                    </label>
                    <textarea
                      value={industry.opportunities.join(", ")}
                      onChange={(e) =>
                        updateIndustry(
                          index,
                          "opportunities",
                          e.target.value
                            .split(",")
                            .map((o) => o.trim())
                            .filter((o) => o.length > 0)
                        )
                      }
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      placeholder="Opportunity 1, Opportunity 2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Challenges (comma-separated)
                    </label>
                    <textarea
                      value={industry.challenges.join(", ")}
                      onChange={(e) =>
                        updateIndustry(
                          index,
                          "challenges",
                          e.target.value
                            .split(",")
                            .map((c) => c.trim())
                            .filter((c) => c.length > 0)
                        )
                      }
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      placeholder="Challenge 1, Challenge 2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Players (comma-separated)
                    </label>
                    <textarea
                      value={industry.keyPlayers.join(", ")}
                      onChange={(e) =>
                        updateIndustry(
                          index,
                          "keyPlayers",
                          e.target.value
                            .split(",")
                            .map((p) => p.trim())
                            .filter((p) => p.length > 0)
                        )
                      }
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      placeholder="Company 1, Company 2"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="flex items-center space-x-2 flex-1 cursor-pointer"
                    onClick={() =>
                      !isEditing &&
                      setSelectedIndustry(
                        selectedIndustry === index ? null : index
                      )
                    }
                  >
                    <span className="text-xl">{industry.icon}</span>
                    <h3 className="text-base font-semibold text-gray-900 leading-tight">
                      {industry.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium whitespace-nowrap">
                      {industry.growth}
                    </span>
                    {!isEditing && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditIndustry(index);
                        }}
                        className="p-1.5 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 shadow-sm border border-blue-200"
                        title="Edit this industry"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <p
                  className="text-gray-600 text-xs mb-3 line-clamp-2 cursor-pointer"
                  onClick={() =>
                    !isEditing &&
                    setSelectedIndustry(
                      selectedIndustry === index ? null : index
                    )
                  }
                >
                  {industry.description}
                </p>

                <div
                  className="grid grid-cols-3 gap-2 text-center cursor-pointer"
                  onClick={() =>
                    !isEditing &&
                    setSelectedIndustry(
                      selectedIndustry === index ? null : index
                    )
                  }
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {industry.startups}
                    </p>
                    <p className="text-xs text-gray-600">Startups</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {industry.funding}
                    </p>
                    <p className="text-xs text-gray-600">Funding</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {industry.growth}
                    </p>
                    <p className="text-xs text-gray-600">Growth Rate</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Industry Details */}
      {selectedIndustry !== null && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">
              {content.industries[selectedIndustry].icon}
            </span>
            <h2 className="text-lg font-bold text-gray-900">
              {content.industries[selectedIndustry].name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trends */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                Current Trends
              </h3>
              <div className="space-y-1">
                {content.industries[selectedIndustry].trends.map(
                  (trend, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">{trend}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2 text-green-600" />
                Key Opportunities
              </h3>
              <div className="space-y-1">
                {content.industries[selectedIndustry].opportunities.map(
                  (opportunity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">
                        {opportunity}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Challenges */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Building className="w-4 h-4 mr-2 text-orange-600" />
                Major Challenges
              </h3>
              <div className="space-y-1">
                {content.industries[selectedIndustry].challenges.map(
                  (challenge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-gray-700">{challenge}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Key Players */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <Users className="w-4 h-4 mr-2 text-purple-600" />
                Key Players
              </h3>
              <div className="flex flex-wrap gap-1">
                {content.industries[selectedIndustry].keyPlayers.map(
                  (player, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {player}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Market Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">85%</p>
            <p className="text-xs text-gray-600">Industries showing growth</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Building className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">70K+</p>
            <p className="text-xs text-gray-600">Total active startups</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Globe className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">$185B</p>
            <p className="text-xs text-gray-600">Total funding available</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      {!isEditing && (
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">
            Ready to Enter Your Industry?
          </h3>
          <p className="mb-3 text-sm">
            Connect with industry experts, find co-founders, and access
            specialized resources for your sector.
          </p>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm">
              Find Industry Mentors
            </button>
            <button className="px-4 py-2 border border-white text-white rounded-lg font-medium hover:bg-white hover:text-indigo-600 transition-colors text-sm">
              Explore Opportunities
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Industries;
