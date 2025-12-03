import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";

const HowItWorks = ({ isOwner, startupData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [content, setContent] = useState({
    title: "How It Works",
    description:
      "Understanding how our startup ecosystem platform connects entrepreneurs, investors, and mentors.",
    steps: [
      {
        id: 1,
        title: "Sign Up & Profile Setup",
        description:
          "Create your startup profile with your business idea, team, and goals",
        details:
          "Fill out comprehensive profile including your industry, stage, funding needs, and team information.",
        icon: "👤",
        features: [
          "Complete business profile",
          "Team member profiles",
          "Industry categorization",
          "Stage identification",
        ],
        customFields: [],
      },
      {
        id: 2,
        title: "Connect & Network",
        description:
          "Get matched with mentors, investors, and fellow entrepreneurs",
        details:
          "Our AI-powered matching system connects you with the right people based on industry and experience.",
        icon: "🤝",
        features: [
          "Smart mentor matching",
          "Investor connections",
          "Peer networking",
          "Industry events",
        ],
        customFields: [],
      },
      {
        id: 3,
        title: "Access Resources",
        description:
          "Utilize our comprehensive library of tools, templates, and guides",
        details:
          "Access curated resources including business plan templates, pitch deck examples, and legal documents.",
        icon: "📚",
        features: [
          "Business templates",
          "Legal documents",
          "Expert guides",
          "Video tutorials",
        ],
        customFields: [],
      },
      {
        id: 4,
        title: "Get Funding",
        description: "Present your startup to investors and secure funding",
        details:
          "Participate in pitch events, connect with angel investors and VCs, and access funding opportunities.",
        icon: "💰",
        features: [
          "Pitch opportunities",
          "Investor matching",
          "Funding tracking",
          "Due diligence support",
        ],
        customFields: [],
      },
      {
        id: 5,
        title: "Grow & Scale",
        description:
          "Accelerate growth with ongoing support and advanced features",
        details:
          "Access growth tools, analytics, and premium support as your startup scales.",
        icon: "🚀",
        features: [
          "Growth analytics",
          "Advanced tools",
          "Scale-up support",
          "Global opportunities",
        ],
        customFields: [],
      },
    ],
  });

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    details: "",
    icon: "💡",
    features: [],
    customFields: [],
  });

  const [editStep, setEditStep] = useState({
    title: "",
    description: "",
    details: "",
    icon: "💡",
    features: [],
    customFields: [],
  });

  const handleAddStep = () => {
    setShowAddModal(true);
  };

  const handleSaveStep = () => {
    if (newStep.title.trim() && newStep.description.trim()) {
      const step = {
        id: content.steps.length + 1,
        ...newStep,
        features:
          typeof newStep.features === "string"
            ? newStep.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f.length > 0)
            : newStep.features,
      };
      setContent((prev) => ({
        ...prev,
        steps: [...prev.steps, step],
      }));
      setNewStep({
        title: "",
        description: "",
        details: "",
        icon: "💡",
        features: [],
        customFields: [],
      });
      setShowAddModal(false);
    }
  };

  const handleCancelAdd = () => {
    setNewStep({
      title: "",
      description: "",
      details: "",
      icon: "💡",
      features: [],
      customFields: [],
    });
    setShowAddModal(false);
  };

  const handleEditClick = (index) => {
    setEditStep({ ...content.steps[index] });
    setEditingStepIndex(index);
  };

  const handleSaveEdit = () => {
    if (editStep.title.trim() && editStep.description.trim()) {
      const updatedSteps = [...content.steps];
      updatedSteps[editingStepIndex] = {
        ...updatedSteps[editingStepIndex],
        ...editStep,
        features:
          typeof editStep.features === "string"
            ? editStep.features
                .split(",")
                .map((f) => f.trim())
                .filter((f) => f.length > 0)
            : editStep.features,
      };
      setContent((prev) => ({
        ...prev,
        steps: updatedSteps,
      }));
      setEditingStepIndex(null);
      setEditStep({
        title: "",
        description: "",
        details: "",
        icon: "💡",
        features: [],
        customFields: [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingStepIndex(null);
    setEditStep({
      title: "",
      description: "",
      details: "",
      icon: "💡",
      features: [],
      customFields: [],
    });
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit) {
      setEditStep((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewStep((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Custom fields handlers
  const handleAddCustomField = (isEdit = false) => {
    const newField = { label: "", value: "" };
    if (isEdit) {
      setEditStep((prev) => ({
        ...prev,
        customFields: [...(prev.customFields || []), newField],
      }));
    } else {
      setNewStep((prev) => ({
        ...prev,
        customFields: [...(prev.customFields || []), newField],
      }));
    }
  };

  const handleRemoveCustomField = (index, isEdit = false) => {
    if (isEdit) {
      setEditStep((prev) => ({
        ...prev,
        customFields: prev.customFields.filter((_, i) => i !== index),
      }));
    } else {
      setNewStep((prev) => ({
        ...prev,
        customFields: prev.customFields.filter((_, i) => i !== index),
      }));
    }
  };

  const handleCustomFieldChange = (index, field, value, isEdit = false) => {
    if (isEdit) {
      setEditStep((prev) => ({
        ...prev,
        customFields: prev.customFields.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setNewStep((prev) => ({
        ...prev,
        customFields: prev.customFields.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        ),
      }));
    }
  };

  return (
    <>
      <div
        className="p-6 border rounded-lg"
        style={{ backgroundColor: "#F7FAFC", borderColor: "#DCE8F2" }}
      >
        {/* Header with Edit Button */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "#DCE8F2" }}
        >
          <div>
            <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
              {content.title}
            </h2>
            <p className="text-sm mt-1" style={{ color: "#1F2D3D" }}>
              {content.description}
            </p>
          </div>
          {isOwner && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
              style={{
                color: "#1F2D3D",
                backgroundColor: isEditing ? "#DCE8F2" : "transparent",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#DCE8F2")}
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = isEditing
                  ? "#DCE8F2"
                  : "transparent")
              }
              title={isEditing ? "Done editing" : "Edit Steps"}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">Done</span>
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  <span className="text-sm font-medium">Edit</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Add Step Button (when editing) */}
        {isEditing && (
          <div
            className="p-4 border-b"
            style={{ borderColor: "#DCE8F2", backgroundColor: "#DCE8F2" }}
          >
            <button
              onClick={handleAddStep}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: "#6EA9CB" }}
            >
              <Plus className="w-4 h-4" />
              Add New Step
            </button>
          </div>
        )}

        {/* Process Steps */}
        <div className="divide-y" style={{ borderColor: "#DCE8F2" }}>
          {content.steps.map((step, index) => (
            <div key={step.id} className="group">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white font-bold shadow-lg flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #6EA9CB 0%, #B5D3E7 100%)",
                    }}
                  >
                    {step.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3
                          className="text-lg font-semibold mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Step {index + 1}: {step.title}
                        </h3>
                        <p
                          className="text-sm mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          {step.description}
                        </p>
                        <p className="text-sm" style={{ color: "#1F2D3D" }}>
                          {step.details}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span
                          className="px-3 py-1 text-xs rounded-full font-medium"
                          style={{
                            backgroundColor: "#DCE8F2",
                            color: "#1F2D3D",
                          }}
                        >
                          {index === 0
                            ? "Start Here"
                            : index === content.steps.length - 1
                            ? "Advanced"
                            : "Essential"}
                        </span>
                        {isEditing && isOwner && (
                          <button
                            onClick={() => handleEditClick(index)}
                            className="p-2 rounded-full transition-all hover:opacity-90"
                            style={{
                              color: "#1F2D3D",
                              backgroundColor: "transparent",
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.backgroundColor = "#DCE8F2")
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.backgroundColor = "transparent")
                            }
                            title="Edit step"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div>
                        <h4
                          className="text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          Key Features:
                        </h4>
                        <div className="space-y-1">
                          {step.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="text-sm flex items-center"
                              style={{ color: "#1F2D3D" }}
                            >
                              <CheckCircle
                                className="w-4 h-4 mr-2 flex-shrink-0"
                                style={{ color: "#6EA9CB" }}
                              />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Custom Fields Display */}
                      {step.customFields && step.customFields.length > 0 && (
                        <div>
                          <h4
                            className="text-sm font-medium mb-2"
                            style={{ color: "#1F2D3D" }}
                          >
                            Additional Information:
                          </h4>
                          <div className="space-y-1">
                            {step.customFields.map((field, fieldIndex) => (
                              <div
                                key={fieldIndex}
                                className="text-sm flex items-start"
                              >
                                <span
                                  className="font-medium min-w-0 mr-2"
                                  style={{ color: "#1F2D3D" }}
                                >
                                  {field.label}:
                                </span>
                                <span style={{ color: "#1F2D3D" }}>
                                  {field.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-end justify-end">
                        <button
                          className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors text-sm hover:opacity-90"
                          style={{ backgroundColor: "#6EA9CB" }}
                        >
                          <Play className="w-4 h-4" />
                          <span>Learn More</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="p-6 text-white rounded-b-lg"
          style={{
            background: "linear-gradient(135deg, #6EA9CB 0%, #B5D3E7 100%)",
          }}
        >
          <h3 className="text-xl font-semibold mb-2">Ready to Get Started?</h3>
          <p className="mb-4">
            Join thousands of successful entrepreneurs who have launched their
            startups with our platform.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-2 bg-white rounded-lg font-medium transition-colors hover:opacity-90"
              style={{ color: "#6EA9CB" }}
            >
              Start Your Journey
            </button>
            <button
              className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white transition-colors flex items-center space-x-2"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#6EA9CB";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "white";
              }}
            >
              <span>Watch Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Step Modal */}
      {showAddModal && (
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
                  Add New Step
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 rounded-full transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Icon *
                </label>
                <input
                  type="text"
                  value={newStep.icon}
                  onChange={(e) => handleInputChange("icon", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "white",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter emoji (e.g., 💡)"
                />
              </div>

              {/* Title */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Step Title *
                </label>
                <input
                  type="text"
                  value={newStep.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "white",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Short Description *
                </label>
                <textarea
                  value={newStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border rounded-lg outline-none resize-none focus:ring-2"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "white",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Brief description of the step"
                />
              </div>

              {/* Details */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Detailed Description *
                </label>
                <textarea
                  value={newStep.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg outline-none resize-none focus:ring-2"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "white",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Detailed explanation of what this step involves"
                />
              </div>

              {/* Features */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Key Features *
                </label>
                <textarea
                  value={
                    Array.isArray(newStep.features)
                      ? newStep.features.join(", ")
                      : newStep.features
                  }
                  onChange={(e) =>
                    handleInputChange("features", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg outline-none resize-none focus:ring-2"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "white",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                  placeholder="Enter features separated by commas"
                />
              </div>

              {/* Custom Fields */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddCustomField(false)}
                    className="px-3 py-1 text-sm text-white rounded transition-colors hover:opacity-90"
                    style={{ backgroundColor: "#6EA9CB" }}
                  >
                    Add Field
                  </button>
                </div>
                {newStep.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          "label",
                          e.target.value,
                          false
                        )
                      }
                      placeholder="Field name"
                      className="flex-1 px-3 py-2 border rounded-lg outline-none focus:ring-2"
                      style={{
                        borderColor: "#DCE8F2",
                        backgroundColor: "white",
                        color: "#1F2D3D",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#6EA9CB";
                        e.target.style.boxShadow =
                          "0 0 0 2px rgba(110, 169, 203, 0.2)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "#DCE8F2";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          "value",
                          e.target.value,
                          false
                        )
                      }
                      placeholder="Field value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(index, false)}
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
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "white",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveStep}
                disabled={!newStep.title.trim() || !newStep.description.trim()}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                Add Step
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Step Modal */}
      {editingStepIndex !== null && (
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
                  Edit Step
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-full transition-colors hover:opacity-90"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon *
                </label>
                <input
                  type="text"
                  value={editStep.icon}
                  onChange={(e) =>
                    handleInputChange("icon", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter emoji (e.g., 💡)"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Step Title *
                </label>
                <input
                  type="text"
                  value={editStep.title}
                  onChange={(e) =>
                    handleInputChange("title", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  value={editStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value, true)
                  }
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Brief description of the step"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={editStep.details}
                  onChange={(e) =>
                    handleInputChange("details", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Detailed explanation of what this step involves"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features *
                </label>
                <textarea
                  value={
                    Array.isArray(editStep.features)
                      ? editStep.features.join(", ")
                      : editStep.features
                  }
                  onChange={(e) =>
                    handleInputChange("features", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter features separated by commas"
                />
              </div>

              {/* Custom Fields */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddCustomField(true)}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Add Field
                  </button>
                </div>
                {editStep.customFields.map((field, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          "label",
                          e.target.value,
                          true
                        )
                      }
                      placeholder="Field name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleCustomFieldChange(
                          index,
                          "value",
                          e.target.value,
                          true
                        )
                      }
                      placeholder="Field value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomField(index, true)}
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
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors hover:opacity-90"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  backgroundColor: "white",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={
                  !editStep.title.trim() || !editStep.description.trim()
                }
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default HowItWorks;
