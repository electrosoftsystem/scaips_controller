import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Edit,
  Save,
  X,
  Building,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  Shield,
  ExternalLink,
  Phone,
  Mail,
  EyeOff,
} from "lucide-react";

const StartupEcosystemOverview = ({ isOwner, startupData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditLocationsModalOpen, setIsEditLocationsModalOpen] =
    useState(false);

  // Fix leaflet default markers
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }, []);

  const [aboutData, setAboutData] = useState({
    overview:
      "A problem isn't truly solved until it's solved for all. Startups build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.",
    website: "https://mystartup.com/3DLEokh",
    verified: true,
    verifiedDate: "August 16, 2023",
    industry: "Software Development",
    companySize: "10,001+ employees",
    associatedMembers: "310,150",
    headquarters: "Mountain View, CA",
    specialties: [
      "search",
      "ads",
      "mobile",
      "android",
      "online video",
      "apps",
      "machine learning",
      "virtual reality",
      "cloud",
      "hardware",
      "artificial intelligence",
      "youtube",
      "software",
    ],
    customFields: [], // Array of custom fields added by user
    locations: [
      {
        name: "Jalgaon Office",
        address: "IT Park, Jalgaon, Maharashtra 425001, India",
        type: "Office",
        employees: "150+",
        coordinates: [21.0077, 75.5626], // Jalgaon, Maharashtra
        ceo: "Raj Patil",
        contact: {
          phone: "+91 257 2251000",
          email: "jalgaon@mystartup.com",
        },
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=150&fit=crop",
        customFields: [],
      },
      {
        name: "Pune Office",
        address: "Hinjewadi IT Park, Pune, Maharashtra 411057, India",
        type: "HQ",
        employees: "500+",
        coordinates: [18.5204, 73.8567], // Pune, Maharashtra
        ceo: "Priya Sharma",
        contact: {
          phone: "+91 20 6710 5000",
          email: "pune@mystartup.com",
        },
        image:
          "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=200&h=150&fit=crop",
        customFields: [],
      },
      {
        name: "Nashik Office",
        address: "MIDC Area, Nashik, Maharashtra 422010, India",
        type: "Office",
        employees: "200+",
        coordinates: [19.9975, 73.7898], // Nashik, Maharashtra
        ceo: "Amit Deshmukh",
        contact: {
          phone: "+91 253 2351000",
          email: "nashik@mystartup.com",
        },
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=150&fit=crop",
        customFields: [],
      },
    ],
  });
  const [editData, setEditData] = useState({ ...aboutData });

  const handleEditClick = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(true);
  };

  const handleSaveAbout = () => {
    setAboutData({ ...editData });
    setIsEditModalOpen(false);
  };

  const handleCancelEdit = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else if (field === "specialties") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditLocationsClick = () => {
    setEditData({ ...aboutData });
    setIsEditLocationsModalOpen(true);
  };

  const handleSaveLocations = () => {
    setAboutData({ ...editData });
    setIsEditLocationsModalOpen(false);
  };

  const handleCancelLocationsEdit = () => {
    setEditData({ ...aboutData });
    setIsEditLocationsModalOpen(false);
  };

  const handleLocationChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) => {
        if (i === index) {
          if (field.startsWith("contact.")) {
            const contactField = field.split(".")[1];
            return {
              ...location,
              contact: {
                ...location.contact,
                [contactField]: value,
              },
            };
          } else if (field === "coordinates") {
            // Parse coordinates from string "lat,lng"
            const coords = value
              .split(",")
              .map((coord) => parseFloat(coord.trim()));
            return {
              ...location,
              [field]: coords.length === 2 ? coords : [0, 0],
            };
          }
          return { ...location, [field]: value };
        }
        return location;
      }),
    }));
  };

  const handleAddLocation = () => {
    setEditData((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        {
          name: "",
          address: "",
          type: "Office",
          employees: "",
          coordinates: [0, 0],
          ceo: "",
          contact: {
            phone: "",
            email: "",
          },
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
          customFields: [], // Array of custom fields for each location
        },
      ],
    }));
  };

  const handleRemoveLocation = (index) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  // Custom fields handlers for About section
  const handleAddCustomField = () => {
    setEditData((prev) => ({
      ...prev,
      customFields: [
        ...(prev.customFields || []),
        { id: Date.now(), label: "", value: "" },
      ],
    }));
  };

  const handleCustomFieldChange = (fieldId, property, value) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.map((field) =>
        field.id === fieldId ? { ...field, [property]: value } : field
      ),
    }));
  };

  const handleRemoveCustomField = (fieldId) => {
    setEditData((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((field) => field.id !== fieldId),
    }));
  };

  // Custom fields handlers for Locations
  const handleAddLocationCustomField = (locationIndex) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) =>
        i === locationIndex
          ? {
              ...location,
              customFields: [
                ...(location.customFields || []),
                { id: Date.now(), label: "", value: "" },
              ],
            }
          : location
      ),
    }));
  };

  const handleLocationCustomFieldChange = (
    locationIndex,
    fieldId,
    property,
    value
  ) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) =>
        i === locationIndex
          ? {
              ...location,
              customFields: location.customFields.map((field) =>
                field.id === fieldId ? { ...field, [property]: value } : field
              ),
            }
          : location
      ),
    }));
  };

  const handleRemoveLocationCustomField = (locationIndex, fieldId) => {
    setEditData((prev) => ({
      ...prev,
      locations: prev.locations.map((location, i) =>
        i === locationIndex
          ? {
              ...location,
              customFields: location.customFields.filter(
                (field) => field.id !== fieldId
              ),
            }
          : location
      ),
    }));
  };

  const handleHideSection = () => {
    // Create a custom event to notify the parent component to hide this section
    const event = new CustomEvent("hideNavigation", {
      detail: {
        id: "startup-ecosystem", // This matches the id in navigationItems
      },
    });
    window.dispatchEvent(event);

    // Show a feedback to the user
    alert("This section will be hidden from the navigation bar");
  };

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        {/* About Section */}
        <div className="bg-white rounded-lg mb-6">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">About</h2>
            <div className="flex space-x-2">
              {isOwner && (
                <>
                  <button
                    onClick={handleHideSection}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors"
                    title="Hide from navigation"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleEditClick}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    title="Edit about section"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Overview */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              {aboutData.overview}
            </p>

            {/* Website */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-2">
                Website
              </h4>
              <a
                href={aboutData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
              >
                {aboutData.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verified Page */}
            {aboutData.verified && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-sm font-medium text-gray-900">
                    Verified page
                  </h4>
                  <Shield className="w-4 h-4 text-gray-600" />
                </div>
                <p className="text-sm text-gray-600">
                  {aboutData.verifiedDate}
                </p>
              </div>
            )}

            {/* Company Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Industry */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Industry
                </h4>
                <p className="text-sm text-gray-700">{aboutData.industry}</p>
              </div>

              {/* Company Size */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Company size
                </h4>
                <p className="text-sm text-gray-700">{aboutData.companySize}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  {aboutData.associatedMembers} associated members
                  <Shield className="w-3 h-3" />
                </p>
              </div>

              {/* Headquarters */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Headquarters
                </h4>
                <p className="text-sm text-gray-700">
                  {aboutData.headquarters}
                </p>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Specialties
                </h4>
                <div className="flex flex-wrap gap-1">
                  {aboutData.specialties.map((specialty, index) => (
                    <span key={index} className="text-sm text-gray-700">
                      {specialty}
                      {index < aboutData.specialties.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Fields Display */}
            {aboutData.customFields && aboutData.customFields.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutData.customFields.map((field, index) => (
                    <div key={field.id || index}>
                      <h5 className="text-sm font-medium text-gray-900 mb-1">
                        {field.label}
                      </h5>
                      <p className="text-sm text-gray-700">{field.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <hr class="border-t border-gray-300 my-4" />
        {/* Locations Section */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Locations</h2>
            {isOwner && (
              <button
                onClick={handleEditLocationsClick}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit locations"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Locations List */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutData.locations.map((location, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">
                      {location.name}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {location.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">
                      {location.employees} employees
                    </p>
                  </div>

                  {/* Display Custom Fields */}
                  {location.customFields &&
                    location.customFields.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        {location.customFields.map((field, fieldIndex) => (
                          <div
                            key={field.id || fieldIndex}
                            className="flex items-center gap-2 mb-1"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                            <span className="text-xs font-medium text-gray-700">
                              {field.label}:
                            </span>
                            <span className="text-xs text-gray-600">
                              {field.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* Interactive Map Section */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Global Presence Map
            </h2>
            <Globe className="w-6 h-6 text-gray-400" />
          </div>

          {/* Map Container */}
          <div className="p-6">
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer
                center={[19.5, 74.5]} // Center on Maharashtra, India
                zoom={7}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {aboutData.locations.map((location, index) => (
                  <Marker key={index} position={location.coordinates}>
                    <Popup
                      maxWidth={220}
                      minWidth={220}
                      className="compact-popup"
                    >
                      <div className="p-1">
                        <div className="flex items-start gap-2 mb-2">
                          <img
                            src={location.image}
                            alt={location.name}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-sm truncate">
                              {location.name}
                            </h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                              {location.type}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-600 leading-tight">
                              {location.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-gray-400" />
                            <p className="text-gray-600">
                              {location.employees} employees
                            </p>
                          </div>

                          <div className="border-t pt-1 mt-1">
                            <p className="font-medium text-gray-900 text-xs">
                              CEO: {location.ceo}
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gray-400" />
                              <a
                                href={`tel:${location.contact.phone}`}
                                className="text-blue-600 hover:text-blue-700 text-xs truncate"
                              >
                                {location.contact.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-gray-400" />
                              <a
                                href={`mailto:${location.contact.email}`}
                                className="text-blue-600 hover:text-blue-700 text-xs truncate"
                              >
                                {location.contact.email}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Office Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Click markers for location details</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit About Information
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
              {/* Overview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overview
                </label>
                <textarea
                  value={editData.overview}
                  onChange={(e) =>
                    handleInputChange("overview", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter company overview"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Enter website URL"
                />
              </div>

              {/* Company Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={editData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter industry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Size
                  </label>
                  <input
                    type="text"
                    value={editData.companySize}
                    onChange={(e) =>
                      handleInputChange("companySize", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter company size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Associated Members
                  </label>
                  <input
                    type="text"
                    value={editData.associatedMembers}
                    onChange={(e) =>
                      handleInputChange("associatedMembers", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter number of associated members"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Headquarters
                  </label>
                  <input
                    type="text"
                    value={editData.headquarters}
                    onChange={(e) =>
                      handleInputChange("headquarters", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter headquarters location"
                  />
                </div>
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialties (comma-separated)
                </label>
                <textarea
                  value={editData.specialties.join(", ")}
                  onChange={(e) =>
                    handleInputChange("specialties", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                  placeholder="Enter specialties separated by commas"
                />
              </div>

              {/* Verified Status */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editData.verified}
                    onChange={(e) =>
                      handleInputChange("verified", e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Verified Page
                  </span>
                </label>

                {editData.verified && (
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verified Date
                    </label>
                    <input
                      type="text"
                      value={editData.verifiedDate}
                      onChange={(e) =>
                        handleInputChange("verifiedDate", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter verification date"
                    />
                  </div>
                )}
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    + Add Custom Field
                  </button>
                </div>

                {editData.customFields && editData.customFields.length > 0 && (
                  <div className="space-y-3">
                    {editData.customFields.map((field) => (
                      <div key={field.id} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) =>
                              handleCustomFieldChange(
                                field.id,
                                "label",
                                e.target.value
                              )
                            }
                            placeholder="Field Label (e.g., Founded, Revenue)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) =>
                              handleCustomFieldChange(
                                field.id,
                                "value",
                                e.target.value
                              )
                            }
                            placeholder="Field Value (e.g., 2020, $50M)"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomField(field.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove field"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                onClick={handleSaveAbout}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Locations Modal */}
      {isEditLocationsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Edit Locations
                </h2>
                <button
                  onClick={handleCancelLocationsEdit}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editData.locations.map((location, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">
                      Location {index + 1}
                    </h3>
                    {editData.locations.length > 1 && (
                      <button
                        onClick={() => handleRemoveLocation(index)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="Remove location"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location Name *
                      </label>
                      <input
                        type="text"
                        value={location.name}
                        onChange={(e) =>
                          handleLocationChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., Headquarters, New York Office"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        value={location.type}
                        onChange={(e) =>
                          handleLocationChange(index, "type", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      >
                        <option value="HQ">Headquarters</option>
                        <option value="Office">Office</option>
                        <option value="Branch">Branch</option>
                        <option value="Remote">Remote</option>
                        <option value="Co-working">Co-working Space</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        value={location.address}
                        onChange={(e) =>
                          handleLocationChange(index, "address", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="Enter full address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees
                      </label>
                      <input
                        type="text"
                        value={location.employees}
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            "employees",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., 50+, 1,000+"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Coordinates (lat, lng)
                      </label>
                      <input
                        type="text"
                        value={
                          location.coordinates
                            ? location.coordinates.join(", ")
                            : "0, 0"
                        }
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            "coordinates",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., 37.4220, -122.0841"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Regional CEO
                      </label>
                      <input
                        type="text"
                        value={location.ceo || ""}
                        onChange={(e) =>
                          handleLocationChange(index, "ceo", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="e.g., John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={location.image || ""}
                        onChange={(e) =>
                          handleLocationChange(index, "image", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={location.contact?.phone || ""}
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            "contact.phone",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={location.contact?.email || ""}
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            "contact.email",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="office@company.com"
                      />
                    </div>
                  </div>

                  {/* Custom Fields for Location */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Custom Fields for this Location
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddLocationCustomField(index)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        + Add Custom Field
                      </button>
                    </div>

                    {location.customFields &&
                      location.customFields.length > 0 && (
                        <div className="space-y-2">
                          {location.customFields.map((field) => (
                            <div
                              key={field.id}
                              className="flex gap-2 items-start"
                            >
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={field.label}
                                  onChange={(e) =>
                                    handleLocationCustomFieldChange(
                                      index,
                                      field.id,
                                      "label",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Label (e.g., Parking, Cafeteria)"
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                              </div>
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={(e) =>
                                    handleLocationCustomFieldChange(
                                      index,
                                      field.id,
                                      "value",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Value (e.g., Available, Yes)"
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveLocationCustomField(
                                    index,
                                    field.id
                                  )
                                }
                                className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                title="Remove field"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              ))}

              {/* Add New Location Button */}
              <button
                onClick={handleAddLocation}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                Add New Location
              </button>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={handleCancelLocationsEdit}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLocations}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
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

export default StartupEcosystemOverview;
