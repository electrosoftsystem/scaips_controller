import axios from "axios";

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL
      ? `${import.meta.env.VITE_API_BASE_URL}`
      : "/api";
    this.api = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await this.api.post("/auth/refresh-token");
            const { accessToken } = response.data.tokens;

            localStorage.setItem("accessToken", accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            return this.api(originalRequest);
          } catch (refreshError) {
            // Redirect to login if refresh fails
            localStorage.removeItem("accessToken");
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  }

  async getIndustryProfile(routeId) {
    try {
      const endpoint = routeId ? `/industry/${routeId}` : "/industry/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("API Error in getIndustryProfile:", error.response?.data);
      throw new Error(
        error.response?.data?.message || "Failed to get industry profile"
      );
    }
  }

  async getCurrentIndustryProfile() {
    try {
      const response = await this.api.get("/industries/me");
      return response.data;
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error(
          "API Error in getCurrentIndustryProfile:",
          error.response?.data
        );
      }
      throw new Error(
        error.response?.data?.message ||
          "Failed to get current industry profile. Make sure you're logged in as an industry."
      );
    }
  }

  async getIndustryById(industryId) {
    try {
      const response = await this.api.get(`/industries/${industryId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch specific industry"
      );
    }
  }

  async updateIndustryProfile(industryData) {
    try {
      const response = await this.api.put("/industries/me", industryData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update industry profile"
      );
    }
  }

  async updateStudentAdditionalInfo(studentId, data) {
    try {
      const response = await instustryapiService.api.put(
        `/students/${studentId}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student info"
      );
    }
  }

  async uploadProfileImage(formData) {
    if (!formData || !formData.has("profile_picture")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/students/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadCoverImage(formData) {
    if (!formData || !formData.has("cover_picture")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/students/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadIndustryCoverImage(formData) {
    if (!formData || !formData.has("coverImage")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/industries/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadIndustryProfileImage(formData) {
    if (!formData || !formData.has("profileImage")) {
      throw new Error("No file uploaded");
    }
    return this.api.post("/industries/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async sendPingRequest(studentId) {
    try {
      const response = await this.api.post(`/students/ping/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to send ping request"
      );
    }
  }

  async getPingRequests() {
    try {
      const response = await this.api.get("/students/ping-requests");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch ping requests"
      );
    }
  }

  async sendIndustryPingRequest(industryId) {
    try {
      const response = await this.api.post(`/industries/ping/${industryId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to send ping request to industry"
      );
    }
  }

  async getIndustryPingRequests() {
    try {
      const response = await this.api.get("/industries/ping-requests");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch industry ping requests"
      );
    }
  }

  async acceptIndustryPingRequest(requestId) {
    try {
      const response = await this.api.put(
        `/industries/ping/${requestId}/accept`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to accept industry ping request"
      );
    }
  }

  async rejectIndustryPingRequest(requestId) {
    try {
      const response = await this.api.put(
        `/industries/ping/${requestId}/reject`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to reject industry ping request"
      );
    }
  }

  async getIndustryConnections() {
    try {
      const response = await this.api.get("/industries/connections");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch industry connections"
      );
    }
  }

  async getIndustryConnectionCount(industryId = null) {
    try {
      const url = industryId
        ? `/industries/connections/count?industryId=${industryId}`
        : "/industries/connections/count";
      const response = await this.api.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch industry connection count"
      );
    }
  }

  async checkIndustryPingStatus(industryId) {
    try {
      const response = await this.api.get(
        `/industries/ping-status/${industryId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check industry ping status"
      );
    }
  }
}

export const getSectors = () => axios.get("/api/sectors");
export const createSector = (data) => axios.post("/api/industry/sectors", data);
export const updateSector = (id, data) => axios.put(`/api/sectors/${id}`, data);
export const deleteSector = (id) => axios.delete(`/api/sectors/${id}`);

const instustryapiService = new ApiService();

export default instustryapiService;
