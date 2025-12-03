import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus, MapPin } from "lucide-react";
import apiService from "../../../services/apiService";
import { useAuth } from "../../../contexts/AuthContext";

const defaultHostelData = {
  facilities: [
    "Separate hostels for boys and girls",
    "24/7 security and CCTV surveillance", 
    "WiFi connectivity in all rooms",
    "Common room with TV and recreational facilities",
    "Laundry facilities",
    "Medical facilities and first aid"
  ],
  rooms: [
    {
      type: "Single Occupancy",
      description: "Individual rooms with attached bathroom",
      amenities: "Study table, bed, wardrobe, chair",
      fees: "₹35,000/year"
    },
    {
      type: "Double Occupancy", 
      description: "Shared rooms with attached bathroom",
      amenities: "Study table, bed, wardrobe, chair for each student",
      fees: "₹25,000/year"
    },
    {
      type: "Triple Occupancy",
      description: "Shared rooms with common bathroom",
      amenities: "Study table, bed, wardrobe, chair for each student", 
      fees: "₹20,000/year"
    }
  ],
  mess: {
    facilities: [
      "Hygienic food preparation",
      "Vegetarian and non-vegetarian options",
      "Special dietary accommodations",
      "Clean dining hall with proper seating"
    ],
    mealTimings: [
      "Breakfast: 7:30 AM - 9:30 AM",
      "Lunch: 12:30 PM - 2:30 PM", 
      "Evening Snacks: 5:00 PM - 6:00 PM",
      "Dinner: 7:30 PM - 9:30 PM"
    ],
    fees: "₹15,000/year"
  },
  rules: [
    "Visitors allowed only during specified hours",
    "No smoking or alcohol consumption", 
    "Maintain cleanliness in rooms and common areas",
    "Report any maintenance issues promptly",
    "Follow hostel curfew timings",
    "Respect fellow residents"
  ]
};

const defaultCampusData = [];

