import React, { useState } from "react";
import { Edit, X, Plus, Minus, Star, User } from "lucide-react";

const StudentReviews = ({ data, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [reviewsData, setReviewsData] = useState({
    overallRating: "4.2",
    totalReviews: "1,247",
    comments: [
      "Excellent faculty and infrastructure. The campus life is vibrant with numerous opportunities for extracurricular activities.",
      "Great placement opportunities with top companies visiting regularly. The computer science department is particularly strong.",
      "Beautiful campus with modern facilities. The library is well-equipped and the labs have the latest equipment.",
      "Supportive peer environment and active alumni network. The college has helped me grow both academically and personally.",
      "Good balance between theoretical knowledge and practical application. Industry exposure through internships is valuable.",
    ],
    detailedReviews: [
      {
        id: 1,
        studentName: "Rahul Kumar",
        course: "B.Tech CSE",
        year: "2024",
        rating: 5,
        title: "Excellent Learning Environment",
        review:
          "The college has provided me with an excellent learning environment. The faculty is highly qualified and always ready to help. The infrastructure is top-notch with modern labs and facilities.",
        likes: 24,
        dislikes: 2,
      },
      {
        id: 2,
        studentName: "Priya Sharma",
        course: "MBA",
        year: "2023",
        rating: 4,
        title: "Great Placement Support",
        review:
          "The placement cell is very active and supportive. Got placed in a good company with excellent package. The career guidance provided throughout the course was helpful.",
        likes: 18,
        dislikes: 1,
      },
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...reviewsData });

  const handleEditClick = () => {
    setEditData({ ...reviewsData });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    setReviewsData({ ...editData });
    setIsEditModalOpen(false);
    if (onEdit) onEdit(editData);
  };

  const handleCancelEdit = () => {
    setEditData({ ...reviewsData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "comments") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split("\n").filter((item) => item.trim() !== ""),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Quick comments handlers
  const handleAddComment = () => {
    setEditData((prev) => ({
      ...prev,
      comments: [...prev.comments, ""],
    }));
  };

  const handleCommentChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      comments: prev.comments.map((comment, i) =>
        i === index ? value : comment
      ),
    }));
  };

  const handleRemoveComment = (index) => {
    setEditData((prev) => ({
      ...prev,
      comments: prev.comments.filter((_, i) => i !== index),
    }));
  };

  // Detailed reviews handlers
  const handleAddDetailedReview = () => {
    const newReview = {
      id: Date.now(),
      studentName: "",
      course: "",
      year: "",
      rating: 5,
      title: "",
      review: "",
      likes: 0,
      dislikes: 0,
    };
    setEditData((prev) => ({
      ...prev,
      detailedReviews: [...prev.detailedReviews, newReview],
    }));
  };

  const handleDetailedReviewChange = (reviewId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      detailedReviews: prev.detailedReviews.map((review) =>
        review.id === reviewId ? { ...review, [field]: value } : review
      ),
    }));
  };

  const handleRemoveDetailedReview = (reviewId) => {
    setEditData((prev) => ({
      ...prev,
      detailedReviews: prev.detailedReviews.filter(
        (review) => review.id !== reviewId
      ),
    }));
  };

  // Custom fields handlers
  const handleAddCustomField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      value: "",
    };
    setEditData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, newField],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Student Reviews Section */}
        <div className="bg-white rounded-lg mb-8">
          {/* Header */}
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">
              Student Reviews
            </h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit reviews"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Overview Stats */}
            <div className="mb-8">
              <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {reviewsData.overallRating}
                  </div>
                  <div className="flex items-center justify-center mt-1">
                    {renderStars(
                      Math.floor(parseFloat(reviewsData.overallRating))
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Overall Rating
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {reviewsData.totalReviews}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Total Reviews
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Comments */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Comments
              </h3>
              <div className="space-y-3">
                {reviewsData.comments &&
                  reviewsData.comments.map((comment, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{comment}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Detailed Reviews */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detailed Reviews
              </h3>
              <div className="space-y-6">
                {reviewsData.detailedReviews &&
                  reviewsData.detailedReviews.map((review, index) => (
                    <div
                      key={review.id || index}
                      className="border border-gray-200 rounded-lg p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {review.studentName}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {review.course} • {review.year}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <h5 className="font-medium text-gray-900 mb-2">
                        {review.title}
                      </h5>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        {review.review}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>👍 {review.likes}</span>
                        <span>👎 {review.dislikes}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Custom Fields Display */}
            {reviewsData.customFields &&
              reviewsData.customFields.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Additional Information
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviewsData.customFields.map((field, index) => (
                      <div key={field.id || index}>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">
                          {field.label}
                        </h5>
                        <p className="text-sm text-gray-700">{field.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Student Reviews
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Overview Stats */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Overview Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating
                    </label>
                    <input
                      type="text"
                      value={editData.overallRating}
                      onChange={(e) =>
                        handleInputChange("overallRating", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="4.2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Reviews
                    </label>
                    <input
                      type="text"
                      value={editData.totalReviews}
                      onChange={(e) =>
                        handleInputChange("totalReviews", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="1,247"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Comments */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Quick Comments
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddComment}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Comment
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.comments &&
                    editData.comments.map((comment, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={comment}
                            onChange={(e) =>
                              handleCommentChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter review comment..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveComment(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-1"
                          title="Remove comment"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Detailed Reviews */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-lg font-medium text-gray-900">
                    Detailed Reviews
                  </label>
                  <button
                    type="button"
                    onClick={handleAddDetailedReview}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Review
                  </button>
                </div>

                {editData.detailedReviews &&
                  editData.detailedReviews.length > 0 && (
                    <div className="space-y-4">
                      {editData.detailedReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium text-gray-900">
                              Review Details
                            </h4>
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveDetailedReview(review.id)
                              }
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                              title="Remove review"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Student Name
                              </label>
                              <input
                                type="text"
                                value={review.studentName}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "studentName",
                                    e.target.value
                                  )
                                }
                                placeholder="Student Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Course
                              </label>
                              <input
                                type="text"
                                value={review.course}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "course",
                                    e.target.value
                                  )
                                }
                                placeholder="B.Tech CSE"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Year
                              </label>
                              <input
                                type="text"
                                value={review.year}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "year",
                                    e.target.value
                                  )
                                }
                                placeholder="2024"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Rating (1-5)
                              </label>
                              <select
                                value={review.rating}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "rating",
                                    parseInt(e.target.value)
                                  )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              >
                                <option value={1}>1 Star</option>
                                <option value={2}>2 Stars</option>
                                <option value={3}>3 Stars</option>
                                <option value={4}>4 Stars</option>
                                <option value={5}>5 Stars</option>
                              </select>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Review Title
                            </label>
                            <input
                              type="text"
                              value={review.title}
                              onChange={(e) =>
                                handleDetailedReviewChange(
                                  review.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Review title"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Review Content
                            </label>
                            <textarea
                              value={review.review}
                              onChange={(e) =>
                                handleDetailedReviewChange(
                                  review.id,
                                  "review",
                                  e.target.value
                                )
                              }
                              rows={3}
                              placeholder="Detailed review content"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Likes
                              </label>
                              <input
                                type="number"
                                value={review.likes}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "likes",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Dislikes
                              </label>
                              <input
                                type="number"
                                value={review.dislikes}
                                onChange={(e) =>
                                  handleDetailedReviewChange(
                                    review.id,
                                    "dislikes",
                                    parseInt(e.target.value) || 0
                                  )
                                }
                                placeholder="0"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                {(!editData.detailedReviews ||
                  editData.detailedReviews.length === 0) && (
                  <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p className="mb-2">No detailed reviews added yet.</p>
                    <p className="text-sm">
                      Click "Add Review" to add detailed student reviews.
                    </p>
                  </div>
                )}
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Custom Field
                  </button>
                </div>

                {editData.customFields && editData.customFields.length > 0 && (
                  <div className="space-y-3">
                    {editData.customFields.map((field) => (
                      <div key={field.id} className="flex gap-3 items-start">
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
                            placeholder="Field Label (e.g., Review Policy, Response Rate)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
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
                            placeholder="Field Value (e.g., Moderated, 95%)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomField(field.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove field"
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
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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

export default StudentReviews;
