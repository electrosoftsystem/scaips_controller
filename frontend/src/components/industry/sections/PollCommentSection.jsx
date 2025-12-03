import React, { useState } from "react";
import {
  Edit3,
  BarChart3,
  MessageCircle,
  Users,
  Clock,
  Plus,
  ThumbsUp,
  ThumbsDown,
  X,
} from "lucide-react";

const PollCommentSection = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [polls, setPolls] = useState([
    {
      id: 1,
      question:
        "What's the biggest challenge facing the tech industry in 2024?",
      type: "multiple",
      options: [
        { id: 1, text: "AI Ethics & Regulation", votes: 145, percentage: 35 },
        { id: 2, text: "Talent Shortage", votes: 89, percentage: 22 },
        { id: 3, text: "Cybersecurity Threats", votes: 98, percentage: 24 },
        { id: 4, text: "Economic Uncertainty", votes: 78, percentage: 19 },
      ],
      totalVotes: 410,
      createdBy: "Industry Research Team",
      createdDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "Active",
      allowComments: true,
      category: "Technology",
    },
    {
      id: 2,
      question:
        "Should companies prioritize remote work or office-first policies?",
      type: "binary",
      options: [
        { id: 1, text: "Remote Work Priority", votes: 234, percentage: 67 },
        { id: 2, text: "Office-First Priority", votes: 115, percentage: 33 },
      ],
      totalVotes: 349,
      createdBy: "HR Leaders Group",
      createdDate: "2024-01-12",
      endDate: "2024-01-31",
      status: "Active",
      allowComments: true,
      category: "Workplace",
    },
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      pollId: 1,
      author: "Sarah Tech Lead",
      content:
        "AI regulation is definitely crucial. We need clear guidelines to ensure responsible development while not stifling innovation.",
      timestamp: "2024-01-16 14:30",
      likes: 12,
      dislikes: 2,
      replies: [],
    },
    {
      id: 2,
      pollId: 1,
      author: "Mike Developer",
      content:
        "Talent shortage is real! We're struggling to find qualified engineers despite competitive offers.",
      timestamp: "2024-01-16 15:45",
      likes: 8,
      dislikes: 1,
      replies: [],
    },
  ]);

  const [editData, setEditData] = useState({
    question: "",
    type: "multiple",
    options: "",
    endDate: "",
    category: "",
    allowComments: true,
  });

  const [addData, setAddData] = useState({
    question: "",
    type: "multiple",
    options: "",
    endDate: "",
    category: "Technology",
    allowComments: true,
  });

  const handleEdit = (poll) => {
    setEditingId(poll.id);
    setIsModalOpen(true);
    setEditData({
      question: poll.question,
      type: poll.type,
      options: poll.options.map((opt) => opt.text).join("\n"),
      endDate: poll.endDate,
      category: poll.category,
      allowComments: poll.allowComments,
    });
  };

  const handleSave = () => {
    const optionsArray = editData.options
      .split("\n")
      .filter((opt) => opt.trim())
      .map((opt, index) => ({
        id: index + 1,
        text: opt.trim(),
        votes: 0,
        percentage: 0,
      }));

    setPolls(
      polls.map((poll) =>
        poll.id === editingId
          ? {
              ...poll,
              question: editData.question,
              type: editData.type,
              options: optionsArray,
              endDate: editData.endDate,
              category: editData.category,
              allowComments: editData.allowComments,
              totalVotes: 0,
            }
          : poll
      )
    );
    setEditingId(null);
    setIsModalOpen(false);
    setEditData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "",
      allowComments: true,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsModalOpen(false);
    setEditData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "",
      allowComments: true,
    });
  };

  const handleAdd = () => {
    const newId = Math.max(...polls.map((poll) => poll.id)) + 1;
    const optionsArray = addData.options
      .split("\n")
      .filter((opt) => opt.trim())
      .map((opt, index) => ({
        id: index + 1,
        text: opt.trim(),
        votes: 0,
        percentage: 0,
      }));

    const newPoll = {
      id: newId,
      question: addData.question,
      type: addData.type,
      options: optionsArray,
      totalVotes: 0,
      createdBy: "Industry User",
      createdDate: new Date().toISOString().split("T")[0],
      endDate: addData.endDate,
      status: "Active",
      allowComments: addData.allowComments,
      category: addData.category,
    };

    setPolls([newPoll, ...polls]);
    setIsAddModalOpen(false);
    setAddData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "Technology",
      allowComments: true,
    });
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setAddData({
      question: "",
      type: "multiple",
      options: "",
      endDate: "",
      category: "Technology",
      allowComments: true,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { backgroundColor: "#B5D3E7", color: "#1F2D3D" };
      case "Ended":
        return { backgroundColor: "#DCE8F2", color: "#1F2D3D" };
      case "Draft":
        return { backgroundColor: "#B5D3E7", color: "#1F2D3D" };
      default:
        return { backgroundColor: "#DCE8F2", color: "#1F2D3D" };
    }
  };

  return (
    <div className="p-6" style={{ backgroundColor: "#F7FAFC" }}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#1F2D3D" }}>
            Polls & Community Discussion
          </h2>
          <p className="mt-1" style={{ color: "#1F2D3D" }}>
            Voice your opinion and engage with industry professionals
          </p>
        </div>
        {isOwner && <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          style={{ backgroundColor: "#6EA9CB" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#5A8FAD")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6EA9CB")}
        >
          <Plus className="w-4 h-4" />
          <span>Create Poll</span>
        </button>}
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <div
            key={poll.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            {isModalOpen && editingId === poll.id && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div
                  className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                  style={{ backgroundColor: "#F7FAFC" }}
                >
                  <div
                    className="p-6"
                    style={{ borderBottom: "1px solid #DCE8F2" }}
                  >
                    <div className="flex justify-between items-center">
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: "#1F2D3D" }}
                      >
                        Edit Poll
                      </h2>
                      <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-opacity-10 rounded-full transition-colors"
                        style={{ backgroundColor: "transparent" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#DCE8F2")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Poll Question */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Poll Question
                      </label>
                      <input
                        type="text"
                        value={editData.question}
                        onChange={(e) =>
                          setEditData({ ...editData, question: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                        style={{
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #DCE8F2",
                          color: "#1F2D3D",
                          focusRingColor: "#6EA9CB",
                        }}
                        placeholder="Enter your question"
                      />
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          Poll Type
                        </label>
                        <select
                          value={editData.type}
                          onChange={(e) =>
                            setEditData({ ...editData, type: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        >
                          <option value="multiple">Multiple Choice</option>
                          <option value="binary">Yes/No</option>
                          <option value="rating">Rating Scale</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          Category
                        </label>
                        <select
                          value={editData.category}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        >
                          <option value="Technology">Technology</option>
                          <option value="Workplace">Workplace</option>
                          <option value="Industry">Industry</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          value={editData.endDate}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              endDate: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        />
                      </div>
                    </div>

                    {/* Poll Options */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Poll Options (one per line)
                      </label>
                      <textarea
                        value={editData.options}
                        onChange={(e) =>
                          setEditData({ ...editData, options: e.target.value })
                        }
                        rows={4}
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                        style={{
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #DCE8F2",
                          color: "#1F2D3D",
                          focusRingColor: "#6EA9CB",
                        }}
                      />
                    </div>

                    {/* Allow Comments */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="allowComments"
                        checked={editData.allowComments}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            allowComments: e.target.checked,
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500"
                        style={{
                          border: "1px solid #DCE8F2",
                          backgroundColor: "#F7FAFC",
                        }}
                      />
                      <label
                        htmlFor="allowComments"
                        className="text-sm font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        Allow comments on this poll
                      </label>
                    </div>
                  </div>

                  <div
                    className="px-6 py-4 flex justify-end gap-3"
                    style={{
                      backgroundColor: "#DCE8F2",
                      borderTop: "1px solid #B5D3E7",
                    }}
                  >
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                      style={{
                        color: "#1F2D3D",
                        backgroundColor: "#F7FAFC",
                        border: "1px solid #DCE8F2",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#DCE8F2")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#F7FAFC")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                      style={{ backgroundColor: "#6EA9CB" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#5A8EAF")
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

            {/* Add Modal */}
            {isAddModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div
                  className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                  style={{ backgroundColor: "#F7FAFC" }}
                >
                  <div
                    className="p-6"
                    style={{ borderBottom: "1px solid #DCE8F2" }}
                  >
                    <div className="flex justify-between items-center">
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: "#1F2D3D" }}
                      >
                        Create New Poll
                      </h2>
                      <button
                        onClick={handleAddCancel}
                        className="p-2 hover:bg-opacity-10 rounded-full transition-colors"
                        style={{ backgroundColor: "transparent" }}
                        onMouseEnter={(e) =>
                          (e.target.style.backgroundColor = "#DCE8F2")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.backgroundColor = "transparent")
                        }
                      >
                        <X className="w-5 h-5" style={{ color: "#1F2D3D" }} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Poll Question */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Poll Question
                      </label>
                      <input
                        type="text"
                        value={addData.question}
                        onChange={(e) =>
                          setAddData({ ...addData, question: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                        style={{
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #DCE8F2",
                          color: "#1F2D3D",
                          focusRingColor: "#6EA9CB",
                        }}
                        placeholder="Enter your question"
                      />
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          Poll Type
                        </label>
                        <select
                          value={addData.type}
                          onChange={(e) =>
                            setAddData({ ...addData, type: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        >
                          <option value="multiple">Multiple Choice</option>
                          <option value="binary">Yes/No</option>
                          <option value="rating">Rating Scale</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          Category
                        </label>
                        <select
                          value={addData.category}
                          onChange={(e) =>
                            setAddData({ ...addData, category: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        >
                          <option value="Technology">Technology</option>
                          <option value="Workplace">Workplace</option>
                          <option value="Industry">Industry</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-2"
                          style={{ color: "#1F2D3D" }}
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          value={addData.endDate}
                          onChange={(e) =>
                            setAddData({ ...addData, endDate: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                          style={{
                            backgroundColor: "#F7FAFC",
                            border: "1px solid #DCE8F2",
                            color: "#1F2D3D",
                            focusRingColor: "#6EA9CB",
                          }}
                        />
                      </div>
                    </div>

                    {/* Poll Options */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Poll Options (one per line)
                      </label>
                      <textarea
                        value={addData.options}
                        onChange={(e) =>
                          setAddData({ ...addData, options: e.target.value })
                        }
                        rows={4}
                        placeholder="Option 1&#10;Option 2&#10;Option 3"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors"
                        style={{
                          backgroundColor: "#F7FAFC",
                          border: "1px solid #DCE8F2",
                          color: "#1F2D3D",
                          focusRingColor: "#6EA9CB",
                        }}
                      />
                    </div>

                    {/* Allow Comments */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="addAllowComments"
                        checked={addData.allowComments}
                        onChange={(e) =>
                          setAddData({
                            ...addData,
                            allowComments: e.target.checked,
                          })
                        }
                        className="rounded text-blue-600 focus:ring-blue-500"
                        style={{
                          border: "1px solid #DCE8F2",
                          backgroundColor: "#F7FAFC",
                        }}
                      />
                      <label
                        htmlFor="addAllowComments"
                        className="text-sm font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        Allow comments on this poll
                      </label>
                    </div>
                  </div>

                  <div
                    className="px-6 py-4 flex justify-end gap-3"
                    style={{
                      backgroundColor: "#DCE8F2",
                      borderTop: "1px solid #B5D3E7",
                    }}
                  >
                    <button
                      onClick={handleAddCancel}
                      className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                      style={{
                        color: "#1F2D3D",
                        backgroundColor: "#F7FAFC",
                        border: "1px solid #DCE8F2",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#DCE8F2")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#F7FAFC")
                      }
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAdd}
                      className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                      style={{ backgroundColor: "#6EA9CB" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#5A8EAF")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#6EA9CB")
                      }
                    >
                      Create Poll
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Mode */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {poll.question}
                    </h3>
                    {isOwner && (
                      <button
                        onClick={() => handleEdit(poll)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Poll"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <span
                      className="px-2 py-1 text-xs rounded-full"
                      style={getStatusColor(poll.status)}
                    >
                      {poll.status}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {poll.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{poll.totalVotes} votes</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Ends {new Date(poll.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Poll Options */}
              <div className="mb-6">
                <div className="space-y-3">
                  {poll.options.map((option) => (
                    <div
                      key={option.id}
                      className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-900">{option.text}</span>
                        <span className="text-sm font-medium text-gray-600">
                          {option.percentage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${option.percentage}%` }}
                        ></div>
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {option.votes} votes
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Vote Now
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              {poll.allowComments && (
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Comments (
                      {comments.filter((c) => c.pollId === poll.id).length})
                    </span>
                  </div>

                  <div className="space-y-4">
                    {comments
                      .filter((comment) => comment.pollId === poll.id)
                      .map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-gray-50 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">
                              {comment.author}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.timestamp}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">
                            {comment.content}
                          </p>
                          <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{comment.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">
                                {comment.dislikes}
                              </span>
                            </button>
                            <button className="text-blue-600 hover:text-blue-700 text-sm">
                              Reply
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4">
                    <textarea
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div className="mt-2 flex justify-end">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Poll Statistics */}
      <div
        className="mt-8 rounded-xl p-6"
        style={{
          background: "linear-gradient(135deg, #DCE8F2 0%, #B5D3E7 100%)",
        }}
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#1F2D3D" }}>
          Community Engagement
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <BarChart3
                className="w-6 h-6 mr-2"
                style={{ color: "#6EA9CB" }}
              />
              <span className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {polls.length}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#1F2D3D", opacity: 0.7 }}>
              Active Polls
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 mr-2" style={{ color: "#6EA9CB" }} />
              <span className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {polls.reduce((sum, poll) => sum + poll.totalVotes, 0)}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#1F2D3D", opacity: 0.7 }}>
              Total Votes
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageCircle
                className="w-6 h-6 mr-2"
                style={{ color: "#6EA9CB" }}
              />
              <span className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {comments.length}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#1F2D3D", opacity: 0.7 }}>
              Comments
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-6 h-6 mr-2" style={{ color: "#6EA9CB" }} />
              <span className="text-2xl font-bold" style={{ color: "#6EA9CB" }}>
                {polls.filter((p) => p.status === "Active").length}
              </span>
            </div>
            <p className="text-sm" style={{ color: "#1F2D3D", opacity: 0.7 }}>
              Ongoing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PollCommentSection;
