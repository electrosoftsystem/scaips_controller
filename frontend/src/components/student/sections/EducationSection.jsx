import React, { useState, useEffect } from "react";
import { Edit, Plus, X, GraduationCap } from "lucide-react";

import axios from "axios";

const EducationSection = ({ onEducationUpdate, studentId, isOwner }) => {
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [educationData, setEducationData] = useState({
    school: "",
    degree: "",
    field: "",
    grade: "",
    activities: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    customFields: [],
    notifyNetwork: true,
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i + 10);
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCustomFieldAdd = () => {
    setEducationData((prev) => ({
      ...prev,
      customFields: [...prev.customFields, { label: "", value: "" }],
    }));
  };

  const handleCustomFieldChange = (index, field, value) => {
    setEducationData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleCustomFieldRemove = (index) => {
    setEducationData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/education/${studentId}`);
      setEducationData(response.data);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Error fetching education data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const educationPayload = {
        student_id: studentId,
        institution: educationData.school,
        degree: educationData.degree,
        field_of_study: educationData.field,
        grade: educationData.grade,
        start_year: educationData.startYear
          ? parseInt(educationData.startYear)
          : null,
        end_year: educationData.endYear
          ? parseInt(educationData.endYear)
          : null,
        custom_fields: educationData.customFields || [],
        activities: educationData.activities || "",
        description: educationData.description || "",
      };

      if (editingEducation) {
        await axios.put(
          `${API_URL}/education/${editingEducation.id}`,
          educationPayload
        );
      } else {
        await axios.post(`${API_URL}/education`, educationPayload);
      }
      closeModal();

      // Small delay for backend sync
      await new Promise((resolve) => setTimeout(resolve, 400));

      if (onEducationUpdate) {
        const updatedEducation = await axios.get(
          `${API_URL}/education/${studentId}`
        );

        const educationArray = updatedEducation.data || [];
        if (Array.isArray(educationArray)) {
          onEducationUpdate(educationArray);
          if (import.meta.env.NODE_ENV !== "production") {
            console.log(
              "✅ State updated with",
              educationArray.length,
              "entries"
            );
          }
        } else {
          if (import.meta.env.NODE_ENV !== "production") {
            console.error("❌ Unexpected data format:", educationArray);
          }
        }
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Error saving education:", error);
      }
      alert(`Error saving education: ${error.message}`);
    }
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education);
    setEducationData({
      school: education.institution || "",
      degree: education.degree || "",
      field: education.field_of_study || "",
      grade: education.grade || "",
      activities: "",
      description: "",
      startMonth: "",
      startYear: education.start_year ? education.start_year.toString() : "",
      endMonth: "",
      endYear: education.end_year ? education.end_year.toString() : "",
      customFields: education.customFields || [],
      notifyNetwork: true,
    });
    setShowEducationModal(true);
  };

  const handleDeleteEducation = async (educationId) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;

    try {
      await axios.delete(`${API_URL}/education/${educationId}`);

      await new Promise((resolve) => setTimeout(resolve, 400));

      if (onEducationUpdate) {
        fetchCourses();
      }
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Error deleting education:", error);
      }
      alert(`Error deleting education: ${error.message}`);
    }
  };

  const closeModal = () => {
    setShowEducationModal(false);
    setEditingEducation(null);
    setEducationData({
      school: "",
      degree: "",
      field: "",
      grade: "",
      activities: "",
      description: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      customFields: [],
      notifyNetwork: true,
    });
    const data = fetchCourses();
    setEducationData(data);
  };

  return (
    <>
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          {isOwner && (
            <button
              onClick={() => setShowEducationModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Add education"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {educationData.length === 0 ? (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No education added yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowEducationModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your education
                </button>
              )}
            </div>
          ) : (
            <>
              {educationData && educationData.length > 0 ? (
                <div className="space-y-6">
                  {educationData?.map((edu, index) => (
                    <div key={edu.id || index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {edu.institution || edu.school}
                        </h3>
                        <p className="text-gray-600">
                          {edu.degree}
                          {(edu.field_of_study || edu.field) &&
                            `, ${edu.field_of_study || edu.field}`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {edu.start_year || edu.startYear} -{" "}
                          {edu.end_year || edu.endYear || "Present"}
                        </p>
                        {edu.grade && (
                          <p className="text-sm text-gray-500">
                            Grade: {edu.grade}
                          </p>
                        )}
                        {edu.activities && (
                          <p className="text-gray-700 mt-2">
                            <span className="font-medium">Activities:</span>{" "}
                            {edu.activities}
                          </p>
                        )}
                        {edu.description && (
                          <p className="text-gray-700 mt-2">
                            {edu.description}
                          </p>
                        )}
                        {edu.customFields && edu.customFields.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {edu.customFields.map((field, index) => (
                              <div key={index} className="text-sm">
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
                      <div className="flex gap-2">
                        {isOwner && (
                          <button
                            onClick={() => handleEditEducation(edu)}
                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit education"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {isOwner && (
                          <button
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete education"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No Education found</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Add Education Modal */}
      {showEducationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingEducation ? "Edit Education" : "Add Education"}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School *
                </label>
                <input
                  type="text"
                  name="school"
                  value={educationData.school}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Government Polytechnic"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={educationData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Diploma, Bachelor's, Master's"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Field of Study
                </label>
                <input
                  type="text"
                  name="field"
                  value={educationData.field}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Computer Engineering"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Start Month */}
                    <select
                      name="startMonth"
                      value={educationData.startMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option
                          key={month}
                          value={month}
                          disabled={
                            educationData.endYear &&
                            educationData.startYear &&
                            educationData.startYear === educationData.endYear &&
                            months.indexOf(month) >
                              months.indexOf(educationData.endMonth)
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </select>

                    {/* Start Year */}
                    <select
                      name="startYear"
                      value={educationData.startYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            educationData.endYear &&
                            year > educationData.endYear
                          }
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* End Date (or Expected) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (or Expected)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {/* End Month */}
                    <select
                      name="endMonth"
                      value={educationData.endMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option
                          key={month}
                          value={month}
                          disabled={
                            educationData.startYear &&
                            educationData.endYear &&
                            educationData.startYear === educationData.endYear &&
                            months.indexOf(month) <
                              months.indexOf(educationData.startMonth)
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </select>

                    {/* End Year */}
                    <select
                      name="endYear"
                      value={educationData.endYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option
                          key={year}
                          value={year}
                          disabled={
                            educationData.startYear &&
                            year < educationData.startYear
                          }
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade
                </label>
                <input
                  type="text"
                  name="grade"
                  value={educationData.grade}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. 8.5 CGPA, First Class"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activities and Societies
                </label>
                <input
                  type="text"
                  name="activities"
                  value={educationData.activities}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Student Council, Coding Club"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={educationData.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 100) {
                      handleInputChange(e);
                    }
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Describe your achievements, projects, or notable experiences..."
                />
                {educationData?.description?.length || 0}/100
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {editingEducation && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteEducation(editingEducation.id);
                      closeModal();
                    }}
                    className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {editingEducation ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationSection;
