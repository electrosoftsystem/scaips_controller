import React, { useState } from "react";
import {
  Edit3,
  User,
  Calendar,
  Play,
  MessageCircle,
  X,
  Plus,
  FileText,
  Video,
  Github,
  BookOpen,
  Monitor,
} from "lucide-react";

const ExpertOpinionsInterview = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("interviews");

  const [interviews, setInterviews] = useState([
    {
      id: 1,
      title: "The Future of AI in Healthcare",
      expert: "Dr. Sarah Johnson",
      role: "Chief Medical Officer, TechHealth Solutions",
      date: "Dec 20, 2024",
      type: "Video Interview",
      duration: "45 min",
      description:
        "Exploring how artificial intelligence is revolutionizing patient care, diagnosis, and treatment protocols in modern healthcare systems.",
      tags: ["AI", "Healthcare", "Innovation"],
      views: "12.5K",
      likes: "890",
    },
    {
      id: 2,
      title: "Sustainable Tech: Building Green Solutions",
      expert: "Mark Thompson",
      role: "Sustainability Director, EcoTech Corp",
      date: "Dec 18, 2024",
      type: "Written Interview",
      duration: "15 min read",
      description:
        "An in-depth discussion about creating environmentally conscious technology solutions and the importance of sustainable development practices.",
      tags: ["Sustainability", "GreenTech", "Environment"],
      views: "8.3K",
      likes: "645",
    },
  ]);

  const [learningResources, setLearningResources] = useState([
    {
      id: 1,
      title: "Complete Machine Learning Handbook",
      type: "E-book/PDF",
      author: "Dr. Alex Chen",
      size: "15.2 MB",
      pages: "450 pages",
      description:
        "Comprehensive guide covering machine learning algorithms, implementation, and real-world applications.",
      tags: ["Machine Learning", "AI", "Data Science"],
      downloads: "3.2K",
      rating: "4.8/5",
    },
    {
      id: 2,
      title: "React.js Complete Course 2024",
      type: "Video Tutorial",
      instructor: "Sarah Williams",
      duration: "12 hours",
      lessons: "65 lessons",
      description:
        "Master React.js from basics to advanced concepts with hands-on projects and real-world examples.",
      tags: ["React", "JavaScript", "Frontend"],
      views: "25.1K",
      rating: "4.9/5",
    },
    {
      id: 3,
      title: "Open Source Data Science Projects",
      type: "GitHub Links",
      maintainer: "Tech Community",
      repositories: "15 repos",
      stars: "12.5K total",
      description:
        "Collection of well-documented data science projects covering various domains and techniques.",
      tags: ["Data Science", "Open Source", "Python"],
      forks: "3.8K",
      contributors: "150+",
    },
    {
      id: 4,
      title: "System Design Interview Notes",
      type: "Study Notes",
      author: "Engineering Team",
      topics: "25 topics",
      lastUpdated: "Dec 15, 2024",
      description:
        "Comprehensive study notes covering system design patterns, scalability, and architecture principles.",
      tags: ["System Design", "Architecture", "Interview"],
      downloads: "5.5K",
      rating: "4.7/5",
    },
    {
      id: 5,
      title: "CodeLab Interactive Platform",
      type: "Practice Platform",
      provider: "TechSkills Inc.",
      challenges: "500+ problems",
      difficulty: "Beginner to Expert",
      description:
        "Interactive coding platform with real-time feedback, automated testing, and peer collaboration.",
      tags: ["Coding", "Practice", "Algorithms"],
      users: "100K+",
      rating: "4.6/5",
    },
  ]);

  const [editData, setEditData] = useState({
    title: "",
    expert: "",
    role: "",
    description: "",
    tags: "",
  });

  const [addData, setAddData] = useState({
    title: "",
    expert: "",
    role: "",
    type: "Video Interview",
    duration: "",
    description: "",
    tags: "",
  });

  const handleEdit = (interview) => {
    setEditingId(interview.id);
    setIsEditModalOpen(true);
    setEditData({
      title: interview.title,
      expert: interview.expert,
      role: interview.role,
      description: interview.description,
      tags: interview.tags.join(", "),
    });
  };

  const handleSave = () => {
    setInterviews(
      interviews.map((interview) =>
        interview.id === editingId
          ? {
              ...interview,
              title: editData.title,
              expert: editData.expert,
              role: editData.role,
              description: editData.description,
              tags: editData.tags.split(",").map((tag) => tag.trim()),
            }
          : interview
      )
    );
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({ title: "", expert: "", role: "", description: "", tags: "" });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({ title: "", expert: "", role: "", description: "", tags: "" });
  };

  const handleAdd = () => {
    const newId = Math.max(...interviews.map((interview) => interview.id)) + 1;
    const newInterview = {
      id: newId,
      title: addData.title,
      expert: addData.expert,
      role: addData.role,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      type: addData.type,
      duration: addData.duration,
      description: addData.description,
      tags: addData.tags.split(",").map((tag) => tag.trim()),
      views: "0",
      likes: "0",
    };

    setInterviews([newInterview, ...interviews]);
    setIsAddModalOpen(false);
    setAddData({
      title: "",
      expert: "",
      role: "",
      type: "Video Interview",
      duration: "",
      description: "",
      tags: "",
    });
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setAddData({
      title: "",
      expert: "",
      role: "",
      type: "Video Interview",
      duration: "",
      description: "",
      tags: "",
    });
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#F7FAFC" }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            Expert Opinions & Learning Resources
          </h2>
          <p className="mt-1" style={{ color: "#1F2D3D", opacity: "0.7" }}>
            Gain insights from industry leaders and access valuable learning
            materials
          </p>
        </div>
        {isOwner && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            style={{ backgroundColor: "#6EA9CB" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a8fa8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6EA9CB")}
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === "interviews" ? "Add Interview" : "Add Resource"}
            </span>
          </button>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div
          className="flex space-x-1 rounded-lg p-1"
          style={{ backgroundColor: "#DCE8F2" }}
        >
          <button
            onClick={() => setActiveTab("interviews")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "interviews" ? "text-white" : ""
            }`}
            style={{
              backgroundColor:
                activeTab === "interviews" ? "#6EA9CB" : "transparent",
              color: activeTab === "interviews" ? "white" : "#1F2D3D",
            }}
          >
            Expert Interviews
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === "resources" ? "text-white" : ""
            }`}
            style={{
              backgroundColor:
                activeTab === "resources" ? "#6EA9CB" : "transparent",
              color: activeTab === "resources" ? "white" : "#1F2D3D",
            }}
          >
            Learning Resources
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Expert Interview
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.7" }}
                  />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Expert Name
                  </label>
                  <input
                    type="text"
                    value={editData.expert}
                    onChange={(e) =>
                      setEditData({ ...editData, expert: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    value={editData.role}
                    onChange={(e) =>
                      setEditData({ ...editData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
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
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={editData.tags}
                  onChange={(e) =>
                    setEditData({ ...editData, tags: e.target.value })
                  }
                  placeholder="AI, Healthcare, Innovation"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Add New Interview
                </h2>
                <button
                  onClick={handleAddCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.7" }}
                  />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Interview Title
                </label>
                <input
                  type="text"
                  value={addData.title}
                  onChange={(e) =>
                    setAddData({ ...addData, title: e.target.value })
                  }
                  placeholder="Enter interview title"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Expert Name
                  </label>
                  <input
                    type="text"
                    value={addData.expert}
                    onChange={(e) =>
                      setAddData({ ...addData, expert: e.target.value })
                    }
                    placeholder="Enter expert name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Role/Position
                  </label>
                  <input
                    type="text"
                    value={addData.role}
                    onChange={(e) =>
                      setAddData({ ...addData, role: e.target.value })
                    }
                    placeholder="Enter expert's role/position"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Interview Type
                  </label>
                  <select
                    value={addData.type}
                    onChange={(e) =>
                      setAddData({ ...addData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  >
                    <option value="Video Interview">Video Interview</option>
                    <option value="Written Interview">Written Interview</option>
                    <option value="Panel Discussion">Panel Discussion</option>
                    <option value="Podcast">Podcast</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={addData.duration}
                    onChange={(e) =>
                      setAddData({ ...addData, duration: e.target.value })
                    }
                    placeholder="e.g., 45 min, 15 min read"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Description
                </label>
                <textarea
                  value={addData.description}
                  onChange={(e) =>
                    setAddData({ ...addData, description: e.target.value })
                  }
                  rows={4}
                  placeholder="Enter interview description"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={addData.tags}
                  onChange={(e) =>
                    setAddData({ ...addData, tags: e.target.value })
                  }
                  placeholder="AI, Healthcare, Innovation"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleAddCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                Add Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === "interviews" && (
        <div className="space-y-6">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: "white", borderColor: "#B5D3E7" }}
            >
              {/* View Mode */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3
                      className="text-xl font-semibold mb-2"
                      style={{ color: "#1F2D3D" }}
                    >
                      {interview.title}
                    </h3>
                    <div
                      className="flex items-center space-x-4 text-sm mb-3"
                      style={{ color: "#1F2D3D", opacity: "0.7" }}
                    >
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{interview.expert}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Play className="w-4 h-4" />
                        <span>{interview.duration}</span>
                      </div>
                    </div>
                    <p
                      className="text-sm mb-1"
                      style={{ color: "#1F2D3D", opacity: "0.7" }}
                    >
                      {interview.role}
                    </p>
                  </div>
                  {isOwner && (
                    <button
                      onClick={() => handleEdit(interview)}
                      className="ml-4 p-2 rounded-lg transition-colors"
                      style={{ color: "#1F2D3D", opacity: "0.7" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#DCE8F2";
                        e.target.style.color = "#6EA9CB";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#1F2D3D";
                        e.target.style.opacity = "0.7";
                      }}
                      title="Edit Interview"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <p
                  className="mb-4 leading-relaxed"
                  style={{ color: "#1F2D3D", opacity: "0.8" }}
                >
                  {interview.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-wrap gap-2">
                      {interview.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: "#DCE8F2",
                            color: "#1F2D3D",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-4 text-sm"
                    style={{ color: "#1F2D3D", opacity: "0.6" }}
                  >
                    <span>{interview.views} views</span>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{interview.likes} likes</span>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "#B5D3E7" }}
                >
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      style={{ backgroundColor: "#6EA9CB" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#5a8fa8")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#6EA9CB")
                      }
                    >
                      <Play className="w-4 h-4" />
                      <span>Watch Interview</span>
                    </button>
                    <button
                      className="px-4 py-2 border rounded-lg transition-colors"
                      style={{
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#DCE8F2")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Share
                    </button>
                    <button
                      className="px-4 py-2 border rounded-lg transition-colors"
                      style={{
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#DCE8F2")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "resources" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {learningResources.map((resource) => (
            <div
              key={resource.id}
              className="border rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              style={{ backgroundColor: "white", borderColor: "#B5D3E7" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {resource.type === "E-book/PDF" && (
                    <FileText
                      className="w-6 h-6"
                      style={{ color: "#6EA9CB" }}
                    />
                  )}
                  {resource.type === "Video Tutorial" && (
                    <Video className="w-6 h-6" style={{ color: "#6EA9CB" }} />
                  )}
                  {resource.type === "GitHub Links" && (
                    <Github className="w-6 h-6" style={{ color: "#6EA9CB" }} />
                  )}
                  {resource.type === "Study Notes" && (
                    <BookOpen
                      className="w-6 h-6"
                      style={{ color: "#6EA9CB" }}
                    />
                  )}
                  {resource.type === "Practice Platform" && (
                    <Monitor className="w-6 h-6" style={{ color: "#6EA9CB" }} />
                  )}
                  <div>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
                    >
                      {resource.type}
                    </span>
                  </div>
                </div>
                {isOwner && (
                  <button
                    className="p-2 rounded-lg transition-colors"
                    style={{ color: "#1F2D3D", opacity: "0.7" }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#DCE8F2";
                      e.target.style.color = "#6EA9CB";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                      e.target.style.color = "#1F2D3D";
                      e.target.style.opacity = "0.7";
                    }}
                    title="Edit Resource"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "#1F2D3D" }}
              >
                {resource.title}
              </h3>

              <div
                className="space-y-2 mb-4 text-sm"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
              >
                {resource.author && (
                  <div className="flex justify-between">
                    <span>Author:</span>
                    <span>{resource.author}</span>
                  </div>
                )}
                {resource.instructor && (
                  <div className="flex justify-between">
                    <span>Instructor:</span>
                    <span>{resource.instructor}</span>
                  </div>
                )}
                {resource.maintainer && (
                  <div className="flex justify-between">
                    <span>Maintainer:</span>
                    <span>{resource.maintainer}</span>
                  </div>
                )}
                {resource.provider && (
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span>{resource.provider}</span>
                  </div>
                )}
                {resource.size && (
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{resource.size}</span>
                  </div>
                )}
                {resource.duration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{resource.duration}</span>
                  </div>
                )}
                {resource.repositories && (
                  <div className="flex justify-between">
                    <span>Repositories:</span>
                    <span>{resource.repositories}</span>
                  </div>
                )}
                {resource.topics && (
                  <div className="flex justify-between">
                    <span>Topics:</span>
                    <span>{resource.topics}</span>
                  </div>
                )}
                {resource.challenges && (
                  <div className="flex justify-between">
                    <span>Challenges:</span>
                    <span>{resource.challenges}</span>
                  </div>
                )}
              </div>

              <p
                className="mb-4 leading-relaxed text-sm"
                style={{ color: "#1F2D3D", opacity: "0.8" }}
              >
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full"
                    style={{
                      backgroundColor: "#DCE8F2",
                      color: "#1F2D3D",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="flex items-center justify-between mb-4 text-sm"
                style={{ color: "#1F2D3D", opacity: "0.6" }}
              >
                <div className="flex space-x-4">
                  {resource.downloads && (
                    <span>{resource.downloads} downloads</span>
                  )}
                  {resource.views && <span>{resource.views} views</span>}
                  {resource.users && <span>{resource.users} users</span>}
                  {resource.stars && <span>⭐ {resource.stars}</span>}
                </div>
                {resource.rating && (
                  <span className="font-medium" style={{ color: "#6EA9CB" }}>
                    {resource.rating}
                  </span>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  className="flex-1 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  style={{ backgroundColor: "#6EA9CB" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#5a8fa8")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#6EA9CB")
                  }
                >
                  {resource.type === "E-book/PDF" && (
                    <FileText className="w-4 h-4" />
                  )}
                  {resource.type === "Video Tutorial" && (
                    <Play className="w-4 h-4" />
                  )}
                  {resource.type === "GitHub Links" && (
                    <Github className="w-4 h-4" />
                  )}
                  {resource.type === "Study Notes" && (
                    <BookOpen className="w-4 h-4" />
                  )}
                  {resource.type === "Practice Platform" && (
                    <Monitor className="w-4 h-4" />
                  )}
                  <span>
                    {resource.type === "E-book/PDF" && "Download"}
                    {resource.type === "Video Tutorial" && "Watch"}
                    {resource.type === "GitHub Links" && "View Code"}
                    {resource.type === "Study Notes" && "Read Notes"}
                    {resource.type === "Practice Platform" && "Start Practice"}
                  </span>
                </button>
                <button
                  className="px-4 py-2 border rounded-lg transition-colors"
                  style={{
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpertOpinionsInterview;
