import React, { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

const FAQs = ({ isOwner, startupData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I validate my startup idea?",
      answer:
        "Start by talking to potential customers, conducting surveys, building an MVP, and testing your assumptions with real market data. Look for product-market fit indicators like customer retention and willingness to pay.",
      category: "Getting Started",
    },
    {
      id: 2,
      question: "When should I start looking for funding?",
      answer:
        "Consider seeking funding when you have a validated product, proven traction, and a clear plan for how the investment will accelerate growth. Most successful startups raise funding after demonstrating initial market demand.",
      category: "Funding",
    },
    {
      id: 3,
      question: "How do I find the right co-founder?",
      answer:
        "Look for someone who complements your skills, shares your vision, and has relevant experience. Consider networking events, startup communities, and professional connections. Ensure alignment on equity, roles, and long-term goals.",
      category: "Team Building",
    },
    {
      id: 4,
      question: "What legal structure should I choose?",
      answer:
        "Most startups benefit from incorporating as a C-Corp or LLC, depending on growth plans and funding needs. C-Corps are preferred for venture funding, while LLCs offer more flexibility. Consult with a lawyer for your specific situation.",
      category: "Legal",
    },
    {
      id: 5,
      question: "How much equity should I give to employees?",
      answer:
        "Typically, startups allocate 10-20% of equity for employee stock options. Early employees might receive 0.5-2%, while key hires could get more. Create a vesting schedule (usually 4 years) to retain talent.",
      category: "Equity",
    },
    {
      id: 6,
      question: "When should I quit my day job?",
      answer:
        "Consider leaving when your startup generates enough income to support you, or when you've secured sufficient funding. Having 6-12 months of expenses saved is recommended. Some entrepreneurs succeed by working part-time initially.",
      category: "Getting Started",
    },
  ]);

  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "Getting Started",
  });

  const [editFaq, setEditFaq] = useState({
    question: "",
    answer: "",
    category: "Getting Started",
  });

  const categories = [
    "Getting Started",
    "Funding",
    "Team Building",
    "Legal",
    "Equity",
    "Marketing",
    "Product Development",
    "Operations",
  ];

  const handleAddFaq = () => {
    setShowAddModal(true);
  };

  const handleSaveFaq = () => {
    if (newFaq.question.trim() && newFaq.answer.trim()) {
      const faq = {
        id: faqs.length + 1,
        ...newFaq,
      };
      setFaqs([faq, ...faqs]);
      setNewFaq({ question: "", answer: "", category: "Getting Started" });
      setShowAddModal(false);
    }
  };

  const handleCancelAdd = () => {
    setNewFaq({ question: "", answer: "", category: "Getting Started" });
    setShowAddModal(false);
  };

  const handleEditClick = (index) => {
    setEditFaq({ ...faqs[index] });
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    if (editFaq.question.trim() && editFaq.answer.trim()) {
      const updatedFaqs = [...faqs];
      updatedFaqs[editingIndex] = { ...updatedFaqs[editingIndex], ...editFaq };
      setFaqs(updatedFaqs);
      setEditingIndex(null);
      setEditFaq({ question: "", answer: "", category: "Getting Started" });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditFaq({ question: "", answer: "", category: "Getting Started" });
  };

  const handleInputChange = (field, value, isEdit = false) => {
    if (isEdit) {
      setEditFaq((prev) => ({ ...prev, [field]: value }));
    } else {
      setNewFaq((prev) => ({ ...prev, [field]: value }));
    }
  };

  const toggleExpanded = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Header with Edit Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Find answers to common questions about starting and growing your
              startup
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isEditing ? "Done editing" : "Edit FAQs"}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span className="text-sm font-medium">Done</span>
              </>
            ) : (
              <>
                <Edit className="w-4 h-4" />
                <span className="text-sm font-medium">Edit</span>
              </>
            )}
          </button>
        </div>

        {/* Add FAQ Button (when editing) */}
        {isEditing && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <button
              onClick={handleAddFaq}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New FAQ
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="divide-y divide-gray-200">
          {filteredFaqs.map((faq, index) => (
            <div key={faq.id} className="group">
              <div
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full font-medium">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-base font-medium text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    {expandedItem === index && (
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  {isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick(index);
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                      title="Edit FAQ"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  <div className="w-6 h-6 flex items-center justify-center">
                    {expandedItem === index ? (
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No FAQs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or add a new FAQ.
            </p>
            {isEditing && (
              <button
                onClick={handleAddFaq}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add First FAQ
              </button>
            )}
          </div>
        )}

        {/* Quick Categories */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Browse by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSearchTerm(category)}
                className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add New FAQ
                </h2>
                <button
                  onClick={handleCancelAdd}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newFaq.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={(e) =>
                    handleInputChange("question", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter the frequently asked question"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={newFaq.answer}
                  onChange={(e) => handleInputChange("answer", e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Provide a detailed answer to the question"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelAdd}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveFaq}
                disabled={!newFaq.question.trim() || !newFaq.answer.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit FAQ
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
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={editFaq.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={editFaq.question}
                  onChange={(e) =>
                    handleInputChange("question", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter the frequently asked question"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={editFaq.answer}
                  onChange={(e) =>
                    handleInputChange("answer", e.target.value, true)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Provide a detailed answer to the question"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editFaq.question.trim() || !editFaq.answer.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FAQs;
