import React, { useState } from "react";
import {
  Edit3,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Building,
  Calendar,
  Phone,
} from "lucide-react";

const StudentLogin = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@university.edu",
      university: "IIT Delhi",
      course: "Computer Science Engineering",
      year: "3rd Year",
      phone: "+91 9876543210",
      skills: ["React", "Python", "Machine Learning"],
      registeredDate: "2024-01-15",
      projectsSubmitted: 5,
      applicationsSubmitted: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      email: "rahul.kumar@college.edu",
      university: "NIT Trichy",
      course: "Mechanical Engineering",
      year: "4th Year",
      phone: "+91 8765432109",
      skills: ["AutoCAD", "SolidWorks", "3D Printing"],
      registeredDate: "2024-01-10",
      projectsSubmitted: 3,
      applicationsSubmitted: 8,
      status: "Active",
    },
  ]);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    university: "",
    course: "",
    year: "",
    phone: "",
    skills: "",
  });

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    university: "",
    course: "",
    year: "",
    phone: "",
    skills: "",
  });

  const handleEdit = (student) => {
    setEditingId(student.id);
    setEditData({
      name: student.name,
      email: student.email,
      university: student.university,
      course: student.course,
      year: student.year,
      phone: student.phone,
      skills: student.skills.join(", "),
    });
  };

  const handleSave = () => {
    setStudents(
      students.map((student) =>
        student.id === editingId
          ? {
              ...student,
              name: editData.name,
              email: editData.email,
              university: editData.university,
              course: editData.course,
              year: editData.year,
              phone: editData.phone,
              skills: editData.skills.split(",").map((skill) => skill.trim()),
            }
          : student
      )
    );
    setEditingId(null);
    setEditData({
      name: "",
      email: "",
      university: "",
      course: "",
      year: "",
      phone: "",
      skills: "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      name: "",
      email: "",
      university: "",
      course: "",
      year: "",
      phone: "",
      skills: "",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Portal</h2>
          <p className="text-gray-600 mt-1">
            Login to apply for opportunities and submit innovative ideas
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login/Registration Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("login")}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "login"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Student Login
              </button>
              <button
                onClick={() => setActiveTab("register")}
                className={`flex-1 py-3 px-4 text-center font-medium ${
                  activeTab === "register"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "login" ? (
              // Login Form
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      placeholder="Enter your university email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </button>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Login to Portal
                </button>
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      onClick={() => setActiveTab("register")}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              // Registration Form
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={registrationForm.name}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={registrationForm.email}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="university email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University
                    </label>
                    <input
                      type="text"
                      value={registrationForm.university}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          university: e.target.value,
                        })
                      }
                      placeholder="University name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Course
                    </label>
                    <input
                      type="text"
                      value={registrationForm.course}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          course: e.target.value,
                        })
                      }
                      placeholder="e.g., Computer Science"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <select
                      value={registrationForm.year}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          year: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Year</option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="Masters">Masters</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={registrationForm.phone}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 9876543210"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={registrationForm.skills}
                    onChange={(e) =>
                      setRegistrationForm({
                        ...registrationForm,
                        skills: e.target.value,
                      })
                    }
                    placeholder="React, Python, Machine Learning"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={registrationForm.password}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          password: e.target.value,
                        })
                      }
                      placeholder="Create password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={registrationForm.confirmPassword}
                      onChange={(e) =>
                        setRegistrationForm({
                          ...registrationForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Registered Students Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Registered Students
            </h3>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className="border border-gray-200 rounded-lg p-4"
              >
                {editingId === student.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        placeholder="Name"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) =>
                          setEditData({ ...editData, email: e.target.value })
                        }
                        placeholder="Email"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editData.university}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            university: e.target.value,
                          })
                        }
                        placeholder="University"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        value={editData.course}
                        onChange={(e) =>
                          setEditData({ ...editData, course: e.target.value })
                        }
                        placeholder="Course"
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="text"
                      value={editData.skills}
                      onChange={(e) =>
                        setEditData({ ...editData, skills: e.target.value })
                      }
                      placeholder="Skills (comma separated)"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {student.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {student.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>{student.university}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Building className="w-3 h-3" />
                        <span>{student.course}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{student.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>{student.phone}</span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {student.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-1 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{student.projectsSubmitted} projects</span>
                      <span>{student.applicationsSubmitted} applications</span>
                      <span className="text-green-600">{student.status}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
          <User className="w-6 h-6 mx-auto mb-2 text-blue-200" />
          <p className="text-2xl font-bold">{students.length}</p>
          <p className="text-blue-100 text-sm">Registered Students</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
          <GraduationCap className="w-6 h-6 mx-auto mb-2 text-green-200" />
          <p className="text-2xl font-bold">
            {students.reduce((sum, s) => sum + s.projectsSubmitted, 0)}
          </p>
          <p className="text-green-100 text-sm">Projects Submitted</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
          <Building className="w-6 h-6 mx-auto mb-2 text-purple-200" />
          <p className="text-2xl font-bold">
            {students.reduce((sum, s) => sum + s.applicationsSubmitted, 0)}
          </p>
          <p className="text-purple-100 text-sm">Applications</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg text-center">
          <Calendar className="w-6 h-6 mx-auto mb-2 text-orange-200" />
          <p className="text-2xl font-bold">
            {students.filter((s) => s.status === "Active").length}
          </p>
          <p className="text-orange-100 text-sm">Active Students</p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
