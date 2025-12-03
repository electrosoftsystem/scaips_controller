import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus, Upload } from "lucide-react";
import apiService from "../../../services/apiService";

const Placement = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [placementData, setPlacementData] = useState({
    highlights: [],
    internships: [],
    support: [],
    statistics: {
      averagePackage: "₹0 LPA",
      highestPackage: "₹0 LPA",
      placementRate: "0%",
      companiesVisited: "0+",
      internshipStipend: "₹0 - ₹0/month",
    },
    topRecruiters: [],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...placementData });

  // Fetch placement data on component mount
  useEffect(() => {
    fetchPlacementData();
  }, []);

  const fetchPlacementData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCollegePlacements();
      if (response.success) {
        setPlacementData(response.data);
        setEditData({ ...response.data }); // Also update editData
      }
    } catch (error) {
      console.error("Error fetching placement data:", error);
      // Keep default data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    // Ensure all arrays are properly initialized
    const dataToEdit = {
      ...placementData,
      highlights: placementData.highlights || [],
      internships: placementData.internships || [],
      support: placementData.support || [],
      topRecruiters: placementData.topRecruiters || [],
      customFields: placementData.customFields || [],
    };
    setEditData(dataToEdit);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await apiService.savePlacementData(editData);
      if (response.success) {
        setPlacementData({ ...editData });
        setIsEditModalOpen(false);
        // Refresh data to get server-side updates
        setTimeout(() => {
          fetchPlacementData();
        }, 500);
      }
    } catch (error) {
      console.error("Error saving placement data:", error);
      alert("Failed to save placement data. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...placementData });
    setIsEditModalOpen(false);
  };

  // Highlights handlers
  const handleHighlightChange = (index, value) => {
    const newHighlights = [...editData.highlights];
    newHighlights[index] = value;
    setEditData({ ...editData, highlights: newHighlights });
  };

  const handleAddHighlight = () => {
    setEditData({
      ...editData,
      highlights: [...editData.highlights, ""],
    });
  };

  const handleRemoveHighlight = (index) => {
    const newHighlights = editData.highlights.filter((_, i) => i !== index);
    setEditData({ ...editData, highlights: newHighlights });
  };

  // Internships handlers
  const handleInternshipChange = (index, value) => {
    const newInternships = [...editData.internships];
    newInternships[index] = value;
    setEditData({ ...editData, internships: newInternships });
  };

  const handleAddInternship = () => {
    setEditData({
      ...editData,
      internships: [...editData.internships, ""],
    });
  };

  const handleRemoveInternship = (index) => {
    const newInternships = editData.internships.filter((_, i) => i !== index);
    setEditData({ ...editData, internships: newInternships });
  };

  // Support handlers
  const handleSupportChange = (index, value) => {
    const newSupport = [...editData.support];
    newSupport[index] = value;
    setEditData({ ...editData, support: newSupport });
  };

  const handleAddSupport = () => {
    setEditData({
      ...editData,
      support: [...editData.support, ""],
    });
  };

  const handleRemoveSupport = (index) => {
    const newSupport = editData.support.filter((_, i) => i !== index);
    setEditData({ ...editData, support: newSupport });
  };

  // Statistics handlers
  const handleStatisticChange = (field, value) => {
    setEditData({
      ...editData,
      statistics: { ...editData.statistics, [field]: value },
    });
  };

  // Top recruiters handlers
  const handleRecruiterChange = (index, field, value) => {
    const newRecruiters = [...editData.topRecruiters];
    newRecruiters[index] = { ...newRecruiters[index], [field]: value };
    setEditData({ ...editData, topRecruiters: newRecruiters });
  };

  const handleAddRecruiter = () => {
    setEditData({
      ...editData,
      topRecruiters: [...editData.topRecruiters, { name: "", logo: "" }],
    });
  };

  const handleRemoveRecruiter = (index) => {
    const newRecruiters = editData.topRecruiters.filter((_, i) => i !== index);
    setEditData({ ...editData, topRecruiters: newRecruiters });
  };

  // Company logo upload handler
  const handleLogoUpload = async (index, file) => {
    try {
      setUploadingLogo(true);
      const response = await apiService.uploadCompanyLogo(file);

      if (response.success) {
        const newRecruiters = [...editData.topRecruiters];
        newRecruiters[index] = {
          ...newRecruiters[index],
          logo: response.data.logoUrl,
        };
        setEditData({ ...editData, topRecruiters: newRecruiters });
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
    } finally {
      setUploadingLogo(false);
    }
  };

  // Custom fields handlers
  const handleAddCustomField = () => {
    const newField = {
      id: Date.now().toString(),
      label: "",
      value: "",
    };
    setEditData({
      ...editData,
      customFields: [...editData.customFields, newField],
    });
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    const newCustomFields = editData.customFields.map((field) =>
      field.id === fieldId ? { ...field, [property]: value } : field
    );
    setEditData({ ...editData, customFields: newCustomFields });
  };

  const handleRemoveCustomField = (fieldId) => {
    const newCustomFields = editData.customFields.filter(
      (field) => field.id !== fieldId
    );
    setEditData({ ...editData, customFields: newCustomFields });
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Placement Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Placement</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit placement information"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">
                  Loading placement data...
                </span>
              </div>
            ) : (
              <>
                {/* Placement Statistics */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Placement Statistics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Average Package
                      </h4>
                      <p className="text-2xl font-bold text-blue-600">
                        {placementData.statistics.averagePackage}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Highest Package
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        {placementData.statistics.highestPackage}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">
                        Placement Rate
                      </h4>
                      <p className="text-2xl font-bold text-purple-600">
                        {placementData.statistics.placementRate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Placement Highlights */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Placement Highlights
                  </h3>
                  <div className="space-y-3">
                    {placementData.highlights &&
                      placementData.highlights.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Top Recruiters */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Top Recruiters
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {placementData.topRecruiters &&
                      placementData.topRecruiters.map((recruiter, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          {recruiter.logo && (
                            <img
                              src={recruiter.logo}
                              alt={`${recruiter.name} logo`}
                              className="w-12 h-12 object-contain mb-2"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          <span className="text-xs font-medium text-gray-700 text-center">
                            {recruiter.name}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Internship Opportunities */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Internship Opportunities
                  </h3>
                  <div className="space-y-3">
                    {placementData.internships &&
                      placementData.internships.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Placement Support */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Placement Support
                  </h3>
                  <div className="space-y-3">
                    {placementData.support &&
                      placementData.support.map((item, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                          <p className="text-gray-700 leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Custom Fields Display */}
                {placementData.customFields &&
                  placementData.customFields.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Additional Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {placementData.customFields.map((field, index) => (
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
                  Edit Placement Information
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
              {/* Placement Statistics */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Placement Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Package
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.averagePackage}
                      onChange={(e) =>
                        handleStatisticChange("averagePackage", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., ₹8.5 LPA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Highest Package
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.highestPackage}
                      onChange={(e) =>
                        handleStatisticChange("highestPackage", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., ₹45 LPA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Placement Rate
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.placementRate}
                      onChange={(e) =>
                        handleStatisticChange("placementRate", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 95%"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Companies Visited
                    </label>
                    <input
                      type="text"
                      value={editData.statistics.companiesVisited}
                      onChange={(e) =>
                        handleStatisticChange(
                          "companiesVisited",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="e.g., 450+"
                    />
                  </div>
                </div>
              </div>

              {/* Placement Highlights */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Placement Highlights
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Highlight
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.highlights &&
                    editData.highlights.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleHighlightChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter placement highlight..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove highlight"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Top Recruiters */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Top Recruiters
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddRecruiter}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Recruiter
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.topRecruiters &&
                    editData.topRecruiters.map((recruiter, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              value={recruiter.name}
                              onChange={(e) =>
                                handleRecruiterChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Company name..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Logo URL
                            </label>
                            <input
                              type="url"
                              value={recruiter.logo}
                              onChange={(e) =>
                                handleRecruiterChange(
                                  index,
                                  "logo",
                                  e.target.value
                                )
                              }
                              placeholder="https://example.com/logo.png"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Upload Logo
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  handleLogoUpload(index, e.target.files[0]);
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              disabled={uploadingLogo}
                            />
                            {uploadingLogo && (
                              <div className="flex items-center gap-2 mt-1">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                <span className="text-sm text-gray-600">
                                  Uploading...
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          {recruiter.logo && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">
                                Preview:
                              </span>
                              <img
                                src={recruiter.logo}
                                alt={`${recruiter.name} logo`}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.style.display = "none";
                                }}
                              />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveRecruiter(index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove recruiter"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Internship Opportunities */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Internship Opportunities
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddInternship}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Internship
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.internships &&
                    editData.internships.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleInternshipChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter internship opportunity..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveInternship(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove internship"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Placement Support */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Placement Support
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddSupport}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Support
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.support &&
                    editData.support.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={item}
                            onChange={(e) =>
                              handleSupportChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter placement support..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSupport(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove support"
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
                            placeholder="Field Label (e.g., Entrepreneurship Support, Industry Partnerships)"
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
                disabled={saving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={saving}
              >
                {saving && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Placement;
