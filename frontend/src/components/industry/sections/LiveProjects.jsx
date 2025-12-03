import React, { useEffect, useState } from "react";
import {
  Edit3,
  Calendar,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  X,
  Upload,
  FileText,
  Mail,
  Phone,
  User,
  Download,
  Eye,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const LiveProjects = ({ isOwner }) => {
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { routeId } = useParams();
  const [projectsData, setProjectsData] = useState([]);
  const [editData, setEditData] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    duration: "",
    deadline: "",
    skillsRequired: "",
    type: "",
    priority: "",
    requiredCandidates: "",
  });

  const [newProjectData, setNewProjectData] = useState({
    title: "",
    company: "",
    description: "",
    budget: "",
    duration: "",
    deadline: "",
    skillsRequired: "",
    type: "",
    priority: "",
    requiredCandidates: "",
  });

  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    portfolio: "",
    coverLetter: "",
    resume: null,
    availability: "",
  });
  const BASE_URL = "/api/industry";

  useEffect(() => {
    const fetchJobs = async () => {
      if (!routeId) return;

      try {
        const response = await axios.get(
          `${BASE_URL}/projects?industryId=${routeId}`
        );
        setProjectsData(response.data.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [routeId]);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditData({
      title: project.title,
      company: project.company,
      description: project.description,
      budget: project.budget,
      duration: project.duration,
      deadline: project.deadline,
      skillsRequired: project.skillsRequired.join(", "),
      type: project.type,
      priority: project.priority,
      requiredCandidates: project.requiredCandidates.toString(),
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsEditModalOpen(false);
    setEditData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
      requiredCandidates: "",
    });
  };

  // New project handlers
  const handleNewProject = () => {
    setIsNewProjectModalOpen(true);
  };

  const handleNewProjectCancel = () => {
    setIsNewProjectModalOpen(false);
    setNewProjectData({
      title: "",
      company: "",
      description: "",
      budget: "",
      duration: "",
      deadline: "",
      skillsRequired: "",
      type: "",
      priority: "",
      requiredCandidates: "",
    });
  };

  const handleNewProjectSubmit = async () => {
    try {
      const newProject = {
        title: newProjectData.title,
        company: newProjectData.company,
        description: newProjectData.description,
        budget: newProjectData.budget,
        duration: newProjectData.duration,
        deadline: newProjectData.deadline,
        skillsRequired: newProjectData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
        status: "Open",
        applicants: 0,
        requiredCandidates: parseInt(newProjectData.requiredCandidates) || 0,
        type: newProjectData.type,
        priority: newProjectData.priority,
        postedDate: new Date().toISOString().split("T")[0],
        industryId: parseInt(routeId),
      };

      const newProject2 = {
        title: editData.title,
        company: editData.company,
        description: editData.description,
        budget: editData.budget,
        duration: editData.duration,
        deadline: editData.deadline,
        skillsRequired: editData.skillsRequired
          .split(",")
          .map((skill) => skill.trim()),
        status: "Open",
        applicants: 0,
        requiredCandidates: parseInt(editData.requiredCandidates) || 0,
        type: editData.type,
        priority: editData.priority,
        postedDate: new Date().toISOString().split("T")[0],
        industryId: parseInt(routeId),
      };

      if (editingId) {
        await axios.put(`${BASE_URL}/projects/${editingId}`, newProject2);
        alert("✅ Project updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(`${BASE_URL}/projects`, newProject);
        alert("✅ Project posted successfully!");
      }
      const response = await axios.get(
        `${BASE_URL}/projects?industryId=${routeId}`
      );
      setProjectsData(response.data.data);
      handleNewProjectCancel();
    } catch (error) {
      console.error("❌ Error posting project:", error);
      alert("Failed to post project. Check console for details.");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const handleDelete = async (project) => {
    try {
      await axios.delete(`${BASE_URL}/projects/${project?.id}`);
      alert("Project Deleted");
      // handleNewProjectCancel();

      const response = await axios.get(
        `${BASE_URL}/projects?industryId=${routeId}`
      );
      setProjectsData(response.data.data || []);
    } catch (error) {
      console.error("❌ Error posting project:", error);
      alert("Failed to post project. Check console for details.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return { backgroundColor: "#DCE8F2", color: "#1F2D3D" };
      case "In Progress":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      case "Completed":
        return { backgroundColor: "#d1ecf1", color: "#0c5460" };
      case "Closed":
        return { backgroundColor: "#f8f9fa", color: "#6c757d" };
      default:
        return { backgroundColor: "#f8f9fa", color: "#6c757d" };
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      case "Medium":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      case "Low":
        return { backgroundColor: "#DCE8F2", color: "#1F2D3D" };
      default:
        return { backgroundColor: "#f8f9fa", color: "#6c757d" };
    }
  };

  // Application handlers
  const handleApplyNow = (project) => {
    setSelectedProject(project);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationCancel = () => {
    setIsApplicationModalOpen(false);
    setSelectedProject(null);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      experience: "",
      skills: "",
      portfolio: "",
      coverLetter: "",
      resume: null,
      availability: "",
    });
  };

  const handleApplicationSubmit = () => {
    // Update the project's applicants count
    setProjectsData(
      projectsData?.map((project) =>
        project.id === selectedProject.id
          ? { ...project, applicants: project.applicants + 1 }
          : project
      )
    );
    console.log("Application submitted:", {
      projectId: selectedProject.id,
      applicationData,
    });
    handleApplicationCancel();

    alert("Application submitted successfully!");
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [".pdf", ".doc", ".docx"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();

      if (!allowedTypes.includes(fileExtension)) {
        alert("Please upload a PDF, DOC, or DOCX file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB.");
        return;
      }

      setApplicationData({ ...applicationData, resume: file });
    }
  };

  // View Details handlers
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsModalOpen(true);
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedProject(null);
  };

  const generatePDF = async () => {
    if (!selectedProject) return;

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const lineHeight = 7;
      let currentY = margin;

      // Helper function to add text with word wrapping
      const addWrappedText = (text, x, y, maxWidth, fontSize = 12) => {
        pdf.setFontSize(fontSize);
        const lines = pdf.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
          if (y + index * lineHeight > pageHeight - margin) {
            pdf.addPage();
            y = margin;
          }
          pdf.text(line, x, y + index * lineHeight);
        });
        return y + lines.length * lineHeight + 5;
      };

      // Helper function to add section header
      const addSectionHeader = (title, y) => {
        if (y > pageHeight - margin - 20) {
          pdf.addPage();
          y = margin;
        }
        pdf.setFontSize(16);
        pdf.setFont(undefined, "bold");
        pdf.text(title, margin, y);
        pdf.setFont(undefined, "normal");
        return y + lineHeight + 3;
      };

      // Option to capture the modal content as an image using html2canvas
      const modalElement = document.querySelector(
        '[data-modal="project-details"]'
      );
      if (modalElement) {
        try {
          const canvas = await html2canvas(modalElement, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            logging: false,
            width: modalElement.scrollWidth,
            height: modalElement.scrollHeight,
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 2 * margin;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Add the captured image to PDF
          if (imgHeight <= pageHeight - 2 * margin) {
            pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
            pdf.addPage();
            currentY = margin;
          } else {
            // If image is too tall, add it in parts or add a note
            pdf.addImage(
              imgData,
              "PNG",
              margin,
              margin,
              imgWidth,
              pageHeight - 2 * margin
            );
            pdf.addPage();
            currentY = margin;
          }
        } catch (error) {
          console.warn(
            "Could not capture modal image, using text-based PDF:",
            error
          );
          // Continue with text-based PDF if image capture fails
        }
      }

      // Title and company
      pdf.setFontSize(20);
      pdf.setFont(undefined, "bold");
      currentY = addWrappedText(
        selectedProject.title,
        margin,
        currentY,
        pageWidth - 2 * margin,
        20
      );

      pdf.setFontSize(14);
      pdf.setFont(undefined, "normal");
      pdf.setTextColor(100, 100, 100);
      currentY = addWrappedText(
        `by ${selectedProject.company}`,
        margin,
        currentY,
        pageWidth - 2 * margin,
        14
      );

      pdf.setTextColor(0, 0, 0);
      currentY += 10;

      // Project Overview
      currentY = addSectionHeader("Project Overview", currentY);
      currentY = addWrappedText(
        selectedProject.description,
        margin,
        currentY,
        pageWidth - 2 * margin
      );

      // Project Details
      currentY = addSectionHeader("Project Details", currentY);

      const details = [
        `Type: ${selectedProject.type}`,
        `Budget: ${selectedProject.budget}`,
        `Duration: ${selectedProject.duration}`,
        `Deadline: ${new Date(selectedProject.deadline).toLocaleDateString()}`,
        `Status: ${selectedProject.status}`,
        `Priority: ${selectedProject.priority}`,
        `Posted Date: ${new Date(
          selectedProject.postedDate
        ).toLocaleDateString()}`,
        `Required Candidates: ${selectedProject.requiredCandidates}`,
        `Current Applicants: ${selectedProject.applicants}`,
        `Remaining Positions: ${
          selectedProject.requiredCandidates - selectedProject.applicants
        }`,
      ];

      details.forEach((detail) => {
        currentY = addWrappedText(
          detail,
          margin,
          currentY,
          pageWidth - 2 * margin
        );
      });

      // Skills Required
      currentY = addSectionHeader("Skills Required", currentY);
      const skillsText = selectedProject.skillsRequired.join(", ");
      currentY = addWrappedText(
        skillsText,
        margin,
        currentY,
        pageWidth - 2 * margin
      );

      // Requirements (if available)
      if (
        selectedProject.requirements &&
        selectedProject.requirements.length > 0
      ) {
        currentY = addSectionHeader("Requirements", currentY);
        selectedProject.requirements.forEach((requirement, index) => {
          currentY = addWrappedText(
            `${index + 1}. ${requirement}`,
            margin,
            currentY,
            pageWidth - 2 * margin
          );
        });
      }

      // Deliverables (if available)
      if (
        selectedProject.deliverables &&
        selectedProject.deliverables.length > 0
      ) {
        currentY = addSectionHeader("Deliverables", currentY);
        selectedProject.deliverables.forEach((deliverable, index) => {
          currentY = addWrappedText(
            `${index + 1}. ${deliverable}`,
            margin,
            currentY,
            pageWidth - 2 * margin
          );
        });
      }

      // Additional Information (if available)
      if (selectedProject.additionalInfo) {
        currentY = addSectionHeader("Additional Information", currentY);
        currentY = addWrappedText(
          selectedProject.additionalInfo,
          margin,
          currentY,
          pageWidth - 2 * margin
        );
      }

      // Footer
      if (currentY > pageHeight - margin - 30) {
        pdf.addPage();
        currentY = margin;
      }

      currentY = pageHeight - margin - 15;
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        margin,
        currentY
      );
      pdf.text(
        `ElectroSoft Alumni Platform - Live Projects`,
        margin,
        currentY + 5
      );

      // Download the PDF
      pdf.save(
        `${selectedProject.title
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}_details.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#F7FAFC" }}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            Live Projects & Industrial Problems
          </h2>
          <p className="mt-1" style={{ color: "#1F2D3D", opacity: "0.6" }}>
            Collaborate on real-world projects and solve industry challenges
          </p>
        </div>
        {isOwner && (
          <button
            onClick={handleNewProject}
            className="px-4 py-2 rounded-lg transition-colors text-white"
            style={{ backgroundColor: "#6EA9CB" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a8fa8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6EA9CB")}
          >
            Post New Project
          </button>
        )}
      </div>

      {/* Quick Stats Section */}
      {projectsData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D", opacity: "0.7" }}
                >
                  Total Projects
                </p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: "#6EA9CB" }}
                >
                  {projectsData?.length}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F7FAFC" }}
              >
                <FileText className="w-6 h-6" style={{ color: "#6EA9CB" }} />
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D", opacity: "0.7" }}
                >
                  Open Projects
                </p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: "#34C759" }}
                >
                  {projectsData?.filter((p) => p.status === "Open").length ||
                    ""}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F0FDF4" }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: "#34C759" }} />
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D", opacity: "0.7" }}
                >
                  In Progress
                </p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: "#FF9500" }}
                >
                  {
                    projectsData?.filter((p) => p.status === "In Progress")
                      .length
                  }
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#FFF8F0" }}
              >
                <Clock className="w-6 h-6" style={{ color: "#FF9500" }} />
              </div>
            </div>
          </div>
          <div
            className="rounded-xl p-6 shadow-sm"
            style={{ backgroundColor: "white", border: "1px solid #DCE8F2" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D", opacity: "0.7" }}
                >
                  Total Applicants
                </p>
                <p
                  className="text-2xl font-bold mt-1"
                  style={{ color: "#007AFF" }}
                >
                  {projectsData?.reduce(
                    (total, project) => total + (project.applicants || 0),
                    0
                  )}
                </p>
              </div>
              <div
                className="p-3 rounded-lg"
                style={{ backgroundColor: "#F0F8FF" }}
              >
                <Users className="w-6 h-6" style={{ color: "#007AFF" }} />
              </div>
            </div>
          </div>
        </div>
      )}
      {projectsData && (
        <div className="space-y-6">
          {projectsData?.map((project) => (
            <div
              key={project.id}
              className="border rounded-xl shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundColor: "white", borderColor: "#B5D3E7" }}
            >
              {editingId === project.id ? (
                // Edit Mode
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        value={editData.company}
                        onChange={(e) =>
                          setEditData({ ...editData, company: e.target.value })
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        Description
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            description: e.target.value,
                          })
                        }
                        rows={4}
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Budget
                        </label>
                        <input
                          type="text"
                          value={editData.budget}
                          onChange={(e) =>
                            setEditData({ ...editData, budget: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#B5D3E7",
                            color: "#1F2D3D",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#6EA9CB")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#B5D3E7")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Duration
                        </label>
                        <input
                          type="text"
                          value={editData.duration}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#B5D3E7",
                            color: "#1F2D3D",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#6EA9CB")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#B5D3E7")
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Deadline
                        </label>
                        <input
                          type="date"
                          value={editData.deadline}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              deadline: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#B5D3E7",
                            color: "#1F2D3D",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#6EA9CB")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#B5D3E7")
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Project Type
                        </label>
                        <select
                          value={editData.type}
                          onChange={(e) =>
                            setEditData({ ...editData, type: e.target.value })
                          }
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#B5D3E7",
                            color: "#1F2D3D",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#6EA9CB")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#B5D3E7")
                          }
                        >
                          <option value="Development">Development</option>
                          <option value="Analytics">Analytics</option>
                          <option value="Hardware">Hardware</option>
                          <option value="Research">Research</option>
                          <option value="Consulting">Consulting</option>
                        </select>
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          style={{ color: "#1F2D3D" }}
                        >
                          Priority
                        </label>
                        <select
                          value={editData.priority}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              priority: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border rounded-lg outline-none"
                          style={{
                            backgroundColor: "white",
                            borderColor: "#B5D3E7",
                            color: "#1F2D3D",
                          }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#6EA9CB")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#B5D3E7")
                          }
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        Skills Required (comma separated)
                      </label>
                      <input
                        type="text"
                        value={editData.skillsRequired}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            skillsRequired: e.target.value,
                          })
                        }
                        placeholder="Python, Machine Learning, API Integration"
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        Required Candidates
                      </label>
                      <input
                        type="number"
                        value={editData.requiredCandidates}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            requiredCandidates: e.target.value,
                          })
                        }
                        placeholder="30"
                        min="1"
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      />
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={handleNewProjectSubmit}
                        className="px-4 py-2 rounded-lg transition-colors text-white"
                        style={{ backgroundColor: "#6EA9CB" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#5a8fa8")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "#6EA9CB")
                        }
                      >
                        Add Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-lg transition-colors"
                        style={{
                          backgroundColor: "#DCE8F2",
                          color: "#1F2D3D",
                        }}
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className="text-xl font-semibold"
                          style={{ color: "#1F2D3D" }}
                        >
                          {project.title}
                        </h3>
                        {isOwner && (
                          <div>
                            <button
                              onClick={() => handleEdit(project)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: "#1F2D3D", opacity: "0.5" }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#6EA9CB";
                                e.target.style.backgroundColor = "#DCE8F2";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#1F2D3D";
                                e.target.style.opacity = "0.5";
                                e.target.style.backgroundColor = "transparent";
                              }}
                              title="Edit Project"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(project)}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: "#1F2D3D", opacity: "0.5" }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#6EA9CB";
                                e.target.style.backgroundColor = "#DCE8F2";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "#1F2D3D";
                                e.target.style.opacity = "0.5";
                                e.target.style.backgroundColor = "transparent";
                              }}
                              title="Edit Project"
                            >
                              <MdDelete className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                      <p
                        className="text-lg font-medium mb-3"
                        style={{ color: "#6EA9CB" }}
                      >
                        {project.company}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={getStatusColor(project.status)}
                        >
                          {project.status}
                        </span>
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={getPriorityColor(project.priority)}
                        >
                          {project.priority} Priority
                        </span>
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: "#DCE8F2",
                            color: "#1F2D3D",
                          }}
                        >
                          {project.type}
                        </span>
                      </div>

                      <div
                        className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4"
                        style={{ color: "#1F2D3D", opacity: "0.6" }}
                      >
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{project.budget}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Due:{" "}
                            {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{project.applicants} applicants</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            {project.requiredCandidates - project.applicants}{" "}
                            positions left
                          </span>
                        </div>
                      </div>

                      {/* Positions Progress Bar */}
                      <div className="mb-4">
                        <div
                          className="flex justify-between text-sm mb-1"
                          style={{ color: "#1F2D3D", opacity: "0.6" }}
                        >
                          <span>Positions Filled</span>
                          <span>
                            {project.applicants}/{project.requiredCandidates}
                          </span>
                        </div>
                        <div
                          className="w-full rounded-full h-2"
                          style={{ backgroundColor: "#DCE8F2" }}
                        >
                          <div
                            className="h-2 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: "#6EA9CB",
                              width: `${Math.min(
                                (project.applicants /
                                  project.requiredCandidates) *
                                  100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p
                    className="mb-4 leading-relaxed"
                    style={{ color: "#1F2D3D", opacity: "0.7" }}
                  >
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4
                      className="text-sm font-medium mb-2"
                      style={{ color: "#1F2D3D" }}
                    >
                      Required Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skillsRequired.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full"
                          style={{
                            backgroundColor: "#DCE8F2",
                            color: "#1F2D3D",
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: "#B5D3E7" }}
                  >
                    <div
                      className="text-sm"
                      style={{ color: "#1F2D3D", opacity: "0.5" }}
                    >
                      Posted on{" "}
                      {new Date(project.postedDate).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewDetails(project)}
                        className="px-4 py-2 border rounded-lg transition-colors flex items-center space-x-2"
                        style={{
                          borderColor: "#B5D3E7",
                          color: "#6EA9CB",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#DCE8F2")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleApplyNow(project)}
                        className={`px-6 py-2 rounded-lg transition-colors ${
                          project.applicants >= project.requiredCandidates
                            ? "cursor-not-allowed"
                            : ""
                        }`}
                        style={{
                          backgroundColor:
                            project.applicants >= project.requiredCandidates
                              ? "#f8f9fa"
                              : "#6EA9CB",
                          color:
                            project.applicants >= project.requiredCandidates
                              ? "#6c757d"
                              : "white",
                        }}
                        onMouseEnter={(e) => {
                          if (project.applicants < project.requiredCandidates) {
                            e.target.style.backgroundColor = "#5a8fa8";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (project.applicants < project.requiredCandidates) {
                            e.target.style.backgroundColor = "#6EA9CB";
                          }
                        }}
                        disabled={
                          project.applicants >= project.requiredCandidates
                        }
                      >
                        {project.applicants >= project.requiredCandidates
                          ? "Positions Filled"
                          : "Apply Now"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Project Details
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "#1F2D3D", opacity: "0.5" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                    e.target.style.color = "#6EA9CB";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#1F2D3D";
                    e.target.style.opacity = "0.5";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Form fields */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Project Title
                </label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({ ...editData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Company
                </label>
                <input
                  type="text"
                  value={editData.company}
                  onChange={(e) =>
                    setEditData({ ...editData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1F2D3D",
                      marginBottom: "4px",
                    }}
                  >
                    Budget
                  </label>
                  <input
                    type="text"
                    value={editData.budget}
                    onChange={(e) =>
                      setEditData({ ...editData, budget: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #B5D3E7",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#1F2D3D",
                      backgroundColor: "#F7FAFC",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#1F2D3D",
                      marginBottom: "4px",
                    }}
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({ ...editData, duration: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #B5D3E7",
                      borderRadius: "8px",
                      fontSize: "14px",
                      color: "#1F2D3D",
                      backgroundColor: "#F7FAFC",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) =>
                      setEditData({ ...editData, deadline: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      border: "1px solid #DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                      e.target.style.borderColor = "#6EA9CB";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(110, 169, 203, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Project Type
                  </label>
                  <select
                    value={editData.type}
                    onChange={(e) =>
                      setEditData({ ...editData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      border: "1px solid #DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                      e.target.style.borderColor = "#6EA9CB";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(110, 169, 203, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Research">Research</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Priority
                  </label>
                  <select
                    value={editData.priority}
                    onChange={(e) =>
                      setEditData({ ...editData, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg"
                    style={{
                      border: "1px solid #DCE8F2",
                      backgroundColor: "#F7FAFC",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.outline = "none";
                      e.target.style.borderColor = "#6EA9CB";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(110, 169, 203, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Skills Required (comma separated)
                </label>
                <input
                  type="text"
                  value={editData.skillsRequired}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      skillsRequired: e.target.value,
                    })
                  }
                  placeholder="Python, Machine Learning, API Integration"
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{
                    borderColor: "#DCE8F2",
                    "&:focus": {
                      outline: "none",
                      borderColor: "#6EA9CB",
                      boxShadow: "0 0 0 2px rgba(110, 169, 203, 0.2)",
                    },
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Required Candidates
                </label>
                <input
                  type="number"
                  value={editData.requiredCandidates}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      requiredCandidates: e.target.value,
                    })
                  }
                  placeholder="30"
                  min="1"
                  className="w-full px-3 py-2 border rounded-lg"
                  style={{
                    borderColor: "#DCE8F2",
                    "&:focus": {
                      outline: "none",
                      borderColor: "#6EA9CB",
                      boxShadow: "0 0 0 2px rgba(110, 169, 203, 0.2)",
                    },
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6EA9CB";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(110, 169, 203, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleNewProjectSubmit}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Apply for {selectedProject?.title}
                </h2>
                <button
                  onClick={handleApplicationCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "#1F2D3D", opacity: "0.5" }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#DCE8F2";
                    e.target.style.color = "#6EA9CB";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#1F2D3D";
                    e.target.style.opacity = "0.5";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Project Info Summary */}
              {selectedProject && (
                <div
                  className="p-4 rounded-lg mb-6"
                  style={{ backgroundColor: "#F7FAFC" }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "#1F2D3D" }}>
                    Project Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span style={{ color: "#1F2D3D", opacity: "0.6" }}>
                        Company:
                      </span>
                      <span
                        className="ml-2 font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        {selectedProject.company}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#1F2D3D", opacity: "0.6" }}>
                        Budget:
                      </span>
                      <span
                        className="ml-2 font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        {selectedProject.budget}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#1F2D3D", opacity: "0.6" }}>
                        Duration:
                      </span>
                      <span
                        className="ml-2 font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        {selectedProject.duration}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: "#1F2D3D", opacity: "0.6" }}>
                        Registered:
                      </span>
                      <span
                        className="ml-2 font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        {selectedProject.applicants}/
                        {selectedProject.requiredCandidates} candidates
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span style={{ color: "#1F2D3D", opacity: "0.6" }}>
                        Remaining Positions:
                      </span>
                      <span
                        className="ml-2 font-medium"
                        style={{ color: "#6EA9CB" }}
                      >
                        {selectedProject.requiredCandidates -
                          selectedProject.applicants}{" "}
                        positions available
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Application form fields */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={applicationData.fullName}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Experience (in years)
                </label>
                <input
                  type="number"
                  value={applicationData.experience}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      experience: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Skills
                </label>
                <input
                  type="text"
                  value={applicationData.skills}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      skills: e.target.value,
                    })
                  }
                  placeholder="e.g. Python, Data Analysis"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={applicationData.portfolio}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      portfolio: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Cover Letter
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      coverLetter: e.target.value,
                    })
                  }
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Resume *
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-4 transition-colors"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                  }}
                >
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload
                      className="w-8 h-8 mb-2"
                      style={{ color: "#6EA9CB" }}
                    />
                    <span className="text-sm" style={{ color: "#1F2D3D" }}>
                      {applicationData.resume ? (
                        <div className="text-center">
                          <div
                            className="font-medium"
                            style={{ color: "#6EA9CB" }}
                          >
                            {applicationData.resume.name}
                          </div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "#6EA9CB" }}
                          >
                            {(
                              applicationData.resume.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div>Click to upload your resume</div>
                          <div
                            className="text-xs mt-1"
                            style={{ color: "#6EA9CB" }}
                          >
                            PDF, DOC, DOCX (max 5MB)
                          </div>
                        </div>
                      )}
                    </span>
                  </label>
                  {applicationData.resume && (
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          setApplicationData({
                            ...applicationData,
                            resume: null,
                          })
                        }
                        className="text-sm"
                        style={{ color: "#6EA9CB" }}
                        onMouseEnter={(e) => {
                          e.target.style.color = "#1F2D3D";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.color = "#6EA9CB";
                        }}
                      >
                        Remove file
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Availability
                </label>
                <input
                  type="text"
                  value={applicationData.availability}
                  onChange={(e) =>
                    setApplicationData({
                      ...applicationData,
                      availability: e.target.value,
                    })
                  }
                  placeholder="e.g. Immediately, 2 weeks notice"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleApplicationCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleApplicationSubmit}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div
              className="px-6 py-4 border-b flex justify-between items-center"
              style={{ borderColor: "#B5D3E7" }}
            >
              <h3
                className="text-xl font-semibold"
                style={{ color: "#1F2D3D" }}
              >
                Post New Project
              </h3>
              <button
                onClick={handleNewProjectCancel}
                className="transition-colors"
                style={{ color: "#1F2D3D", opacity: "0.4" }}
                onMouseEnter={(e) => (e.target.style.color = "#6EA9CB")}
                onMouseLeave={(e) => {
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.4";
                }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.title}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter project title"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#FFFFFF",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#B5D3E7";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(181, 211, 231, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Company *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.company}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        company: e.target.value,
                      })
                    }
                    placeholder="Company name"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#FFFFFF",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#B5D3E7";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(181, 211, 231, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Project Description *
                </label>
                <textarea
                  value={newProjectData.description}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      description: e.target.value,
                    })
                  }
                  rows={4}
                  placeholder="Describe the project requirements and objectives"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                  style={{
                    borderColor: "#DCE8F2",
                    backgroundColor: "#FFFFFF",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#B5D3E7";
                    e.target.style.boxShadow =
                      "0 0 0 2px rgba(181, 211, 231, 0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#DCE8F2";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Budget *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.budget}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        budget: e.target.value,
                      })
                    }
                    placeholder="e.g. ₹5-10 Lakhs"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                    style={{
                      borderColor: "#DCE8F2",
                      backgroundColor: "#FFFFFF",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#B5D3E7";
                      e.target.style.boxShadow =
                        "0 0 0 2px rgba(181, 211, 231, 0.2)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#DCE8F2";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration *
                  </label>
                  <input
                    type="text"
                    value={newProjectData.duration}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        duration: e.target.value,
                      })
                    }
                    placeholder="e.g. 3 months"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newProjectData.deadline}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        deadline: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Required Skills *
                </label>
                <input
                  type="text"
                  value={newProjectData.skillsRequired}
                  onChange={(e) =>
                    setNewProjectData({
                      ...newProjectData,
                      skillsRequired: e.target.value,
                    })
                  }
                  placeholder="e.g. Python, Machine Learning, API Integration (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type *
                  </label>
                  <select
                    value={newProjectData.type}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        type: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Development">Development</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Research">Research</option>
                    <option value="Design">Design</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority *
                  </label>
                  <select
                    value={newProjectData.priority}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        priority: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Candidates *
                  </label>
                  <input
                    type="number"
                    value={newProjectData.requiredCandidates}
                    onChange={(e) =>
                      setNewProjectData({
                        ...newProjectData,
                        requiredCandidates: e.target.value,
                      })
                    }
                    placeholder="Number of candidates needed"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={handleNewProjectCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNewProjectSubmit}
                disabled={
                  !newProjectData.title ||
                  !newProjectData.company ||
                  !newProjectData.description ||
                  !newProjectData.budget ||
                  !newProjectData.duration ||
                  !newProjectData.deadline ||
                  !newProjectData.skillsRequired ||
                  !newProjectData.type ||
                  !newProjectData.priority ||
                  !newProjectData.requiredCandidates
                }
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Post Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {isDetailsModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Details
                </h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={generatePDF}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={handleDetailsModalClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            <div id="project-details-content" className="p-6">
              {/* Project Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedProject.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-2">
                      {selectedProject.company}
                    </p>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedProject.status
                        )}`}
                      >
                        {selectedProject.status}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                          selectedProject.priority
                        )}`}
                      >
                        {selectedProject.priority} Priority
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {selectedProject.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Budget
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.budget}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Duration
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Deadline
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(selectedProject.deadline).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Required Candidates
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.requiredCandidates}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Current Applicants
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {selectedProject.applicants}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Posted Date
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(
                          selectedProject.postedDate
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Required */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Skills Required
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.skillsRequired.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Application Progress */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Application Progress
                </h3>
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(
                        (selectedProject.applicants /
                          selectedProject.requiredCandidates) *
                          100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{selectedProject.applicants} applied</span>
                  <span>{selectedProject.requiredCandidates} needed</span>
                </div>
                {selectedProject.applicants >=
                  selectedProject.requiredCandidates && (
                  <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">
                      🎉 All positions have been filled for this project!
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Project Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Project ID:</p>
                    <p className="font-medium text-gray-900">
                      PRJ-{selectedProject.id.toString().padStart(4, "0")}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Category:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Priority Level:</p>
                    <p className="font-medium text-gray-900">
                      {selectedProject.priority}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Last updated:{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="flex space-x-3">
                {selectedProject.applicants <
                  selectedProject.requiredCandidates && (
                  <button
                    onClick={() => {
                      handleDetailsModalClose();
                      handleApplyNow(selectedProject);
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                <button
                  onClick={handleDetailsModalClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Statistics */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div
          style={{
            backgroundColor: "#DCE8F2",
            color: "#1F2D3D",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #B5D3E7",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Active Projects
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1F2D3D",
                }}
              >
                45
              </p>
            </div>
            <CheckCircle
              style={{ width: "20px", height: "20px", color: "#6B7280" }}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#DCE8F2",
            color: "#1F2D3D",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #B5D3E7",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Total Budget
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1F2D3D",
                }}
              >
                ₹2.5Cr
              </p>
            </div>
            <DollarSign
              style={{ width: "20px", height: "20px", color: "#6B7280" }}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#DCE8F2",
            color: "#1F2D3D",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #B5D3E7",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Applications
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1F2D3D",
                }}
              >
                234
              </p>
            </div>
            <Users
              style={{ width: "20px", height: "20px", color: "#6B7280" }}
            />
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#DCE8F2",
            color: "#1F2D3D",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #B5D3E7",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                style={{
                  color: "#6B7280",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Urgent
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1F2D3D",
                }}
              >
                8
              </p>
            </div>
            <AlertCircle
              style={{ width: "20px", height: "20px", color: "#6B7280" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveProjects;