const Hostel = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [hostelData, setHostelData] = useState(defaultHostelData);
  const [campusData, setCampusData] = useState(defaultCampusData);
  const [editData, setEditData] = useState({ 
    hostel: { ...defaultHostelData },
    campus: [...defaultCampusData]
  });

  // Load hostel and campus data from backend
  useEffect(() => {
    const loadData = async () => {
      console.log("🔄 LoadData useEffect triggered");
      console.log("👤 Current user:", user);
      
      if (!user) {
        console.log("⚠️ No user found, skipping hostel/campus data load");
        setIsLoading(false);
        return;
      }

      if (user.role !== "college") {
        console.log(`⚠️ User role is '${user.role}', not 'college'. Skipping hostel/campus data load`);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("🏢 Loading hostel and campus data for user:", user.id, user.email);
        
        // Load campus data from backend
        console.log("📡 Calling apiService.collegeAPI.getCampuses()...");
        const campusResponse = await apiService.collegeAPI.getCampuses();
        console.log("📡 Campus API response:", campusResponse);
        
        if (campusResponse.success && campusResponse.data) {
          console.log("✅ Campus data loaded:", campusResponse.data);
          setCampusData(campusResponse.data);
          setEditData(prev => ({ ...prev, campus: campusResponse.data }));
        } else {
          console.log("📝 No campus data found, using default data");
        }
        
        // Load hostel data from backend
        console.log("📡 Calling apiService.collegeAPI.getHostel()...");
        const hostelResponse = await apiService.collegeAPI.getHostel();
        console.log("📡 Hostel API response:", hostelResponse);
        
        if (hostelResponse.success && hostelResponse.data) {
          console.log("✅ Hostel data loaded:", hostelResponse.data);
          
          // Ensure the loaded data has the correct structure
          const loadedHostelData = {
            ...defaultHostelData,
            ...hostelResponse.data,
            mess: {
              ...defaultHostelData.mess,
              ...(hostelResponse.data.mess || {}),
              facilities: hostelResponse.data.mess?.facilities || defaultHostelData.mess.facilities,
              mealTimings: hostelResponse.data.mess?.mealTimings || defaultHostelData.mess.mealTimings,
              fees: hostelResponse.data.mess?.fees || defaultHostelData.mess.fees
            },
            facilities: hostelResponse.data.facilities || defaultHostelData.facilities,
            rooms: hostelResponse.data.rooms || defaultHostelData.rooms,
            rules: hostelResponse.data.rules || defaultHostelData.rules
          };
          
          setHostelData(loadedHostelData);
          setEditData(prev => ({ ...prev, hostel: loadedHostelData }));
        } else {
          console.log("📝 No hostel data found, using default data");
        }
        
      } catch (error) {
        console.error("❌ Error loading hostel/campus data:", error);
        console.error("❌ Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          code: error.code,
          config: {
            url: error.config?.url,
            baseURL: error.config?.baseURL,
            method: error.config?.method
          }
        });
        
        let errorMessage = "Failed to load hostel/campus data. Using default information.";
        
        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          errorMessage = "Network error: Unable to connect to the server. Please check your internet connection and ensure the backend server is running.";
        } else if (error.response?.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (error.response?.status === 403) {
          errorMessage = "Access denied. College privileges required.";
        }
        
        setError(errorMessage);
        // Keep default data on error
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [user]);

  const handleEditClick = () => {
    console.log("🔧 Opening edit modal...");
    console.log("📊 Current hostelData:", hostelData);
    console.log("📊 Current campusData:", campusData);
    
    // Deep copy hostel data to ensure nested objects are properly copied
    const hostelCopy = {
      ...hostelData,
      mess: {
        ...hostelData.mess,
        facilities: [...hostelData.mess.facilities],
        mealTimings: [...hostelData.mess.mealTimings]
      },
      facilities: [...hostelData.facilities],
      rooms: hostelData.rooms.map(room => ({ ...room })),
      rules: [...hostelData.rules]
    };
    
    console.log("📊 Hostel copy for editing:", hostelCopy);
    
    setEditData({ 
      hostel: hostelCopy,
      campus: [...campusData] 
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || user.role !== "college") {
      setError("Authentication required");
      return;
    }

    try {
      console.log("💾 Saving hostel and campus data...", editData);

      // Save campus data
      if (editData.campus && editData.campus.length > 0) {
        const campusResponse = await apiService.collegeAPI.updateCampuses(editData.campus);
        
        if (campusResponse.success) {
          console.log("✅ Campus data saved successfully");
          setCampusData([...editData.campus]);
        } else {
          throw new Error(campusResponse.message || "Failed to save campus data");
        }
      }
      
      // Save hostel data
      if (editData.hostel) {
        const hostelResponse = await apiService.collegeAPI.updateHostel(editData.hostel);
        
        if (hostelResponse.success) {
          console.log("✅ Hostel data saved successfully");
          setHostelData({ ...editData.hostel });
        } else {
          throw new Error(hostelResponse.message || "Failed to save hostel data");
        }
      }
      
      setIsEditModalOpen(false);
      setError(null);
      
      // Reload data from backend to ensure persistence
      console.log("🔄 Reloading data from backend to verify persistence...");
      try {
        const reloadedHostelResponse = await apiService.collegeAPI.getHostel();
        if (reloadedHostelResponse.success && reloadedHostelResponse.data) {
          console.log("✅ Verified hostel data persistence:", reloadedHostelResponse.data);
          setHostelData(reloadedHostelResponse.data);
          setEditData(prev => ({ ...prev, hostel: reloadedHostelResponse.data }));
        }
        
        const reloadedCampusResponse = await apiService.collegeAPI.getCampuses();
        if (reloadedCampusResponse.success && reloadedCampusResponse.data) {
          console.log("✅ Verified campus data persistence:", reloadedCampusResponse.data);
          setCampusData(reloadedCampusResponse.data);
          setEditData(prev => ({ ...prev, campus: reloadedCampusResponse.data }));
        }
      } catch (reloadError) {
        console.warn("⚠️ Could not reload data for verification:", reloadError);
        // Not a critical error, data was saved successfully
      }
      
    } catch (error) {
      console.error("❌ Error saving hostel/campus data:", error);
      setError("Failed to save hostel/campus information. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditData({ 
      hostel: { ...hostelData },
      campus: [...campusData] 
    });
    setIsEditModalOpen(false);
  };

  // Campus management functions
  const handleAddCampus = () => {
    setEditData(prev => ({
      ...prev,
      campus: [...prev.campus, {
        name: "",
        type: "Main Campus",
        address: "",
        student_count: "",
        dean: "",
        contact_number: "",
        email: "",
        latitude: null,
        longitude: null,
        image_url: ""
      }]
    }));
  };

  const handleRemoveCampus = (index) => {
    setEditData(prev => ({
      ...prev,
      campus: prev.campus.filter((_, i) => i !== index)
    }));
  };

  const handleCampusChange = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      campus: prev.campus.map((campus, i) => 
        i === index ? { ...campus, [field]: value } : campus
      )
    }));
  };

  // Hostel management functions
  const handleHostelFieldChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      hostel: { ...prev.hostel, [field]: value }
    }));
  };

  const handleHostelArrayChange = (section, index, value) => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        [section]: prev.hostel[section].map((item, i) => i === index ? value : item)
      }
    }));
  };

  const handleAddHostelItem = (section) => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        [section]: [...prev.hostel[section], ""]
      }
    }));
  };

  const handleRemoveHostelItem = (section, index) => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        [section]: prev.hostel[section].filter((_, i) => i !== index)
      }
    }));
  };

  const handleAddRoom = () => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        rooms: [...prev.hostel.rooms, {
          type: "",
          description: "",
          amenities: "",
          fees: ""
        }]
      }
    }));
  };

  const handleRemoveRoom = (index) => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        rooms: prev.hostel.rooms.filter((_, i) => i !== index)
      }
    }));
  };

  const handleRoomChange = (index, field, value) => {
    setEditData(prev => ({
      ...prev,
      hostel: {
        ...prev.hostel,
        rooms: prev.hostel.rooms.map((room, i) => 
          i === index ? { ...room, [field]: value } : room
        )
      }
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
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Hostel/Campus Data</h3>
            <p className="text-red-700 mb-4">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
              {error.includes("logged in") && (
                <button
                  onClick={() => window.location.href = '/auth/login'}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go to Login
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && (
        <div className="p-6 max-w-4xl mx-auto">
          {/* Hostel Section */}
          <div className="bg-white rounded-lg mb-6">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Hostel & Campus Life</h2>
              <button
                onClick={handleEditClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit hostel and campus information"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Campus Information */}
              {campusData && campusData.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Campus Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {campusData.map((campus, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">{campus.name || "Campus"}</h4>
                            <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {campus.type || "Main Campus"}
                            </span>
                          </div>
                          {campus.image_url && (
                            <img 
                              src={campus.image_url} 
                              alt={campus.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                        </div>
                        
                        {campus.address && (
                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-700 text-sm">{campus.address}</p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                          {campus.student_count && (
                            <div>
                              <span className="font-medium text-gray-900">Students:</span>
                              <span className="text-gray-700 ml-1">{campus.student_count}</span>
                            </div>
                          )}
                          {campus.dean && (
                            <div>
                              <span className="font-medium text-gray-900">Dean:</span>
                              <span className="text-gray-700 ml-1">{campus.dean}</span>
                            </div>
                          )}
                          {campus.contact_number && (
                            <div>
                              <span className="font-medium text-gray-900">Contact:</span>
                              <span className="text-gray-700 ml-1">{campus.contact_number}</span>
                            </div>
                          )}
                          {campus.email && (
                            <div>
                              <span className="font-medium text-gray-900">Email:</span>
                              <span className="text-gray-700 ml-1">{campus.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Hostel Facilities */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Hostel Facilities</h3>
                <div className="space-y-3">
                  {hostelData.facilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{item || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Types */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {hostelData.rooms.map((room, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="font-semibold text-gray-900 text-lg mb-2">{room.type || "-"}</div>
                      <div className="text-gray-700 text-sm mb-2">{room.description || "-"}</div>
                      <div className="text-gray-700 text-sm mb-1">
                        <span className="font-medium">Amenities:</span> {room.amenities || "-"}
                      </div>
                      <div className="text-gray-700 text-sm">
                        <span className="font-medium">Fees:</span> {room.fees || "-"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mess Facilities */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mess Facilities</h3>
                <div className="space-y-3">
                  {hostelData.mess.facilities.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{item || "-"}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Meal Timings</h4>
                  <div className="space-y-2">
                    {hostelData.mess.mealTimings.map((timing, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed">{timing || "-"}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-700">
                    <span className="font-medium text-gray-900">Mess Fees:</span> {hostelData.mess.fees || "-"}
                  </p>
                </div>
              </div>

              {/* Rules & Regulations */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rules & Regulations</h3>
                <div className="space-y-3">
                  {hostelData.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 mt-2"></div>
                      <p className="text-gray-700 leading-relaxed">{rule || "-"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Hostel & Campus Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Campus Information Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Campus Information</h4>
                <div className="space-y-4">
                  {editData.campus.map((campus, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h5 className="text-lg font-medium text-gray-800">Campus {index + 1}</h5>
                        <button
                          onClick={() => handleRemoveCampus(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Campus Name</label>
                          <input
                            type="text"
                            value={campus.name || ""}
                            onChange={(e) => handleCampusChange(index, 'name', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="e.g., Main Campus"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Campus Type</label>
                          <select
                            value={campus.type || ""}
                            onChange={(e) => handleCampusChange(index, 'type', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                          >
                            <option value="">Select Type</option>
                            <option value="Main Campus">Main Campus</option>
                            <option value="Branch Campus">Branch Campus</option>
                            <option value="Research Campus">Research Campus</option>
                            <option value="Extension Campus">Extension Campus</option>
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea
                            value={campus.address || ""}
                            onChange={(e) => handleCampusChange(index, 'address', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            rows="2"
                            placeholder="Full campus address"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Student Count</label>
                          <input
                            type="text"
                            value={campus.student_count || ""}
                            onChange={(e) => handleCampusChange(index, 'student_count', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="e.g., 5000+"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Dean</label>
                          <input
                            type="text"
                            value={campus.dean || ""}
                            onChange={(e) => handleCampusChange(index, 'dean', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Dean name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                          <input
                            type="text"
                            value={campus.contact_number || ""}
                            onChange={(e) => handleCampusChange(index, 'contact_number', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Contact number"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={campus.email || ""}
                            onChange={(e) => handleCampusChange(index, 'email', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Campus email"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleAddCampus}
                    className="w-full p-3 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Campus
                  </button>
                </div>
              </div>

              {/* Hostel Facilities Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Hostel Facilities</h4>
                <div className="space-y-3">
                  {editData.hostel.facilities.map((facility, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={facility}
                        onChange={(e) => handleHostelArrayChange('facilities', index, e.target.value)}
                        className="flex-1 p-2 border rounded text-sm"
                        placeholder="Facility description"
                      />
                      <button
                        onClick={() => handleRemoveHostelItem('facilities', index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddHostelItem('facilities')}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Facility
                  </button>
                </div>
              </div>

              {/* Room Types Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Room Types</h4>
                <div className="space-y-4">
                  {editData.hostel.rooms.map((room, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="text-base font-medium text-gray-800">Room Type {index + 1}</h5>
                        <button
                          onClick={() => handleRemoveRoom(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                          <input
                            type="text"
                            value={room.type || ""}
                            onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="e.g., Single Occupancy"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Fees</label>
                          <input
                            type="text"
                            value={room.fees || ""}
                            onChange={(e) => handleRoomChange(index, 'fees', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="e.g., ₹25,000/year"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <input
                            type="text"
                            value={room.description || ""}
                            onChange={(e) => handleRoomChange(index, 'description', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="Room description"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                          <input
                            type="text"
                            value={room.amenities || ""}
                            onChange={(e) => handleRoomChange(index, 'amenities', e.target.value)}
                            className="w-full p-2 border rounded text-sm"
                            placeholder="List of amenities"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={handleAddRoom}
                    className="w-full p-3 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Room Type
                  </button>
                </div>
              </div>

              {/* Mess Facilities Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Mess Facilities</h4>
                <div className="space-y-3">
                  {editData.hostel?.mess?.facilities?.map((facility, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={facility}
                        onChange={(e) => {
                          console.log("🔧 Updating mess facility:", index, e.target.value);
                          const newFacilities = [...(editData.hostel.mess.facilities || [])];
                          newFacilities[index] = e.target.value;
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              mess: { ...prev.hostel.mess, facilities: newFacilities }
                            }
                          }));
                        }}
                        className="flex-1 p-2 border rounded text-sm"
                        placeholder="Mess facility description"
                      />
                      <button
                        onClick={() => {
                          console.log("🗑️ Removing mess facility:", index);
                          const newFacilities = (editData.hostel.mess.facilities || []).filter((_, i) => i !== index);
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              mess: { ...prev.hostel.mess, facilities: newFacilities }
                            }
                          }));
                        }}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  )) || []}
                  <button
                    onClick={() => {
                      console.log("➕ Adding new mess facility");
                      setEditData(prev => ({
                        ...prev,
                        hostel: {
                          ...prev.hostel,
                          mess: { 
                            ...prev.hostel.mess, 
                            facilities: [...(prev.hostel.mess.facilities || []), ""] 
                          }
                        }
                      }));
                    }}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Mess Facility
                  </button>
                </div>
              </div>

              {/* Meal Timings Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Meal Timings</h4>
                <div className="space-y-3">
                  {editData.hostel?.mess?.mealTimings?.map((timing, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={timing}
                        onChange={(e) => {
                          console.log("🔧 Updating meal timing:", index, e.target.value);
                          const newTimings = [...(editData.hostel.mess.mealTimings || [])];
                          newTimings[index] = e.target.value;
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              mess: { ...prev.hostel.mess, mealTimings: newTimings }
                            }
                          }));
                        }}
                        className="flex-1 p-2 border rounded text-sm"
                        placeholder="e.g., Breakfast: 7:30 AM - 9:30 AM"
                      />
                      <button
                        onClick={() => {
                          console.log("🗑️ Removing meal timing:", index);
                          const newTimings = (editData.hostel.mess.mealTimings || []).filter((_, i) => i !== index);
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              mess: { ...prev.hostel.mess, mealTimings: newTimings }
                            }
                          }));
                        }}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  )) || []}
                  <button
                    onClick={() => {
                      console.log("➕ Adding new meal timing");
                      setEditData(prev => ({
                        ...prev,
                        hostel: {
                          ...prev.hostel,
                          mess: { 
                            ...prev.hostel.mess, 
                            mealTimings: [...(prev.hostel.mess.mealTimings || []), ""] 
                          }
                        }
                      }));
                    }}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Meal Timing
                  </button>
                </div>
              </div>

              {/* Mess Fees Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Mess Fees</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Mess Fees</label>
                  <input
                    type="text"
                    value={editData.hostel?.mess?.fees || ""}
                    onChange={(e) => {
                      console.log("🔧 Updating mess fees:", e.target.value);
                      setEditData(prev => ({
                        ...prev,
                        hostel: {
                          ...prev.hostel,
                          mess: { ...prev.hostel.mess, fees: e.target.value }
                        }
                      }));
                    }}
                    className="w-full p-2 border rounded text-sm"
                    placeholder="e.g., ₹15,000/year"
                  />
                </div>
              </div>

              {/* Rules & Regulations Section */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-4 text-lg">Rules & Regulations</h4>
                <div className="space-y-3">
                  {editData.hostel?.rules?.map((rule, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={rule}
                        onChange={(e) => {
                          console.log("🔧 Updating rule:", index, e.target.value);
                          const newRules = [...(editData.hostel.rules || [])];
                          newRules[index] = e.target.value;
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              rules: newRules
                            }
                          }));
                        }}
                        className="flex-1 p-2 border rounded text-sm"
                        placeholder="Rule or regulation"
                      />
                      <button
                        onClick={() => {
                          console.log("🗑️ Removing rule:", index);
                          const newRules = (editData.hostel.rules || []).filter((_, i) => i !== index);
                          setEditData(prev => ({
                            ...prev,
                            hostel: {
                              ...prev.hostel,
                              rules: newRules
                            }
                          }));
                        }}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  )) || []}
                  <button
                    onClick={() => {
                      console.log("➕ Adding new rule");
                      setEditData(prev => ({
                        ...prev,
                        hostel: {
                          ...prev.hostel,
                          rules: [...(prev.hostel.rules || []), ""]
                        }
                      }));
                    }}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-sm"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Rule/Regulation
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

export default Hostel;
