import React, { useState } from "react";
import {
  Plus,
  Edit2,
  X,
  Save,
  Calendar,
  MapPin,
  Building,
  User,
  Clock,
  DollarSign,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const InternshipTrainingRequests = ({ isOwner, industryData }) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Internship",
      title: "Software Development Internship",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      duration: "3 months",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      stipend: "$2,500/month",
      description:
        "Looking for a software development internship focusing on full-stack web development with modern technologies.",
      requiredSkills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
      preferredSkills: ["AWS", "Docker", "GraphQL"],
      student: {
        name: "Alex Johnson",
        email: "alex.johnson@university.edu",
        university: "Stanford University",
        major: "Computer Science",
        year: "Junior",
        gpa: "3.8",
      },
      status: "Pending",
      priority: "High",
      applicationDate: "2024-01-15",
      category: "Software Development",
      workMode: "Hybrid",
      hoursPerWeek: 40,
      mentorshipRequired: true,
      portfolioLinks: ["https://github.com/alexj", "https://alexjohnson.dev"],
      additionalRequirements: "Must be authorized to work in the US",
      responses: [
        {
          company: "TechCorp Solutions",
          status: "Interview Scheduled",
          date: "2024-01-20",
          message: "We're interested! Interview scheduled for next week.",
        },
      ],
    },
    {
      id: 2,
      type: "Training",
      title: "AI/ML Training Program",
      company: "DataScience Institute",
      location: "Remote",
      duration: "6 weeks",
      startDate: "2024-03-01",
      endDate: "2024-04-12",
      stipend: "Free (Scholarship Available)",
      description:
        "Seeking admission to an intensive AI/ML training program to enhance skills in machine learning and data science.",
      requiredSkills: ["Python", "Statistics", "Mathematics"],
      preferredSkills: ["TensorFlow", "PyTorch", "R"],
      student: {
        name: "Maria Garcia",
        email: "maria.garcia@university.edu",
        university: "MIT",
        major: "Data Science",
        year: "Senior",
        gpa: "3.9",
      },
      status: "Approved",
      priority: "Medium",
      applicationDate: "2024-01-10",
      category: "Data Science",
      workMode: "Remote",
      hoursPerWeek: 20,
      mentorshipRequired: true,
      portfolioLinks: [
        "https://github.com/mariag",
        "https://kaggle.com/mariag",
      ],
      additionalRequirements:
        "Background in mathematics or statistics required",
      responses: [
        {
          company: "DataScience Institute",
          status: "Accepted",
          date: "2024-01-25",
          message: "Congratulations! You've been accepted into our program.",
        },
      ],
    },
    {
      id: 3,
      type: "Mentorship",
      title: "Cybersecurity Mentorship",
      company: "SecureNet Corp",
      location: "Boston, MA",
      duration: "6 months",
      startDate: "2024-02-01",
      endDate: "2024-07-31",
      stipend: "Volunteer",
      description:
        "Looking for a cybersecurity mentor to guide career development and provide hands-on experience in the field.",
      requiredSkills: ["Networking", "Security Fundamentals"],
      preferredSkills: ["Penetration Testing", "CISSP", "CEH"],
      student: {
        name: "David Kim",
        email: "david.kim@university.edu",
        university: "Carnegie Mellon",
        major: "Cybersecurity",
        year: "Sophomore",
        gpa: "3.7",
      },
      status: "In Progress",
      priority: "High",
      applicationDate: "2024-01-05",
      category: "Cybersecurity",
      workMode: "In-person",
      hoursPerWeek: 10,
      mentorshipRequired: true,
      portfolioLinks: ["https://github.com/davidk"],
      additionalRequirements: "Security clearance preferred but not required",
      responses: [
        {
          company: "SecureNet Corp",
          status: "Matched",
          date: "2024-01-30",
          message:
            "We've matched you with Senior Security Analyst John Smith as your mentor.",
        },
      ],
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);

  const [newRequest, setNewRequest] = useState({
    type: "Internship",
    title: "",
    company: "",
    location: "",
    duration: "",
    startDate: "",
    endDate: "",
    stipend: "",
    description: "",
    requiredSkills: [],
    preferredSkills: [],
    student: {
      name: "",
      email: "",
      university: "",
      major: "",
      year: "",
      gpa: "",
    },
    priority: "Medium",
    category: "",
    workMode: "Hybrid",
    hoursPerWeek: 40,
    mentorshipRequired: false,
    portfolioLinks: [],
    additionalRequirements: "",
  });

  const handleAddRequest = () => {
    const id = Math.max(...requests.map((r) => r.id)) + 1;
    const requestToAdd = {
      ...newRequest,
      id,
      status: "Pending",
      applicationDate: new Date().toISOString().split("T")[0],
      requiredSkills: newRequest.requiredSkills.filter((skill) => skill.trim()),
      preferredSkills: newRequest.preferredSkills.filter((skill) =>
        skill.trim()
      ),
      portfolioLinks: newRequest.portfolioLinks.filter((link) => link.trim()),
      responses: [],
    };
    setRequests([...requests, requestToAdd]);

    // Reset form
    setNewRequest({
      type: "Internship",
      title: "",
      company: "",
      location: "",
      duration: "",
      startDate: "",
      endDate: "",
      stipend: "",
      description: "",
      requiredSkills: [],
      preferredSkills: [],
      student: {
        name: "",
        email: "",
        university: "",
        major: "",
        year: "",
        gpa: "",
      },
      priority: "Medium",
      category: "",
      workMode: "Hybrid",
      hoursPerWeek: 40,
      mentorshipRequired: false,
      portfolioLinks: [],
      additionalRequirements: "",
    });
    setShowAddForm(false);
  };

  const handleEdit = (request) => {
    setEditingRequest({ ...request });
  };

  const handleSave = (updatedRequest) => {
    setRequests(
      requests.map((request) =>
        request.id === updatedRequest.id ? updatedRequest : request
      )
    );
    setEditingRequest(null);
  };

  const handleCancel = () => {
    setEditingRequest(null);
    setShowAddForm(false);
  };

  const updateArrayField = (request, setRequest, field, index, value) => {
    const newArray = [...request[field]];
    newArray[index] = value;
    setRequest({ ...request, [field]: newArray });
  };

  const addArrayField = (request, setRequest, field, value = "") => {
    setRequest({ ...request, [field]: [...request[field], value] });
  };

  const removeArrayField = (request, setRequest, field, index) => {
    const newArray = request[field].filter((_, i) => i !== index);
    setRequest({ ...request, [field]: newArray });
  };

  const updateStudentField = (request, setRequest, field, value) => {
    setRequest({ ...request, student: { ...request.student, [field]: value } });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
      case "Accepted":
      case "Matched":
        return <CheckCircle className="text-green-500" size={16} />;
      case "In Progress":
        return <Clock className="text-blue-500" size={16} />;
      case "Pending":
        return <AlertCircle className="text-yellow-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const renderRequestForm = (
    request,
    onSave,
    onCancel,
    isNewRequest = false
  ) => (
    <div className="bg-white p-6 border rounded-lg mb-6 max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">
        {isNewRequest ? "Submit New Request" : "Edit Request"}
      </h3>

      {/* Basic Information */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Request Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Request Type
            </label>
            <select
              value={request.type}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, type: e.target.value })
                  : setEditingRequest({ ...request, type: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Internship">Internship</option>
              <option value="Training">Training Program</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Workshop">Workshop</option>
              <option value="Project Collaboration">
                Project Collaboration
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              value={request.priority}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, priority: e.target.value })
                  : setEditingRequest({ ...request, priority: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={request.title}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, title: e.target.value })
                  : setEditingRequest({ ...request, title: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter request title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Company/Organization
            </label>
            <input
              type="text"
              value={request.company}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, company: e.target.value })
                  : setEditingRequest({ ...request, company: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Target company or organization"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              value={request.location}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, location: e.target.value })
                  : setEditingRequest({ ...request, location: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Location or Remote"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration</label>
            <input
              type="text"
              value={request.duration}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, duration: e.target.value })
                  : setEditingRequest({ ...request, duration: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 3 months, 6 weeks"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={request.category}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, category: e.target.value })
                  : setEditingRequest({ ...request, category: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Software Development">Software Development</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="DevOps">DevOps</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="Product Management">Product Management</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={request.startDate}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, startDate: e.target.value })
                  : setEditingRequest({ ...request, startDate: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={request.endDate}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, endDate: e.target.value })
                  : setEditingRequest({ ...request, endDate: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Work Mode</label>
            <select
              value={request.workMode}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, workMode: e.target.value })
                  : setEditingRequest({ ...request, workMode: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="Remote">Remote</option>
              <option value="In-person">In-person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Hours per Week
            </label>
            <input
              type="number"
              value={request.hoursPerWeek}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({
                      ...request,
                      hoursPerWeek: parseInt(e.target.value),
                    })
                  : setEditingRequest({
                      ...request,
                      hoursPerWeek: parseInt(e.target.value),
                    })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              min="1"
              max="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Expected Stipend
            </label>
            <input
              type="text"
              value={request.stipend}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({ ...request, stipend: e.target.value })
                  : setEditingRequest({ ...request, stipend: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $2000/month, Unpaid, TBD"
            />
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Student Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={request.student.name}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "name",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={request.student.email}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "email",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@university.edu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">University</label>
            <input
              type="text"
              value={request.student.university}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "university",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="University name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Major</label>
            <input
              type="text"
              value={request.student.major}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "major",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Your major"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Academic Year
            </label>
            <select
              value={request.student.year}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "year",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Graduate">Graduate</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GPA</label>
            <input
              type="text"
              value={request.student.gpa}
              onChange={(e) =>
                updateStudentField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "gpa",
                  e.target.value
                )
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 3.8"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={request.description}
          onChange={(e) =>
            isNewRequest
              ? setNewRequest({ ...request, description: e.target.value })
              : setEditingRequest({ ...request, description: e.target.value })
          }
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows="3"
          placeholder="Describe your request and what you're looking for"
        />
      </div>

      {/* Required Skills */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Required Skills</h4>
        {request.requiredSkills.map((skill, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={skill}
              onChange={(e) =>
                updateArrayField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "requiredSkills",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Required skill"
            />
            <button
              onClick={() =>
                removeArrayField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "requiredSkills",
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
              request,
              isNewRequest ? setNewRequest : setEditingRequest,
              "requiredSkills"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Required Skill
        </button>
      </div>

      {/* Portfolio Links */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Portfolio Links</h4>
        {request.portfolioLinks.map((link, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              value={link}
              onChange={(e) =>
                updateArrayField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "portfolioLinks",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="https://..."
            />
            <button
              onClick={() =>
                removeArrayField(
                  request,
                  isNewRequest ? setNewRequest : setEditingRequest,
                  "portfolioLinks",
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
              request,
              isNewRequest ? setNewRequest : setEditingRequest,
              "portfolioLinks"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Portfolio Link
        </button>
      </div>

      {/* Additional Options */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Additional Options</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={request.mentorshipRequired}
              onChange={(e) =>
                isNewRequest
                  ? setNewRequest({
                      ...request,
                      mentorshipRequired: e.target.checked,
                    })
                  : setEditingRequest({
                      ...request,
                      mentorshipRequired: e.target.checked,
                    })
              }
              className="mr-2"
            />
            Mentorship Required
          </label>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Additional Requirements
          </label>
          <textarea
            value={request.additionalRequirements}
            onChange={(e) =>
              isNewRequest
                ? setNewRequest({
                    ...request,
                    additionalRequirements: e.target.value,
                  })
                : setEditingRequest({
                    ...request,
                    additionalRequirements: e.target.value,
                  })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="2"
            placeholder="Any additional requirements or notes"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => (isNewRequest ? handleAddRequest() : onSave(request))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={16} />
          {isNewRequest ? "Submit Request" : "Save Changes"}
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
            Internship & Training Requests
          </h2>
          <p className="text-gray-600 mt-2">
            Request internships, training opportunities, or mentorship from
            industry professionals.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Submit New Request
        </button>
      </div>

      {showAddForm &&
        renderRequestForm(newRequest, handleAddRequest, handleCancel, true)}

      <div className="space-y-6">
        {requests.map((request) => (
          <div key={request.id}>
            {editingRequest && editingRequest.id === request.id ? (
              renderRequestForm(editingRequest, handleSave, handleCancel)
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {request.title}
                        </h3>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              request.status === "Approved" ||
                              request.status === "Accepted" ||
                              request.status === "Matched"
                                ? "bg-green-100 text-green-800"
                                : request.status === "In Progress"
                                ? "bg-blue-100 text-blue-800"
                                : request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            request.priority === "High" ||
                            request.priority === "Urgent"
                              ? "bg-red-100 text-red-800"
                              : request.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {request.priority} Priority
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <User size={16} />
                          {request.student.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building size={16} />
                          {request.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={16} />
                          {request.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {request.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {request.type}
                        </span>
                        <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                          {request.category}
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          {request.workMode}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(request)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{request.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Student Details
                      </h4>
                      <div className="text-sm space-y-1">
                        <p>
                          <span className="font-medium">University:</span>{" "}
                          {request.student.university}
                        </p>
                        <p>
                          <span className="font-medium">Major:</span>{" "}
                          {request.student.major}
                        </p>
                        <p>
                          <span className="font-medium">Year:</span>{" "}
                          {request.student.year}
                        </p>
                        <p>
                          <span className="font-medium">GPA:</span>{" "}
                          {request.student.gpa}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span>{" "}
                          {request.student.email}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Required Skills
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {request.requiredSkills
                          .slice(0, 6)
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        {request.requiredSkills.length > 6 && (
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            +{request.requiredSkills.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Request Info
                      </h4>
                      <div className="text-sm space-y-1">
                        <p className="flex items-center gap-1">
                          <Calendar size={14} />
                          {request.startDate} to {request.endDate}
                        </p>
                        <p className="flex items-center gap-1">
                          <Clock size={14} />
                          {request.hoursPerWeek} hours/week
                        </p>
                        <p className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {request.stipend}
                        </p>
                        <p>
                          <span className="font-medium">Applied:</span>{" "}
                          {request.applicationDate}
                        </p>
                      </div>
                    </div>
                  </div>

                  {request.portfolioLinks &&
                    request.portfolioLinks.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Portfolio
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {request.portfolioLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm underline"
                            >
                              Portfolio Link {index + 1}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  {request.responses && request.responses.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Company Responses
                      </h4>
                      <div className="space-y-2">
                        {request.responses.map((response, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-3 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">
                                {response.company}
                              </span>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(response.status)}
                                <span className="text-xs text-gray-500">
                                  {response.date}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              {response.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {request.additionalRequirements && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">
                        Additional Requirements
                      </h4>
                      <p className="text-blue-800 text-sm">
                        {request.additionalRequirements}
                      </p>
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

export default InternshipTrainingRequests;
