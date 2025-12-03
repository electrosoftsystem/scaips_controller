import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import apiService from "../../../services/apiService";

const Courses = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load courses data from backend
  useEffect(() => {
    const loadCoursesData = async () => {
      if (!user || user.role !== "college") {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const response = await apiService.getCollegeAcademics();
        
        if (response.success) {
          // Response should now have consistent structure: { success: true, data: [...] }
          setCourseData(Array.isArray(response.data) ? response.data : []);
        } else {
          setCourseData([]);
        }
      } catch (error) {
        console.error("Error loading courses data:", error);
        setError("Failed to load course information. Please try again.");
        setCourseData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoursesData();
  }, [user]);

  const handleEditClick = () => {
    setEditData(Array.isArray(courseData) ? [...courseData] : []);
    setIsEditModalOpen(true);
  };

  const handleInputChange = (index, field, value) => {
    setEditData((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleSpecializationChange = (courseIndex, specializationIndex, value) => {
    setEditData((prev) => {
      const newData = [...prev];
      const specializations = [...(newData[courseIndex].specializations || [])];
      specializations[specializationIndex] = value;
      newData[courseIndex] = { ...newData[courseIndex], specializations };
      return newData;
    });
  };

  const handleAddSpecialization = (courseIndex) => {
    setEditData((prev) => {
      const newData = [...prev];
      const specializations = [...(newData[courseIndex].specializations || []), ""];
      newData[courseIndex] = { ...newData[courseIndex], specializations };
      return newData;
    });
  };

  const handleRemoveSpecialization = (courseIndex, specializationIndex) => {
    setEditData((prev) => {
      const newData = [...prev];
      const specializations = [...(newData[courseIndex].specializations || [])];
      specializations.splice(specializationIndex, 1);
      newData[courseIndex] = { ...newData[courseIndex], specializations };
      return newData;
    });
  };

  const handleAddCourse = () => {
    setEditData((prev) => [
      ...prev,
      {
        course_name: "",
        degree_type: "",
        duration: "",
        total_seats: "",
        specializations: [""],
        curriculum: "",
        assessment_method: "",
        is_active: true
      }
    ]);
  };

  const handleRemoveCourse = (index) => {
    // Add confirmation dialog
    const courseName = editData[index]?.course_name || `Course ${index + 1}`;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${courseName}"? This action cannot be undone.`
    );
    
    if (confirmDelete) {
      setEditData((prev) => {
        const newData = [...prev];
        
        // If the course has an ID, it exists in the database
        // Mark it as deleted instead of removing it completely
        if (newData[index].id) {
          newData[index] = { ...newData[index], is_active: false, _markForDeletion: true };
        } else {
          // If it's a new course (no ID), just remove it from the array
          newData.splice(index, 1);
        }
        
        return newData;
      });
    }
  };

  const handleSave = async () => {
    try {
      setError(null);
      
      // Filter out courses marked for deletion before sending to backend
      const coursesToSave = editData.filter(course => !course._markForDeletion);
      
      const response = await apiService.updateCollegeAcademics(coursesToSave);
      
      if (response.success) {
        // Response should now have consistent structure: { success: true, data: [...] }
        setCourseData(Array.isArray(response.data) ? response.data : []);
        setIsEditModalOpen(false);
      } else {
        throw new Error(response.message || "Failed to save courses");
      }
    } catch (error) {
      console.error("Error saving courses:", error);
      setError("Failed to save course information. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditData(Array.isArray(courseData) ? [...courseData] : []);
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading course information...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper to render a table row for each course
  const renderTableRow = (course, index) => (
    <tr key={index} className="bg-white">
      <td className="px-4 py-3 border-b border-gray-200 font-semibold text-gray-900">
        {course.course_name || 'N/A'}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
        {course.degree_type || 'N/A'}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
        {course.duration || 'N/A'}
      </td>
      <td className="px-4 py-3 border-b border-gray-200">
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          {course.specializations && course.specializations.length > 0 
            ? course.specializations.map((spec, i) => <li key={i}>{spec}</li>) 
            : <li>N/A</li>
          }
        </ul>
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
        {course.total_seats || 'N/A'}
      </td>
      <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
        {course.assessment_method || 'N/A'}
      </td>
    </tr>
  );
  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg mb-8">
          <div className="flex items-center justify-between p-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Course Details</h2>
            {user && user.role === "college" && (
              <button
                onClick={handleEditClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit course details"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="p-8">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            {(!Array.isArray(courseData) || courseData.length === 0) ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No course information available</p>
                {user && user.role === "college" && (
                  <button
                    onClick={handleEditClick}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Courses
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg text-base">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Course Name</th>
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Degree Type</th>
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Duration</th>
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Specializations</th>
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Total Seats</th>
                      <th className="px-4 py-3 border-b border-gray-200 text-left font-semibold text-gray-900">Assessment Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(courseData) ? courseData.map((course, index) => renderTableRow(course, index)) : null}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Course Details</h3>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
              {editData.filter(course => !course._markForDeletion).map((course, courseIndex) => {
                // Get the actual index in the original array for proper handling
                const actualIndex = editData.indexOf(course);
                return (
                <div key={actualIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-blue-800 text-lg">
                      Course {courseIndex + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(actualIndex)}
                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Delete this course"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Course Name</label>
                      <input 
                        type="text" 
                        value={course.course_name || ''} 
                        onChange={e => handleInputChange(actualIndex, 'course_name', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                        placeholder="e.g., Bachelor of Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Degree Type</label>
                      <input 
                        type="text" 
                        value={course.degree_type || ''} 
                        onChange={e => handleInputChange(actualIndex, 'degree_type', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                        placeholder="e.g., B.Tech, M.Tech, MBA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                      <input 
                        type="text" 
                        value={course.duration || ''} 
                        onChange={e => handleInputChange(actualIndex, 'duration', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                        placeholder="e.g., 4 Years, 2 Years"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Seats</label>
                      <input 
                        type="number" 
                        value={course.total_seats || ''} 
                        onChange={e => handleInputChange(actualIndex, 'total_seats', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                        placeholder="e.g., 120"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Curriculum</label>
                      <textarea 
                        value={course.curriculum || ''} 
                        onChange={e => handleInputChange(actualIndex, 'curriculum', e.target.value)} 
                        rows={2} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none text-base" 
                        placeholder="Brief description of the curriculum"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assessment Method</label>
                      <input 
                        type="text" 
                        value={course.assessment_method || ''} 
                        onChange={e => handleInputChange(actualIndex, 'assessment_method', e.target.value)} 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-base" 
                        placeholder="e.g., Continuous Assessment, Final Exams, Projects"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specializations</label>
                      <div className="space-y-2">
                        {(course.specializations && course.specializations.length > 0 ? course.specializations : ['']).map((specialization, specIndex) => (
                          <div key={specIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={specialization}
                              onChange={e => handleSpecializationChange(actualIndex, specIndex, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-base"
                              placeholder="e.g., Computer Science, Mechanical Engineering"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveSpecialization(actualIndex, specIndex)}
                              className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              disabled={course.specializations?.length === 1}
                              title="Remove this specialization"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => handleAddSpecialization(actualIndex)}
                          className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                        >
                          Add Specialization
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
              
              <div className="border-t pt-4">
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="w-full p-3 border-2 border-dashed border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-base flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New Course
                </button>
              </div>
              
              <div className="flex gap-4 pt-4 border-t justify-end">
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-base"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-base"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Courses;
