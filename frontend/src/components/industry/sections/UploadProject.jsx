import React, { useState, useRef } from "react";
import {
  Upload,
  File,
  X,
  Plus,
  Save,
  Download,
  Eye,
  Trash2,
  Calendar,
  User,
  Building,
  FileText,
  Image,
  Video,
  Archive,
} from "lucide-react";

const UploadProject = ({ isOwner, industryData }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "AI-Powered Chatbot Development",
      description:
        "Developed an intelligent chatbot using natural language processing for customer service automation.",
      student: "John Doe",
      email: "john.doe@university.edu",
      university: "Stanford University",
      department: "Computer Science",
      mentor: "Dr. Sarah Wilson",
      industry: "TechCorp Solutions",
      uploadDate: "2024-01-15",
      status: "Under Review",
      category: "Artificial Intelligence",
      tags: ["AI", "NLP", "Python", "Machine Learning"],
      files: [
        { name: "project-report.pdf", size: "2.5 MB", type: "application/pdf" },
        { name: "source-code.zip", size: "15.8 MB", type: "application/zip" },
        { name: "demo-video.mp4", size: "45.2 MB", type: "video/mp4" },
        {
          name: "presentation.pptx",
          size: "8.1 MB",
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        },
      ],
      feedback:
        "Excellent work on the NLP implementation. Consider adding more training data for better accuracy.",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Sustainable Energy Monitoring System",
      description:
        "IoT-based system for monitoring and optimizing energy consumption in smart buildings.",
      student: "Emily Chen",
      email: "emily.chen@university.edu",
      university: "MIT",
      department: "Electrical Engineering",
      mentor: "Prof. Michael Zhang",
      industry: "GreenTech Innovations",
      uploadDate: "2024-02-20",
      status: "Approved",
      category: "Internet of Things",
      tags: ["IoT", "Energy", "Sustainability", "Arduino", "Python"],
      files: [
        {
          name: "technical-documentation.pdf",
          size: "4.2 MB",
          type: "application/pdf",
        },
        {
          name: "hardware-design.zip",
          size: "12.5 MB",
          type: "application/zip",
        },
        {
          name: "mobile-app.apk",
          size: "25.7 MB",
          type: "application/vnd.android.package-archive",
        },
      ],
      feedback:
        "Outstanding implementation with real-world applications. Ready for industry deployment.",
      rating: 4.8,
    },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    student: "",
    email: "",
    university: "",
    department: "",
    mentor: "",
    industry: "",
    category: "",
    tags: [],
    files: [],
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type,
      file: file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/"))
      return <Image size={16} className="text-blue-500" />;
    if (type.startsWith("video/"))
      return <Video size={16} className="text-red-500" />;
    if (type.includes("pdf"))
      return <FileText size={16} className="text-red-500" />;
    if (type.includes("zip") || type.includes("rar"))
      return <Archive size={16} className="text-yellow-500" />;
    return <File size={16} className="text-gray-500" />;
  };

  const handleAddProject = () => {
    const id = Math.max(...projects.map((p) => p.id)) + 1;
    const projectToAdd = {
      ...newProject,
      id,
      files: uploadedFiles,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "Under Review",
      tags: newProject.tags.filter((tag) => tag.trim()),
    };
    setProjects([...projects, projectToAdd]);
    setNewProject({
      title: "",
      description: "",
      student: "",
      email: "",
      university: "",
      department: "",
      mentor: "",
      industry: "",
      category: "",
      tags: [],
      files: [],
    });
    setUploadedFiles([]);
    setShowUploadForm(false);
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project });
    setUploadedFiles([...project.files]);
  };

  const handleSave = (updatedProject) => {
    const projectToUpdate = {
      ...updatedProject,
      files: uploadedFiles,
    };
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? projectToUpdate : project
      )
    );
    setEditingProject(null);
    setUploadedFiles([]);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setUploadedFiles([]);
    setShowUploadForm(false);
  };

  const updateArrayField = (project, setProject, field, index, value) => {
    const newArray = [...project[field]];
    newArray[index] = value;
    setProject({ ...project, [field]: newArray });
  };

  const addArrayField = (project, setProject, field, value = "") => {
    setProject({ ...project, [field]: [...project[field], value] });
  };

  const removeArrayField = (project, setProject, field, index) => {
    const newArray = project[field].filter((_, i) => i !== index);
    setProject({ ...project, [field]: newArray });
  };

  const renderFileUploadZone = () => (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Project Files</label>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Support for PDF, ZIP, images, videos, and more
        </p>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Select Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Uploaded Files</h4>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProjectForm = (
    project,
    onSave,
    onCancel,
    isNewProject = false
  ) => (
    <div className="bg-white p-6 border rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {isNewProject ? "Upload New Project" : "Edit Project"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Project Title
          </label>
          <input
            type="text"
            value={project.title}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, title: e.target.value })
                : setEditingProject({ ...project, title: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Enter project title"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={project.description}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, description: e.target.value })
                : setEditingProject({ ...project, description: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Student Name</label>
          <input
            type="text"
            value={project.student}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, student: e.target.value })
                : setEditingProject({ ...project, student: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={project.email}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, email: e.target.value })
                : setEditingProject({ ...project, email: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@university.edu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input
            type="text"
            value={project.university}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, university: e.target.value })
                : setEditingProject({ ...project, university: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="University name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <input
            type="text"
            value={project.department}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, department: e.target.value })
                : setEditingProject({ ...project, department: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Department/Major"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mentor</label>
          <input
            type="text"
            value={project.mentor}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, mentor: e.target.value })
                : setEditingProject({ ...project, mentor: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Mentor name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Industry Partner
          </label>
          <input
            type="text"
            value={project.industry}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, industry: e.target.value })
                : setEditingProject({ ...project, industry: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Industry partner (optional)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={project.category}
            onChange={(e) =>
              isNewProject
                ? setNewProject({ ...project, category: e.target.value })
                : setEditingProject({ ...project, category: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile Development">Mobile Development</option>
            <option value="Internet of Things">Internet of Things</option>
            <option value="Data Science">Data Science</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="Blockchain">Blockchain</option>
            <option value="Cloud Computing">Cloud Computing</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Tags</label>
        {project.tags.map((tag, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tag}
              onChange={(e) =>
                updateArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "tags",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter tag"
            />
            <button
              onClick={() =>
                removeArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "tags",
                  index
                )
              }
              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addArrayField(
              project,
              isNewProject ? setNewProject : setEditingProject,
              "tags"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Tag
        </button>
      </div>

      {renderFileUploadZone()}

      <div className="flex gap-3">
        <button
          onClick={() => (isNewProject ? handleAddProject() : onSave(project))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={16} />
          {isNewProject ? "Upload Project" : "Save Changes"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Upload Project</h2>
          <p className="text-gray-600 mt-2">
            Upload your project details, documentation, and results to showcase
            your work to the industry community.
          </p>
        </div>
        <button
          onClick={() => setShowUploadForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Upload New Project
        </button>
      </div>

      {showUploadForm &&
        renderProjectForm(newProject, handleAddProject, handleCancel, true)}

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id}>
            {editingProject && editingProject.id === project.id ? (
              renderProjectForm(editingProject, handleSave, handleCancel)
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {project.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === "Approved"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Under Review"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <User size={16} />
                          {project.student}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building size={16} />
                          {project.university}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {project.uploadDate}
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{project.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Project Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Department:</span>{" "}
                          {project.department}
                        </p>
                        <p>
                          <span className="font-medium">Mentor:</span>{" "}
                          {project.mentor}
                        </p>
                        {project.industry && (
                          <p>
                            <span className="font-medium">
                              Industry Partner:
                            </span>{" "}
                            {project.industry}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {project.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {project.files && project.files.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Project Files
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <div>
                                <p className="font-medium text-sm">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {file.size}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button className="text-blue-500 hover:text-blue-700 p-1">
                                <Eye size={16} />
                              </button>
                              <button className="text-green-500 hover:text-green-700 p-1">
                                <Download size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.feedback && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-2">
                        Feedback
                      </h4>
                      <p className="text-blue-800">{project.feedback}</p>
                      {project.rating && (
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-blue-700">Rating:</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.floor(project.rating)
                                    ? "text-yellow-500 fill-current"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                            <span className="ml-1 text-sm text-blue-700">
                              {project.rating}/5
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadProject;
