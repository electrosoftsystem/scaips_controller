import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import apiService from "../../../services/apiService";

const CourseFees = ({ collegeId = null, isEditable = true }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [feesData, setFeesData] = useState({
    btech: "₹1,50,000",
    mtech: "₹1,00,000",
    bsc: "₹50,000",
    msc: "₹60,000",
    mba: "₹2,00,000",
    phd: "₹30,000",
    scholarships: [
      "Merit-based scholarships up to 100% fee waiver",
      "Need-based financial assistance for economically weaker sections",
      "Sports quota scholarships for outstanding athletes",
      "SC/ST/OBC category fee concessions as per government norms",
      "Girl child education support program",
    ],
    hostel: "₹80,000 per year (AC), ₹60,000 per year (Non-AC)",
    mess: "₹45,000 per year",
    other: "₹15,000 (includes library, lab, sports, medical facilities)",
    customFees: [], // For additional course fees
    customCharges: [], // For additional charges
    customFields: [], // For other custom information
  });

  const [editData, setEditData] = useState({ ...feesData });

  // Load fees data on component mount
  useEffect(() => {
    loadFeesData();
  }, [collegeId]);

  const loadFeesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCollegeFees(collegeId);
      if (response.success) {
        const loadedData = {
          ...response.data,
          customFees: response.data.customFees || [],
          customCharges: response.data.customCharges || [],
          customFields: response.data.customFields || [],
          scholarships: response.data.scholarships || []
        };
        setFeesData(loadedData);
        setEditData(loadedData);
      }
    } catch (error) {
      console.error('Error loading fees data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    const dataToEdit = {
      ...feesData,
      customFees: feesData.customFees || [],
      customCharges: feesData.customCharges || [],
      customFields: feesData.customFields || [],
      scholarships: feesData.scholarships || []
    };
    setEditData(dataToEdit);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || user.role !== 'college') {
      setError('Only colleges can update fees information');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      
      // Clean the data before sending to ensure arrays don't have empty entries
      const cleanedData = {
        ...editData,
        customFees: editData.customFees.filter(fee => fee.program && fee.amount),
        customCharges: editData.customCharges.filter(charge => charge.name && charge.amount),
        customFields: editData.customFields.filter(field => field.label && field.value),
        scholarships: editData.scholarships.filter(scholarship => scholarship.trim() !== '')
      };
      
      const response = await apiService.updateCollegeFees(cleanedData);
      if (response.success) {
        setFeesData({ ...cleanedData });
        setIsEditModalOpen(false);
        // Show success message if you have a toast system
      }
    } catch (error) {
      console.error('Error saving fees data:', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    const dataToEdit = {
      ...feesData,
      customFees: feesData.customFees || [],
      customCharges: feesData.customCharges || [],
      customFields: feesData.customFields || [],
      scholarships: feesData.scholarships || []
    };
    setEditData(dataToEdit);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field === "scholarships") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split("\n").filter((item) => item.trim() !== ""),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Custom fees handlers
  const handleAddCustomFee = () => {
    const newFee = {
      id: Date.now(),
      program: "",
      amount: "",
    };
    setEditData((prev) => ({
      ...prev,
      customFees: [...(prev.customFees || []), newFee],
    }));
  };

  const handleCustomFeeChange = (feeId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      customFees: (prev.customFees || []).map((fee) =>
        fee.id === feeId ? { ...fee, [field]: value } : fee
      ),
    }));
  };

  const handleRemoveCustomFee = (feeId) => {
    setEditData((prev) => ({
      ...prev,
      customFees: (prev.customFees || []).filter((fee) => fee.id !== feeId),
    }));
  };

  // Custom charges handlers
  const handleAddCustomCharge = () => {
    const newCharge = {
      id: Date.now(),
      name: "",
      amount: "",
    };
    setEditData((prev) => ({
      ...prev,
      customCharges: [...(prev.customCharges || []), newCharge],
    }));
  };

  const handleCustomChargeChange = (chargeId, field, value) => {
    setEditData((prev) => ({
      ...prev,
      customCharges: (prev.customCharges || []).map((charge) =>
        charge.id === chargeId ? { ...charge, [field]: value } : charge
      ),
    }));
  };

  const handleRemoveCustomCharge = (chargeId) => {
    setEditData((prev) => ({
      ...prev,
      customCharges: (prev.customCharges || []).filter(
        (charge) => charge.id !== chargeId
      ),
    }));
  };

  // Scholarship handlers
  const handleAddScholarship = () => {
    setEditData((prev) => ({
      ...prev,
      scholarships: [...(prev.scholarships || []), ""],
    }));
  };

  const handleScholarshipChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      scholarships: (prev.scholarships || []).map((scholarship, i) =>
        i === index ? value : scholarship
      ),
    }));
  };

  const handleRemoveScholarship = (index) => {
    setEditData((prev) => ({
      ...prev,
      scholarships: (prev.scholarships || []).filter((_, i) => i !== index),
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
      customFields: [...(prev.customFields || []), newField],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setEditData((prev) => ({
      ...prev,
      customFields: (prev.customFields || []).map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setEditData((prev) => ({
      ...prev,
      customFields: (prev.customFields || []).filter((field) => field.id !== fieldId),
    }));
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading fees information...</span>
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
                <h3 className="text-sm font-medium text-red-800">Error loading fees data</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={loadFeesData}
                    className="text-sm bg-red-100 text-red-800 rounded-md px-3 py-1 hover:bg-red-200"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Course Fees Section */}
        {!loading && !error && (
          <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Course Fees & Scholarships
            </h2>
            {isEditable && user?.role === 'college' && (
              <button
                onClick={handleEditClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit fees"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Course Fees Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Annual Course Fees
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                        Program
                      </th>
                      <th className="py-3 px-4 text-left text-gray-900 font-semibold border-b border-gray-200">
                        Annual Fees (INR)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        B.Tech
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.btech}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        M.Tech
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.mtech}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        B.Sc
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.bsc}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        MSc
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.msc}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        MBA
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.mba}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">
                        Ph.D.
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {feesData.phd}
                      </td>
                    </tr>
                    {/* Custom Fees */}
                    {feesData.customFees && feesData.customFees.length > 0 &&
                      feesData.customFees.map((fee, index) => (
                        <tr key={fee.id || index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium text-gray-900">
                            {fee.program}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {fee.amount}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Scholarships Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Scholarships & Financial Aid
              </h3>
              <div className="space-y-3">
                {feesData.scholarships && feesData.scholarships.length > 0 &&
                  feesData.scholarships.map((scholarship, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">
                        {scholarship}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Hostel & Other Charges */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hostel & Other Charges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Hostel Fees
                  </h4>
                  <p className="text-gray-700">{feesData.hostel}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Mess Charges
                  </h4>
                  <p className="text-gray-700">{feesData.mess}</p>
                </div>
              </div>

              {/* Custom Charges */}
              {feesData.customCharges && feesData.customCharges.length > 0 && (
                <div className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {feesData.customCharges.map((charge, index) => (
                      <div key={charge.id || index}>
                        <h5 className="text-sm font-medium text-gray-900 mb-1">
                          {charge.name}
                        </h5>
                        <p className="text-gray-700">{charge.amount}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Fields Display */}
            {feesData.customFields && feesData.customFields.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {feesData.customFields.map((field, index) => (
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
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Course Fees & Scholarships
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
              {/* Standard Course Fees */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Standard Course Fees
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      B.Tech Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.btech}
                      onChange={(e) =>
                        handleInputChange("btech", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹1,50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      M.Tech Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.mtech}
                      onChange={(e) =>
                        handleInputChange("mtech", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹1,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      B.Sc Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.bsc}
                      onChange={(e) => handleInputChange("bsc", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MSc Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.msc}
                      onChange={(e) => handleInputChange("msc", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹60,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      MBA Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.mba}
                      onChange={(e) => handleInputChange("mba", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹2,00,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ph.D Annual Fees
                    </label>
                    <input
                      type="text"
                      value={editData.phd}
                      onChange={(e) => handleInputChange("phd", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹30,000"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Course Fees */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-lg font-medium text-gray-900">
                    Additional Course Fees
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomFee}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Course Fee
                  </button>
                </div>

                {editData.customFees && editData.customFees.length > 0 && (
                  <div className="space-y-3">
                    {editData.customFees.map((fee) => (
                      <div
                        key={fee.id}
                        className="flex gap-3 items-end border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Program Name
                          </label>
                          <input
                            type="text"
                            value={fee.program}
                            onChange={(e) =>
                              handleCustomFeeChange(
                                fee.id,
                                "program",
                                e.target.value
                              )
                            }
                            placeholder="e.g., BCA, MCA, B.Des"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Fees
                          </label>
                          <input
                            type="text"
                            value={fee.amount}
                            onChange={(e) =>
                              handleCustomFeeChange(
                                fee.id,
                                "amount",
                                e.target.value
                              )
                            }
                            placeholder="₹75,000"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomFee(fee.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove fee"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {(!editData.customFees || editData.customFees.length === 0) && (
                  <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p className="mb-2">No additional course fees added yet.</p>
                    <p className="text-sm">
                      Click "Add Course Fee" to add fees for other programs.
                    </p>
                  </div>
                )}
              </div>

              {/* Scholarships Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Scholarships & Financial Aid
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddScholarship}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Scholarship
                  </button>
                </div>

                <div className="space-y-3">
                  {editData.scholarships &&
                    editData.scholarships.map((scholarship, index) => (
                      <div key={index} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <textarea
                            value={scholarship}
                            onChange={(e) =>
                              handleScholarshipChange(index, e.target.value)
                            }
                            rows={2}
                            placeholder="Enter scholarship details..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveScholarship(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-1"
                          title="Remove scholarship"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Hostel & Other Charges */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Hostel & Basic Charges
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hostel Fees
                    </label>
                    <textarea
                      value={editData.hostel}
                      onChange={(e) =>
                        handleInputChange("hostel", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="₹80,000 per year (AC), ₹60,000 per year (Non-AC)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mess Charges
                    </label>
                    <input
                      type="text"
                      value={editData.mess}
                      onChange={(e) =>
                        handleInputChange("mess", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="₹45,000 per year"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Other Charges
                    </label>
                    <textarea
                      value={editData.other}
                      onChange={(e) =>
                        handleInputChange("other", e.target.value)
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                      placeholder="₹15,000 (includes library, lab, sports, medical facilities)"
                    />
                  </div>
                </div>
              </div>

              {/* Custom Charges */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-lg font-medium text-gray-900">
                    Additional Charges
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomCharge}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Charge
                  </button>
                </div>

                {editData.customCharges &&
                  editData.customCharges.length > 0 && (
                    <div className="space-y-3">
                      {editData.customCharges.map((charge) => (
                        <div
                          key={charge.id}
                          className="flex gap-3 items-end border border-gray-200 rounded-lg p-3"
                        >
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Charge Name
                            </label>
                            <input
                              type="text"
                              value={charge.name}
                              onChange={(e) =>
                                handleCustomChargeChange(
                                  charge.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., Transport, Uniform, Exam Fee"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Amount
                            </label>
                            <input
                              type="text"
                              value={charge.amount}
                              onChange={(e) =>
                                handleCustomChargeChange(
                                  charge.id,
                                  "amount",
                                  e.target.value
                                )
                              }
                              placeholder="₹5,000"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomCharge(charge.id)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove charge"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                {(!editData.customCharges ||
                  editData.customCharges.length === 0) && (
                  <div className="text-center py-6 text-gray-500 border border-dashed border-gray-300 rounded-lg">
                    <p className="mb-2">No additional charges added yet.</p>
                    <p className="text-sm">
                      Click "Add Charge" to add other fees like transport,
                      uniform, etc.
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
                            placeholder="Field Label (e.g., Payment Methods, Refund Policy)"
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
                            placeholder="Field Value (e.g., Online/Offline, 50% refundable)"
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

export default CourseFees;
