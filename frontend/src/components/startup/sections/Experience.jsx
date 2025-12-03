import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  MapPin,
  Calendar,
  Building,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const Experience = ({ isOwner, startupData }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Series A Funding Round",
      company: "TechStartup Inc.",
      duration: "Jan 2024 – Present",
      location: "San Francisco, CA",
      description:
        "Successfully raised $5M Series A funding round led by Sequoia Capital to accelerate product development and market expansion.",
      highlights: [
        "Secured $5M funding from top-tier VCs",
        "Expanded team from 15 to 45 employees",
        "Launched enterprise product suite",
        "Achieved 300% YoY revenue growth",
      ],
      type: "Funding",
      customFields: [], // Array of custom fields for this experience
    },
    {
      id: 2,
      title: "Product-Market Fit Achievement",
      company: "TechStartup Inc.",
      duration: "Mar 2023 – Dec 2023",
      location: "San Francisco, CA",
      description:
        "Achieved strong product-market fit with B2B SaaS platform, leading to exponential growth in customer acquisition and retention.",
      highlights: [
        "Reached 10,000+ active users",
        "Achieved 95% customer satisfaction score",
        "Launched API platform for developers",
        "Established partnerships with 5 major enterprises",
      ],
      type: "Milestone",
      customFields: [],
    },
    {
      id: 3,
      title: "Accelerator Program Graduate",
      company: "Y Combinator",
      duration: "Jun 2022 – Sep 2022",
      location: "Mountain View, CA",
      description:
        "Completed the prestigious Y Combinator accelerator program, receiving mentorship and seed funding to launch our MVP.",
      highlights: [
        "Graduated from YC S22 batch",
        "Received $250K seed funding",
        "Built and launched MVP in 3 months",
        "Acquired first 100 paying customers",
      ],
      type: "Accelerator",
      customFields: [],
    },
    {
      id: 4,
      title: "Company Foundation",
      company: "TechStartup Inc.",
      duration: "Jan 2022 – May 2022",
      location: "Remote",
      description:
        "Co-founded the company with a vision to revolutionize how businesses manage their data and analytics workflows.",
      highlights: [
        "Incorporated the company",
        "Assembled founding team of 4 engineers",
        "Developed initial product concept",
        "Secured pre-seed funding of $100K",
      ],
      type: "Foundation",
      customFields: [],
    },
  ]);

  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    duration: "",
    location: "",
    description: "",
    highlights: [""],
    type: "Milestone",
    customFields: [], // Array of custom fields for new experience
  });

  const experienceTypes = [
    { value: "Foundation", label: "Company Foundation", icon: "🏗️" },
    { value: "Accelerator", label: "Accelerator/Incubator", icon: "🚀" },
    { value: "Funding", label: "Funding Round", icon: "💰" },
    { value: "Milestone", label: "Key Milestone", icon: "🎯" },
    { value: "Pivot", label: "Business Pivot", icon: "🔄" },
    { value: "Launch", label: "Product Launch", icon: "📱" },
    { value: "Expansion", label: "Market Expansion", icon: "🌍" },
    { value: "Partnership", label: "Strategic Partnership", icon: "🤝" },
    { value: "Acquisition", label: "Acquisition/Exit", icon: "🏆" },
  ];

  const handleAddExperience = () => {
    setIsAddModalOpen(true);
  };

  const handleEditExperience = (index) => {
    setEditingIndex(index);
    setEditingExperience({ ...experiences[index] });
    setIsEditModalOpen(true);
  };

  const handleSaveEditExperience = () => {
    if (
      editingExperience.title.trim() &&
      editingExperience.description.trim()
    ) {
      const updatedExperiences = [...experiences];
      updatedExperiences[editingIndex] = {
        ...editingExperience,
        highlights: editingExperience.highlights.filter((h) => h.trim() !== ""),
      };
      setExperiences(updatedExperiences);
      setIsEditModalOpen(false);
      setEditingIndex(null);
      setEditingExperience(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingIndex(null);
    setEditingExperience(null);
  };

  const handleSaveExperience = () => {
    if (newExperience.title.trim() && newExperience.description.trim()) {
      const experience = {
        id: experiences.length + 1,
        ...newExperience,
        highlights: newExperience.highlights.filter((h) => h.trim() !== ""),
      };
      setExperiences([experience, ...experiences]);
      setNewExperience({
        title: "",
        company: "",
        duration: "",
        location: "",
        description: "",
        highlights: [""],
        type: "Milestone",
        customFields: [],
      });
      setIsAddModalOpen(false);
    }
  };

  const handleCancelAdd = () => {
    setNewExperience({
      title: "",
      company: "",
      duration: "",
      location: "",
      description: "",
      highlights: [""],
      type: "Milestone",
      customFields: [],
    });
    setIsAddModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewExperience((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field, value) => {
    setEditingExperience((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditHighlightChange = (index, value) => {
    const newHighlights = [...editingExperience.highlights];
    newHighlights[index] = value;
    setEditingExperience((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addEditHighlight = () => {
    setEditingExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeEditHighlight = (index) => {
    if (editingExperience.highlights.length > 1) {
      const newHighlights = editingExperience.highlights.filter(
        (_, i) => i !== index
      );
      setEditingExperience((prev) => ({ ...prev, highlights: newHighlights }));
    }
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...newExperience.highlights];
    newHighlights[index] = value;
    setNewExperience((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setNewExperience((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""],
    }));
  };

  const removeHighlight = (index) => {
    if (newExperience.highlights.length > 1) {
      const newHighlights = newExperience.highlights.filter(
        (_, i) => i !== index
      );
      setNewExperience((prev) => ({ ...prev, highlights: newHighlights }));
    }
  };

  // Custom fields handlers for Add Experience
  const handleAddCustomField = () => {
    setNewExperience((prev) => ({
      ...prev,
      customFields: [
        ...(prev.customFields || []),
        { id: Date.now(), label: "", value: "" },
      ],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setNewExperience((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setNewExperience((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  // Custom fields handlers for Edit Experience
  const handleAddEditCustomField = () => {
    setEditingExperience((prev) => ({
      ...prev,
      customFields: [
        ...(prev.customFields || []),
        { id: Date.now(), label: "", value: "" },
      ],
    }));
  };

  const handleEditCustomFieldChange = (fieldId, property, value) => {
    setEditingExperience((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveEditCustomField = (fieldId) => {
    setEditingExperience((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  const getTypeIcon = (type) => {
    const typeObj = experienceTypes.find((t) => t.value === type);
    return typeObj ? typeObj.icon : "🎯";
  };

  return (
    <>
      <div
        className="p-6 max-w-4xl mx-auto"
        style={{ backgroundColor: "#F7FAFC" }}
      >
        {/* Header */}
        <div
          className="bg-white rounded-lg"
          style={{ backgroundColor: "#F7FAFC" }}
        >
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#DCE8F2" }}
          >
            <div>
              <h1
                className="text-xl font-semibold"
                style={{ color: "#1F2D3D" }}
              >
                Experience
              </h1>
              <p className="text-sm mt-1" style={{ color: "#1F2D3D" }}>
                Track your startup journey, milestones, and key achievements
              </p>
            </div>
            {isOwner && (
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            )}
          </div>

          {/* Experience Guidelines */}
          {/* <div className="p-6 bg-blue-50 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">
              ✅ What to Include in Your Experience:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🚀 Key Stages
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Company foundation</li>
                  <li>• Accelerator programs</li>
                  <li>• Funding rounds</li>
                  <li>• Product launches</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  🎯 Milestones
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Revenue targets achieved</li>
                  <li>• User growth milestones</li>
                  <li>• Market expansion</li>
                  <li>• Strategic partnerships</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  📈 Achievements
                </h4>
                <ul className="text-gray-600 space-y-1 text-xs">
                  <li>• Awards & recognition</li>
                  <li>• Media coverage</li>
                  <li>• Team growth</li>
                  <li>• Product-market fit</li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* Experience Timeline */}
          <div className="p-6">
            <div className="relative">
              {/* Timeline Line */}
              <div
                className="absolute left-6 top-0 bottom-0 w-0.5"
                style={{ backgroundColor: "#DCE8F2" }}
              ></div>

              <div className="space-y-8">
                {experiences.map((experience, index) => (
                  <div key={experience.id} className="relative flex gap-6">
                    {/* Timeline Icon */}
                    <div className="flex-shrink-0 relative">
                      <div
                        className="w-12 h-12 border-4 border-white shadow-sm rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#B5D3E7" }}
                      >
                        <span className="text-lg">
                          {getTypeIcon(experience.type)}
                        </span>
                      </div>
                    </div>

                    {/* Experience Content */}
                    <div className="flex-1 min-w-0 pb-8">
                      <div
                        className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        style={{
                          backgroundColor: "#F7FAFC",
                          borderColor: "#DCE8F2",
                        }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-xs px-2 py-1 rounded-full font-medium"
                                style={{
                                  backgroundColor: "#B5D3E7",
                                  color: "#1F2D3D",
                                }}
                              >
                                {experience.type}
                              </span>
                              <div
                                className="flex items-center text-xs gap-1"
                                style={{ color: "#1F2D3D" }}
                              >
                                <Calendar className="w-3 h-3" />
                                {experience.duration}
                              </div>
                            </div>

                            <h3
                              className="text-lg font-semibold mb-1"
                              style={{ color: "#1F2D3D" }}
                            >
                              {experience.title}
                            </h3>

                            <div
                              className="flex items-center gap-4 text-sm mb-3"
                              style={{ color: "#1F2D3D" }}
                            >
                              <div className="flex items-center gap-1">
                                <Building className="w-4 h-4" />
                                {experience.company}
                              </div>
                              {experience.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {experience.location}
                                </div>
                              )}
                            </div>

                            <p
                              className="mb-4 leading-relaxed"
                              style={{ color: "#1F2D3D" }}
                            >
                              {experience.description}
                            </p>

                            {/* Highlights */}
                            {experience.highlights &&
                              experience.highlights.length > 0 && (
                                <div>
                                  <h4
                                    className="text-sm font-medium mb-2"
                                    style={{ color: "#1F2D3D" }}
                                  >
                                    Key Highlights:
                                  </h4>
                                  <ul className="space-y-1">
                                    {experience.highlights.map(
                                      (highlight, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-2 text-sm"
                                          style={{ color: "#1F2D3D" }}
                                        >
                                          <span
                                            className="mt-1"
                                            style={{ color: "#6EA9CB" }}
                                          >
                                            •
                                          </span>
                                          <span>{highlight}</span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {/* Custom Fields Display */}
                            {experience.customFields &&
                              experience.customFields.length > 0 && (
                                <div
                                  className="mt-4 pt-4 border-t"
                                  style={{ borderColor: "#DCE8F2" }}
                                >
                                  <h4
                                    className="text-sm font-medium mb-2"
                                    style={{ color: "#1F2D3D" }}
                                  >
                                    Additional Details:
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {experience.customFields.map(
                                      (field, fieldIndex) => (
                                        <div
                                          key={field.id || fieldIndex}
                                          className="flex items-center gap-2"
                                        >
                                          <span
                                            className="text-sm font-medium"
                                            style={{ color: "#1F2D3D" }}
                                          >
                                            {field.label}:
                                          </span>
                                          <span
                                            className="text-sm"
                                            style={{ color: "#1F2D3D" }}
                                          >
                                            {field.value}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>

                          {/* Edit Button */}
                          {isOwner && (
                            <button
                              onClick={() => handleEditExperience(index)}
                              className="p-2 hover:opacity-75 rounded-full transition-colors ml-4"
                              title="Edit experience"
                              style={{
                                color: "#1F2D3D",
                                backgroundColor: "#DCE8F2",
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Experience Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Add Experience
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Experience Type */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Experience Type *
                </label>
                <select
                  value={newExperience.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                    focusRingColor: "#6EA9CB",
                  }}
                >
                  {experienceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    value={newExperience.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Series A Funding Round"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={newExperience.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Your Startup Inc."
                  />
                </div>
              </div>

              {/* Duration and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={newExperience.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Jan 2024 – Present"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={newExperience.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Description *
                </label>
                <textarea
                  value={newExperience.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none resize-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                  placeholder="Describe what happened during this stage of your startup journey..."
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {newExperience.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                        style={{
                          borderColor: "#DCE8F2",
                          backgroundColor: "#F7FAFC",
                          color: "#1F2D3D",
                        }}
                        placeholder="Enter a key achievement or highlight"
                      />
                      {newExperience.highlights.length > 1 && (
                        <button
                          onClick={() => removeHighlight(index)}
                          className="p-2 hover:opacity-75 rounded-lg transition-colors"
                          style={{
                            color: "#1F2D3D",
                            backgroundColor: "#DCE8F2",
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addHighlight}
                    className="text-sm font-medium flex items-center gap-1 hover:opacity-75 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add another highlight
                  </button>
                </div>
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="text-sm font-medium hover:opacity-75 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  >
                    + Add Custom Field
                  </button>
                </div>

                {newExperience.customFields &&
                  newExperience.customFields.length > 0 && (
                    <div className="space-y-2">
                      {newExperience.customFields.map((field) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) =>
                                handleCustomFieldChange(
                                  field.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              placeholder="Field Label (e.g., Funding Amount, Valuation)"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm"
                              style={{
                                borderColor: "#DCE8F2",
                                backgroundColor: "#F7FAFC",
                                color: "#1F2D3D",
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleCustomFieldChange(
                                  field.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              placeholder="Field Value (e.g., $5M, $25M)"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm"
                              style={{
                                borderColor: "#DCE8F2",
                                backgroundColor: "#F7FAFC",
                                color: "#1F2D3D",
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomField(field.id)}
                            className="p-2 hover:opacity-75 rounded-lg transition-colors"
                            title="Remove field"
                            style={{
                              color: "#1F2D3D",
                              backgroundColor: "#DCE8F2",
                            }}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-75 transition-colors"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveExperience}
                disabled={
                  !newExperience.title.trim() ||
                  !newExperience.description.trim()
                }
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Experience Modal */}
      {isEditModalOpen && editingExperience && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "#F7FAFC" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Experience
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Experience Type */}
              <div>
                {" "}
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Experience Type *
                </label>
                <select
                  value={editingExperience.type}
                  onChange={(e) =>
                    handleEditInputChange("type", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                >
                  {experienceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title and Company */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Title/Role *
                  </label>
                  <input
                    type="text"
                    value={editingExperience.title}
                    onChange={(e) =>
                      handleEditInputChange("title", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Series A Funding Round"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    value={editingExperience.company}
                    onChange={(e) =>
                      handleEditInputChange("company", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Your Startup Inc."
                  />
                </div>
              </div>

              {/* Duration and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={editingExperience.duration}
                    onChange={(e) =>
                      handleEditInputChange("duration", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., Jan 2024 – Present"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    value={editingExperience.location}
                    onChange={(e) =>
                      handleEditInputChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Description *
                </label>
                <textarea
                  value={editingExperience.description}
                  onChange={(e) =>
                    handleEditInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none resize-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
                  placeholder="Describe what happened during this stage of your startup journey..."
                />
              </div>

              {/* Key Highlights */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Key Highlights
                </label>
                <div className="space-y-2">
                  {editingExperience.highlights.map((highlight, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleEditHighlightChange(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none"
                        style={{
                          borderColor: "#DCE8F2",
                          backgroundColor: "#F7FAFC",
                          color: "#1F2D3D",
                        }}
                        placeholder="Enter a key achievement or highlight"
                      />
                      {editingExperience.highlights.length > 1 && (
                        <button
                          onClick={() => removeEditHighlight(index)}
                          className="p-2 hover:opacity-75 rounded-lg transition-colors"
                          style={{
                            color: "#1F2D3D",
                            backgroundColor: "#DCE8F2",
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addEditHighlight}
                    className="text-sm font-medium flex items-center gap-1 hover:opacity-75 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add another highlight
                  </button>
                </div>
              </div>

              {/* Custom Fields Section for Edit */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddEditCustomField}
                    className="text-sm font-medium hover:opacity-75 transition-colors"
                    style={{ color: "#6EA9CB" }}
                  >
                    + Add Custom Field
                  </button>
                </div>

                {editingExperience.customFields &&
                  editingExperience.customFields.length > 0 && (
                    <div className="space-y-2">
                      {editingExperience.customFields.map((field) => (
                        <div key={field.id} className="flex gap-2 items-start">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) =>
                                handleEditCustomFieldChange(
                                  field.id,
                                  "label",
                                  e.target.value
                                )
                              }
                              placeholder="Field Label (e.g., Funding Amount, Valuation)"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm"
                              style={{
                                borderColor: "#DCE8F2",
                                backgroundColor: "#F7FAFC",
                                color: "#1F2D3D",
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              value={field.value}
                              onChange={(e) =>
                                handleEditCustomFieldChange(
                                  field.id,
                                  "value",
                                  e.target.value
                                )
                              }
                              placeholder="Field Value (e.g., $5M, $25M)"
                              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none text-sm"
                              style={{
                                borderColor: "#DCE8F2",
                                backgroundColor: "#F7FAFC",
                                color: "#1F2D3D",
                              }}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveEditCustomField(field.id)
                            }
                            className="p-2 hover:opacity-75 rounded-lg transition-colors"
                            title="Remove field"
                            style={{
                              color: "#1F2D3D",
                              backgroundColor: "#DCE8F2",
                            }}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:opacity-75 transition-colors"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditExperience}
                disabled={
                  !editingExperience.title.trim() ||
                  !editingExperience.description.trim()
                }
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
