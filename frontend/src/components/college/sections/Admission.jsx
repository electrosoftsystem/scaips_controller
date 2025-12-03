import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import apiService from "../../../services/apiService";

const Admission = ({ collegeId = null, isEditable = true }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [admissionData, setAdmissionData] = useState([]);
  const [editData, setEditData] = useState([]);

  // Load admission data on component mount
  useEffect(() => {
    loadAdmissionData();
  }, [collegeId]);

  const loadAdmissionData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.collegeAPI.getAdmissions();
      if (response.success) {
        const loadedData = response.data || [];
        setAdmissionData(loadedData);
        setEditData([...loadedData]);
      }
    } catch (error) {
      console.error('Error loading admission data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditData([...admissionData]);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || user.role !== 'college') {
      setError('Only colleges can update admission information');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      // Clean the data before sending
      const cleanedData = editData
        .filter(admission => admission.course_name && admission.course_name.trim() !== '')
        .map(admission => {
          const cleanedAdmission = { ...admission };
          // Remove temporary IDs (those starting with 'temp_') so backend treats them as new records
          if (typeof cleanedAdmission.id === 'string' && cleanedAdmission.id.startsWith('temp_')) {
            cleanedAdmission.id = null;
          }
          return cleanedAdmission;
        });
      
      const response = await apiService.collegeAPI.updateAdmissions(cleanedData);
      if (response.success) {
        setAdmissionData([...cleanedData]);
        setIsEditModalOpen(false);
        // Show success message if you have a toast system
      }
    } catch (error) {
      console.error('Error saving admission data:', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData([...admissionData]);
    setIsEditModalOpen(false);
  };

  // Add new admission record
  const handleAddAdmission = () => {
    const newAdmission = {
      id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Generate unique temporary ID
      course_name: "",
      degree_type: "",
      duration: "",
      eligibility_criteria: "",
      entrance_exam: "",
      application_process: "",
      application_fee: "",
      total_seats: "",
      admission_url: "",
      application_start: "",
      application_end: "",
      exam_date: "",
      result_date: "",
      required_documents: [],
      reservation_policy: "",
      scholarship_info: "",
      important_dates: {},
      is_active: true
    };
    setEditData(prev => [...prev, newAdmission]);
  };

  // Remove admission record
  const handleRemoveAdmission = (index) => {
    setEditData(prev => prev.filter((_, i) => i !== index));
  };

  // Update admission field
  const handleAdmissionChange = (index, field, value) => {
    setEditData(prev => prev.map((admission, i) => 
      i === index ? { ...admission, [field]: value } : admission
    ));
  };

  // Handle array fields like required_documents
  const handleArrayFieldChange = (index, field, arrayValue) => {
    const arrayData = Array.isArray(arrayValue) ? arrayValue : 
      (typeof arrayValue === 'string' ? arrayValue.split('\n').filter(item => item.trim() !== '') : []);
    
    setEditData(prev => prev.map((admission, i) => 
      i === index ? { ...admission, [field]: arrayData } : admission
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Not specified';
    return `₹${parseFloat(amount).toLocaleString('en-IN')}`;
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading admission information...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <X className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading admission data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={loadAdmissionData}
                    className="text-sm bg-red-100 text-red-800 rounded-md px-3 py-1 hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admission Section */}
        {!loading && !error && (
          <div className="bg-white rounded-lg mb-6">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Admission Information
              </h2>
              {isEditable && user?.role === 'college' && (
                <button
                  onClick={handleEditClick}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                  title="Edit admission information"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {admissionData.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="mb-2">No admission information available.</p>
                  {isEditable && user?.role === 'college' && (
                    <p className="text-sm">Click the edit button to add admission details.</p>
                  )}
                </div>
              ) : (
                <div className="space-y-8">
                  {admissionData.map((admission, index) => (
                    <div key={admission.id ? `admission_${admission.id}` : `admission_index_${index}`} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {admission.course_name}
                          {admission.degree_type && ` (${admission.degree_type})`}
                        </h3>
                        {admission.duration && (
                          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {admission.duration}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Eligibility Criteria */}
                        {admission.eligibility_criteria && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Eligibility Criteria</h4>
                            <p className="text-gray-700">{admission.eligibility_criteria}</p>
                          </div>
                        )}

                        {/* Entrance Exam */}
                        {admission.entrance_exam && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Entrance Exam</h4>
                            <p className="text-gray-700">{admission.entrance_exam}</p>
                          </div>
                        )}

                        {/* Application Fee */}
                        {admission.application_fee && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Application Fee</h4>
                            <p className="text-gray-700">{formatCurrency(admission.application_fee)}</p>
                          </div>
                        )}

                        {/* Total Seats */}
                        {admission.total_seats && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Total Seats</h4>
                            <p className="text-gray-700">{admission.total_seats}</p>
                          </div>
                        )}

                        {/* Important Dates */}
                        <div className="md:col-span-2">
                          <h4 className="font-medium text-gray-900 mb-2">Important Dates</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {admission.application_start && (
                              <div>
                                <span className="text-sm font-medium text-gray-600">Application Start:</span>
                                <p className="text-sm text-gray-700">{formatDate(admission.application_start)}</p>
                              </div>
                            )}
                            {admission.application_end && (
                              <div>
                                <span className="text-sm font-medium text-gray-600">Application End:</span>
                                <p className="text-sm text-gray-700">{formatDate(admission.application_end)}</p>
                              </div>
                            )}
                            {admission.exam_date && (
                              <div>
                                <span className="text-sm font-medium text-gray-600">Exam Date:</span>
                                <p className="text-sm text-gray-700">{formatDate(admission.exam_date)}</p>
                              </div>
                            )}
                            {admission.result_date && (
                              <div>
                                <span className="text-sm font-medium text-gray-600">Result Date:</span>
                                <p className="text-sm text-gray-700">{formatDate(admission.result_date)}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Required Documents */}
                        {admission.required_documents && admission.required_documents.length > 0 && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-2">Required Documents</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {admission.required_documents.map((doc, docIndex) => (
                                <div key={docIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                                  <p className="text-sm text-gray-700">{doc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Application Process */}
                        {admission.application_process && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-2">Application Process</h4>
                            <p className="text-gray-700">{admission.application_process}</p>
                          </div>
                        )}

                        {/* Reservation Policy */}
                        {admission.reservation_policy && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-2">Reservation Policy</h4>
                            <p className="text-gray-700">{admission.reservation_policy}</p>
                          </div>
                        )}

                        {/* Scholarship Information */}
                        {admission.scholarship_info && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-2">Scholarship Information</h4>
                            <p className="text-gray-700">{admission.scholarship_info}</p>
                          </div>
                        )}

                        {/* Admission URL */}
                        {admission.admission_url && (
                          <div className="md:col-span-2">
                            <h4 className="font-medium text-gray-900 mb-2">Apply Online</h4>
                            <a 
                              href={admission.admission_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 underline"
                            >
                              {admission.admission_url}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Admission Information
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
              {/* Add New Admission Button */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Admission Records</h3>
                <button
                  type="button"
                  onClick={handleAddAdmission}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Admission
                </button>
              </div>

              {/* Admission Records */}
              {editData.map((admission, index) => (
                <div key={admission.id ? `edit_admission_${admission.id}` : `edit_admission_index_${index}`} className="border border-gray-200 rounded-lg p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-md font-medium text-gray-900">
                      Admission Record {index + 1}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmission(index)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove admission record"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Course Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Name *
                      </label>
                      <input
                        type="text"
                        value={admission.course_name || ''}
                        onChange={(e) => handleAdmissionChange(index, 'course_name', e.target.value)}
                        placeholder="e.g., B.Tech Computer Science"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Degree Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Degree Type
                      </label>
                      <select
                        value={admission.degree_type || ''}
                        onChange={(e) => handleAdmissionChange(index, 'degree_type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="">Select degree type</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Master">Master</option>
                        <option value="Diploma">Diploma</option>
                        <option value="PhD">PhD</option>
                        <option value="Certificate">Certificate</option>
                      </select>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={admission.duration || ''}
                        onChange={(e) => handleAdmissionChange(index, 'duration', e.target.value)}
                        placeholder="e.g., 4 Years"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Entrance Exam */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entrance Exam
                      </label>
                      <input
                        type="text"
                        value={admission.entrance_exam || ''}
                        onChange={(e) => handleAdmissionChange(index, 'entrance_exam', e.target.value)}
                        placeholder="e.g., JEE Main, GATE"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Application Fee */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Application Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={admission.application_fee || ''}
                        onChange={(e) => handleAdmissionChange(index, 'application_fee', e.target.value)}
                        placeholder="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Total Seats */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Seats
                      </label>
                      <input
                        type="number"
                        value={admission.total_seats || ''}
                        onChange={(e) => handleAdmissionChange(index, 'total_seats', e.target.value)}
                        placeholder="60"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Application Start Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Application Start Date
                      </label>
                      <input
                        type="date"
                        value={admission.application_start || ''}
                        onChange={(e) => handleAdmissionChange(index, 'application_start', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Application End Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Application End Date
                      </label>
                      <input
                        type="date"
                        value={admission.application_end || ''}
                        onChange={(e) => handleAdmissionChange(index, 'application_end', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Exam Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exam Date
                      </label>
                      <input
                        type="date"
                        value={admission.exam_date || ''}
                        onChange={(e) => handleAdmissionChange(index, 'exam_date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Result Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Result Date
                      </label>
                      <input
                        type="date"
                        value={admission.result_date || ''}
                        onChange={(e) => handleAdmissionChange(index, 'result_date', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Admission URL */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admission Portal URL
                      </label>
                      <input
                        type="url"
                        value={admission.admission_url || ''}
                        onChange={(e) => handleAdmissionChange(index, 'admission_url', e.target.value)}
                        placeholder="https://admission.college.edu"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Eligibility Criteria
                      </label>
                      <textarea
                        rows={3}
                        value={admission.eligibility_criteria || ''}
                        onChange={(e) => handleAdmissionChange(index, 'eligibility_criteria', e.target.value)}
                        placeholder="Describe the eligibility criteria for this course..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    {/* Application Process */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Application Process
                      </label>
                      <textarea
                        rows={3}
                        value={admission.application_process || ''}
                        onChange={(e) => handleAdmissionChange(index, 'application_process', e.target.value)}
                        placeholder="Describe the step-by-step application process..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    {/* Required Documents */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Required Documents (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={Array.isArray(admission.required_documents) ? admission.required_documents.join('\n') : ''}
                        onChange={(e) => handleArrayFieldChange(index, 'required_documents', e.target.value)}
                        placeholder="10th Mark Sheet&#10;12th Mark Sheet&#10;Transfer Certificate&#10;Character Certificate"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    {/* Reservation Policy */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reservation Policy
                      </label>
                      <textarea
                        rows={2}
                        value={admission.reservation_policy || ''}
                        onChange={(e) => handleAdmissionChange(index, 'reservation_policy', e.target.value)}
                        placeholder="Describe reservation policy (SC/ST/OBC etc.)..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>

                    {/* Scholarship Information */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Scholarship Information
                      </label>
                      <textarea
                        rows={2}
                        value={admission.scholarship_info || ''}
                        onChange={(e) => handleAdmissionChange(index, 'scholarship_info', e.target.value)}
                        placeholder="Describe available scholarships..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {editData.length === 0 && (
                <div className="text-center py-8 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  <p className="mb-2">No admission records yet.</p>
                  <p className="text-sm">Click "Add Admission" to create your first admission record.</p>
                </div>
              )}
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
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admission;
