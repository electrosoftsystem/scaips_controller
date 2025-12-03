import React, { useState } from "react";
import { Edit, Plus, X, MessageCircle, Trash2 } from "lucide-react";
import apiService from "../../../services/apiService";

const RecommendationsSection = ({
  recommendations = [],
  onRecommendationsUpdate,
  studentId,
  isOwner,
}) => {
  const [showRecommendationModal, setShowRecommendationModal] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState(null);
  const [recommendationData, setRecommendationData] = useState({
    recipient: "",
    position: "",
    message: "",
    name: "",
    relation: "",
    text: "",
    date: "",
    customFields: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecommendationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Build payload preserving both position and relationship separately
      const recommendationPayload = {
        recommender_name: recommendationData.name,
        position: recommendationData.position, // <-- position preserved
        relationship: recommendationData.relation, // <-- relationship preserved
        message: recommendationData.text || recommendationData.message,
        date: recommendationData.date || undefined,
        customFields: recommendationData.customFields || [],
      };

      if (editingRecommendation) {
        // Update existing recommendation (pass id)
        await apiService.updateStudentRecommendation(
          editingRecommendation.id,
          recommendationPayload
        );
      } else {
        // Add new recommendation (if your API expects studentId include it here)
        await apiService.createStudentRecommendation(recommendationPayload);
      }

      closeModal();

      // Update parent list if callback provided
      if (onRecommendationsUpdate) {
        // If your API expects a studentId, pass it here: apiService.getStudentRecommendations(studentId)
        const updatedRecommendations =
          await apiService.getStudentRecommendations(studentId);
        // API wrapper might return data prop or array directly; handle both
        onRecommendationsUpdate(
          updatedRecommendations.data || updatedRecommendations
        );
      }
    } catch (error) {
      console.error("Error saving recommendation:", error);
      alert("Error saving recommendation. Please try again.");
    }
  };

  const handleEditRecommendation = (recommendation) => {
    setEditingRecommendation(recommendation);

    // Map incoming recommendation object to local state fields,
    // ensuring 'position' and 'relation' are set correctly
    setRecommendationData({
      recipient: recommendation.recipient || "",
      position: recommendation.position || recommendation.relationship || "", // prefer explicit position
      message: recommendation.message || "",
      name: recommendation.recommender_name || recommendation.name || "",
      text: recommendation.message || recommendation.text || "",
      relation: recommendation.relationship || recommendation.relation || "",
      date: recommendation.date || "",
      customFields: recommendation.customFields || [],
    });

    setShowRecommendationModal(true);
  };

  const handleDeleteRecommendation = async (recommendationId) => {
    if (!confirm("Are you sure you want to delete this recommendation?")) {
      return;
    }

    try {
      await apiService.deleteStudentRecommendation(recommendationId);

      // Update parent list after deletion
      if (onRecommendationsUpdate) {
        const updatedRecommendations =
          await apiService.getStudentRecommendations(studentId);
        onRecommendationsUpdate(
          updatedRecommendations.data || updatedRecommendations
        );
      }
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      alert("Error deleting recommendation. Please try again.");
    }
  };

  const closeModal = () => {
    setShowRecommendationModal(false);
    setEditingRecommendation(null);
    setRecommendationData({
      recipient: "",
      position: "",
      message: "",
      name: "",
      relation: "",
      text: "",
      date: "",
      customFields: [],
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recommendations
          </h2>
          {isOwner && (
            <button
              onClick={() => setShowRecommendationModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Request recommendation"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No recommendations yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowRecommendationModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Request a recommendation
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {recommendations.map((recommendation, index) => {
                console.log(
                  `🎯 Rendering recommendation ${index}:`,
                  recommendation
                );
                return (
                  <div
                    key={recommendation.id || index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {recommendation.recommender_name ||
                            recommendation.name}
                        </h3>
                        {/* Show position (title) if present */}
                        {recommendation.position && (
                          <p className="text-sm text-gray-600">
                            {recommendation.position}
                          </p>
                        )}
                        {/* Show relationship separately */}
                        {(recommendation.relationship ||
                          recommendation.relation) && (
                          <p className="text-xs text-gray-500">
                            {recommendation.relationship ||
                              recommendation.relation}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-500">
                          {recommendation.date}
                        </span>
                        <button
                          onClick={() =>
                            handleEditRecommendation(recommendation)
                          }
                          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit recommendation"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {isOwner && (
                          <button
                            onClick={() =>
                              handleDeleteRecommendation(recommendation.id)
                            }
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete recommendation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic border-l-4 border-blue-200 pl-4">
                      "{recommendation.message || recommendation.text}"
                    </blockquote>

                    {recommendation.customFields &&
                      recommendation.customFields.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {recommendation.customFields.map((field, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium text-gray-600">
                                {field.label}:
                              </span>
                              <span className="text-gray-700 ml-1">
                                {field.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Request/Edit Recommendation Modal */}
      {showRecommendationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingRecommendation
                    ? "Edit Recommendation"
                    : "Request Recommendation"}
                </h2>
                <button
                  onClick={() => setShowRecommendationModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={recommendationData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Recommender's name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  name="position"
                  value={recommendationData.position}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Their position/title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship *
                </label>
                <select
                  name="relation"
                  value={recommendationData.relation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="colleague">Colleague</option>
                  <option value="manager">Manager</option>
                  <option value="teacher">Teacher/Professor</option>
                  <option value="classmate">Classmate</option>
                  <option value="mentor">Mentor</option>
                  <option value="client">Client</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommendation Text *
                </label>
                <textarea
                  name="text"
                  value={recommendationData.text}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="The recommendation text..."
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">
                  Tips for managing recommendations:
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>
                    • Add recommendations from people who know your work well
                  </li>
                  <li>• Include specific details about your relationship</li>
                  <li>• Highlight specific achievements and skills</li>
                  <li>• Keep recommendations current and relevant</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingRecommendation
                    ? "Update Recommendation"
                    : "Add Recommendation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationsSection;
