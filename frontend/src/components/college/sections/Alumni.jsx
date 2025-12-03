import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";
import apiService from "../../../services/apiService";
import { useAuth } from "../../../contexts/AuthContext";

const Alumni = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [alumniData, setAlumniData] = useState({
    notableAlumni: [
      "Dr. Rajesh Kumar (Class of 1995) - CEO, Tech Innovations Inc.",
      "Ms. Priya Sharma (Class of 2000) - Founder, EduTech Solutions",
      "Mr. Arun Patel (Class of 2005) - Senior Director, Google",
      "Dr. Sneha Gupta (Class of 1998) - Chief Scientist, ISRO",
      "Mr. Vikram Singh (Class of 2010) - Co-founder, FinTech Startup",
      "Ms. Anita Desai (Class of 2002) - VP Engineering, Microsoft",
    ],
    initiatives: [
      "Annual Alumni Meet with networking opportunities",
      "Mentorship Program connecting alumni with current students",
      "Career Guidance Sessions by industry experts",
      "Alumni Scholarship Fund for deserving students",
      "Industry Connect Workshops and seminars",
      "Entrepreneurship Support and startup incubation",
    ],
    networks: [
      "Global Alumni Association with 10,000+ members",
      "Regional chapters in 25+ cities worldwide",
      "Professional networking platform and mobile app",
      "LinkedIn group with active discussions",
      "Quarterly newsletter and alumni magazine",
      "Annual homecoming events and reunions",
    ],
    contributions: [
      "₹5 crores contributed for infrastructure development",
      "200+ internship opportunities provided annually",
      "50+ guest lectures by alumni professionals",
      "Research grants and funding for student projects",
      "Industry partnerships and collaboration programs",
      "Placement assistance and job referrals",
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...alumniData });

  // Load alumni data from backend
  useEffect(() => {
    const loadAlumniData = async () => {
      if (!user || user.role !== "college") {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("👨‍🎓 Loading college alumni data...");
        const response = await apiService.collegeAPI.getAlumni();

        if (response.success && response.data && response.data.length > 0) {
          console.log("✅ Alumni data loaded:", response.data);
          
          // Transform database data to frontend format
          const transformedData = {
            notableAlumni: response.data
              .filter(alumni => alumni.is_notable)
              .map(alumni => `${alumni.name} (Class of ${alumni.graduation_year}) - ${alumni.current_position || 'Alumni'}`),
            
            initiatives: response.data
              .filter(alumni => alumni.achievement && alumni.achievement.includes('initiative'))
              .map(alumni => alumni.achievement) || alumniData.initiatives,
            
            networks: response.data
              .filter(alumni => alumni.achievement && alumni.achievement.includes('network'))
              .map(alumni => alumni.achievement) || alumniData.networks,
            
            contributions: response.data
              .filter(alumni => alumni.achievement && alumni.achievement.includes('contribution'))
              .map(alumni => alumni.achievement) || alumniData.contributions,
            
            customFields: [],
            dbAlumni: response.data // Keep original db data for reference
          };

          setAlumniData(transformedData);
          setEditData(transformedData);
        } else {
          console.log("📝 No alumni data found, using default data");
          // Keep default data if no database data exists
        }
      } catch (error) {
        console.error("❌ Error loading alumni data:", error);
        setError("Failed to load alumni data. Using default information.");
        // Keep default data on error
      } finally {
        setIsLoading(false);
      }
    };

    loadAlumniData();
  }, [user]);

  const handleEditClick = () => {
    setEditData({ ...alumniData });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || user.role !== "college") {
      setError("Authentication required");
      return;
    }

    try {
      console.log("💾 Saving alumni data...", editData);

      // Transform frontend data to database format
      const dbAlumniData = [
        // Notable Alumni
        ...editData.notableAlumni.map((alumni, index) => {
          const match = alumni.match(/^(.+?)\s*\(Class of (\d{4})\)\s*-\s*(.+)$/);
          return {
            name: match ? match[1].trim() : alumni,
            graduation_year: match ? parseInt(match[2]) : new Date().getFullYear(),
            current_position: match ? match[3].trim() : "Alumni",
            course: "General", // Default course
            is_notable: true,
            is_featured: index < 3, // First 3 are featured
            achievement: `Notable Alumni: ${alumni}`,
            bio: null,
            current_company: match ? match[3].split(',')[0] : null,
            linkedin_url: null,
            image_url: null
          };
        }),
        
        // Initiatives as Alumni achievements
        ...editData.initiatives.map((initiative, index) => ({
          name: `Initiative ${index + 1}`,
          graduation_year: new Date().getFullYear(),
          current_position: "Alumni Initiative",
          course: "General",
          is_notable: false,
          is_featured: false,
          achievement: `initiative: ${initiative}`,
          bio: initiative,
          current_company: null,
          linkedin_url: null,
          image_url: null
        })),
        
        // Networks as Alumni achievements
        ...editData.networks.map((network, index) => ({
          name: `Network ${index + 1}`,
          graduation_year: new Date().getFullYear(),
          current_position: "Alumni Network",
          course: "General",
          is_notable: false,
          is_featured: false,
          achievement: `network: ${network}`,
          bio: network,
          current_company: null,
          linkedin_url: null,
          image_url: null
        })),
        
        // Contributions as Alumni achievements
        ...editData.contributions.map((contribution, index) => ({
          name: `Contribution ${index + 1}`,
          graduation_year: new Date().getFullYear(),
          current_position: "Alumni Contributor",
          course: "General",
          is_notable: false,
          is_featured: false,
          achievement: `contribution: ${contribution}`,
          bio: contribution,
          current_company: null,
          linkedin_url: null,
          image_url: null
        }))
      ];

      console.log("🔄 Transformed alumni data for database:", dbAlumniData);

      const response = await apiService.collegeAPI.updateAlumni(dbAlumniData);

      if (response.success) {
        console.log("✅ Alumni data saved successfully");
        setAlumniData({ ...editData });
        setIsEditModalOpen(false);
        setError(null);
      } else {
        throw new Error(response.message || "Failed to save");
      }
    } catch (error) {
      console.error("❌ Error saving alumni data:", error);
      setError("Failed to save alumni information. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...alumniData });
    setIsEditModalOpen(false);
  };

  // Notable Alumni handlers
  const handleNotableAlumniChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: prev.notableAlumni.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddNotableAlumni = () => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: [...prev.notableAlumni, ""],
    }));
  };

  const handleRemoveNotableAlumni = (index) => {
    setEditData((prev) => ({
      ...prev,
      notableAlumni: prev.notableAlumni.filter((_, i) => i !== index),
    }));
  };

  // Alumni Initiatives handlers
  const handleInitiativeChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      initiatives: prev.initiatives.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddInitiative = () => {
    setEditData((prev) => ({
      ...prev,
      initiatives: [...prev.initiatives, ""],
    }));
  };

  const handleRemoveInitiative = (index) => {
    setEditData((prev) => ({
      ...prev,
      initiatives: prev.initiatives.filter((_, i) => i !== index),
    }));
  };

  // Alumni Networks handlers
  const handleNetworkChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      networks: prev.networks.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddNetwork = () => {
    setEditData((prev) => ({
      ...prev,
      networks: [...prev.networks, ""],
    }));
  };

  const handleRemoveNetwork = (index) => {
    setEditData((prev) => ({
      ...prev,
      networks: prev.networks.filter((_, i) => i !== index),
    }));
  };

  // Alumni Contributions handlers
  const handleContributionChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      contributions: prev.contributions.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddContribution = () => {
    setEditData((prev) => ({
      ...prev,
      contributions: [...prev.contributions, ""],
    }));
  };

  const handleRemoveContribution = (index) => {
    setEditData((prev) => ({
      ...prev,
      contributions: prev.contributions.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      {/* Loading State */}
      {isLoading && (
        <div className="p-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="p-8 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Alumni Data</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="p-8 max-w-4xl mx-auto">
          {/* Alumni Section */}
          <div className="bg-white rounded-lg mb-8">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Alumni Network</h2>
              <button
                onClick={handleEditClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit alumni information"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Notable Alumni */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notable Alumni
                </h3>
                <div className="space-y-3">
                  {alumniData.notableAlumni &&
                    alumniData.notableAlumni.map((alumni, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{alumni}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Alumni Initiatives */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Alumni Initiatives
                </h3>
                <div className="space-y-3">
                  {alumniData.initiatives &&
                    alumniData.initiatives.map((initiative, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-0.5 text-base">{initiative}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Alumni Networks */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Alumni Networks
                </h3>
                <div className="space-y-3">
                  {alumniData.networks &&
                    alumniData.networks.map((network, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{network}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Alumni Contributions */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Alumni Contributions
                </h3>
                <div className="space-y-3">
                  {alumniData.contributions &&
                    alumniData.contributions.map((contribution, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{contribution}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Alumni Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {/* Notable Alumni */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Notable Alumni</h4>
                <div className="space-y-3">
                  {editData.notableAlumni.map((alumni, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={alumni}
                        onChange={(e) => handleNotableAlumniChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Alumni details (e.g., Dr. John Smith (Class of 1995) - CEO, Tech Corp)"
                      />
                      <button
                        onClick={() => handleRemoveNotableAlumni(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddNotableAlumni}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Notable Alumni
                  </button>
                </div>
              </div>

              {/* Alumni Initiatives */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Initiatives</h4>
                <div className="space-y-3">
                  {editData.initiatives.map((initiative, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={initiative}
                        onChange={(e) => handleInitiativeChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Initiative details"
                      />
                      <button
                        onClick={() => handleRemoveInitiative(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddInitiative}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Initiative
                  </button>
                </div>
              </div>

              {/* Alumni Networks */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Networks</h4>
                <div className="space-y-3">
                  {editData.networks.map((network, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={network}
                        onChange={(e) => handleNetworkChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Network details"
                      />
                      <button
                        onClick={() => handleRemoveNetwork(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddNetwork}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Network
                  </button>
                </div>
              </div>

              {/* Alumni Contributions */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Alumni Contributions</h4>
                <div className="space-y-3">
                  {editData.contributions.map((contribution, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={contribution}
                        onChange={(e) => handleContributionChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Contribution details"
                      />
                      <button
                        onClick={() => handleRemoveContribution(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddContribution}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Contribution
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alumni;
