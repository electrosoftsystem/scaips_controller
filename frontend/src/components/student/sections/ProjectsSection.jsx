import React, { useEffect, useState } from "react";
import { Edit, Plus, X, Folder, ExternalLink } from "lucide-react";
import axios from "axios";

const ProjectsSection = ({
  projects = [],
  onProjectsUpdate,
  studentId,
  isOwner,
}) => {
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    url: "",
    technologies: [],
    customFields: [],
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

  const years = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTechnologyAdd = (technology) => {
    if (
      technology &&
      technology.trim() &&
      !projectData.technologies.includes(technology.trim())
    ) {
      setProjectData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()],
      }));
    }
  };

  const handleTechnologyRemove = (technologyToRemove) => {
    setProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter(
        (tech) => tech !== technologyToRemove
      ),
    }));
  };

  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/students`;

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_URL}/projects/${studentId}`);
      onProjectsUpdate(res.data);
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error fetching projects:", error);
      }
      // Optionally show error to user
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDate =
      projectData.startMonth && projectData.startYear
        ? `${projectData.startMonth} ${projectData.startYear}`
        : null;
    const endDate =
      projectData.endMonth && projectData.endYear
        ? `${projectData.endMonth} ${projectData.endYear}`
        : null;

    // Validate end date is after start date
    if (startDate && endDate) {
      const startMonthIndex = months.indexOf(projectData.startMonth);
      const endMonthIndex = months.indexOf(projectData.endMonth);
      const startYear = parseInt(projectData.startYear);
      const endYear = parseInt(projectData.endYear);

      if (
        endYear < startYear ||
        (endYear === startYear && endMonthIndex < startMonthIndex)
      ) {
        alert("End date must be after start date");
        return;
      }
    }

    try {
      const projectPayload = {
        student_id: studentId,
        title: projectData.title,
        description: projectData.description,
        technologies: projectData.technologies.join(", "),
        project_link: projectData.url,
        start_date: startDate,
        end_date: endDate,
      };

      if (editingProject) {
        await axios.put(
          `${API_URL}/projects/${editingProject.id}`,
          projectPayload
        );
      } else {
        await axios.post(`${API_URL}/projects`, projectPayload);
      }

      closeModal();
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error saving project:", error);
      }
      alert("Error saving project. Please try again.");
    }
  };

  const handleEditProject = (project) => {
    const [startMonth, startYear] = project.start_date
      ? project.start_date.split(" ")
      : ["", ""];
    const [endMonth, endYear] = project.end_date
      ? project.end_date.split(" ")
      : ["", ""];

    setEditingProject(project);
    setProjectData({
      title: project.title || "",
      description: project.description || "",
      startMonth,
      startYear,
      endMonth,
      endYear,
      url: project.project_link || "",
      technologies: project.technologies
        ? project.technologies.split(",").map((t) => t.trim())
        : [],
      customFields: project.customFields || [],
    });
    setShowProjectModal(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await fetch(`${API_URL}/projects/${projectId}`, { method: "DELETE" });

      fetchProjects();
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Error deleting project:", error);
      }
      alert("Error deleting project. Please try again.");
    }
  };

  const closeModal = () => {
    setShowProjectModal(false);
    setEditingProject(null);
    setProjectData({
      title: "",
      description: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
      url: "",
      technologies: [],
      customFields: [],
    });
    fetchProjects();
  };

  return (
    <>
      <div className="bg-white rounded-lg mb-6">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
          {isOwner && (
            <button
              onClick={() => setShowProjectModal(true)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              title="Add project"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6">
          {projects.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No projects added yet</p>
              {isOwner && (
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first project
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {project.title}
                    </h3>
                    <div className="flex gap-2">
                      {(project.project_link || project.url) && (
                        <a
                          href={project.project_link || project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="View project"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {isOwner && (
                        <>
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Edit project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete project"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-2">{project.description}</p>
                  <p className="text-sm text-gray-500">
                    {project.start_date && project.end_date
                      ? `${project.start_date} - ${project.end_date}`
                      : project.start_date || "Date not available"}
                  </p>

                  {project.technologies && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        Technologies:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(typeof project.technologies === "string"
                          ? project.technologies.split(",").map((t) => t.trim())
                          : project.technologies || []
                        ).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Project Modal */}
      {showProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProject ? "Edit Project" : "Add Project"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={projectData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. E-commerce Website"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={projectData.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      handleInputChange(e);
                    }
                  }}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  placeholder="Describe your project..."
                  required
                />
                {projectData?.description?.length || 0}/300
              </div>

              {/* Project URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project URL
                </label>
                <input
                  type="url"
                  name="url"
                  value={projectData.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://github.com/username/project"
                />
              </div>

              {/* Start and End Date */}
              <div className="grid grid-cols-2 gap-4">
                {/* ======= START DATE ======= */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="startMonth"
                      value={projectData.startMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>

                    <select
                      name="startYear"
                      value={projectData.startYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ======= END DATE ======= */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date (or expected)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      name="endMonth"
                      value={projectData.endMonth}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="endYear"
                      value={projectData.endYear}
                      onChange={handleInputChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technologies Used
                </label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a technology and press Enter"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleTechnologyAdd(e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        const input = e.target
                          .closest("div")
                          .querySelector("input");
                        handleTechnologyAdd(input.value);
                        input.value = "";
                      }}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {projectData.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {projectData.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center gap-2"
                        >
                          {tech}
                          <button
                            type="button"
                            onClick={() => handleTechnologyRemove(tech)}
                            className="text-green-500 hover:text-green-700"
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
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteProject(editingProject.id);
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
                  {editingProject ? "Update Project" : "Add Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsSection;
