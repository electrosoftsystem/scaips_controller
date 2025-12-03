import React, { useState, useEffect } from "react";
import { Edit, X, Plus, Minus } from "lucide-react";
import apiService from "../../../services/apiService";
import { useAuth } from "../../../contexts/AuthContext";

const Events = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [eventsData, setEventsData] = useState({
    annualEvents: [
      "Alumni Meet - Grand reunion with networking opportunities",
      "Techno-Cultural Fest - Week-long celebration of technology and culture",
      "Foundation Day - Commemorating the establishment of the institution",
      "Sports Festival - Inter-college and intra-college competitions",
      "Science Exhibition - Showcase of innovative projects and research",
      "Cultural Night - Performances by students and guest artists",
    ],
    techCulture: [
      "Hackathon - 48-hour coding challenge with industry mentors",
      "Robotics Competition - Design and build innovative robots",
      "Tech Talks - Expert sessions on emerging technologies",
      "Cultural Performances - Dance, music, and drama competitions",
      "Art Exhibition - Display of creative works by students",
      "Literary Festival - Poetry, storytelling, and creative writing",
    ],
    seminars: [
      "Industry-Academia Conclave with leading professionals",
      "Entrepreneurship Summit for aspiring business leaders",
      "Research Symposium showcasing student innovations",
      "Career Guidance Sessions with HR professionals",
      "Technical Workshops on latest industry tools",
      "Personality Development and Soft Skills Training",
    ],
    conferences: [
      "International Conference on Emerging Technologies",
      "National Conference on Sustainable Development",
      "Annual Management and Leadership Conference",
      "Student Research Paper Presentation Conference",
      "Innovation and Patent Filing Workshop",
      "Digital Transformation in Education Symposium",
    ],
    customFields: [],
  });

  const [editData, setEditData] = useState({ ...eventsData });

  // Load events data from backend
  useEffect(() => {
    const loadEventsData = async () => {
      if (!user) {
        console.log("⚠️ No user found, skipping events load");
        setIsLoading(false);
        return;
      }

      if (user.role !== "college") {
        console.log(`⚠️ User role is '${user.role}', not 'college'. Skipping events load`);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        console.log("🎉 Loading college events data for user:", user.id, user.email);
        console.log("🔗 API Base URL:", apiService.collegeAPI);
        console.log("🔗 Making request to events endpoint...");
        
        const response = await apiService.collegeAPI.getEvents();

        if (response.success && response.data && response.data.length > 0) {
          console.log("✅ Events data loaded:", response.data);
          
          // Transform database data to frontend format
          const transformedData = {
            annualEvents: response.data
              .filter(event => event.event_type === 'Annual' || event.event_type === 'Yearly')
              .map(event => `${event.title} - ${event.description || 'Annual event'}`),
            
            techCulture: response.data
              .filter(event => event.event_type === 'Technical' || event.event_type === 'Cultural')
              .map(event => `${event.title} - ${event.description || 'Tech/Cultural event'}`),
            
            seminars: response.data
              .filter(event => event.event_type === 'Seminar' || event.event_type === 'Workshop')
              .map(event => `${event.title} - ${event.description || 'Educational seminar'}`),
            
            conferences: response.data
              .filter(event => event.event_type === 'Conference' || event.event_type === 'Symposium')
              .map(event => `${event.title} - ${event.description || 'Academic conference'}`),
            
            customFields: [],
            dbEvents: response.data // Keep original db data for reference
          };

          // If no events match specific types, use defaults
          if (transformedData.annualEvents.length === 0) {
            transformedData.annualEvents = eventsData.annualEvents;
          }
          if (transformedData.techCulture.length === 0) {
            transformedData.techCulture = eventsData.techCulture;
          }
          if (transformedData.seminars.length === 0) {
            transformedData.seminars = eventsData.seminars;
          }
          if (transformedData.conferences.length === 0) {
            transformedData.conferences = eventsData.conferences;
          }

          setEventsData(transformedData);
          setEditData(transformedData);
        } else {
          console.log("📝 No events data found, using default data");
          // Keep default data if no database data exists
        }
      } catch (error) {
        console.error("❌ Error loading events data:", error);
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
        
        let errorMessage = "Failed to load events data. Using default information.";
        
        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          errorMessage = "Network error: Unable to connect to the server. Please check your internet connection and ensure the backend server is running.";
        } else if (error.message.includes("Failed to get college events")) {
          errorMessage = "Unable to connect to the server. Please ensure you're logged in as a college user and try again.";
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

    loadEventsData();
  }, [user]);

  const handleEditClick = () => {
    setEditData({ ...eventsData });
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    if (!user || user.role !== "college") {
      setError("Authentication required");
      return;
    }

    try {
      console.log("💾 Saving events data...", editData);

      // Transform frontend data to database format
      const dbEventsData = [
        // Annual Events
        ...editData.annualEvents.map((event, index) => {
          const [title, description] = event.split(' - ');
          return {
            title: title || `Annual Event ${index + 1}`,
            description: description || event,
            event_type: 'Annual',
            start_date: new Date().toISOString(),
            end_date: null,
            venue: 'College Campus',
            organizer: 'College Administration',
            registration_url: null,
            image_url: null,
            is_active: true
          };
        }),
        
        // Tech & Cultural Events
        ...editData.techCulture.map((event, index) => {
          const [title, description] = event.split(' - ');
          return {
            title: title || `Tech/Cultural Event ${index + 1}`,
            description: description || event,
            event_type: 'Technical',
            start_date: new Date().toISOString(),
            end_date: null,
            venue: 'College Campus',
            organizer: 'College Administration',
            registration_url: null,
            image_url: null,
            is_active: true
          };
        }),
        
        // Seminars
        ...editData.seminars.map((event, index) => {
          const [title, description] = event.split(' - ');
          return {
            title: title || `Seminar ${index + 1}`,
            description: description || event,
            event_type: 'Seminar',
            start_date: new Date().toISOString(),
            end_date: null,
            venue: 'College Campus',
            organizer: 'College Administration',
            registration_url: null,
            image_url: null,
            is_active: true
          };
        }),
        
        // Conferences
        ...editData.conferences.map((event, index) => {
          const [title, description] = event.split(' - ');
          return {
            title: title || `Conference ${index + 1}`,
            description: description || event,
            event_type: 'Conference',
            start_date: new Date().toISOString(),
            end_date: null,
            venue: 'College Campus',
            organizer: 'College Administration',
            registration_url: null,
            image_url: null,
            is_active: true
          };
        })
      ];

      console.log("🔄 Transformed events data for database:", dbEventsData);

      const response = await apiService.collegeAPI.updateEvents(dbEventsData);

      if (response.success) {
        console.log("✅ Events data saved successfully");
        setEventsData({ ...editData });
        setIsEditModalOpen(false);
        setError(null);
      } else {
        throw new Error(response.message || "Failed to save");
      }
    } catch (error) {
      console.error("❌ Error saving events data:", error);
      setError("Failed to save events information. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...eventsData });
    setIsEditModalOpen(false);
  };

  // Annual Events handlers
  const handleAnnualEventChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: prev.annualEvents.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddAnnualEvent = () => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: [...prev.annualEvents, ""],
    }));
  };

  const handleRemoveAnnualEvent = (index) => {
    setEditData((prev) => ({
      ...prev,
      annualEvents: prev.annualEvents.filter((_, i) => i !== index),
    }));
  };

  // Tech & Cultural Events handlers
  const handleTechCultureChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      techCulture: prev.techCulture.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddTechCulture = () => {
    setEditData((prev) => ({
      ...prev,
      techCulture: [...prev.techCulture, ""],
    }));
  };

  const handleRemoveTechCulture = (index) => {
    setEditData((prev) => ({
      ...prev,
      techCulture: prev.techCulture.filter((_, i) => i !== index),
    }));
  };

  // Seminars handlers
  const handleSeminarChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      seminars: prev.seminars.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddSeminar = () => {
    setEditData((prev) => ({
      ...prev,
      seminars: [...prev.seminars, ""],
    }));
  };

  const handleRemoveSeminar = (index) => {
    setEditData((prev) => ({
      ...prev,
      seminars: prev.seminars.filter((_, i) => i !== index),
    }));
  };

  // Conferences handlers
  const handleConferenceChange = (index, value) => {
    setEditData((prev) => ({
      ...prev,
      conferences: prev.conferences.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleAddConference = () => {
    setEditData((prev) => ({
      ...prev,
      conferences: [...prev.conferences, ""],
    }));
  };

  const handleRemoveConference = (index) => {
    setEditData((prev) => ({
      ...prev,
      conferences: prev.conferences.filter((_, i) => i !== index),
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
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Events Data</h3>
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
        <div className="p-8 max-w-4xl mx-auto">
          {/* Events Section */}
          <div className="bg-white rounded-lg mb-8">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-900">Events & Activities</h2>
              <button
                onClick={handleEditClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit events information"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Annual Events */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Annual Events
                </h3>
                <div className="space-y-3">
                  {eventsData.annualEvents &&
                    eventsData.annualEvents.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed pt-0.5 text-base">{event}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Tech & Cultural Events */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tech & Cultural Events
                </h3>
                <div className="space-y-3">
                  {eventsData.techCulture &&
                    eventsData.techCulture.map((event, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{event}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Seminars & Workshops */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seminars & Workshops
                </h3>
                <div className="space-y-3">
                  {eventsData.seminars &&
                    eventsData.seminars.map((seminar, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{seminar}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Conferences */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Conferences & Symposiums
                </h3>
                <div className="space-y-3">
                  {eventsData.conferences &&
                    eventsData.conferences.map((conference, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                        <p className="text-gray-700 leading-relaxed text-base">{conference}</p>
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
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Events Information</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              {/* Annual Events */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Annual Events</h4>
                <div className="space-y-3">
                  {editData.annualEvents.map((event, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={event}
                        onChange={(e) => handleAnnualEventChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Event details"
                      />
                      <button
                        onClick={() => handleRemoveAnnualEvent(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddAnnualEvent}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Annual Event
                  </button>
                </div>
              </div>

              {/* Tech & Cultural Events */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Tech & Cultural Events</h4>
                <div className="space-y-3">
                  {editData.techCulture.map((event, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={event}
                        onChange={(e) => handleTechCultureChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Tech/Cultural event details"
                      />
                      <button
                        onClick={() => handleRemoveTechCulture(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddTechCulture}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Tech/Cultural Event
                  </button>
                </div>
              </div>

              {/* Seminars & Workshops */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Seminars & Workshops</h4>
                <div className="space-y-3">
                  {editData.seminars.map((seminar, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={seminar}
                        onChange={(e) => handleSeminarChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Seminar/Workshop details"
                      />
                      <button
                        onClick={() => handleRemoveSeminar(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddSeminar}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Seminar/Workshop
                  </button>
                </div>
              </div>

              {/* Conferences */}
              <div>
                <h4 className="font-semibold text-blue-800 mb-3 text-lg">Conferences</h4>
                <div className="space-y-3">
                  {editData.conferences.map((conference, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={conference}
                        onChange={(e) => handleConferenceChange(index, e.target.value)}
                        className="flex-1 p-2 border rounded text-base"
                        placeholder="Conference details"
                      />
                      <button
                        onClick={() => handleRemoveConference(index)}
                        className="text-red-600 hover:text-red-800 px-2"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddConference}
                    className="w-full p-2 border border-blue-600 text-blue-700 rounded hover:bg-blue-50 text-base"
                  >
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Conference
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

export default Events;
