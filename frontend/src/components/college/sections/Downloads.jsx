import React, { useState, useEffect } from "react";
import {
  Edit,
  X,
  Plus,
  Minus,
  Download,
  FileText,
  Eye,
  Upload,
} from "lucide-react";
import apiService from "../../../services/apiService";

const Downloads = () => {
  // const apiService = new apiService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [downloadsData, setDownloadsData] = useState({
    forms: [],
    brochures: [],
    syllabus: [],
    other: [],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...downloadsData });

  // Fetch downloads data on component mount
  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCollegeDownloads();
      if (response.success) {
        const data = response.data;
        const downloadsData = {
          forms: data.forms || [],
          brochures: data.brochures || [],
          syllabus: data.syllabus || [],
          other: data.other || [],
          customFields: [],
        };
        setDownloadsData(downloadsData);
        setEditData({ ...downloadsData }); // Also update editData
      }
    } catch (error) {
      console.error("Error fetching downloads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    // Ensure all arrays are properly initialized
    const dataToEdit = {
      forms: downloadsData.forms || [],
      brochures: downloadsData.brochures || [],
      syllabus: downloadsData.syllabus || [],
      other: downloadsData.other || [],
      customFields: downloadsData.customFields || [],
    };
    setEditData(dataToEdit);
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setUploading(true);

      // Process each category and save changes
      for (const category of ["forms", "brochures", "syllabus", "other"]) {
        const originalDocs = downloadsData[category] || [];
        const editedDocs = editData[category] || [];

        // Find new documents (those without database ID)
        const newDocs = editedDocs.filter(
          (doc) => !doc.id || doc.id.toString().startsWith("new_")
        );

        // Find updated documents
        const updatedDocs = editedDocs.filter((doc) => {
          if (!doc.id || doc.id.toString().startsWith("new_")) return false;
          const original = originalDocs.find((orig) => orig.id === doc.id);
          return original && JSON.stringify(original) !== JSON.stringify(doc);
        });

        // Find deleted documents
        const deletedDocs = originalDocs.filter(
          (original) => !editedDocs.find((edited) => edited.id === original.id)
        );

        // Create new documents
        for (const newDoc of newDocs) {
          await apiService.addCollegeDownload({
            title: newDoc.name,
            description: newDoc.description,
            category: category,
            fileType: newDoc.format,
            fileSize: newDoc.fileSize,
            fileUrl: newDoc.url,
            isPublic: true,
          });
        }

        // Update existing documents
        for (const updatedDoc of updatedDocs) {
          await apiService.updateCollegeDownload(updatedDoc.id, {
            title: updatedDoc.name,
            description: updatedDoc.description,
            category: category,
            fileType: updatedDoc.format,
            fileSize: updatedDoc.fileSize,
            fileUrl: updatedDoc.url,
            isPublic: true,
          });
        }

        // Delete removed documents
        for (const deletedDoc of deletedDocs) {
          await apiService.deleteCollegeDownload(deletedDoc.id);
        }
      }

      // Refresh data
      setDownloadsData({ ...editData });
      setIsEditModalOpen(false);
      // Refresh data from server after a brief delay
      setTimeout(() => {
        fetchDownloads();
      }, 500);
    } catch (error) {
      console.error("Error saving downloads:", error);
      alert("Failed to save downloads. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...downloadsData });
    setIsEditModalOpen(false);
  };

  // Generic handlers for all document types
  const handleDocumentChange = (category, index, field, value) => {
    const newDocuments = [...editData[category]];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setEditData({ ...editData, [category]: newDocuments });
  };

  const handleAddDocument = (category) => {
    const newDocument = {
      id: `new_${Date.now()}`,
      name: "",
      description: "",
      fileSize: "",
      format: "PDF",
      url: "",
      uploadDate: new Date().toISOString().split("T")[0],
    };
    setEditData({
      ...editData,
      [category]: [...editData[category], newDocument],
    });
  };

  const handleRemoveDocument = (category, index) => {
    const newDocuments = editData[category].filter((_, i) => i !== index);
    setEditData({ ...editData, [category]: newDocuments });
  };

  // Handle file upload for new documents
  const handleFileUpload = async (category, index, file) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", `Uploaded ${file.name}`);
      formData.append("description", `Uploaded file: ${file.name}`);
      formData.append("category", category);
      formData.append("fileType", file.type.includes("pdf") ? "PDF" : "DOC");
      formData.append(
        "fileSize",
        `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      );

      const response = await apiService.addCollegeDownload(formData);

      if (response.success) {
        // Update the document in editData with the uploaded file info
        const newDocuments = [...editData[category]];
        newDocuments[index] = {
          ...newDocuments[index],
          name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
          url: response.data.url,
          fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          format: file.type.includes("pdf") ? "PDF" : "DOC",
        };
        setEditData({ ...editData, [category]: newDocuments });

        // Refresh the main data
        await fetchDownloads();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (doc) => {
    try {
      // Increment download count
      if (doc.id) {
        await apiService.incrementDownloadCount(doc.id);
      }

      // Create download link
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      // Still allow download even if count increment fails
      const link = document.createElement("a");
      link.href = doc.url;
      link.download = doc.name;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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

  const renderDocumentSection = (title, documents, category) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {documents &&
          documents.map((doc, index) => (
            <div
              key={doc.id || index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {doc.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {doc.format}
                      </span>
                      <span>{doc.fileSize}</span>
                      <span>Updated: {doc.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => window.open(doc.url, "_blank")}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Preview document"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    title="Download document"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Downloads Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Downloads</h2>
            <button
              onClick={handleEditClick}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Edit downloads"
              disabled={loading}
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading downloads...</span>
              </div>
            ) : (
              <>
                {/* Download Statistics */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Download Center
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        {downloadsData.forms.length}
                      </p>
                      <p className="text-sm text-gray-600">Forms</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {downloadsData.brochures.length}
                      </p>
                      <p className="text-sm text-gray-600">Brochures</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {downloadsData.syllabus.length}
                      </p>
                      <p className="text-sm text-gray-600">Syllabus</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {downloadsData.other.length}
                      </p>
                      <p className="text-sm text-gray-600">Other Documents</p>
                    </div>
                  </div>
                </div>

                {renderDocumentSection("Forms", downloadsData.forms, "forms")}
                {renderDocumentSection(
                  "Brochures & Catalogs",
                  downloadsData.brochures,
                  "brochures"
                )}
                {renderDocumentSection(
                  "Course Syllabus",
                  downloadsData.syllabus,
                  "syllabus"
                )}
                {renderDocumentSection(
                  "Other Documents",
                  downloadsData.other,
                  "other"
                )}

                {/* Custom Fields Display */}
                {downloadsData.customFields &&
                  downloadsData.customFields.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">
                        Additional Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {downloadsData.customFields.map((field, index) => (
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Downloads
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
              {/* Forms Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Forms</h3>
                  <button
                    type="button"
                    onClick={() => handleAddDocument("forms")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Form
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.forms &&
                    editData.forms.map((doc, index) => (
                      <div
                        key={doc.id || index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Document Name
                            </label>
                            <input
                              type="text"
                              value={doc.name}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "forms",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Document name..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              File Size
                            </label>
                            <input
                              type="text"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "forms",
                                  index,
                                  "fileSize",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="e.g., 2.5 MB"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={doc.description}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "forms",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              placeholder="Document description..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Upload File
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.xls,.xlsx"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  handleFileUpload(
                                    "forms",
                                    index,
                                    e.target.files[0]
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              disabled={uploading}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="url"
                              value={doc.url}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "forms",
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="https://example.com/document.pdf"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Format
                            </label>
                            <select
                              value={doc.format}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "forms",
                                  index,
                                  "format",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="PDF">PDF</option>
                              <option value="DOC">DOC</option>
                              <option value="DOCX">DOCX</option>
                              <option value="XLS">XLS</option>
                              <option value="XLSX">XLSX</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveDocument("forms", index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Brochures Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Brochures & Catalogs
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddDocument("brochures")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Brochure
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.brochures &&
                    editData.brochures.map((doc, index) => (
                      <div
                        key={doc.id || index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Document Name
                            </label>
                            <input
                              type="text"
                              value={doc.name}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "brochures",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Document name..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              File Size
                            </label>
                            <input
                              type="text"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "brochures",
                                  index,
                                  "fileSize",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="e.g., 15.6 MB"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={doc.description}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "brochures",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              placeholder="Document description..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Upload File
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.xls,.xlsx"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  handleFileUpload(
                                    "brochures",
                                    index,
                                    e.target.files[0]
                                  );
                                }
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              disabled={uploading}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="url"
                              value={doc.url}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "brochures",
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="https://example.com/document.pdf"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Format
                            </label>
                            <select
                              value={doc.format}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "brochures",
                                  index,
                                  "format",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="PDF">PDF</option>
                              <option value="DOC">DOC</option>
                              <option value="DOCX">DOCX</option>
                              <option value="XLS">XLS</option>
                              <option value="XLSX">XLSX</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveDocument("brochures", index)
                            }
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Syllabus Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Course Syllabus
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddDocument("syllabus")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Syllabus
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.syllabus &&
                    editData.syllabus.map((doc, index) => (
                      <div
                        key={doc.id || index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Document Name
                            </label>
                            <input
                              type="text"
                              value={doc.name}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "syllabus",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Document name..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              File Size
                            </label>
                            <input
                              type="text"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "syllabus",
                                  index,
                                  "fileSize",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="e.g., 4.7 MB"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={doc.description}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "syllabus",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              placeholder="Document description..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="url"
                              value={doc.url}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "syllabus",
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="https://example.com/document.pdf"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Format
                            </label>
                            <select
                              value={doc.format}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "syllabus",
                                  index,
                                  "format",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="PDF">PDF</option>
                              <option value="DOC">DOC</option>
                              <option value="DOCX">DOCX</option>
                              <option value="XLS">XLS</option>
                              <option value="XLSX">XLSX</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveDocument("syllabus", index)
                            }
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Other Documents Section */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Other Documents
                  </h3>
                  <button
                    type="button"
                    onClick={() => handleAddDocument("other")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Document
                  </button>
                </div>

                <div className="space-y-4">
                  {editData.other &&
                    editData.other.map((doc, index) => (
                      <div
                        key={doc.id || index}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Document Name
                            </label>
                            <input
                              type="text"
                              value={doc.name}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "other",
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="Document name..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              File Size
                            </label>
                            <input
                              type="text"
                              value={doc.fileSize}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "other",
                                  index,
                                  "fileSize",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="e.g., 6.4 MB"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={doc.description}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "other",
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                              placeholder="Document description..."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL
                            </label>
                            <input
                              type="url"
                              value={doc.url}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "other",
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              placeholder="https://example.com/document.pdf"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Format
                            </label>
                            <select
                              value={doc.format}
                              onChange={(e) =>
                                handleDocumentChange(
                                  "other",
                                  index,
                                  "format",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                              <option value="PDF">PDF</option>
                              <option value="DOC">DOC</option>
                              <option value="DOCX">DOCX</option>
                              <option value="XLS">XLS</option>
                              <option value="XLSX">XLSX</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleRemoveDocument("other", index)}
                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove document"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
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
                            placeholder="Field Label (e.g., Download Guidelines, Archive)"
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
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={uploading}
              >
                {uploading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {uploading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Downloads;
