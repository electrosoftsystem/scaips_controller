import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Award } from "lucide-react";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/students/achievements`;

const AchievementsSection = ({
  achievements = [],
  onAchievementsUpdate,
  studentId,
  isOwner,
}) => {
  const [achievementList, setAchievementList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [achievementData, setAchievementData] = useState({
    title: "",
    description: "",
    date: "",
    tag: "",
    studentId: studentId,
  });

  // Get today's date in YYYY-MM-DD format for max date validation
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAchievementData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (studentId) {
      fetchAchievements();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  // Sync with parent if props change
  useEffect(() => {
    if (achievements?.length) setAchievementList(achievements);
  }, [achievements]);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`${API_URL}?studentId=${studentId}`);
      setAchievementList(res.data);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error fetching achievements:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAchievement) {
        await axios.put(`${API_URL}/${editingAchievement.id}`, achievementData);
      } else {
        await axios.post(API_URL, achievementData);
      }
      closeModal();
      fetchAchievements();
      if (onAchievementsUpdate) onAchievementsUpdate();
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error saving achievement:", error);
      }
      alert("Error saving achievement. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchAchievements();
        if (onAchievementsUpdate) onAchievementsUpdate();
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Error deleting achievement:", error);
        }
        alert("Error deleting achievement. Please try again.");
      }
    }
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setAchievementData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date.split("T")[0],
      tag: achievement.tag || "",
      studentId,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingAchievement(null);
    setAchievementData({
      title: "",
      description: "",
      date: "",
      tag: "",
      studentId,
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" /> Achievements
          </h2>
          {isOwner && (
            <button
              onClick={() => setShowModal(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
              title="Add achievement"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {achievementList.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No achievements added yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first achievement
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {achievementList.map((achievement) => (
                <div
                  key={achievement.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {achievement.title}
                      </h3>
                      {achievement.tag && (
                        <p className="text-sm text-gray-600">
                          Tag: {achievement.tag}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>

                    {isOwner && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(achievement)}
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(achievement.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingAchievement ? "Edit Achievement" : "Add Achievement"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={achievementData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Achievement title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={achievementData.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      handleInputChange(e);
                    }
                  }}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Describe your achievement"
                />
                {achievementData?.description?.length || 0}/200
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={achievementData.date}
                    onChange={handleInputChange}
                    max={getTodayDate()}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={achievementData.tag}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g., Academic, Sports, Research"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                >
                  {editingAchievement ? "Update" : "Add"} Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementsSection;
