import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Scale,
  Video,
  Headphones,
  Mail,
} from "lucide-react";

const Resources = ({ isOwner, startupData }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [resourceCategories, setResourceCategories] = useState([
    {
      id: 1,
      category: "Templates & Docs",
      icon: "📄",
      description: "Downloadable templates and essential startup documents",
      resources: [
        {
          id: 1,
          title: "Business Plan Template",
          description:
            "Comprehensive business plan template with financial projections",
          type: "Template",
          format: "Google Docs",
          link: "https://docs.google.com/template/business-plan",
          isDownloadable: true,
          customFields: [],
        },
        {
          id: 2,
          title: "Pitch Deck Template",
          description:
            "Professional pitch deck template with investor-ready slides",
          type: "Template",
          format: "PPT/Google Slides",
          link: "https://slides.google.com/template/pitch-deck",
          isDownloadable: true,
        },
        {
          id: 3,
          title: "Investor Outreach Email Templates",
          description:
            "Cold email templates for reaching out to potential investors",
          type: "Template",
          format: "Email Templates",
          link: "https://startup-templates.com/investor-emails",
          isDownloadable: true,
        },
        {
          id: 4,
          title: "Legal Document Templates",
          description:
            "MoUs, NDAs, founder agreements, and other legal templates",
          type: "Template",
          format: "PDF/Word",
          link: "https://legal-templates.startup.com",
          isDownloadable: true,
        },
      ],
    },
    {
      id: 2,
      category: "Learning & Guides",
      icon: "🎥",
      description: "Educational content, tutorials, and startup guides",
      resources: [
        {
          id: 5,
          title: "How to Validate Your Startup Idea",
          description:
            "Complete guide on validating market demand and product-market fit",
          type: "Guide",
          format: "Blog Series",
          link: "https://startup-guides.com/idea-validation",
          isDownloadable: false,
        },
        {
          id: 6,
          title: "Growth Hacking Tutorials",
          description:
            "YouTube playlist covering growth strategies and tactics",
          type: "Video Course",
          format: "YouTube Playlist",
          link: "https://youtube.com/playlist/growth-hacking",
          isDownloadable: false,
        },
        {
          id: 7,
          title: "SEO for Startups",
          description: "Complete SEO strategy guide for early-stage startups",
          type: "Course",
          format: "Online Course",
          link: "https://coursera.org/seo-startups",
          isDownloadable: false,
        },
        {
          id: 8,
          title: "Fundraising Strategy Guide",
          description: "Step-by-step fundraising process from seed to Series A",
          type: "Guide",
          format: "eBook",
          link: "https://fundraising-guide.startup.com",
          isDownloadable: true,
        },
      ],
    },
    {
      id: 3,
      category: "Legal & Compliance",
      icon: "⚖️",
      description: "Legal requirements, compliance, and government resources",
      resources: [
        {
          id: 9,
          title: "Startup India Registration Guide",
          description:
            "Complete guide for registering under Startup India initiative",
          type: "Government Guide",
          format: "PDF Guide",
          link: "https://startupindia.gov.in/registration-guide",
          isDownloadable: true,
        },
        {
          id: 10,
          title: "GST & Taxation for Startups",
          description:
            "Tax compliance and GST registration for Indian startups",
          type: "Compliance Guide",
          format: "Resource Center",
          link: "https://gst-startup-guide.gov.in",
          isDownloadable: false,
        },
        {
          id: 11,
          title: "IP & Trademark Guide",
          description:
            "Intellectual property protection and trademark registration",
          type: "Legal Guide",
          format: "Handbook",
          link: "https://ipindia.gov.in/startup-ip-guide",
          isDownloadable: true,
        },
        {
          id: 12,
          title: "Compliance Checklist",
          description: "Essential legal and regulatory compliance checklist",
          type: "Checklist",
          format: "Interactive Tool",
          link: "https://compliance-checker.startup.com",
          isDownloadable: false,
        },
      ],
    },
    {
      id: 4,
      category: "Recommended Reads",
      icon: "📚",
      description: "Books, podcasts, and newsletters for entrepreneurs",
      resources: [
        {
          id: 13,
          title: "The Lean Startup by Eric Ries",
          description:
            "Essential read on lean methodology and iterative product development",
          type: "Book",
          format: "Paperback/Kindle",
          link: "https://amazon.com/lean-startup-eric-ries",
          isDownloadable: false,
        },
        {
          id: 14,
          title: "Zero to One by Peter Thiel",
          description: "Insights on building companies that create new things",
          type: "Book",
          format: "Paperback/Kindle",
          link: "https://amazon.com/zero-to-one-peter-thiel",
          isDownloadable: false,
        },
        {
          id: 15,
          title: "Indie Hackers Podcast",
          description:
            "Interviews with successful indie entrepreneurs and founders",
          type: "Podcast",
          format: "Audio/Video",
          link: "https://indiehackers.com/podcast",
          isDownloadable: false,
        },
        {
          id: 16,
          title: "TechCrunch Startups Newsletter",
          description:
            "Weekly newsletter covering startup news and fundraising",
          type: "Newsletter",
          format: "Email Newsletter",
          link: "https://techcrunch.com/newsletter/startups",
          isDownloadable: false,
        },
      ],
    },
  ]);

  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "Template",
    format: "",
    link: "",
    category: "Templates & Docs",
    isDownloadable: false,
    customFields: [],
  });

  const resourceTypes = [
    { value: "Template", label: "Template", icon: "📄" },
    { value: "Guide", label: "Guide", icon: "📋" },
    { value: "Course", label: "Course", icon: "🎓" },
    { value: "Video Course", label: "Video Course", icon: "🎥" },
    { value: "Book", label: "Book", icon: "📚" },
    { value: "Podcast", label: "Podcast", icon: "🎧" },
    { value: "Newsletter", label: "Newsletter", icon: "📧" },
    { value: "Tool", label: "Tool", icon: "🛠️" },
    { value: "Checklist", label: "Checklist", icon: "✅" },
    { value: "Government Guide", label: "Government Guide", icon: "🏛️" },
  ];

  const categories = [
    "Templates & Docs",
    "Learning & Guides",
    "Legal & Compliance",
    "Recommended Reads",
  ];

  const handleAddResource = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveResource = () => {
    if (newResource.title.trim() && newResource.link.trim()) {
      // Find the category to add to
      const categoryIndex = resourceCategories.findIndex(
        (cat) => cat.category === newResource.category
      );
      if (categoryIndex !== -1) {
        const updatedCategories = [...resourceCategories];
        const newResourceWithId = {
          id: Date.now(), // Simple ID generation
          ...newResource,
        };
        updatedCategories[categoryIndex].resources.unshift(newResourceWithId);
        setResourceCategories(updatedCategories);
      }

      setNewResource({
        title: "",
        description: "",
        type: "Template",
        format: "",
        link: "",
        category: "Templates & Docs",
        isDownloadable: false,
        customFields: [],
      });
      setIsAddModalOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setNewResource({
      title: "",
      description: "",
      type: "Template",
      format: "",
      link: "",
      category: "Templates & Docs",
      isDownloadable: false,
      customFields: [],
    });
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewResource((prev) => ({ ...prev, [field]: value }));
  };

  // Custom fields handlers
  const handleAddCustomField = () => {
    const newField = { label: "", value: "" };
    setNewResource((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), newField],
    }));
  };

  const handleRemoveCustomField = (index) => {
    setNewResource((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setNewResource((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const getTypeIcon = (type) => {
    const typeObj = resourceTypes.find((t) => t.value === type);
    return typeObj ? typeObj.icon : "📄";
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="rounded-lg" style={{ backgroundColor: "#F7FAFC" }}>
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#DCE8F2" }}
          >
            <div>
              <h1
                className="text-xl font-semibold"
                style={{ color: "#1F2D3D" }}
              >
                Resources
              </h1>
              <p
                className="text-sm mt-1"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                Templates, guides, legal resources, and essential startup tools
              </p>
            </div>
            <button
              onClick={handleAddResource}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: "#6EA9CB" }}
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </button>
          </div>

          {/* Education Guidelines */}
          {/* <div className="p-6 bg-blue-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              🎓 Purpose of Education Section:
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Build credibility and show that the startup/founders have been
              mentored, trained, or supported by recognized institutions or
              startup ecosystems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🚀 Accelerator Programs
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Y Combinator</li>
                  <li>• Techstars</li>
                  <li>• 500 Startups</li>
                  <li>• Google for Startups</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  📜 Certifications
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Lean Startup Methodology</li>
                  <li>• Digital Marketing</li>
                  <li>• Product Management</li>
                  <li>• Venture Finance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🎓 Executive Education
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Stanford Entrepreneurship</li>
                  <li>• MIT Sloan Programs</li>
                  <li>• Wharton Executive Ed</li>
                  <li>• Harvard Business School</li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Resource Categories */}
          <div className="divide-y" style={{ borderColor: "#DCE8F2" }}>
            {resourceCategories.map((category) => (
              <div key={category.id} className="p-6">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#B5D3E7" }}
                  >
                    <span className="text-lg">{category.icon}</span>
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {category.category}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "#1F2D3D", opacity: 0.7 }}
                    >
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Category Resources */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "#F7FAFC",
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getTypeIcon(resource.type)}
                          </span>
                          <div>
                            <span
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{
                                backgroundColor: "#B5D3E7",
                                color: "#1F2D3D",
                              }}
                            >
                              {resource.type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {resource.isDownloadable && (
                            <Download
                              className="w-4 h-4"
                              style={{ color: "#6EA9CB" }}
                              title="Downloadable"
                            />
                          )}
                          <ExternalLink
                            className="w-4 h-4"
                            style={{ color: "#1F2D3D", opacity: 0.5 }}
                          />
                        </div>
                      </div>

                      <h4
                        className="font-semibold mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        {resource.title}
                      </h4>
                      <p
                        className="text-sm mb-3 leading-relaxed"
                        style={{ color: "#1F2D3D", opacity: 0.7 }}
                      >
                        {resource.description}
                      </p>

                      {/* Custom Fields Display */}
                      {resource.customFields &&
                        resource.customFields.length > 0 && (
                          <div
                            className="mb-3 pt-2 border-t"
                            style={{ borderColor: "#DCE8F2" }}
                          >
                            <h5
                              className="text-xs font-medium mb-1"
                              style={{ color: "#1F2D3D", opacity: 0.8 }}
                            >
                              Additional Information:
                            </h5>
                            <div className="space-y-1">
                              {resource.customFields.map(
                                (field, fieldIndex) => (
                                  <div
                                    key={fieldIndex}
                                    className="text-xs flex items-start"
                                    style={{ color: "#1F2D3D", opacity: 0.7 }}
                                  >
                                    <span
                                      className="font-medium min-w-0 mr-1"
                                      style={{ color: "#1F2D3D", opacity: 0.8 }}
                                    >
                                      {field.label}:
                                    </span>
                                    <span
                                      style={{ color: "#1F2D3D", opacity: 0.7 }}
                                    >
                                      {field.value}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      <div className="flex items-center justify-between">
                        <div
                          className="text-xs"
                          style={{ color: "#1F2D3D", opacity: 0.6 }}
                        >
                          <span className="font-medium">Format:</span>{" "}
                          {resource.format}
                        </div>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm font-medium hover:opacity-80"
                          style={{ color: "#6EA9CB" }}
                        >
                          {resource.isDownloadable ? "Download" : "View"}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div
            className="p-6 border-t"
            style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
          >
            <h3
              className="text-lg font-medium mb-4"
              style={{ color: "#1F2D3D" }}
            >
              More Helpful Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className="rounded-lg p-4 border"
                style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🌐</span>
                  <h4 className="font-medium" style={{ color: "#1F2D3D" }}>
                    Product Hunt
                  </h4>
                </div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#1F2D3D", opacity: 0.7 }}
                >
                  Launch and discover new products
                </p>
                <a
                  href="https://www.producthunt.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: "#6EA9CB" }}
                >
                  Explore →
                </a>
              </div>

              <div
                className="rounded-lg p-4 border"
                style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">👥</span>
                  <h4 className="font-medium" style={{ color: "#1F2D3D" }}>
                    Indie Hackers
                  </h4>
                </div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#1F2D3D", opacity: 0.7 }}
                >
                  Community for indie entrepreneurs
                </p>
                <a
                  href="https://www.indiehackers.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: "#6EA9CB" }}
                >
                  Join Community →
                </a>
              </div>

              <div
                className="rounded-lg p-4 border"
                style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏛️</span>
                  <h4 className="font-medium" style={{ color: "#1F2D3D" }}>
                    Startup India
                  </h4>
                </div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "#1F2D3D", opacity: 0.7 }}
                >
                  Government startup initiative
                </p>
                <a
                  href="https://www.startupindia.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium hover:opacity-80"
                  style={{ color: "#6EA9CB" }}
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Resource Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Add Resource
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 hover:bg-opacity-80 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Resource Type */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Resource Type *
                </label>
                <select
                  value={newResource.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                >
                  {resourceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Category *
                </label>
                <select
                  value={newResource.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title and Format */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newResource.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                    placeholder="e.g., Business Plan Template"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format *
                  </label>
                  <input
                    type="text"
                    value={newResource.format}
                    onChange={(e) =>
                      handleInputChange("format", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                    placeholder="e.g., PDF, Google Docs, Online Course"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newResource.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none resize-none"
                  placeholder="Describe what this resource provides and how it helps startups..."
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resource Link *
                </label>
                <input
                  type="url"
                  value={newResource.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  placeholder="https://example.com/resource"
                />
              </div>

              {/* Downloadable */}
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newResource.isDownloadable}
                    onChange={(e) =>
                      handleInputChange("isDownloadable", e.target.checked)
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    This resource is downloadable
                  </span>
                </label>
              </div>

              {/* Custom Fields */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Add Field
                  </button>
                </div>
                {newResource.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "label", e.target.value)
                      }
                      placeholder="Field name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(index, "value", e.target.value)
                      }
                      placeholder="Field value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-opacity-80 transition-colors"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResource}
                disabled={!newResource.title.trim() || !newResource.link.trim()}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resources;
