import React, { useState, useRef } from "react";
import {
  Plus,
  Edit2,
  X,
  Save,
  Upload,
  File,
  Image,
  Video,
  Archive,
  FileText,
  Calendar,
  User,
  Building,
  Users,
  Target,
  Clock,
  DollarSign,
  Star,
} from "lucide-react";

const AddUniversityProject = ({ isOwner, industryData }) => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Smart Campus IoT Network",
      description:
        "Development of an integrated IoT network for university campus monitoring and automation, including energy management, security systems, and environmental monitoring.",
      university: "Stanford University",
      department: "Computer Science & Engineering",
      course: "CS 598 - Advanced Systems Design",
      instructor: "Prof. Sarah Johnson",
      students: [
        {
          name: "Alex Chen",
          role: "Team Lead",
          email: "alex.chen@stanford.edu",
        },
        {
          name: "Maria Rodriguez",
          role: "Backend Developer",
          email: "maria.r@stanford.edu",
        },
        {
          name: "James Wilson",
          role: "IoT Specialist",
          email: "j.wilson@stanford.edu",
        },
      ],
      startDate: "2024-01-15",
      endDate: "2024-05-15",
      status: "In Progress",
      phase: "Development",
      category: "Internet of Things",
      technologies: [
        "Python",
        "Arduino",
        "Raspberry Pi",
        "MongoDB",
        "React",
        "MQTT",
      ],
      requirements: [
        "Implement real-time sensor data collection",
        "Develop web-based dashboard",
        "Create mobile application",
        "Integrate with existing campus systems",
      ],
      objectives: [
        "Reduce energy consumption by 20%",
        "Improve campus security monitoring",
        "Provide real-time environmental data",
        "Create scalable IoT architecture",
      ],
      budget: "$15,000",
      fundingSource: "University Research Grant",
      industryMentors: [
        {
          name: "Dr. Michael Chen",
          company: "TechCorp",
          expertise: "IoT Architecture",
        },
        {
          name: "Lisa Wang",
          company: "SmartSystems Inc.",
          expertise: "Data Analytics",
        },
      ],
      progress: 65,
      milestones: [
        {
          name: "Requirements Analysis",
          status: "Completed",
          date: "2024-01-30",
        },
        { name: "System Design", status: "Completed", date: "2024-02-15" },
        {
          name: "Prototype Development",
          status: "In Progress",
          date: "2024-03-30",
        },
        {
          name: "Testing & Integration",
          status: "Pending",
          date: "2024-04-15",
        },
        { name: "Final Deployment", status: "Pending", date: "2024-05-10" },
      ],
      deliverables: [
        "Technical specification document",
        "Working prototype",
        "Source code repository",
        "User manual and documentation",
        "Final presentation",
      ],
      files: [
        {
          name: "project-proposal.pdf",
          size: "2.1 MB",
          type: "application/pdf",
        },
        {
          name: "technical-specs.docx",
          size: "1.8 MB",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
        { name: "architecture-diagram.png", size: "856 KB", type: "image/png" },
      ],
      tags: [
        "IoT",
        "Smart Campus",
        "Energy Management",
        "Security",
        "Research",
      ],
      lookingForMentors: true,
      lookingForIndustryPartnership: true,
      contactEmail: "alex.chen@stanford.edu",
    },
    {
      id: 2,
      title: "AI-Powered Learning Management System",
      description:
        "Development of an intelligent learning management system that uses machine learning to personalize student learning experiences and provide adaptive content delivery.",
      university: "MIT",
      department: "Electrical Engineering & Computer Science",
      course: "6.034 - Artificial Intelligence",
      instructor: "Prof. Jennifer Martinez",
      students: [
        {
          name: "Emma Thompson",
          role: "Project Manager",
          email: "emma.t@mit.edu",
        },
        { name: "David Park", role: "ML Engineer", email: "d.park@mit.edu" },
        {
          name: "Sophie Anderson",
          role: "Full Stack Developer",
          email: "sophie.a@mit.edu",
        },
      ],
      startDate: "2024-02-01",
      endDate: "2024-06-01",
      status: "Active",
      phase: "Research",
      category: "Artificial Intelligence",
      technologies: [
        "Python",
        "TensorFlow",
        "React",
        "Node.js",
        "PostgreSQL",
        "Docker",
      ],
      requirements: [
        "Implement ML-based content recommendation",
        "Develop adaptive assessment system",
        "Create intuitive user interface",
        "Ensure scalability and performance",
      ],
      objectives: [
        "Improve student engagement by 30%",
        "Reduce learning time by 25%",
        "Provide personalized learning paths",
        "Generate detailed analytics for educators",
      ],
      budget: "$12,000",
      fundingSource: "NSF Student Research Grant",
      industryMentors: [
        {
          name: "Dr. Robert Kim",
          company: "EduTech Solutions",
          expertise: "Educational Technology",
        },
      ],
      progress: 40,
      milestones: [
        { name: "Literature Review", status: "Completed", date: "2024-02-15" },
        {
          name: "Algorithm Development",
          status: "In Progress",
          date: "2024-03-15",
        },
        {
          name: "System Implementation",
          status: "Pending",
          date: "2024-04-30",
        },
        { name: "User Testing", status: "Pending", date: "2024-05-15" },
        { name: "Final Documentation", status: "Pending", date: "2024-05-30" },
      ],
      deliverables: [
        "Research paper",
        "Working prototype",
        "Performance evaluation report",
        "Source code and documentation",
      ],
      files: [
        {
          name: "research-proposal.pdf",
          size: "3.2 MB",
          type: "application/pdf",
        },
        {
          name: "literature-review.docx",
          size: "2.5 MB",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      ],
      tags: ["AI", "Machine Learning", "Education", "LMS", "Personalization"],
      lookingForMentors: true,
      lookingForIndustryPartnership: false,
      contactEmail: "emma.t@mit.edu",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    university: "",
    department: "",
    course: "",
    instructor: "",
    students: [{ name: "", role: "", email: "" }],
    startDate: "",
    endDate: "",
    status: "Planning",
    phase: "Planning",
    category: "",
    technologies: [],
    requirements: [],
    objectives: [],
    budget: "",
    fundingSource: "",
    industryMentors: [],
    milestones: [],
    deliverables: [],
    tags: [],
    lookingForMentors: false,
    lookingForIndustryPartnership: false,
    contactEmail: "",
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
      progress: 0,
      students: newProject.students.filter((s) => s.name.trim()),
      technologies: newProject.technologies.filter((t) => t.trim()),
      requirements: newProject.requirements.filter((r) => r.trim()),
      objectives: newProject.objectives.filter((o) => o.trim()),
      tags: newProject.tags.filter((tag) => tag.trim()),
    };
    setProjects([...projects, projectToAdd]);

    // Reset form
    setNewProject({
      title: "",
      description: "",
      university: "",
      department: "",
      course: "",
      instructor: "",
      students: [{ name: "", role: "", email: "" }],
      startDate: "",
      endDate: "",
      status: "Planning",
      phase: "Planning",
      category: "",
      technologies: [],
      requirements: [],
      objectives: [],
      budget: "",
      fundingSource: "",
      industryMentors: [],
      milestones: [],
      deliverables: [],
      tags: [],
      lookingForMentors: false,
      lookingForIndustryPartnership: false,
      contactEmail: "",
    });
    setUploadedFiles([]);
    setShowAddForm(false);
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
    setShowAddForm(false);
  };

  const updateArrayField = (project, setProject, field, index, value) => {
    const newArray = [...project[field]];
    newArray[index] = value;
    setProject({ ...project, [field]: newArray });
  };

  const updateObjectArrayField = (
    project,
    setProject,
    field,
    index,
    key,
    value
  ) => {
    const newArray = [...project[field]];
    newArray[index] = { ...newArray[index], [key]: value };
    setProject({ ...project, [field]: newArray });
  };

  const addArrayField = (project, setProject, field, value = "") => {
    setProject({ ...project, [field]: [...project[field], value] });
  };

  const addObjectArrayField = (project, setProject, field, defaultObject) => {
    setProject({ ...project, [field]: [...project[field], defaultObject] });
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
          Support for documents, images, presentations, and more
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
    <div className="bg-white p-6 border rounded-lg mb-6 max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">
        {isNewProject ? "Add University Project" : "Edit Project"}
      </h3>

      {/* Basic Information */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, description: e.target.value })
                  : setEditingProject({
                      ...project,
                      description: e.target.value,
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Describe your project"
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
                  : setEditingProject({
                      ...project,
                      university: e.target.value,
                    })
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
                  : setEditingProject({
                      ...project,
                      department: e.target.value,
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Department name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course</label>
            <input
              type="text"
              value={project.course}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, course: e.target.value })
                  : setEditingProject({ ...project, course: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Course code and name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Instructor</label>
            <input
              type="text"
              value={project.instructor}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, instructor: e.target.value })
                  : setEditingProject({
                      ...project,
                      instructor: e.target.value,
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Instructor name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={project.startDate}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, startDate: e.target.value })
                  : setEditingProject({ ...project, startDate: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={project.endDate}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, endDate: e.target.value })
                  : setEditingProject({ ...project, endDate: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
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
              <option value="Internet of Things">Internet of Things</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Robotics">Robotics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={project.status}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, status: e.target.value })
                  : setEditingProject({ ...project, status: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Planning">Planning</option>
              <option value="Active">Active</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Team Members</h4>
        {project.students.map((student, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2"
          >
            <input
              type="text"
              value={student.name}
              onChange={(e) =>
                updateObjectArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "students",
                  index,
                  "name",
                  e.target.value
                )
              }
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Student name"
            />
            <input
              type="text"
              value={student.role}
              onChange={(e) =>
                updateObjectArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "students",
                  index,
                  "role",
                  e.target.value
                )
              }
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Role"
            />
            <input
              type="email"
              value={student.email}
              onChange={(e) =>
                updateObjectArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "students",
                  index,
                  "email",
                  e.target.value
                )
              }
              className="p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            <button
              onClick={() =>
                removeArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "students",
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
            addObjectArrayField(
              project,
              isNewProject ? setNewProject : setEditingProject,
              "students",
              { name: "", role: "", email: "" }
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Team Member
        </button>
      </div>

      {/* Technologies */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Technologies</h4>
        {project.technologies.map((tech, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tech}
              onChange={(e) =>
                updateArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "technologies",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Technology"
            />
            <button
              onClick={() =>
                removeArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "technologies",
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
              "technologies"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Technology
        </button>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Requirements</h4>
        {project.requirements.map((req, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={req}
              onChange={(e) =>
                updateArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "requirements",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Project requirement"
            />
            <button
              onClick={() =>
                removeArrayField(
                  project,
                  isNewProject ? setNewProject : setEditingProject,
                  "requirements",
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
              "requirements"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Requirement
        </button>
      </div>

      {/* Budget & Contact */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Budget & Contact</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Budget</label>
            <input
              type="text"
              value={project.budget}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, budget: e.target.value })
                  : setEditingProject({ ...project, budget: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Project budget"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Funding Source
            </label>
            <input
              type="text"
              value={project.fundingSource}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, fundingSource: e.target.value })
                  : setEditingProject({
                      ...project,
                      fundingSource: e.target.value,
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Funding source"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={project.contactEmail}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({ ...project, contactEmail: e.target.value })
                  : setEditingProject({
                      ...project,
                      contactEmail: e.target.value,
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Primary contact email"
            />
          </div>
        </div>
      </div>

      {/* Seeking Support */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Seeking Support</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={project.lookingForMentors}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({
                      ...project,
                      lookingForMentors: e.target.checked,
                    })
                  : setEditingProject({
                      ...project,
                      lookingForMentors: e.target.checked,
                    })
              }
              className="mr-2"
            />
            Looking for industry mentors
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={project.lookingForIndustryPartnership}
              onChange={(e) =>
                isNewProject
                  ? setNewProject({
                      ...project,
                      lookingForIndustryPartnership: e.target.checked,
                    })
                  : setEditingProject({
                      ...project,
                      lookingForIndustryPartnership: e.target.checked,
                    })
              }
              className="mr-2"
            />
            Looking for industry partnership
          </label>
        </div>
      </div>

      {renderFileUploadZone()}

      <div className="flex gap-3">
        <button
          onClick={() => (isNewProject ? handleAddProject() : onSave(project))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={16} />
          {isNewProject ? "Add Project" : "Save Changes"}
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
          <h2 className="text-3xl font-bold text-gray-900">
            University Projects
          </h2>
          <p className="text-gray-600 mt-2">
            Add your university project to connect with industry mentors and
            potential collaborators.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add University Project
        </button>
      </div>

      {showAddForm &&
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
                            project.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : project.status === "Active" ||
                                project.status === "In Progress"
                              ? "bg-blue-100 text-blue-800"
                              : project.status === "On Hold"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status}
                        </span>
                        {project.lookingForMentors && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Seeking Mentors
                          </span>
                        )}
                        {project.lookingForIndustryPartnership && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                            Seeking Partnership
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Building size={16} />
                          {project.university}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {project.startDate} - {project.endDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          {project.students.length} members
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {project.category}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          {project.department}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Users size={16} />
                        Team Members
                      </h4>
                      <div className="space-y-1">
                        {project.students.slice(0, 3).map((student, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{student.name}</span>
                            <span className="text-gray-500">
                              {" "}
                              - {student.role}
                            </span>
                          </div>
                        ))}
                        {project.students.length > 3 && (
                          <div className="text-sm text-gray-500">
                            +{project.students.length - 3} more members
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <DollarSign size={16} />
                        Project Info
                      </h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">Budget:</span>{" "}
                          {project.budget}
                        </p>
                        <p>
                          <span className="font-medium">Course:</span>{" "}
                          {project.course}
                        </p>
                        <p>
                          <span className="font-medium">Instructor:</span>{" "}
                          {project.instructor}
                        </p>
                      </div>
                    </div>
                  </div>

                  {project.progress && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-gray-900">
                          Progress
                        </h4>
                        <span className="text-sm text-gray-600">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {project.milestones && project.milestones.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target size={16} />
                        Recent Milestones
                      </h4>
                      <div className="space-y-2">
                        {project.milestones
                          .slice(0, 3)
                          .map((milestone, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-3 text-sm"
                            >
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  milestone.status === "Completed"
                                    ? "bg-green-500"
                                    : milestone.status === "In Progress"
                                    ? "bg-blue-500"
                                    : "bg-gray-300"
                                }`}
                              ></div>
                              <span
                                className={
                                  milestone.status === "Completed"
                                    ? "line-through text-gray-500"
                                    : ""
                                }
                              >
                                {milestone.name}
                              </span>
                              <span className="text-gray-400 text-xs">
                                ({milestone.date})
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {project.industryMentors &&
                    project.industryMentors.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Industry Mentors
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.industryMentors.map((mentor, index) => (
                            <div
                              key={index}
                              className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm"
                            >
                              {mentor.name} - {mentor.company}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Contact: {project.contactEmail}</span>
                    </div>
                    <div className="flex gap-2">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddUniversityProject;
