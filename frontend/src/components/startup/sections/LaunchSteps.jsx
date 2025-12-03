import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  CheckCircle,
  Lightbulb,
  Brain,
  Ruler,
  TestTube,
  FileText,
  DollarSign,
  Rocket,
  Megaphone,
  Users,
  BarChart3,
} from "lucide-react";

const LaunchSteps = ({ isOwner, startupData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStepIndex, setEditingStepIndex] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([0, 1, 2]);
  const [content, setContent] = useState({
    title: "Steps to Launch Your Startup",
    description:
      "A comprehensive roadmap to take your startup from idea to market launch.",
    steps: [
      {
        id: 1,
        icon: "💡",
        iconComponent: Lightbulb,
        title: "Validate Your Idea",
        description:
          "Identify the problem you're solving and validate market demand.",
        tasks: [
          "Identify the problem you're solving",
          "Define your target users",
          "Conduct market research & competitor analysis",
          "Build a simple landing page or waitlist",
          "Collect user feedback (surveys, interviews)",
        ],
        timeframe: "2-4 weeks",
        status: "completed",
        customFields: [],
      },
      {
        id: 2,
        icon: "🧠",
        iconComponent: Brain,
        title: "Define Business Model",
        description:
          "Choose your revenue model and create a lean business plan.",
        tasks: [
          "Choose the revenue model (subscription, freemium, marketplace, etc.)",
          "Create a lean business plan or canvas",
          "Identify your key value proposition",
        ],
        timeframe: "1-2 weeks",
        status: "completed",
        customFields: [],
      },
      {
        id: 3,
        icon: "📐",
        iconComponent: Ruler,
        title: "Build MVP (Minimum Viable Product)",
        description: "Design and build your core features for early testing.",
        tasks: [
          "Design UI/UX wireframes",
          "Build core features only",
          "Use no-code/low-code tools if needed",
          "Test usability with early adopters",
        ],
        timeframe: "4-8 weeks",
        status: "completed",
        customFields: [],
      },
      {
        id: 4,
        icon: "🧪",
        iconComponent: TestTube,
        title: "Validate Product-Market Fit",
        description: "Measure engagement and iterate based on user feedback.",
        tasks: [
          "Measure user retention & engagement",
          "Get testimonials or case studies",
          "Iterate based on user feedback",
        ],
        timeframe: "2-4 weeks",
        status: "active",
        customFields: [],
      },
      {
        id: 5,
        icon: "📝",
        iconComponent: FileText,
        title: "Register Your Startup",
        description: "Set up legal structure and government registrations.",
        tasks: [
          "Choose a legal structure (LLP, Pvt Ltd, etc.)",
          "Register under Startup India (if applicable)",
          "Get GST, PAN, bank account",
          "Protect IP (if needed)",
        ],
        timeframe: "2-3 weeks",
        status: "pending",
        customFields: [],
      },
      {
        id: 6,
        icon: "💸",
        iconComponent: DollarSign,
        title: "Funding Readiness",
        description: "Prepare for fundraising and secure initial investment.",
        tasks: [
          "Bootstrap initially or raise from friends/family",
          "Prepare pitch deck & financials",
          "Reach out to angels, VCs, or apply to incubators/accelerators",
          "Participate in pitch competitions",
        ],
        timeframe: "4-8 weeks",
        status: "pending",
        customFields: [],
      },
      {
        id: 7,
        icon: "🚀",
        iconComponent: Rocket,
        title: "Launch Publicly",
        description: "Execute your public launch and onboard first users.",
        tasks: [
          "Launch on platforms like Product Hunt, LinkedIn, Twitter",
          "Run early access / beta programs",
          "Onboard first 100 users",
          "Build community (Discord, Slack, etc.)",
        ],
        timeframe: "2-4 weeks",
        status: "pending",
        customFields: [],
      },
      {
        id: 8,
        icon: "📣",
        iconComponent: Megaphone,
        title: "Marketing & Growth",
        description: "Build your marketing channels and grow user base.",
        tasks: [
          "Set up website, SEO, and analytics",
          "Run digital campaigns (Google, Meta, etc.)",
          "Publish blogs & founder stories",
          "Partner with influencers or B2B networks",
        ],
        timeframe: "Ongoing",
        status: "pending",
        customFields: [],
      },
      {
        id: 9,
        icon: "👥",
        iconComponent: Users,
        title: "Build Your Team",
        description: "Recruit key team members and establish culture.",
        tasks: [
          "Identify core roles (tech, marketing, ops)",
          "Hire interns or freelancers initially",
          "Use ESOPs for early hires",
          "Set up company culture",
        ],
        timeframe: "4-6 weeks",
        status: "pending",
        customFields: [],
      },
      {
        id: 10,
        icon: "📊",
        iconComponent: BarChart3,
        title: "Track & Optimize",
        description: "Monitor performance and optimize for growth.",
        tasks: [
          "Monitor KPIs and feedback",
          "Set OKRs",
          "Build scalable systems (CRM, automation, support)",
          "Plan for next phase: fundraising or expansion",
        ],
        timeframe: "Ongoing",
        status: "pending",
        customFields: [],
      },
    ],
  });

  const [newStep, setNewStep] = useState({
    title: "",
    description: "",
    tasks: [],
    timeframe: "",
    icon: "💡",
    status: "pending",
    customFields: [],
  });

  const [editStep, setEditStep] = useState({
    title: "",
    description: "",
    tasks: [],
    timeframe: "",
    status: "pending",
    customFields: [],
  });

  const handleAddStep = () => {
    setShowAddModal(true);
  };

  const handleSaveStep = () => {
    if (newStep.title.trim() && newStep.description.trim()) {
      const step = {
        id: content.steps.length + 1,
        iconComponent: Lightbulb,
        status: "pending",
        ...newStep,
        tasks:
          typeof newStep.tasks === "string"
            ? newStep.tasks
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0)
            : newStep.tasks,
      };
      setContent((prev) => ({
        ...prev,
        steps: [...prev.steps, step],
      }));
      setNewStep({
        title: "",
        description: "",
        tasks: [],
        timeframe: "",
        icon: "💡",
        status: "pending",
        customFields: [],
      });
      setShowAddModal(false);
    }
  };

  const handleCancelAdd = () => {
    setNewStep({
      title: "",
      description: "",
      tasks: [],
      timeframe: "",
      icon: "💡",
      status: "pending",
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
        tasks:
          typeof editStep.tasks === "string"
            ? editStep.tasks
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0)
            : editStep.tasks,
      };
      setContent((prev) => ({
        ...prev,
        steps: updatedSteps,
      }));
      setEditingStepIndex(null);
      setEditStep({
        title: "",
        description: "",
        tasks: [],
        timeframe: "",
        icon: "💡",
        status: "pending",
        customFields: [],
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingStepIndex(null);
    setEditStep({
      title: "",
      description: "",
      tasks: [],
      timeframe: "",
      icon: "💡",
      status: "pending",
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

  const toggleStepCompletion = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((index) => index !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  // Custom Fields handlers
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
        className="border rounded-lg"
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
            <p
              className="text-sm mt-1"
              style={{ color: "#1F2D3D", opacity: 0.7 }}
            >
              {content.description}
            </p>
          </div>
          {isOwner && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-opacity-80 rounded-lg transition-colors"
              style={{ color: "#1F2D3D", backgroundColor: "#DCE8F2" }}
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
            style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
          >
            <button
              onClick={handleAddStep}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: "#6EA9CB" }}
            >
              <Plus className="w-4 h-4" />
              Add New Step
            </button>
          </div>
        )}

        {/* Progress Overview */}
        <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
          <div
            className="rounded-lg p-4 border"
            style={{
              background: "linear-gradient(to right, #B5D3E7, #DCE8F2)",
              borderColor: "#B5D3E7",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                className="text-lg font-semibold"
                style={{ color: "#1F2D3D" }}
              >
                Launch Progress
              </h3>
              <span
                className="text-sm"
                style={{ color: "#1F2D3D", opacity: 0.7 }}
              >
                {completedSteps.length}/{content.steps.length} steps completed
              </span>
            </div>
            <div
              className="w-full rounded-full h-2"
              style={{ backgroundColor: "#DCE8F2" }}
            >
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #6EA9CB, #B5D3E7)",
                  width: `${
                    (completedSteps.length / content.steps.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Launch Steps */}
        <div className="divide-y" style={{ borderColor: "#DCE8F2" }}>
          {content.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isActive = index === completedSteps.length && !isCompleted;

            return (
              <div key={step.id} className="group">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() =>
                          !isEditing &&
                          !editingStepIndex &&
                          toggleStepCompletion(index)
                        }
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors text-xl ${
                          isCompleted
                            ? "text-white"
                            : isActive
                            ? "text-white"
                            : "hover:bg-opacity-80"
                        }`}
                        style={{
                          backgroundColor: isCompleted
                            ? "#6EA9CB"
                            : isActive
                            ? "#B5D3E7"
                            : "#DCE8F2",
                          color: isCompleted || isActive ? "white" : "#1F2D3D",
                        }}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <span>{step.icon}</span>
                        )}
                      </button>
                      {index < content.steps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 mt-2`}
                          style={{
                            backgroundColor: isCompleted
                              ? "#B5D3E7"
                              : "#DCE8F2",
                          }}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3
                            className={`text-lg font-semibold`}
                            style={{
                              color: isCompleted ? "#6EA9CB" : "#1F2D3D",
                            }}
                          >
                            {step.title}
                          </h3>
                          <p
                            className={`text-sm`}
                            style={{
                              color: isCompleted ? "#6EA9CB" : "#1F2D3D",
                              opacity: 0.8,
                            }}
                          >
                            {step.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span
                            className={`px-2 py-1 text-xs rounded-full`}
                            style={{
                              backgroundColor: isCompleted
                                ? "#B5D3E7"
                                : isActive
                                ? "#DCE8F2"
                                : "#F7FAFC",
                              color: "#1F2D3D",
                            }}
                          >
                            {step.timeframe}
                          </span>
                          {isEditing && isOwner && (
                            <button
                              onClick={() => handleEditClick(index)}
                              className="p-2 hover:bg-opacity-80 rounded-full transition-all"
                              style={{
                                color: "#1F2D3D",
                                backgroundColor: "#DCE8F2",
                              }}
                              title="Edit step"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="mt-3">
                        <h4
                          className={`text-sm font-medium mb-2`}
                          style={{ color: isCompleted ? "#6EA9CB" : "#1F2D3D" }}
                        >
                          Key Tasks:
                        </h4>
                        <div className="space-y-1">
                          {step.tasks.map((task, taskIndex) => (
                            <div
                              key={taskIndex}
                              className={`text-sm flex items-start`}
                              style={{
                                color: isCompleted ? "#6EA9CB" : "#1F2D3D",
                                opacity: 0.8,
                              }}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full mr-2 mt-2 flex-shrink-0`}
                                style={{
                                  backgroundColor: isCompleted
                                    ? "#6EA9CB"
                                    : "#B5D3E7",
                                }}
                              ></span>
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Custom Fields Display */}
                      {step.customFields && step.customFields.length > 0 && (
                        <div className="mt-4">
                          <h4
                            className={`text-sm font-medium mb-2`}
                            style={{
                              color: isCompleted ? "#6EA9CB" : "#1F2D3D",
                            }}
                          >
                            Additional Information:
                          </h4>
                          <div className="space-y-2">
                            {step.customFields.map((field, fieldIndex) => (
                              <div
                                key={fieldIndex}
                                className={`text-sm`}
                                style={{
                                  color: isCompleted ? "#6EA9CB" : "#1F2D3D",
                                  opacity: 0.8,
                                }}
                              >
                                <span className="font-medium">
                                  {field.label}:
                                </span>{" "}
                                <span>{field.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Center */}
        <div
          className="p-6 text-white rounded-b-lg"
          style={{ background: "linear-gradient(to right, #6EA9CB, #B5D3E7)" }}
        >
          <h3 className="text-xl font-semibold mb-2">Ready to Launch?</h3>
          <p className="mb-4">
            Get personalized guidance and support throughout your startup
            journey.
          </p>
          <div className="flex space-x-4">
            <button
              className="px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: "#F7FAFC", color: "#1F2D3D" }}
            >
              Get Mentor Support
            </button>
            <button
              className="px-6 py-2 border border-white text-white rounded-lg font-medium hover:bg-white transition-colors"
              style={{ "--hover-color": "#1F2D3D" }}
              onMouseEnter={(e) => (e.target.style.color = "#1F2D3D")}
              onMouseLeave={(e) => (e.target.style.color = "white")}
            >
              Download Checklist
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
                  className="p-2 hover:bg-opacity-80 rounded-full transition-colors"
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
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#F7FAFC",
                    color: "#1F2D3D",
                  }}
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
                  value={newStep.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={newStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none resize-none"
                  placeholder="Describe what this step involves"
                />
              </div>

              {/* Tasks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Tasks *
                </label>
                <textarea
                  value={
                    Array.isArray(newStep.tasks)
                      ? newStep.tasks.join(", ")
                      : newStep.tasks
                  }
                  onChange={(e) => handleInputChange("tasks", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none resize-none"
                  placeholder="Enter tasks separated by commas"
                />
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe *
                </label>
                <input
                  type="text"
                  value={newStep.timeframe}
                  onChange={(e) =>
                    handleInputChange("timeframe", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  placeholder="e.g., 2-4 weeks"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={newStep.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Custom Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Fields
                </label>
                <div className="space-y-2">
                  {newStep.customFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg"
                    >
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleCustomFieldChange(
                            index,
                            "label",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                        placeholder="Field label"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          handleCustomFieldChange(
                            index,
                            "value",
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                        placeholder="Field value"
                      />
                      <button
                        onClick={() => handleRemoveCustomField(index)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        title="Remove custom field"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddCustomField()}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: "#6EA9CB" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Field
                  </button>
                </div>
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
                onClick={handleSaveStep}
                disabled={!newStep.title.trim() || !newStep.description.trim()}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="p-2 hover:bg-opacity-80 rounded-full transition-colors"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  placeholder="Enter step title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={editStep.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none resize-none"
                  placeholder="Describe what this step involves"
                />
              </div>

              {/* Tasks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Tasks *
                </label>
                <textarea
                  value={
                    Array.isArray(editStep.tasks)
                      ? editStep.tasks.join(", ")
                      : editStep.tasks
                  }
                  onChange={(e) =>
                    handleInputChange("tasks", e.target.value, true)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none resize-none"
                  placeholder="Enter tasks separated by commas"
                />
              </div>

              {/* Timeframe */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timeframe *
                </label>
                <input
                  type="text"
                  value={editStep.timeframe}
                  onChange={(e) =>
                    handleInputChange("timeframe", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                  placeholder="e.g., 2-4 weeks"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={editStep.status}
                  onChange={(e) =>
                    handleInputChange("status", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Custom Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Fields
                </label>
                <div className="space-y-2">
                  {editStep.customFields.map((field, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg"
                    >
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                        placeholder="Field label"
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
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B5D3E7] focus:border-[#6EA9CB] outline-none"
                        placeholder="Field value"
                      />
                      <button
                        onClick={() => handleRemoveCustomField(index, true)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                        title="Remove custom field"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddCustomField(true)}
                    className="flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: "#6EA9CB" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Custom Field
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#DCE8F2", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelEdit}
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
                onClick={handleSaveEdit}
                disabled={
                  !editStep.title.trim() || !editStep.description.trim()
                }
                className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

export default LaunchSteps;
