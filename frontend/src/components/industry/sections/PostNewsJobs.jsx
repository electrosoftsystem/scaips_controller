import React, { useState } from "react";
import {
  Edit3,
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share2,
  Briefcase,
  Newspaper,
  X,
  Plus,
  LucideDelete,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";

const PostNewsJobs = ({ isOwner }) => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    company: "",
    author: "",
    description: "",
    type: "post",
    skills: "",
    location: "",
    salary: "",
    category: "",
    tags: "",
    eventDate: "",
  });
  const [postsData, setPostsData] = useState([]);
  const { routeId } = useParams();

  useEffect(() => {
    const fetchChallengeSolutions = async () => {
      if (!routeId) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/posts?industryId=${routeId}`
        );
        setPostsData(response.data);
      } catch (error) {
        console.error("Error fetching challenge solutions:", error);
      }
    };

    fetchChallengeSolutions();
  }, [routeId]);

  // Handler functions
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditData({
      title: item.title,
      company: item.company,
      author: item.author,
      description: item.description,
      type: item.type,
      skills: item.skills ? item.skills.join(", ") : "",
      location: item.location || "",
      salary: item.salary || "",
      category: item.category || "",
      tags: item.tags ? item.tags.join(", ") : "",
      eventDate: item.eventDate || "",
    });
    setIsModalOpen(true);
  };

  const BASE_URL = "/api/industry";

  const handleSave = async () => {
    try {
      if (editingId) {
        const updatedPost = {
          title: editData.title,
          company: editData.company,
          author: editData.author,
          description: editData.description,
          type: editData.type,
          skills: editData.skills
            ? editData.skills.split(",").map((s) => s.trim())
            : [],
          location: editData.location,
          salary: editData.salary,
          category: editData.category,
          tags: editData.tags
            ? editData.tags.split(",").map((t) => t.trim())
            : [],
          eventDate: editData.eventDate,
        };

        // Update in DB
        await axios.put(`${BASE_URL}/posts/${editingId}`, updatedPost);
        alert(`${editData.type} updated sucessfully`);
        // Update locally
        setPostsData((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, ...updatedPost } : item
          )
        );
      } else {
        const newItem = {
          title: editData.title,
          company: editData.company,
          author: editData.author,
          description: editData.description,
          type: editData.type,
          skills: editData.skills
            ? editData.skills.split(",").map((s) => s.trim())
            : [],
          location: editData.location,
          salary: editData.salary,
          category: editData.category,
          tags: editData.tags
            ? editData.tags.split(",").map((t) => t.trim())
            : [],
          eventDate: editData.eventDate,
          industryId: routeId,
        };

        // Save to DB
        const res = await axios.post(`${BASE_URL}/posts`, newItem);
        alert(`${editData.type} saved sucessfully`);
        // Add to local state
        setPostsData((prev) => [res.data, ...prev]);
      }

      setIsModalOpen(false);
      setIsAddModalOpen(false);
      setEditingId(null);
      resetEditData();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`${BASE_URL}/posts/${item?.id}`);
      alert(`${item?.type} deleted`);
      const response = await axios.get(
        `${BASE_URL}/posts?industryId=${routeId}`
      );
      setPostsData(response.data);
      setIsModalOpen(false);
      setIsAddModalOpen(false);
      setEditingId(null);
      resetEditData();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(false);
    setEditingId(null);
    resetEditData();
  };

  const resetEditData = () => {
    setEditData({
      title: "",
      company: "",
      author: "",
      description: "",
      type: "post",
      skills: "",
      location: "",
      salary: "",
      category: "",
      tags: "",
      eventDate: "",
    });
  };

  // const handleAddNew = () => {
  //   setEditingId(null);
  //   resetEditData();
  //   setIsAddModalOpen(true);
  // };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: "#F7FAFC" }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold" style={{ color: "#1F2D3D" }}>
            Posts, News & Jobs
          </h1>
          {isOwner && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              style={{ backgroundColor: "#6EA9CB" }}
            >
              <Plus className="w-5 h-5" />
              Add Post/News/Job
            </button>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
                  Total Posts
                </p>
                <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                  {postsData.filter((item) => item.type === "post").length}
                </p>
              </div>
              {isOwner && (
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "#F7FAFC" }}
                >
                  <Edit3 className="w-6 h-6" style={{ color: "#6EA9CB" }} />
                </div>
              )}
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
                  Job Listings
                </p>
                <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                  {postsData.filter((item) => item.type === "job").length}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F7FAFC" }}
              >
                <Briefcase className="w-6 h-6" style={{ color: "#6EA9CB" }} />
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
                  News Articles
                </p>
                <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                  {postsData.filter((item) => item.type === "news").length}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F7FAFC" }}
              >
                <Newspaper className="w-6 h-6" style={{ color: "#6EA9CB" }} />
              </div>
            </div>
          </div>

          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#1F2D3D" }}>
                  Events
                </p>
                <p className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                  {postsData.filter((item) => item.type === "event").length}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F7FAFC" }}
              >
                <Calendar className="w-6 h-6" style={{ color: "#6EA9CB" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {postsData.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-6 shadow-sm transition-all duration-200"
              style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {item.type === "job" ? (
                    <Briefcase
                      className="w-5 h-5"
                      style={{ color: "#6EA9CB" }}
                    />
                  ) : item.type === "news" ? (
                    <Newspaper
                      className="w-5 h-5"
                      style={{ color: "#6EA9CB" }}
                    />
                  ) : item.type === "event" ? (
                    <Calendar
                      className="w-5 h-5"
                      style={{ color: "#6EA9CB" }}
                    />
                  ) : (
                    <Edit3 className="w-5 h-5" style={{ color: "#6EA9CB" }} />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "#DCE8F2",
                          color: "#1F2D3D",
                        }}
                      >
                        {item.type.charAt(0).toUpperCase() +
                          item.type.slice(1) || ""}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                {isOwner && (
                  <div>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: "#6EA9CB" }}
                      title="Edit Post"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      style={{ color: "#6EA9CB" }}
                      title="Edit Post"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    {item.company}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: "#6EA9CB" }} />
                  <span className="text-sm" style={{ color: "#1F2D3D" }}>
                    {item.author}
                  </span>
                </div>
              </div>

              <p className="mb-4" style={{ color: "#1F2D3D" }}>
                {item.description}
              </p>

              {item.type === "job" && (
                <div className="mb-4 space-y-3">
                  {item.skills && item.skills.length > 0 && (
                    <div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        Skills:{" "}
                      </span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: "#B5D3E7",
                              color: "#1F2D3D",
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm">
                    {item.location && (
                      <span style={{ color: "#1F2D3D" }}>
                        📍 {item.location}
                      </span>
                    )}
                    {item.salary && (
                      <span style={{ color: "#1F2D3D" }}>💰 {item.salary}</span>
                    )}
                  </div>
                </div>
              )}

              {item.type === "news" && item.category && (
                <div className="mb-4">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              )}

              {item.type === "event" && (
                <div className="mb-4 space-y-2">
                  {item.eventDate && (
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="w-4 h-4"
                        style={{ color: "#6EA9CB" }}
                      />
                      <span className="text-sm" style={{ color: "#1F2D3D" }}>
                        {item.eventDate}
                      </span>
                    </div>
                  )}
                  {item.location && (
                    <div className="text-sm" style={{ color: "#1F2D3D" }}>
                      📍 {item.location}
                    </div>
                  )}
                </div>
              )}

              {item.type === "post" && item.tags && item.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center pt-4"
                style={{ borderTop: "1px solid #DCE8F2" }}
              >
                <div className="flex items-center gap-6">
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "#6EA9CB" }}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-sm">{item.likes}</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "#6EA9CB" }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{item.comments}</span>
                  </div>
                  <div
                    className="flex items-center gap-2"
                    style={{ color: "#6EA9CB" }}
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm">{item.shares}</span>
                  </div>
                </div>
                <span className="text-sm" style={{ color: "#1F2D3D" }}>
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Add Modal */}
      {(isModalOpen || isAddModalOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#DCE8F2" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  {editingId ? "Edit Post" : "Add New Post/News/Job"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:opacity-75 rounded-full transition-colors"
                  style={{ backgroundColor: "#DCE8F2" }}
                >
                  <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Type Selection */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Type
                </label>
                <select
                  value={editData.type}
                  onChange={(e) =>
                    setEditData({ ...editData, type: e.target.value })
                  }
                  disabled={editingId}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#DCE8F2" }}
                >
                  <option value="post">Post</option>
                  <option value="news">News</option>
                  <option value="job">Job</option>
                  <option value="event">Event</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#DCE8F2" }}
                  required
                />
              </div>

              {/* Company & Author */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    value={editData.company}
                    onChange={(e) =>
                      setEditData({ ...editData, company: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#DCE8F2" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    value={editData.author}
                    onChange={(e) =>
                      setEditData({ ...editData, author: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#DCE8F2" }}
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
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({ ...editData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  style={{ borderColor: "#DCE8F2" }}
                  required
                />
              </div>

              {/* Job-specific fields */}
              {editData.type === "job" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) =>
                          setEditData({ ...editData, location: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: "#DCE8F2" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Salary
                      </label>
                      <input
                        type="text"
                        value={editData.salary}
                        onChange={(e) =>
                          setEditData({ ...editData, salary: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        style={{ borderColor: "#DCE8F2" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1F2D3D" }}
                    >
                      Skills (comma separated)
                    </label>
                    <input
                      type="text"
                      value={editData.skills}
                      onChange={(e) =>
                        setEditData({ ...editData, skills: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#DCE8F2" }}
                      placeholder="React, JavaScript, Node.js"
                    />
                  </div>
                </>
              )}

              {/* News-specific fields */}
              {editData.type === "news" && (
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#DCE8F2" }}
                  />
                </div>
              )}

              {/* Event-specific fields */}
              {editData.type === "event" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#1F2D3D" }}
                    >
                      Event Date
                    </label>
                    <input
                      type="text"
                      value={editData.eventDate}
                      onChange={(e) =>
                        setEditData({ ...editData, eventDate: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#DCE8F2" }}
                      placeholder="March 15, 2024"
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
                      value={editData.location}
                      onChange={(e) =>
                        setEditData({ ...editData, location: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      style={{ borderColor: "#DCE8F2" }}
                    />
                  </div>
                </div>
              )}

              {/* Post-specific fields */}
              {editData.type === "post" && (
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
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    style={{ borderColor: "#DCE8F2" }}
                    placeholder="Technology, Innovation, Startup"
                  />
                </div>
              )}
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ borderColor: "#DCE8F2" }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg hover:opacity-90"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#F7FAFC",
                  borderColor: "#DCE8F2",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: "#6EA9CB" }}
              >
                {editingId ? `Update ${editData.type}` : `Add ${editData.type}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostNewsJobs;
