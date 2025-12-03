import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";
import apiService from "../../../services/apiService";

const Faculty = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [facultyData, setFacultyData] = useState({
    strength: [
      "500+ experienced faculty members across all departments",
      "80% faculty with Ph.D. qualifications",
      "Faculty-to-student ratio of 1:12 ensuring personalized attention",
      "Regular faculty development programs and workshops",
      "Active research collaborations with industry and academia",
      "International exchange programs for faculty development",
    ],
    departments: [
      "Computer Science & Engineering",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
      "Information Technology",
      "Biotechnology",
      "Chemical Engineering",
      "Management Studies",
      "Applied Sciences",
      "Humanities & Social Sciences",
      "Mathematics & Statistics",
    ],
    achievements: [
      "50+ patents filed by faculty members in the last 5 years",
      "₹25 crores research funding secured from government and industry",
      "200+ research papers published in international journals",
      "Faculty recognition in national and international conferences",
      "Industry collaborations with 100+ leading companies",
      "Guest faculty from top international universities",
      "Faculty awards from professional bodies and institutions",
    ],
    statistics: {
      totalFaculty: "500+",
      phdFaculty: "80%",
      facultyStudentRatio: "1:12",
      researchGrants: "₹25 Cr",
      publications: "200+",
      patents: "50+",
    },
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...facultyData });

  // Fetch faculty data on component mount
  useEffect(() => {
    fetchFacultyData();
  }, []);

  const fetchFacultyData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCollegeFaculty();
      if (response.success) {
        const data = response.data;
        setFacultyData(data);
        setEditData({ ...data });
      }
    } catch (error) {
      console.error("Error fetching faculty data:", error);
      // Keep default data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    const editDataWithArrays = {
      ...facultyData,
      strength: Array.isArray(facultyData.strength)
        ? [...facultyData.strength]
        : [],
      departments: Array.isArray(facultyData.departments)
        ? [...facultyData.departments]
        : [],
      achievements: Array.isArray(facultyData.achievements)
        ? [...facultyData.achievements]
        : [],
      customFields: Array.isArray(facultyData.customFields)
        ? [...facultyData.customFields]
        : [],
      statistics: facultyData.statistics || {},
    };
    setEditData(editDataWithArrays);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await apiService.saveCollegeFaculty(editData);
      if (response.success) {
        setFacultyData(editData);
        setIsEditModalOpen(false);
        // Optionally refresh data from server
        setTimeout(() => {
          fetchFacultyData();
        }, 100);
      }
    } catch (error) {
      console.error("Error saving faculty data:", error);
      alert("Failed to save faculty data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...facultyData });
    setIsEditModalOpen(false);
  };

  // Strength handlers
  const handleStrengthChange = (index, value) => {
    const currentStrength = Array.isArray(editData.strength)
      ? editData.strength
      : [];
    const newStrength = [...currentStrength];
    newStrength[index] = value;
    setEditData({ ...editData, strength: newStrength });
  };

  const handleAddStrength = () => {
    const currentStrength = Array.isArray(editData.strength)
      ? editData.strength
      : [];
    setEditData({
      ...editData,
      strength: [...currentStrength, ""],
    });
  };

  const handleRemoveStrength = (index) => {
    const currentStrength = Array.isArray(editData.strength)
      ? editData.strength
      : [];
    const newStrength = currentStrength.filter((_, i) => i !== index);
    setEditData({ ...editData, strength: newStrength });
  };

  // Departments handlers
  const handleDepartmentChange = (index, value) => {
    const currentDepartments = Array.isArray(editData.departments)
      ? editData.departments
      : [];
    const newDepartments = [...currentDepartments];
    newDepartments[index] = value;
    setEditData({ ...editData, departments: newDepartments });
  };

  const handleAddDepartment = () => {
    const currentDepartments = Array.isArray(editData.departments)
      ? editData.departments
      : [];
    setEditData({
      ...editData,
      departments: [...currentDepartments, ""],
    });
  };

  const handleRemoveDepartment = (index) => {
    const currentDepartments = Array.isArray(editData.departments)
      ? editData.departments
      : [];
    const newDepartments = currentDepartments.filter((_, i) => i !== index);
    setEditData({ ...editData, departments: newDepartments });
  };

  // Achievements handlers
  const handleAchievementChange = (index, value) => {
    const currentAchievements = Array.isArray(editData.achievements)
      ? editData.achievements
      : [];
    const newAchievements = [...currentAchievements];
    newAchievements[index] = value;
    setEditData({ ...editData, achievements: newAchievements });
  };

  const handleAddAchievement = () => {
    const currentAchievements = Array.isArray(editData.achievements)
      ? editData.achievements
      : [];
    setEditData({
      ...editData,
      achievements: [...currentAchievements, ""],
    });
  };

  const handleRemoveAchievement = (index) => {
    const currentAchievements = Array.isArray(editData.achievements)
      ? editData.achievements
      : [];
    const newAchievements = currentAchievements.filter((_, i) => i !== index);
    setEditData({ ...editData, achievements: newAchievements });
  };

  // Statistics handlers
  const handleStatisticChange = (field, value) => {
    setEditData({
      ...editData,
      statistics: { ...editData.statistics, [field]: value },
    });
  };

  // Custom fields handlers
  const handleAddCustomField = () => {
    const newField = {
      id: Date.now().toString(),
      label: "",
      value: "",
    };
    const currentCustomFields = Array.isArray(editData.customFields)
      ? editData.customFields
      : [];
    setEditData({
      ...editData,
      customFields: [...currentCustomFields, newField],
    });
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    const currentCustomFields = Array.isArray(editData.customFields)
      ? editData.customFields
      : [];
    const newCustomFields = currentCustomFields.map((field) =>
      field.id === fieldId ? { ...field, [property]: value } : field
    );
    setEditData({ ...editData, customFields: newCustomFields });
  };

  const handleRemoveCustomField = (fieldId) => {
    const currentCustomFields = Array.isArray(editData.customFields)
      ? editData.customFields
      : [];
    const newCustomFields = currentCustomFields.filter(
      (field) => field.id !== fieldId
    );
    setEditData({ ...editData, customFields: newCustomFields });
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Faculty Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Faculty</h2>
            <button
              onClick={handleEditClick}
              disabled={loading}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
              title="Edit faculty information"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Loading faculty information...
                </span>
              </div>
            ) : (
              <>
                {/* Faculty Statistics */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Faculty Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Total Faculty
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {facultyData.statistics.totalFaculty}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Ph.D. Faculty
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        {facultyData.statistics.phdFaculty}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Faculty:Student Ratio
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">
                        {facultyData.statistics.facultyStudentRatio}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Faculty Strength */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Faculty Strength
                  </h3>
                  <div className="space-y-3">
                    {facultyData.strength &&
                      facultyData.strength.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Departments */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Departments
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {facultyData.departments &&
                      facultyData.departments.map((dept, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                        >
                          {dept}
                        </div>
                      ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Faculty Achievements
                  </h3>
                  <div className="space-y-3">
                    {facultyData.achievements &&
                      facultyData.achievements.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Custom Fields Display */}
                {facultyData.customFields &&
                  facultyData.customFields.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Additional Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {facultyData.customFields.map((field, index) => (
                          <div key={field.id || index}>
                            <h5 className="text-sm font-medium text-gray-900 mb-1">
                              {field.label}
                            </h5>
                            <p className="text-gray-700">{field.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Faculty Information
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Faculty Statistics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Faculty Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Faculty
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.totalFaculty}
                      onChange={(e) =>
                        handleStatisticChange("totalFaculty", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 500+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ph.D. Faculty
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.phdFaculty}
                      onChange={(e) =>
                        handleStatisticChange("phdFaculty", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 80%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Faculty:Student Ratio
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.facultyStudentRatio}
                      onChange={(e) =>
                        handleStatisticChange(
                          "facultyStudentRatio",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 1:12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Research Grants
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.researchGrants}
                      onChange={(e) =>
                        handleStatisticChange("researchGrants", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., ₹25 Cr"
                    />
                  </div>
                </div>
              </div>

              {/* Faculty Strength */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Faculty Strength
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddStrength}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Strength
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.strength &&
                    editData.strength.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleStrengthChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter faculty strength point..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveStrength(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove strength"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Departments */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Departments
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddDepartment}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Department
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {editData.departments &&
                    editData.departments.map((dept, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={dept}
                            onChange={(e) =>
                              handleDepartmentChange(index, e.target.value)
                            }
                            placeholder="Department name..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDepartment(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove department"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Faculty Achievements
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddAchievement}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Achievement
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.achievements &&
                    editData.achievements.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleAchievementChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter faculty achievement..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAchievement(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove achievement"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Custom Fields Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Custom Fields
                  </h3>
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
                            placeholder="Field Label (e.g., Research Centers, International Collaborations)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                            placeholder="Field Value"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Faculty;
