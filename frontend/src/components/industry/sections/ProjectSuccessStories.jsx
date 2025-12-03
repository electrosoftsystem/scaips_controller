import React, { useState } from "react";
import {
  Edit2,
  Plus,
  X,
  Save,
  Star,
  Calendar,
  Users,
  Trophy,
  Target,
  TrendingUp,
} from "lucide-react";

const ProjectSuccessStories = ({ isOwner, industryData }) => {
  const [stories, setStories] = useState([
    {
      id: 1,
      title: "Smart Energy Management System",
      projectType: "Student-Industry Collaboration",
      student: "Sarah Johnson",
      university: "MIT",
      industry: "GreenTech Solutions",
      mentor: "Dr. Michael Chen",
      duration: "8 months",
      completionDate: "2024-01-15",
      category: "Renewable Energy",
      description:
        "Developed an AI-powered energy management system that reduced energy consumption by 35% in commercial buildings.",
      keyFeatures: [
        "Real-time monitoring",
        "Predictive analytics",
        "Mobile app integration",
        "Cost optimization",
      ],
      technologies: ["Python", "TensorFlow", "IoT", "React Native"],
      impact: {
        energySaved: "35%",
        costReduction: "$50,000/year",
        carbonFootprint: "40% reduction",
      },
      awards: ["Best Innovation Award 2024", "Sustainability Excellence"],
      rating: 4.9,
      testimonial:
        "This project exceeded all expectations and is now being implemented across multiple facilities.",
      images: ["project1-1.jpg", "project1-2.jpg"],
      status: "Implemented",
    },
    {
      id: 2,
      title: "Healthcare Data Analytics Platform",
      projectType: "Industry Project",
      student: "Alex Rodriguez",
      university: "Stanford University",
      industry: "MedTech Innovations",
      mentor: "Dr. Lisa Wang",
      duration: "6 months",
      completionDate: "2023-11-20",
      category: "Healthcare Technology",
      description:
        "Created a comprehensive data analytics platform for healthcare providers to improve patient outcomes through predictive modeling.",
      keyFeatures: [
        "Patient risk assessment",
        "Treatment optimization",
        "Real-time dashboards",
        "Integration with EHR systems",
      ],
      technologies: [
        "Python",
        "Machine Learning",
        "PostgreSQL",
        "React",
        "Docker",
      ],
      impact: {
        patientOutcomes: "25% improvement",
        costSavings: "$200,000/year",
        efficiency: "30% faster diagnosis",
      },
      awards: ["Healthcare Innovation Award"],
      rating: 4.8,
      testimonial:
        "Revolutionary platform that's transforming how we analyze patient data and make treatment decisions.",
      images: ["project2-1.jpg", "project2-2.jpg"],
      status: "In Production",
    },
    {
      id: 3,
      title: "Automated Supply Chain Optimizer",
      projectType: "University Research Project",
      student: "Emma Thompson",
      university: "Carnegie Mellon",
      industry: "LogiCore Systems",
      mentor: "Prof. David Kim",
      duration: "10 months",
      completionDate: "2024-03-10",
      category: "Supply Chain Management",
      description:
        "Developed an AI-driven supply chain optimization system that reduces costs and improves delivery times using machine learning algorithms.",
      keyFeatures: [
        "Demand forecasting",
        "Route optimization",
        "Inventory management",
        "Supplier analytics",
      ],
      technologies: [
        "Python",
        "Scikit-learn",
        "Apache Kafka",
        "MongoDB",
        "Vue.js",
      ],
      impact: {
        costReduction: "20%",
        deliveryTime: "15% faster",
        inventoryOptimization: "30% reduction",
      },
      awards: ["Supply Chain Excellence Award"],
      rating: 4.7,
      testimonial:
        "This system has revolutionized our supply chain operations and set new industry standards.",
      images: ["project3-1.jpg"],
      status: "Pilot Phase",
    },
  ]);

  const [editingStory, setEditingStory] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStory, setNewStory] = useState({
    title: "",
    projectType: "",
    student: "",
    university: "",
    industry: "",
    mentor: "",
    duration: "",
    completionDate: "",
    category: "",
    description: "",
    keyFeatures: [],
    technologies: [],
    impact: {
      energySaved: "",
      costReduction: "",
      carbonFootprint: "",
    },
    awards: [],
    rating: 5,
    testimonial: "",
    images: [],
    status: "Planning",
  });

  const handleEdit = (story) => {
    setEditingStory({ ...story });
  };

  const handleSave = (updatedStory) => {
    setStories(
      stories.map((story) =>
        story.id === updatedStory.id ? updatedStory : story
      )
    );
    setEditingStory(null);
  };

  const handleCancel = () => {
    setEditingStory(null);
  };

  const handleAddNew = () => {
    const id = Math.max(...stories.map((s) => s.id)) + 1;
    const storyToAdd = {
      ...newStory,
      id,
      keyFeatures: newStory.keyFeatures.filter((f) => f.trim()),
      technologies: newStory.technologies.filter((t) => t.trim()),
      awards: newStory.awards.filter((a) => a.trim()),
    };
    setStories([...stories, storyToAdd]);
    setNewStory({
      title: "",
      projectType: "",
      student: "",
      university: "",
      industry: "",
      mentor: "",
      duration: "",
      completionDate: "",
      category: "",
      description: "",
      keyFeatures: [],
      technologies: [],
      impact: {
        energySaved: "",
        costReduction: "",
        carbonFootprint: "",
      },
      awards: [],
      rating: 5,
      testimonial: "",
      images: [],
      status: "Planning",
    });
    setShowAddForm(false);
  };

  const updateArrayField = (story, setStory, field, index, value) => {
    const newArray = [...story[field]];
    newArray[index] = value;
    setStory({ ...story, [field]: newArray });
  };

  const addArrayField = (story, setStory, field, value = "") => {
    setStory({ ...story, [field]: [...story[field], value] });
  };

  const removeArrayField = (story, setStory, field, index) => {
    const newArray = story[field].filter((_, i) => i !== index);
    setStory({ ...story, [field]: newArray });
  };

  const renderEditForm = (story, onSave, onCancel, isNewStory = false) => (
    <div className="bg-white p-6 border rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-4">
        {isNewStory ? "Add New Success Story" : "Edit Success Story"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Project Title
          </label>
          <input
            type="text"
            value={story.title}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, title: e.target.value })
                : setEditingStory({ ...story, title: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Project Type</label>
          <select
            value={story.projectType}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, projectType: e.target.value })
                : setEditingStory({ ...story, projectType: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Type</option>
            <option value="Student-Industry Collaboration">
              Student-Industry Collaboration
            </option>
            <option value="Industry Project">Industry Project</option>
            <option value="University Research Project">
              University Research Project
            </option>
            <option value="Startup Project">Startup Project</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Student Name</label>
          <input
            type="text"
            value={story.student}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, student: e.target.value })
                : setEditingStory({ ...story, student: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">University</label>
          <input
            type="text"
            value={story.university}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, university: e.target.value })
                : setEditingStory({ ...story, university: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Industry Partner
          </label>
          <input
            type="text"
            value={story.industry}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, industry: e.target.value })
                : setEditingStory({ ...story, industry: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mentor</label>
          <input
            type="text"
            value={story.mentor}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, mentor: e.target.value })
                : setEditingStory({ ...story, mentor: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration</label>
          <input
            type="text"
            value={story.duration}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, duration: e.target.value })
                : setEditingStory({ ...story, duration: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 6 months"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Completion Date
          </label>
          <input
            type="date"
            value={story.completionDate}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, completionDate: e.target.value })
                : setEditingStory({ ...story, completionDate: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            value={story.category}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, category: e.target.value })
                : setEditingStory({ ...story, category: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={story.status}
            onChange={(e) =>
              isNewStory
                ? setNewStory({ ...story, status: e.target.value })
                : setEditingStory({ ...story, status: e.target.value })
            }
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="Planning">Planning</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Pilot Phase">Pilot Phase</option>
            <option value="In Production">In Production</option>
            <option value="Implemented">Implemented</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={story.description}
          onChange={(e) =>
            isNewStory
              ? setNewStory({ ...story, description: e.target.value })
              : setEditingStory({ ...story, description: e.target.value })
          }
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Key Features</label>
        {story.keyFeatures.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) =>
                updateArrayField(
                  story,
                  isNewStory ? setNewStory : setEditingStory,
                  "keyFeatures",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() =>
                removeArrayField(
                  story,
                  isNewStory ? setNewStory : setEditingStory,
                  "keyFeatures",
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
              story,
              isNewStory ? setNewStory : setEditingStory,
              "keyFeatures"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Feature
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Technologies</label>
        {story.technologies.map((tech, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tech}
              onChange={(e) =>
                updateArrayField(
                  story,
                  isNewStory ? setNewStory : setEditingStory,
                  "technologies",
                  index,
                  e.target.value
                )
              }
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() =>
                removeArrayField(
                  story,
                  isNewStory ? setNewStory : setEditingStory,
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
              story,
              isNewStory ? setNewStory : setEditingStory,
              "technologies"
            )
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Technology
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Testimonial</label>
        <textarea
          value={story.testimonial}
          onChange={(e) =>
            isNewStory
              ? setNewStory({ ...story, testimonial: e.target.value })
              : setEditingStory({ ...story, testimonial: e.target.value })
          }
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows="2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          step="0.1"
          value={story.rating}
          onChange={(e) =>
            isNewStory
              ? setNewStory({ ...story, rating: parseFloat(e.target.value) })
              : setEditingStory({
                  ...story,
                  rating: parseFloat(e.target.value),
                })
          }
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => (isNewStory ? handleAddNew() : onSave(story))}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
        >
          <Save size={16} />
          {isNewStory ? "Add Story" : "Save Changes"}
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
            Project Success Stories
          </h2>
          <p className="text-gray-600 mt-2">
            Explore inspiring stories of successful projects completed by
            students, professionals, and industry leaders.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Story
        </button>
      </div>

      {showAddForm &&
        renderEditForm(
          newStory,
          handleAddNew,
          () => setShowAddForm(false),
          true
        )}

      <div className="space-y-6">
        {stories.map((story) => (
          <div key={story.id}>
            {editingStory && editingStory.id === story.id ? (
              renderEditForm(editingStory, handleSave, handleCancel)
            ) : (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {story.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            story.status === "Implemented"
                              ? "bg-green-100 text-green-800"
                              : story.status === "In Production"
                              ? "bg-blue-100 text-blue-800"
                              : story.status === "Pilot Phase"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {story.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Users size={16} />
                          {story.student} • {story.university}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={16} />
                          {story.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={16} />
                          {story.rating}/5
                        </span>
                      </div>
                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                          {story.projectType}
                        </span>
                        <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                          {story.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEdit(story)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={18} />
                    </button>
                  </div>

                  <p className="text-gray-700 mb-4">{story.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Target size={16} />
                        Key Features
                      </h4>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {story.keyFeatures.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {story.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {Object.keys(story.impact).length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Project Impact
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(story.impact).map(
                          ([key, value]) =>
                            value && (
                              <div
                                key={key}
                                className="bg-green-50 p-3 rounded-lg"
                              >
                                <div className="text-lg font-bold text-green-800">
                                  {value}
                                </div>
                                <div className="text-sm text-green-600 capitalize">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}

                  {story.awards && story.awards.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Trophy size={16} />
                        Awards & Recognition
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {story.awards.map((award, index) => (
                          <span
                            key={index}
                            className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {award}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {story.testimonial && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <blockquote className="text-gray-700 italic">
                        "{story.testimonial}"
                      </blockquote>
                      <cite className="text-sm text-gray-500 mt-2 block">
                        — {story.mentor}, {story.industry}
                      </cite>
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

export default ProjectSuccessStories;
