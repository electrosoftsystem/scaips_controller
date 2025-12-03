import React, { useEffect, useState } from "react";
import {
  Edit3,
  Building2,
  TrendingUp,
  MapPin,
  Users,
  X,
  Plus,
  Globe,
  ChartBar,
  DeleteIcon,
} from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const SectorCategory = ({ isOwner, industryData }) => {
  const [editingId, setEditingId] = useState(null);
  const [sectors, setSectors] = useState([]);

  const [editData, setEditData] = useState({
    name: "",
    description: "",
    companies: "",
    employment: "",
    growth: "",
    majorCities: "",
    color: "blue",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { routeId } = useParams();

  const BASE_URL = "/api/industry";

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const industryId = routeId; // or from props/context
        if (!industryId) return;

        const response = await axios.get(
          `${BASE_URL}/sectors?industryId=${industryId}`
        );
        setSectors(response.data);
      } catch (err) {
        console.error("Error fetching sectors:", err);
      }
    };

    fetchSectors();
  }, []);

  const handleEditClick = (sector) => {
    setSelectedSector(sector);
    setEditData({
      name: sector.name,
      description: sector.description,
      companies: sector.companies.toString(),
      employment: sector.employment,
      growth: sector.growth,
      majorCities: sector.majorCities.join(", "),
      color: sector.color,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (sector) => {
    try {
      await axios.delete(`${BASE_URL}/sectors/${sector?.id}`);

      const industryId = routeId;
      const response = await axios.get(
        `${BASE_URL}/sectors?industryId=${industryId}`
      );
      setSectors(response.data);

      alert("Sector Deleted");
    } catch (error) {
      console.error("❌ Error posting sectors:", error);
      alert("Failed to post sectors. Check console for details.");
    }
  };

  const handleAddNew = () => {
    setSelectedSector(null);
    setEditData({
      name: "",
      description: "",
      companies: "",
      employment: "",
      growth: "",
      majorCities: "",
      color: "blue",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const industryId = routeId;
      if (!industryId) return;

      const payload = {
        industryId,
        name: editData.name,
        description: editData.description,
        companies: parseInt(editData.companies),
        employment: editData.employment,
        growth: editData.growth,
        majorCities: editData.majorCities.split(",").map((c) => c.trim()),
        color: editData.color,
        icon: editData.icon || "🏢",
      };

      if (selectedSector) {
        await axios.put(`${BASE_URL}/sectors/${selectedSector.id}`, payload);
      } else {
        await axios.post(`${BASE_URL}/sectors`, payload);
      }

      // Fetch updated sectors for this industry
      const response = await axios.get(
        `${BASE_URL}/sectors?industryId=${industryId}`
      );
      setSectors(response.data);

      setIsModalOpen(false);
      setSelectedSector(null);
    } catch (error) {
      console.error("Error saving sector:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedSector(null);
  };

  return (
    <div
      className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      style={{ backgroundColor: "#F7FAFC" }}
    >
      {/* Header Section - Clean and Professional */}
      <div className="mb-10">
        <div className="flex justify-between items-center">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#1F2D3D" }}
            >
              Industry Sectors
            </h2>
          </div>
          {isOwner && (
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-lg transition-colors duration-200 shadow-sm hover:shadow"
              style={{ backgroundColor: "#6EA9CB" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#5a8fa8")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#6EA9CB")}
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Sector
            </button>
          )}
        </div>
      </div>

      {/* Sectors Grid - 2 cards per row */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {sectors.map((sector) => (
          <div
            key={sector.id}
            className="rounded-xl border transition-all duration-200 group"
            style={{
              backgroundColor: "white",
              borderColor: "#B5D3E7",
            }}
            onMouseEnter={(e) => (e.target.style.borderColor = "#6EA9CB")}
            onMouseLeave={(e) => (e.target.style.borderColor = "#B5D3E7")}
          >
            {/* Card Header */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div
                    className="text-3xl p-3 rounded-lg"
                    style={{ backgroundColor: "#DCE8F2" }}
                  >
                    {sector.icon}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-semibold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {sector.name}
                    </h3>
                    <div
                      className="inline-flex items-center mt-2 text-sm font-medium px-2.5 py-1 rounded-full"
                      style={{ color: "#1F2D3D", backgroundColor: "#DCE8F2" }}
                    >
                      <TrendingUp className="w-4 h-4 mr-1.5" />
                      {sector.growth} Growth
                    </div>
                  </div>
                </div>
                {isOwner && (
                  <div>
                    <button
                      onClick={() => handleEditClick(sector)}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#6EA9CB";
                        e.target.style.backgroundColor = "#DCE8F2";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#1F2D3D";
                        e.target.style.opacity = "0.6";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(sector)}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: "#1F2D3D", opacity: "0.6" }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "#6EA9CB";
                        e.target.style.backgroundColor = "#DCE8F2";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "#1F2D3D";
                        e.target.style.opacity = "0.6";
                        e.target.style.backgroundColor = "transparent";
                      }}
                    >
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>

              <p
                className="text-sm leading-relaxed border-t pt-4"
                style={{
                  color: "#1F2D3D",
                  opacity: "0.7",
                  borderColor: "#DCE8F2",
                }}
              >
                {sector.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Building2
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.4" }}
                  />
                  <div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {sector.companies.toLocaleString()}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#1F2D3D", opacity: "0.5" }}
                    >
                      Companies
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users
                    className="w-5 h-5"
                    style={{ color: "#1F2D3D", opacity: "0.4" }}
                  />
                  <div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: "#1F2D3D" }}
                    >
                      {sector.employment}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "#1F2D3D", opacity: "0.5" }}
                    >
                      Employees
                    </div>
                  </div>
                </div>
              </div>

              {/* Major Cities */}
              <div className="border-t pt-4" style={{ borderColor: "#DCE8F2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin
                    className="w-4 h-4"
                    style={{ color: "#1F2D3D", opacity: "0.4" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1F2D3D" }}
                  >
                    Major Hubs
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sector.majorCities.map((city, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm transition-colors duration-200"
                      style={{ backgroundColor: "#DCE8F2", color: "#1F2D3D" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#B5D3E7")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#DCE8F2")
                      }
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Keep existing modal code but update styling */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className="rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: "white" }}
          >
            <div className="p-6 border-b" style={{ borderColor: "#B5D3E7" }}>
              <div className="flex justify-between items-center">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "#1F2D3D" }}
                >
                  {selectedSector ? "Edit Sector" : "Add New Sector"}
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-full transition-colors"
                  style={{ color: "#1F2D3D", opacity: "0.4" }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "#6EA9CB";
                    e.target.style.backgroundColor = "#DCE8F2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "#1F2D3D";
                    e.target.style.opacity = "0.4";
                    e.target.style.backgroundColor = "transparent";
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form Fields - Modern, clean styling */}
            <form className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D" }}
                >
                  Basic Information
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Sector Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="e.g., Technology"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Growth Rate
                    </label>
                    <input
                      type="text"
                      name="growth"
                      value={editData.growth}
                      onChange={(e) =>
                        setEditData({ ...editData, growth: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="e.g., 12.5%"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-lg shadow-sm outline-none"
                    style={{
                      backgroundColor: "white",
                      borderColor: "#B5D3E7",
                      color: "#1F2D3D",
                      border: "1px solid #B5D3E7",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                    onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    placeholder="Brief description of the sector..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Number of Companies
                    </label>
                    <input
                      type="number"
                      name="companies"
                      value={editData.companies}
                      onChange={(e) =>
                        setEditData({ ...editData, companies: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="e.g., 2500"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Employment
                    </label>
                    <input
                      type="text"
                      name="employment"
                      value={editData.employment}
                      onChange={(e) =>
                        setEditData({ ...editData, employment: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="e.g., 5.2M"
                    />
                  </div>
                </div>
              </div>

              {/* Major Cities */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D" }}
                >
                  Major Hubs
                </h3>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    style={{ color: "#1F2D3D" }}
                  >
                    Major Cities
                  </label>
                  <div
                    className="flex flex-wrap gap-2 p-3 rounded-lg border"
                    style={{
                      backgroundColor: "#F7FAFC",
                      borderColor: "#B5D3E7",
                    }}
                  >
                    {editData.majorCities.split(",").map((city, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm border"
                        style={{
                          backgroundColor: "white",
                          borderColor: "#B5D3E7",
                          color: "#1F2D3D",
                        }}
                      >
                        {city}
                        <button
                          type="button"
                          onClick={() => {
                            const cities = editData.majorCities.split(",");
                            cities.splice(index, 1);
                            setEditData({
                              ...editData,
                              majorCities: cities.join(","),
                            });
                          }}
                          className="ml-2 transition-colors"
                          style={{ color: "#1F2D3D", opacity: "0.4" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#dc2626")
                          }
                          onMouseLeave={(e) => {
                            e.target.style.color = "#1F2D3D";
                            e.target.style.opacity = "0.4";
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={editData.newCity}
                      onChange={(e) =>
                        setEditData({ ...editData, newCity: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          editData.newCity.trim() !== ""
                        ) {
                          setEditData({
                            ...editData,
                            majorCities: `${
                              editData.majorCities
                            }, ${editData.newCity.trim()}`,
                            newCity: "",
                          });
                          e.preventDefault();
                        }
                      }}
                      className="flex-1 min-w-[150px] bg-transparent border-0 text-sm p-0 outline-none"
                      style={{ color: "#1F2D3D" }}
                      placeholder="Type and press Enter to add..."
                    />
                  </div>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "#1F2D3D", opacity: "0.5" }}
                  >
                    Press Enter to add a new city
                  </p>
                </div>
              </div>

              {/* Visual */}
              <div className="space-y-4">
                <h3
                  className="text-sm font-medium"
                  style={{ color: "#1F2D3D" }}
                >
                  Visual
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Icon
                    </label>
                    <input
                      type="text"
                      name="icon"
                      value={editData.icon}
                      onChange={(e) =>
                        setEditData({ ...editData, icon: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                      placeholder="Icon emoji or symbol"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      style={{ color: "#1F2D3D" }}
                    >
                      Color Theme
                    </label>
                    <select
                      name="color"
                      value={editData.color}
                      onChange={(e) =>
                        setEditData({ ...editData, color: e.target.value })
                      }
                      className="w-full rounded-lg shadow-sm outline-none"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#B5D3E7",
                        color: "#1F2D3D",
                        border: "1px solid #B5D3E7",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6EA9CB")}
                      onBlur={(e) => (e.target.style.borderColor = "#B5D3E7")}
                    >
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="purple">Purple</option>
                      <option value="orange">Orange</option>
                      <option value="red">Red</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>

            <div
              className="px-6 py-4 border-t flex justify-end gap-3"
              style={{ backgroundColor: "#F7FAFC", borderColor: "#B5D3E7" }}
            >
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium border rounded-lg transition-colors"
                style={{
                  color: "#1F2D3D",
                  backgroundColor: "#DCE8F2",
                  borderColor: "#B5D3E7",
                }}
                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.target.style.opacity = "1")}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
                style={{ backgroundColor: "#6EA9CB" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5a8fa8")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#6EA9CB")
                }
              >
                {selectedSector ? "Save Changes" : "Add Sector"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorCategory;
