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
  Briefcase,
  ChartBar,
  Target,
  Award,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IndustryOverview = ({ isOwner }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditMarketModalOpen, setIsEditMarketModalOpen] = useState(false);
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
      "Our industry leads technological innovation and digital transformation across sectors. We focus on developing cutting-edge solutions that empower businesses and improve lives. Through collaborative partnerships and continuous innovation, we're shaping the future of technology and business.",
    website: "https://techindustry.org",
    verified: true,
    verifiedDate: "June 26, 2025",
    sector: "Information Technology",
    industrySize: "500+ Companies",
    activeMembers: "25,000+",
    headquarters: "Silicon Valley, CA",
    specializations: [
      "artificial intelligence",
      "cloud computing",
      "cybersecurity",
      "data analytics",
      "blockchain",
      "IoT",
      "enterprise software",
      "digital transformation",
      "machine learning",
      "automation",
    ],
    customFields: [], // Array of custom fields added by user
    marketData: [
      {
        name: "North America",
        marketShare: "35%",
        growth: "12.5% YoY",
        keyPlayers: "150+ Companies",
      },
      {
        name: "Europe",
        marketShare: "28%",
        growth: "10.2% YoY",
        keyPlayers: "120+ Companies",
      },
      {
        name: "Asia Pacific",
        marketShare: "25%",
        growth: "15.8% YoY",
        keyPlayers: "200+ Companies",
      },
      {
        name: "Rest of World",
        marketShare: "12%",
        growth: "8.5% YoY",
        keyPlayers: "80+ Companies",
      },
    ],
    locations: [
      {
        name: "Silicon Valley Hub",
        address: "Palo Alto, CA 94301, United States",
        type: "HQ",
        employees: "2000+",
        coordinates: [37.4419, -122.143], // Palo Alto, CA
        ceo: "Sarah Johnson",
        contact: {
          phone: "+1 650 555 0100",
          email: "hub@techindustry.org",
        },
        image:
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        customFields: [],
      },
      {
        name: "London Office",
        address: "Canary Wharf, London E14 5AB, United Kingdom",
        type: "Office",
        employees: "800+",
        coordinates: [51.5054, -0.0235], // London, UK
        ceo: "James Mitchell",
        contact: {
          phone: "+44 20 7946 0958",
          email: "london@techindustry.org",
        },
        image:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
        customFields: [],
      },
      {
        name: "Singapore Office",
        address: "Marina Bay, Singapore 018956",
        type: "Office",
        employees: "600+",
        coordinates: [1.2966, 103.8764], // Singapore
        ceo: "Li Wei Chen",
        contact: {
          phone: "+65 6123 4567",
          email: "singapore@techindustry.org",
        },
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
        customFields: [],
      },
    ],
  });
  const [editData, setEditData] = useState({ ...aboutData });
  const { routeId } = useParams();

  const handleEditClick = () => {
    setEditData({ ...aboutData });
    setIsEditModalOpen(true);
  };

  const BASE_URL = "/api/industry";

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const industryId = routeId;
        if (!industryId) return;

        const response = await axios.get(`${BASE_URL}/about/${industryId}`);
        setAboutData(response.data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchAbout();
  }, [routeId]);

  const handleSaveAbout = async () => {
    try {
      // Assume industryId is available (from context, auth, or session)
      const industryId = routeId;

      if (!industryId) {
        console.error("Industry ID not found");
        return;
      }

      // Send to backend
      await axios.post(`${BASE_URL}/about`, {
        industryId,
        ...editData,
      });

      setAboutData({ ...editData });
      setIsEditModalOpen(false);
      alert("About data saved successfully!");
    } catch (error) {
      console.error("Error saving about data:", error);
    }
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
    } else if (field === "specializations") {
      setEditData((prev) => ({
        ...prev,
        [field]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setEditData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleEditMarketClick = () => {
    setEditData({ ...aboutData });
    setIsEditMarketModalOpen(true);
  };

  const handleSaveMarket = () => {
    setAboutData({ ...editData });
    setIsEditMarketModalOpen(false);
  };

  const handleCancelMarketEdit = () => {
    setEditData({ ...aboutData });
    setIsEditMarketModalOpen(false);
  };

  const handleMarketChange = (index, field, value) => {
    setEditData((prev) => ({
      ...prev,
      marketData: prev.marketData.map((market, i) =>
        i === index ? { ...market, [field]: value } : market
      ),
    }));
  };

  const handleAddMarket = () => {
    setEditData((prev) => ({
      ...prev,
      marketData: [
        ...prev.marketData,
        {
          name: "",
          marketShare: "",
          growth: "",
          keyPlayers: "",
        },
      ],
    }));
  };

  const handleRemoveMarket = (index) => {
    setEditData((prev) => ({
      ...prev,
      marketData: prev.marketData.filter((_, i) => i !== index),
    }));
  };

  // Location handlers
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

  return (
    <>
      <div
        className="p-6 max-w-4xl mx-auto"
        style={{ backgroundColor: "#F7FAFC" }}
      >
        {/* About Section */}
        <div
          className="rounded-lg shadow-sm mb-6"
          style={{ backgroundColor: "white" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#B5D3E7" }}
          >
            <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
              Industry Overview
            </h2>
            {isOwner && (
              <button
                onClick={handleEditClick}
                className="p-2 rounded-full transition-colors"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DCE8F2";
                  e.target.style.color = "#6EA9CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.7";
                }}
                title="Edit industry overview"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Overview Content */}
          <div className="p-6">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#1F2D3D" }}
            >
              Overview
            </h3>
            <p
              className="leading-relaxed mb-6"
              style={{ color: "#1F2D3D", opacity: "0.8" }}
            >
              {aboutData.overview || null}
            </p>

            {/* Website */}
            <div className="mb-6">
              <h4
                className="text-sm font-medium mb-2"
                style={{ color: "#1F2D3D" }}
              >
                Industry Portal
              </h4>
              <a
                href={aboutData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 transition-colors"
                style={{ color: "#6EA9CB" }}
                onMouseEnter={(e) => (e.target.style.color = "#5a8fa8")}
                onMouseLeave={(e) => (e.target.style.color = "#6EA9CB")}
              >
                {aboutData.website}
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Verified Status */}
            {aboutData.verified && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className="text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Verified Industry Data
                  </h4>
                  <Shield className="w-4 h-4" style={{ color: "#6EA9CB" }} />
                </div>
                <p
                  className="text-sm"
                  style={{ color: "#1F2D3D", opacity: "0.6" }}
                >
                  Last updated: {aboutData.verifiedDate}
                </p>
              </div>
            )}

            {/* Industry Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sector */}
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Sector
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "#1F2D3D", opacity: "0.8" }}
                >
                  {aboutData.sector}
                </p>
              </div>

              {/* Industry Size */}
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Industry Size
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "#1F2D3D", opacity: "0.8" }}
                >
                  {aboutData.industrySize}
                </p>
                <p
                  className="text-sm flex items-center gap-1"
                  style={{ color: "#1F2D3D", opacity: "0.6" }}
                >
                  {aboutData.activeMembers} active professionals
                  <Users className="w-3 h-3" />
                </p>
              </div>

              {/* Main Hub */}
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Main Hub
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "#1F2D3D", opacity: "0.8" }}
                >
                  {aboutData.headquarters}
                </p>
              </div>

              {/* Specializations */}
              <div>
                <h4
                  className="text-sm font-medium mb-1"
                  style={{ color: "#1F2D3D" }}
                >
                  Key Specializations
                </h4>
                <div className="flex flex-wrap gap-1">
                  {aboutData.specializations.map((specialization, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
                    >
                      {specialization}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Fields Display */}
            {aboutData.customFields && aboutData.customFields.length > 0 && (
              <div className="mt-6">
                <h4
                  className="text-sm font-medium mb-3"
                  style={{ color: "#1F2D3D" }}
                >
                  Additional Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {aboutData.customFields.map((field, index) => (
                    <div key={field.id || index}>
                      <h5
                        className="text-sm font-medium mb-1"
                        style={{ color: "#1F2D3D" }}
                      >
                        {field.label}
                      </h5>
                      <p
                        className="text-sm"
                        style={{ color: "#1F2D3D", opacity: "0.8" }}
                      >
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#B5D3E7" }} />

        {/* Locations Section */}
        <div
          className="rounded-lg shadow-sm mb-6"
          style={{ backgroundColor: "white" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#B5D3E7" }}
          >
            <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
              Industry Locations
            </h2>
            {isOwner && (
              <button
                onClick={handleEditLocationsClick}
                className="p-2 rounded-full transition-colors"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DCE8F2";
                  e.target.style.color = "#6EA9CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.7";
                }}
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
                  className="border rounded-lg p-4"
                  style={{ borderColor: "#B5D3E7" }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium" style={{ color: "#1F2D3D" }}>
                      {location.name}
                    </h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
                    >
                      {location.type}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "#1F2D3D", opacity: "0.4" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    >
                      {location.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users
                      className="w-4 h-4"
                      style={{ color: "#1F2D3D", opacity: "0.4" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                    >
                      {location.employees} employees
                    </p>
                  </div>

                  {/* Display Custom Fields */}
                  {location.customFields &&
                    location.customFields.length > 0 && (
                      <div
                        className="mt-3 pt-3 border-t"
                        style={{ borderColor: "#DCE8F2" }}
                      >
                        {location.customFields.map((field, fieldIndex) => (
                          <div
                            key={field.id || fieldIndex}
                            className="flex items-center gap-2 mb-1"
                          >
                            <div
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: "#6EA9CB" }}
                            ></div>
                            <span
                              className="text-xs font-medium"
                              style={{ color: "#1F2D3D", opacity: "0.8" }}
                            >
                              {field.label}:
                            </span>
                            <span
                              className="text-xs"
                              style={{ color: "#1F2D3D", opacity: "0.6" }}
                            >
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

        <hr className="my-4" style={{ borderColor: "#B5D3E7" }} />

        {/* Interactive Map Section */}
        <div
          className="rounded-lg shadow-sm mb-6"
          style={{ backgroundColor: "white" }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#B5D3E7" }}
          >
            <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
              Global Industry Presence Map
            </h2>
            <Globe
              className="w-6 h-6"
              style={{ color: "#1F2D3D", opacity: "0.4" }}
            />
          </div>

          {/* Map Container */}
          <div className="p-6">
            <div
              className="h-96 rounded-lg overflow-hidden border"
              style={{ borderColor: "#B5D3E7" }}
            >
              <MapContainer
                center={[37.4419, -122.143]} // Center on Silicon Valley
                zoom={2}
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
                            <h3
                              className="font-medium text-sm truncate"
                              style={{ color: "#1F2D3D" }}
                            >
                              {location.name}
                            </h3>
                            <span
                              className="text-xs px-1 py-0.5 rounded"
                              style={{
                                backgroundColor: "#DCE8F2",
                                color: "#1F2D3D",
                              }}
                            >
                              {location.type}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <div className="flex items-start gap-1">
                            <MapPin
                              className="w-3 h-3 mt-0.5 flex-shrink-0"
                              style={{ color: "#1F2D3D", opacity: "0.4" }}
                            />
                            <p
                              className="leading-tight"
                              style={{ color: "#1F2D3D", opacity: "0.6" }}
                            >
                              {location.address}
                            </p>
                          </div>

                          <div className="flex items-center gap-1">
                            <Users
                              className="w-3 h-3"
                              style={{ color: "#1F2D3D", opacity: "0.4" }}
                            />
                            <p style={{ color: "#1F2D3D", opacity: "0.6" }}>
                              {location.employees} employees
                            </p>
                          </div>

                          <div
                            className="border-t pt-1 mt-1"
                            style={{ borderColor: "#DCE8F2" }}
                          >
                            <p
                              className="font-medium text-xs"
                              style={{ color: "#1F2D3D" }}
                            >
                              Regional Head: {location.ceo}
                            </p>
                          </div>

                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1">
                              <Phone
                                className="w-3 h-3"
                                style={{ color: "#1F2D3D", opacity: "0.4" }}
                              />
                              <a
                                href={`tel:${location.contact.phone}`}
                                className="text-xs truncate transition-colors"
                                style={{ color: "#6EA9CB" }}
                                onMouseEnter={(e) =>
                                  (e.target.style.color = "#5a8fa8")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.color = "#6EA9CB")
                                }
                              >
                                {location.contact.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail
                                className="w-3 h-3"
                                style={{ color: "#1F2D3D", opacity: "0.4" }}
                              />
                              <a
                                href={`mailto:${location.contact.email}`}
                                className="text-xs truncate transition-colors"
                                style={{ color: "#6EA9CB" }}
                                onMouseEnter={(e) =>
                                  (e.target.style.color = "#5a8fa8")
                                }
                                onMouseLeave={(e) =>
                                  (e.target.style.color = "#6EA9CB")
                                }
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
            <div
              className="mt-4 flex flex-wrap gap-4 text-sm"
              style={{ color: "#1F2D3D", opacity: "0.6" }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#6EA9CB" }}
                ></div>
                <span>Industry Locations</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  className="w-4 h-4"
                  style={{ color: "#1F2D3D", opacity: "0.4" }}
                />
                <span>Click markers for location details</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#B5D3E7" }} />

        {/* Market Presence Section */}
        <div
          className="rounded-lg shadow-sm"
          style={{ backgroundColor: "white" }}
        >
          <div
            className="flex items-center justify-between p-6 border-b"
            style={{ borderColor: "#B5D3E7" }}
          >
            <h2 className="text-xl font-semibold" style={{ color: "#1F2D3D" }}>
              Market Presence
            </h2>
            {isOwner && (
              <button
                onClick={handleEditMarketClick}
                className="p-2 rounded-full transition-colors"
                style={{ color: "#1F2D3D", opacity: "0.7" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#DCE8F2";
                  e.target.style.color = "#6EA9CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.7";
                }}
                title="Edit market data"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aboutData.marketData.map((market, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4"
                  style={{ borderColor: "#B5D3E7" }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium" style={{ color: "#1F2D3D" }}>
                      {market.name}
                    </h3>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "#6EA9CB" }}
                    >
                      {market.marketShare} Market Share
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        className="w-4 h-4"
                        style={{ color: "#6EA9CB" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "#1F2D3D", opacity: "0.6" }}
                      >
                        {market.growth}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building
                        className="w-4 h-4"
                        style={{ color: "#1F2D3D", opacity: "0.4" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "#1F2D3D", opacity: "0.6" }}
                      >
                        {market.keyPlayers}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Overview Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Industry Overview
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.5" }}
                  />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Overview
                </label>
                <textarea
                  value={editData.overview}
                  onChange={(e) =>
                    handleInputChange("overview", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  placeholder="Enter industry overview"
                />
              </div>

              {/* Website */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Industry Portal
                </label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  placeholder="Enter website URL"
                />
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Sector
                  </label>
                  <input
                    type="text"
                    value={editData.sector}
                    onChange={(e) =>
                      handleInputChange("sector", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    placeholder="Enter industry sector"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Industry Size
                  </label>
                  <input
                    type="text"
                    value={editData.industrySize}
                    onChange={(e) =>
                      handleInputChange("industrySize", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    placeholder="Enter industry size"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Active Members
                  </label>
                  <input
                    type="text"
                    value={editData.activeMembers}
                    onChange={(e) =>
                      handleInputChange("activeMembers", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    placeholder="Enter number of active members"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#1F2D3D" }}
                  >
                    Main Hub
                  </label>
                  <input
                    type="text"
                    value={editData.headquarters}
                    onChange={(e) =>
                      handleInputChange("headquarters", e.target.value)
                    }
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    placeholder="Enter main hub location"
                  />
                </div>
              </div>

              {/* Specializations */}
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "#1F2D3D" }}
                >
                  Key Specializations (comma-separated)
                </label>
                <textarea
                  value={editData.specializations.join(", ")}
                  onChange={(e) =>
                    handleInputChange("specializations", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#B5D3E7",
                    color: "#1F2D3D",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                  onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                  placeholder="Enter specializations separated by commas"
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
                    className="rounded"
                    style={{
                      borderColor: "#B5D3E7",
                      color: "#6EA9CB",
                      accentColor: "#6EA9CB",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Verified Industry Data
                  </span>
                </label>

                {editData.verified && (
                  <div className="flex-1">
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Last Updated Date
                    </label>
                    <input
                      type="text"
                      value={editData.verifiedDate}
                      onChange={(e) =>
                        handleInputChange("verifiedDate", e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded-lg outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="Enter verification date"
                    />
                  </div>
                )}
              </div>

              {/* Custom Fields Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label
                    className="block text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Custom Fields
                  </label>
                  <button
                    type="button"
                    onClick={handleAddCustomField}
                    className="text-sm font-medium transition-colors"
                    style={{ color: "#6EA9CB" }}
                    onMouseEnter={(e) => (e.target.style.color = "#5a8fa8")}
                    onMouseLeave={(e) => (e.target.style.color = "#6EA9CB")}
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
                            className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                            style={{
                              backgroundColor: "white",
                              borderColor: "#B5D3E7",
                              color: "#1F2D3D",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = "#6EA9CB")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = "#B5D3E7")
                            }
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
                            className="w-full px-3 py-2 border rounded-lg outline-none text-sm"
                            style={{
                              backgroundColor: "white",
                              borderColor: "#B5D3E7",
                              color: "#1F2D3D",
                            }}
                            onFocus={(e) =>
                              (e.target.style.borderColor = "#6EA9CB")
                            }
                            onBlur={(e) =>
                              (e.target.style.borderColor = "#B5D3E7")
                            }
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomField(field.id)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: "#dc2626" }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#fef2f2";
                            e.target.style.color = "#b91c1c";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#dc2626";
                          }}
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

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAbout}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
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

      {/* Edit Market Modal */}
      {isEditMarketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Market Presence
                </h2>
                <button
                  onClick={handleCancelMarketEdit}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.5" }}
                  />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editData.marketData.map((market, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-4"
                  style={{ borderColor: "#B5D3E7" }}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "#1F2D3D" }}
                    >
                      Market Region {index + 1}
                    </h3>
                    {editData.marketData.length > 1 && (
                      <button
                        onClick={() => handleRemoveMarket(index)}
                        className="p-1 rounded-full transition-colors"
                        style={{ color: "#dc2626" }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#fef2f2";
                          e.target.style.color = "#b91c1c";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#dc2626";
                        }}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Region Name *
                      </label>
                      <input
                        type="text"
                        value={market.name}
                        onChange={(e) =>
                          handleMarketChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., North America, Europe"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Market Share *
                      </label>
                      <input
                        type="text"
                        value={market.marketShare}
                        onChange={(e) =>
                          handleMarketChange(
                            index,
                            "marketShare",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., 35%"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Growth
                      </label>
                      <input
                        type="text"
                        value={market.growth}
                        onChange={(e) =>
                          handleMarketChange(index, "growth", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., 12.5% YoY"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Key Players
                      </label>
                      <input
                        type="text"
                        value={market.keyPlayers}
                        onChange={(e) =>
                          handleMarketChange(
                            index,
                            "keyPlayers",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., 150+ Companies"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Add New Market Region Button */}
              <button
                onClick={handleAddMarket}
                className="w-full py-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  opacity: "0.6",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#6EA9CB";
                  e.target.style.color = "#6EA9CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#B5D3E7";
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.6";
                }}
              >
                <span className="text-xl">+</span>
                Add New Market Region
              </button>
            </div>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelMarketEdit}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveMarket}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
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

      {/* Edit Locations Modal */}
      {isEditLocationsModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  Edit Industry Locations
                </h2>
                <button
                  onClick={handleCancelLocationsEdit}
                  className="p-2 rounded-full transition-colors"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#DCE8F2")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <X
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.5" }}
                  />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {editData.locations.map((location, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 space-y-4"
                  style={{ borderColor: "#B5D3E7" }}
                >
                  <div className="flex justify-between items-start">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: "#1F2D3D" }}
                    >
                      Location {index + 1}
                    </h3>
                    {editData.locations.length > 1 && (
                      <button
                        onClick={() => handleRemoveLocation(index)}
                        className="p-1 rounded-full transition-colors"
                        style={{ color: "#dc2626" }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#fef2f2";
                          e.target.style.color = "#b91c1c";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "transparent";
                          e.target.style.color = "#dc2626";
                        }}
                        title="Remove location"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Location Name *
                      </label>
                      <input
                        type="text"
                        value={location.name}
                        onChange={(e) =>
                          handleLocationChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., Headquarters, New York Office"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Type *
                      </label>
                      <select
                        value={location.type}
                        onChange={(e) =>
                          handleLocationChange(index, "type", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      >
                        <option value="HQ">Headquarters</option>
                        <option value="Office">Office</option>
                        <option value="Branch">Branch</option>
                        <option value="Remote">Remote</option>
                        <option value="Co-working">Co-working Space</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Address *
                      </label>
                      <textarea
                        value={location.address}
                        onChange={(e) =>
                          handleLocationChange(index, "address", e.target.value)
                        }
                        rows={2}
                        className="w-full px-3 py-2 border rounded-lg outline-none resize-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="Enter full address"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
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
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., 50+, 1,000+"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
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
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., 37.4220, -122.0841"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Regional Head
                      </label>
                      <input
                        type="text"
                        value={location.ceo || ""}
                        onChange={(e) =>
                          handleLocationChange(index, "ceo", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="e.g., John Doe"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={location.image || ""}
                        onChange={(e) =>
                          handleLocationChange(index, "image", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
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
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ color: "#1F2D3D" }}
                      >
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
                        className="w-full px-3 py-2 border rounded-lg outline-none"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "#6EA9CB")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                        placeholder="office@company.com"
                      />
                    </div>
                  </div>

                  {/* Custom Fields for Location */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <label
                        className="block text-sm font-medium"
                        style={{ color: "#1F2D3D" }}
                      >
                        Custom Fields for this Location
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAddLocationCustomField(index)}
                        className="text-sm font-medium transition-colors"
                        style={{ color: "#6EA9CB" }}
                        onMouseEnter={(e) => (e.target.style.color = "#5a8fa8")}
                        onMouseLeave={(e) => (e.target.style.color = "#6EA9CB")}
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
                                  className="w-full px-2 py-1 border rounded text-sm outline-none"
                                  style={{
                                    backgroundColor: "#F7FAFC",
                                    borderColor: "#B5D3E7",
                                    color: "#1F2D3D",
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = "#6EA9CB";
                                    e.target.style.boxShadow =
                                      "0 0 0 1px #6EA9CB";
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = "#B5D3E7";
                                    e.target.style.boxShadow = "none";
                                  }}
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
                                  className="w-full px-2 py-1 border rounded text-sm outline-none"
                                  style={{
                                    backgroundColor: "#F7FAFC",
                                    borderColor: "#B5D3E7",
                                    color: "#1F2D3D",
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.borderColor = "#6EA9CB";
                                    e.target.style.boxShadow =
                                      "0 0 0 1px #6EA9CB";
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.borderColor = "#B5D3E7";
                                    e.target.style.boxShadow = "none";
                                  }}
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
                                className="p-1 rounded transition-colors"
                                style={{ color: "#dc2626" }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "#fef2f2";
                                  e.target.style.color = "#b91c1c";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor =
                                    "transparent";
                                  e.target.style.color = "#dc2626";
                                }}
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
                className="w-full py-3 border-2 border-dashed rounded-lg transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                  opacity: "0.6",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#6EA9CB";
                  e.target.style.color = "#6EA9CB";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#B5D3E7";
                  e.target.style.color = "#1F2D3D";
                  e.target.style.opacity = "0.6";
                }}
              >
                <span className="text-xl">+</span>
                Add New Location
              </button>
            </div>

            {/* Modal Footer */}
            <div
              className="px-6 py-4 border-t flex justify-end gap-3 rounded-b-xl"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancelLocationsEdit}
                className="px-4 py-2 border rounded-lg text-sm font-medium transition-colors"
                style={{
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                  color: "#1F2D3D",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLocations}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
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
    </>
  );
};

export default IndustryOverview;
