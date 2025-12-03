import React, { useEffect, useState } from "react";
import { Edit, Plus, X, Award, Upload, FileText } from "lucide-react";
import axios from "axios";

const CertificationsSection = ({
  onCertificationsUpdate,
  studentId,
  isOwner,
}) => {
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null);
  const [certificationList, setCertificationList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    issuer: "",
    date: "",

    credentialId: "",
    url: "",
    certificatePdf: null,
    certificatePdfName: "",
    skills: [],
    customFields: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillAdd = (skill) => {
    if (skill && skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const API_URL = `${
    import.meta.env.VITE_API_BASE_URL
  }/students/certifications`;

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const res = await axios.get(`${API_URL}?studentId=${studentId}`);
      setCertificationList(res.data || []);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error fetching certifications:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      studentId,
      certificate_name: formData.name,
      issuing_organization: formData.issuer,
      issue_date: formData.date,

      credential_id: formData.credentialId,
      credential_url: formData.url || null,
    };

    try {
      if (editingCertification) {
        await axios.put(`${API_URL}/${editingCertification.id}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      closeModal();
      fetchCertifications();
      if (onCertificationsUpdate) onCertificationsUpdate();
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error saving certification:", error);
      }
    }
  };

  const handleEditCertification = (certification) => {
    setEditingCertification(certification);
    setFormData({
      name: certification.certificate_name || "",
      issuer: certification.issuing_organization || "",
      date: certification.issue_date || "",

      credentialId: certification.credential_id || "",
      url: certification.credential_url || "",
      skills: certification.skills || [],
      customFields: certification.customFields || [],
      certificatePdf: certification.certificatePdf || null,
      certificatePdfName: certification.certificatePdfName || "",
    });
    setShowCertificationModal(true);
  };

  const handleDeleteCertification = async (certificationId) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      try {
        await axios.delete(`${API_URL}/${certificationId}`);
        fetchCertifications();
        if (onCertificationsUpdate) onCertificationsUpdate();
      } catch (error) {
        if (import.meta.env.NODE_ENV !== "production") {
          console.error("Error deleting certification:", error);
        }
      }
    }
  };

  const closeModal = () => {
    setShowCertificationModal(false);
    setEditingCertification(null);
    setFormData({
      name: "",
      issuer: "",
      date: "",

      credentialId: "",
      url: "",
      certificatePdf: null,
      certificatePdfName: "",
      skills: [],
      customFields: [],
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          certificatePdf: event.target.result,
          certificatePdfName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a PDF file only.");
    }
  };

  const handleRemovePdf = () => {
    setFormData((prev) => ({
      ...prev,
      certificatePdf: null,
      certificatePdfName: "",
    }));
  };

  const handleDownloadPdf = (certification) => {
    if (certification.certificatePdf) {
      const link = document.createElement("a");
      link.href = certification.certificatePdf;
      link.download = certification.certificatePdfName || "certificate.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Certifications
          </h2>
          {isOwner && (
            <button
              onClick={() => setShowCertificationModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Add certification"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {certificationList.length === 0 ? (
            <div className="text-center py-8">
              <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No certifications added yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowCertificationModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first certification
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {certificationList.map((certification, index) => (
                <div
                  key={certification.id || index}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {certification.certificate_name}
                    </h3>
                    <p className="text-gray-600">
                      {certification.issuing_organization}
                    </p>
                    <p className="text-sm text-gray-500">
                      Issued:{" "}
                      {certification.issue_date
                        ? new Date(
                            certification.issue_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                    {certification.expiry_date && (
                      <p className="text-sm text-gray-500">
                        Expires:{" "}
                        {new Date(
                          certification.expiry_date
                        ).toLocaleDateString()}
                      </p>
                    )}
                    {certification.credential_id && (
                      <p className="text-sm text-gray-500">
                        Credential ID: {certification.credential_id}
                      </p>
                    )}
                    {certification.credential_url && (
                      <p className="text-sm text-gray-500">
                        <a
                          href={certification.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View Credential
                        </a>
                      </p>
                    )}

                    {certification.skills &&
                      certification.skills.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600 mb-1">
                            Skills Covered:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {certification.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {certification.customFields &&
                      certification.customFields.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {certification.customFields.map((field, index) => (
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

                    {certification.certificatePdf && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleDownloadPdf(certification)}
                          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          Download Certificate PDF
                        </button>
                      </div>
                    )}
                  </div>
                  {isOwner && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditCertification(certification)}
                        className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit certification"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteCertification(certification.id)
                        }
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete certification"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Certification Modal */}
      {showCertificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCertification
                    ? "Edit Certification"
                    : "Add Certification"}
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
                  Certification Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. AWS Certified Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. Amazon Web Services"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    max={getTodayDate()}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credential ID
                </label>
                <input
                  type="text"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="e.g. AWS123456"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credential URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Certificate PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate PDF
                </label>
                <div className="space-y-2">
                  {!formData.certificatePdf ? (
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            certificate PDF
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF files only (MAX. 10MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            {formData.certificatePdfName}
                          </p>
                          <p className="text-xs text-green-600">
                            PDF uploaded successfully
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemovePdf}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills Covered
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSkillAdd(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target.previousElementSibling;
                        handleSkillAdd(input.value);
                        input.value = "";
                      }}
                      className="px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {formData.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleSkillRemove(skill)}
                            className="text-orange-500 hover:text-orange-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                {editingCertification && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteCertification(editingCertification.id);
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
                  {editingCertification
                    ? "Update Certification"
                    : "Add Certification"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CertificationsSection;
