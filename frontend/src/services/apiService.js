import axios from "axios";

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL;

    this.api = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor - cookies sent automatically
    this.api.interceptors.request.use(
      (config) => {
        // No need to add token - withCredentials handles it
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - NO REFRESH TOKEN ENDPOINT
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If 401 Unauthorized, redirect to login
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (import.meta.env.NODE_ENV !== "production") {
            console.error("Authentication failed - redirecting to login");
          }

      
          return Promise.reject(error);
        }

        return Promise.reject(error);
      }
    );
  }

  async searchUsers(query) {
    try {
      const response = await this.api.get(
        `/search/users?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Search error:", error);
      }
      throw new Error(error.response?.data?.message || "Search failed");
    }
  }

  // Authentication methods
  async register(userData) {
    try {
      const response = await this.api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  }

  async login(credentials) {
    try {
      const response = await this.api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }

  // Google Authentication - Using redirect flow
  initiateGoogleLogin() {
    // Redirect to backend Google OAuth endpoint
    window.location.href = `${this.baseURL}/auth/google`;
  }

  // Handle Google OAuth callback (if needed)
  async handleGoogleCallback(code) {
    try {
      // Your backend handles the callback at /auth/google/callback
      // This method is here if you need to do additional processing
      const response = await this.api.get(`/auth/google/callback?code=${code}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Google authentication failed"
      );
    }
  }

  // Profile API methods using the new consolidated backend
  async getStudentProfileComplete() {
    try {
      const response = await this.api.get("/profile/complete");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get student profile"
      );
    }
  }

  async getStudentProfileSummary() {
    try {
      const response = await this.api.get("/profile/summary");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get profile summary"
      );
    }
  }

  // About section
  async getStudentAbout() {
    try {
      const response = await this.api.get("/profile/about");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get about section"
      );
    }
  }

  async getStudentConnection() {
    try {
      const response = await this.api.get("/profile/connection");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get about section"
      );
    }
  }

  async updateStudentAbout(aboutData) {
    try {
      const response = await this.api.put("/profile/about", aboutData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update about section"
      );
    }
  }

  // Experience section
  async getStudentExperiences() {
    try {
      const response = await this.api.get("/profile/experience");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get experiences"
      );
    }
  }

  async createStudentExperience(experienceData) {
    try {
      const response = await this.api.post(
        "/profile/experience",
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create experience"
      );
    }
  }

  async updateStudentExperience(experienceId, experienceData) {
    try {
      const response = await this.api.put(
        `/profile/experience/${experienceId}`,
        experienceData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update experience"
      );
    }
  }

  async deleteStudentExperience(experienceId) {
    try {
      const response = await this.api.delete(
        `/profile/experience/${experienceId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete experience"
      );
    }
  }

  // Education section
  async getStudentEducation() {
    try {
      const response = await this.api.get("/profile/education");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get education"
      );
    }
  }

  async createStudentEducation(educationData) {
    try {
      const response = await this.api.post("/profile/education", educationData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create education"
      );
    }
  }

  async updateStudentEducation(educationId, educationData) {
    try {
      const response = await this.api.put(
        `/profile/education/${educationId}`,
        educationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update education"
      );
    }
  }

  async deleteStudentEducation(educationId) {
    try {
      const response = await this.api.delete(
        `/profile/education/${educationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete education"
      );
    }
  }

  // Skills section
  async getStudentSkills() {
    try {
      const response = await this.api.get("/profile/skills");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get skills");
    }
  }

  async createStudentSkill(skillData) {
    try {
      const response = await this.api.post("/profile/skills", skillData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create skill"
      );
    }
  }

  async createStudentSkills(skillsData) {
    try {
      const response = await this.api.post("/profile/skills/batch", skillsData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create skills"
      );
    }
  }

  async updateStudentSkill(skillId, skillData) {
    try {
      const response = await this.api.put(
        `/profile/skills/${skillId}`,
        skillData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update skill"
      );
    }
  }

  async deleteStudentSkill(skillId) {
    try {
      const response = await this.api.delete(`/profile/skills/${skillId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete skill"
      );
    }
  }

  // Projects section
  async getStudentProjects() {
    try {
      const response = await this.api.get("/profile/projects");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get projects"
      );
    }
  }

  async createStudentProject(projectData) {
    try {
      const response = await this.api.post("/profile/projects", projectData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }

  async updateStudentProject(projectId, projectData) {
    try {
      const response = await this.api.put(
        `/profile/projects/${projectId}`,
        projectData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }

  async deleteStudentProject(projectId) {
    try {
      const response = await this.api.delete(`/profile/projects/${projectId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }

  // Courses section
  async getStudentCourses() {
    try {
      const response = await this.api.get("/profile/courses");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get courses");
    }
  }

  async createStudentCourse(courseData) {
    try {
      const response = await this.api.post("/profile/courses", courseData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create course"
      );
    }
  }

  async updateStudentCourse(courseId, courseData) {
    try {
      const response = await this.api.put(
        `/profile/courses/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update course"
      );
    }
  }

  async deleteStudentCourse(courseId) {
    try {
      const response = await this.api.delete(`/profile/courses/${courseId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  }

  // Certifications section
  async getStudentCertifications() {
    try {
      const response = await this.api.get("/profile/certifications");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get certifications"
      );
    }
  }

  async createStudentCertification(certificationData) {
    try {
      const response = await this.api.post(
        "/profile/certifications",
        certificationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create certification"
      );
    }
  }

  async updateStudentCertification(certificationId, certificationData) {
    try {
      const response = await this.api.put(
        `/profile/certifications/${certificationId}`,
        certificationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update certification"
      );
    }
  }

  async deleteStudentCertification(certificationId) {
    try {
      const response = await this.api.delete(
        `/profile/certifications/${certificationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete certification"
      );
    }
  }

  // Recommendations section
  async getStudentRecommendations() {
    try {
      const response = await this.api.get("/profile/recommendations");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get recommendations"
      );
    }
  }

  async createStudentRecommendation(recommendationData) {
    try {
      const response = await this.api.post(
        "/profile/recommendations",
        recommendationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create recommendation"
      );
    }
  }

  async updateStudentRecommendation(recommendationId, recommendationData) {
    try {
      const response = await this.api.put(
        `/profile/recommendations/${recommendationId}`,
        recommendationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update recommendation"
      );
    }
  }

  async deleteStudentRecommendation(recommendationId) {
    try {
      const response = await this.api.delete(
        `/profile/recommendations/${recommendationId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete recommendation"
      );
    }
  }

  // Legacy method for basic info update
  async updateStudentBasicInfo(basicInfoData) {
    try {
      const response = await this.api.put("/profile/about", basicInfoData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update basic info"
      );
    }
  }

  async logout() {
    try {
      await this.api.post("/auth/logout");
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.warn("Logout request failed:", error.message);
      }
    }
    return { success: true };
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get user data"
      );
    }
  }

  async updateProfile(userData) {
    try {
      const response = await this.api.put("/auth/profile", userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await this.api.put(
        "/auth/change-password",
        passwordData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  }

  // Role-based methods
  async getStudents() {
    try {
      const response = await this.api.get("/auth/students");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get students"
      );
    }
  }

  async getColleges() {
    try {
      const response = await this.api.get("/auth/colleges");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get colleges"
      );
    }
  }

  async getStartups() {
    try {
      const response = await this.api.get("/auth/startups");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startups"
      );
    }
  }

  async getIndustries() {
    try {
      const response = await this.api.get("/auth/industries");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industries"
      );
    }
  }

  // Utility methods
  getRoleHomePage(role) {
    const rolePages = {
      student: "/student/dashboard",
      college: "/college/dashboard",
      startup: "/startup/dashboard",
      industry: "/industry/dashboard",
    };
    return rolePages[role] || "/dashboard";
  }

  // Check if user is authenticated by verifying with backend
  async isAuthenticated() {
     try {
    await this.getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
  }

  // Synchronous check using cookies (client-side cookie reading)
  isAuthenticatedSync() {
    // Check if token cookie exists (use your actual cookie name)
  const cookies = document.cookie.split(";");
  const hasToken = cookies.some((cookie) =>
    cookie.trim().startsWith("token=") // ✅ Change to your actual cookie name
  );
    return hasToken;
  }

  // Get cookie value by name (helper method)
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
    return null;
  }

  async clearAuth() {
    try {
      await this.logout();
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("🧹 Cleared authentication");
      }
      return { success: true };
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Clear auth error:", error);
      }
      return { success: false };
    }
  }

  // File upload helper
  async uploadFile(file, endpoint) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await this.api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "File upload failed");
    }
  }

  // Posts methods
  async getPosts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(`/posts?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get posts");
    }
  }

  async getMyPosts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(`/posts/my?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get my posts"
      );
    }
  }

  async getUserPosts(userId, role, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(
        `/posts/user/${userId}/${role}?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get user posts"
      );
    }
  }

  async createPost(postData, files = []) {
    try {
      const formData = new FormData();
      formData.append("content", postData.content);
      if (postData.title) formData.append("title", postData.title);

      files.forEach((file, index) => {
        formData.append("media", file);
      });

      const response = await this.api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to create post");
    }
  }

  async reactToPost(postId, reactionData) {
    try {
      const response = await this.api.post(
        `/posts/${postId}/react`,
        reactionData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to react to post"
      );
    }
  }

  async getPostReactions(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}/reactions`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get post reactions"
      );
    }
  }

  async deletePost(postId) {
    try {
      const response = await this.api.delete(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete post");
    }
  }

  async getPost(postId) {
    try {
      const response = await this.api.get(`/posts/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to get post");
    }
  }

  async updatePost(postId, postData) {
    try {
      const response = await this.api.put(`/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update post");
    }
  }

  async addComment(postId, commentData) {
    try {
      const response = await this.api.post(
        `/posts/${postId}/comments`,
        commentData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add comment");
    }
  }

  async getPostComments(postId, params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await this.api.get(
        `/posts/${postId}/comments?${queryString}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get post comments"
      );
    }
  }

  async deleteComment(postId, commentId) {
    try {
      const response = await this.api.delete(
        `/posts/${postId}/comments/${commentId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  }

  // Media URL helper
  getMediaUrl(mediaPath) {
    if (!mediaPath) {
      return "/api/placeholder/400/400";
    }

    if (mediaPath.startsWith("http://") || mediaPath.startsWith("https://")) {
      return mediaPath;
    }

    if (mediaPath.startsWith("data:")) {
      return mediaPath;
    }

    let cleanPath = mediaPath;
    if (cleanPath.startsWith("/")) {
      cleanPath = cleanPath.slice(1);
    }

    return `https://res.cloudinary.com/<your-cloud-name>/image/upload/${mediaPath}`;
  }

  getMediaUrlAlternative(mediaPath) {
    if (!mediaPath) {
      return "/api/placeholder/400/400";
    }

    if (mediaPath.startsWith("http")) {
      return mediaPath;
    }

    const baseUrl = this.baseURL;
    const cleanPath = mediaPath.startsWith("/")
      ? mediaPath.slice(1)
      : mediaPath;

    return `${baseUrl}/files/${cleanPath}`;
  }

  async getStudentProfile(id = null) {
    try {
      let endpoint;
      if (id) {
        endpoint = `/students/${id}`;
      } else {
        endpoint = "/profile/complete";
      }

      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "");
    }
  }

  async updateStudentProfile(studentData) {
    try {
      const response = await this.api.put("/students/me", studentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student profile"
      );
    }
  }

  async getProfile() {
    try {
      const response = await this.api.get("/students/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile data"
      );
    }
  }

  async getCollegeProfile(collegeId = null) {
    try {
      const endpoint = collegeId ? `/colleges/${collegeId}` : "/colleges/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college profile"
      );
    }
  }

  async updateCollegeProfile(collegeData) {
    try {
      const response = await this.api.put("/colleges/me", collegeData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college profile"
      );
    }
  }

  // College Information methods
  async getCollegeInformation(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/information/${collegeId}`
        : "/college-profile/information";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college information"
      );
    }
  }

  async updateCollegeInformation(collegeId, informationData) {
    try {
      if (arguments.length === 1) {
        informationData = collegeId;
        const response = await this.api.put(
          "/college-profile/information",
          informationData
        );
        return response.data;
      } else {
        const response = await this.api.put(
          "/college-profile/information",
          informationData
        );
        return response.data;
      }
    } catch (error) {
      let errorMessage = "Failed to update college information";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.statusText) {
        errorMessage = `${error.response.status}: ${error.response.statusText}`;
      } else if (error.message) {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  // College Sections methods
  async getCollegeAbout(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/about/${collegeId}`
        : "/college-profile/about";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college about"
      );
    }
  }

  async updateCollegeAbout(aboutData) {
    try {
      const response = await this.api.put("/college-profile/about", aboutData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college about"
      );
    }
  }

  async getCollegeDepartments(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/departments/${collegeId}`
        : "/college-profile/departments";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college departments"
      );
    }
  }

  async getCollegeFacilities(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/facilities/${collegeId}`
        : "/college-profile/facilities";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college facilities"
      );
    }
  }

  async getCollegePlacements(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/placements/${collegeId}`
        : "/college-profile/placements";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college placements"
      );
    }
  }

  async getCollegeRankings(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/rankings/${collegeId}`
        : "/college-profile/rankings";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college rankings"
      );
    }
  }

  async getCollegeAdmissions(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/admissions/${collegeId}`
        : "/college-profile/admissions";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college admissions"
      );
    }
  }

  // College Campuses methods
  async getCollegeCampuses(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/campuses/${collegeId}`
        : "/college-profile/campuses";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college campuses"
      );
    }
  }

  async createCollegeCampus(campusData) {
    try {
      const response = await this.api.post(
        "/college-profile/campuses",
        campusData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create campus"
      );
    }
  }

  async updateCollegeCampus(campusId, campusData) {
    try {
      const response = await this.api.put(
        `/college-profile/campuses/${campusId}`,
        campusData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campus"
      );
    }
  }

  async updateCollegeCampuses(campusesData) {
    try {
      if (Array.isArray(campusesData)) {
        const promises = campusesData.map((campus) => {
          if (campus.id) {
            return this.updateCollegeCampus(campus.id, campus);
          } else {
            return this.createCollegeCampus(campus);
          }
        });
        const results = await Promise.all(promises);
        return { success: true, data: results };
      } else {
        const response = await this.api.put(
          "/college-profile/campuses",
          campusesData
        );
        return response.data;
      }
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campuses"
      );
    }
  }

  async deleteCollegeCampus(campusId) {
    try {
      const response = await this.api.delete(
        `/college-profile/campuses/${campusId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete campus"
      );
    }
  }

  // Campus Map Location methods
  async updateCampusLocation(campusId, locationData) {
    try {
      const response = await this.api.put(
        `/college-profile/campuses/${campusId}/location`,
        locationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update campus location"
      );
    }
  }

  async getCampusesWithLocations() {
    try {
      const response = await this.api.get(
        "/college-profile/campuses/locations"
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get campuses with locations"
      );
    }
  }

  async getCampusesMap(collegeId) {
    try {
      const response = await this.api.get(
        `/college-profile/campuses/map/${collegeId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get campuses map"
      );
    }
  }

  // College Information (New)
  async getCollegeInformationNew() {
    try {
      const response = await this.api.get("/college-profile/information-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college information"
      );
    }
  }

  async updateCollegeInformationNew(informationData) {
    try {
      const response = await this.api.put(
        "/college-profile/information-new",
        informationData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college information"
      );
    }
  }

  // College Admissions (New)
  async getCollegeAdmissionsNew() {
    try {
      const response = await this.api.get("/college-profile/admissions-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college admissions"
      );
    }
  }

  async createCollegeAdmission(admissionData) {
    try {
      const response = await this.api.post(
        "/college-profile/admissions-new",
        admissionData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create admission record"
      );
    }
  }

  async updateCollegeAdmissions(admissionsData) {
    try {
      const response = await this.api.put(
        "/college-profile/admissions-new",
        admissionsData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update admissions"
      );
    }
  }

  async updateCollegeAdmission(admissionId, admissionData) {
    try {
      const response = await this.api.put(
        `/college-profile/admissions-new/${admissionId}`,
        admissionData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update admission record"
      );
    }
  }

  async deleteCollegeAdmission(admissionId) {
    try {
      const response = await this.api.delete(
        `/college-profile/admissions-new/${admissionId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete admission record"
      );
    }
  }

  // College Infrastructure (New)
  async getCollegeInfrastructureNew() {
    try {
      const response = await this.api.get(
        "/college-profile/infrastructure-new"
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college infrastructure"
      );
    }
  }

  async updateCollegeInfrastructure(infrastructureData) {
    try {
      const response = await this.api.put(
        "/college-profile/infrastructure-new",
        infrastructureData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to update college infrastructure"
      );
    }
  }

  // College Contact (New)
  async getCollegeContactNew() {
    try {
      const response = await this.api.get("/college-profile/contact-new");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college contact"
      );
    }
  }

  async updateCollegeContact(contactData) {
    try {
      const response = await this.api.put(
        "/college-profile/contact-new",
        contactData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college contact"
      );
    }
  }

  // College Academics/Courses
  async getCollegeAcademics() {
    try {
      const response = await this.api.get("/college-profile/academics");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college academics"
      );
    }
  }

  async createCollegeAcademic(academicData) {
    try {
      const response = await this.api.post(
        "/college-profile/academics",
        academicData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college academic"
      );
    }
  }

  async updateCollegeAcademics(academicsData) {
    try {
      const response = await this.api.put(
        "/college-profile/academics",
        academicsData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college academics"
      );
    }
  }

  async deleteCollegeAcademic(academicId) {
    try {
      const response = await this.api.delete(
        `/college-profile/academics/${academicId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college academic"
      );
    }
  }

  // College Fees
  async getCollegeFees(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/fees/${collegeId}`
        : "/college-profile/fees";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college fees"
      );
    }
  }

  async updateCollegeFees(feesData) {
    try {
      const response = await this.api.put("/college-profile/fees", feesData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college fees"
      );
    }
  }

  async getStartupProfile(startupId = null) {
    try {
      const endpoint = startupId ? `/startups/${startupId}` : "/startups/me";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startup profile"
      );
    }
  }

  async updateStartupProfile(startupData) {
    try {
      const response = await this.api.put("/startups/me", startupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update startup profile"
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

  async updateStudentAdditionalInfo(studentId, data) {
    try {
      const response = await this.api.put(`/students/${studentId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student info"
      );
    }
  }

  // File upload methods
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

  async removeProfileImage() {
    return this.api.delete("/students/profile-image");
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

  async removeCoverImage() {
    return this.api.delete("/students/cover-image");
  }

  // Ping/Connection methods
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

  async acceptPingRequest(requestId) {
    try {
      const response = await this.api.put(`/students/ping/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept ping request"
      );
    }
  }

  async rejectPingRequest(requestId) {
    try {
      const response = await this.api.put(
        `/students/ping/${requestId}/decline`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to decline ping request"
      );
    }
  }

  async getConnections(studentId = null) {
    try {
      const endpoint = studentId
        ? `/students/connection/${studentId}`
        : `/students/connection`;
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  }

  async getConnectionCount(studentId = null) {
    try {
      const endpoint = studentId
        ? `/students/connection-count/${studentId}`
        : `/students/connection-count`;
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch connection count"
      );
    }
  }

  async checkPingStatus(studentId) {
    try {
      const response = await this.api.get(`/students/ping-status/${studentId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check ping status"
      );
    }
  }

  // Role-based page helpers
  getRoleProfilePage(role, userId = null) {
    const rolePages = {
      student: userId ? `/student/profile/${userId}` : "/student/profile",
      college: userId ? `/college/profile/${userId}` : "/college/profile",
      startup: userId ? `/startup/profile/${userId}` : "/startup/profile",
      industry: userId ? `/industry/profile/${userId}` : "/industry/profile",
    };
    return rolePages[role] || "/profile";
  }

  // College file upload methods
  async uploadCollegeLogo(formData) {
    if (!formData || !formData.has("logoImage")) {
      throw new Error("No logo file uploaded");
    }
    return this.api.post("/colleges/logo-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  async uploadCollegeCover(formData) {
    if (!formData || !formData.has("coverImage")) {
      throw new Error("No cover file uploaded");
    }
    return this.api.post("/colleges/cover-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // College Ping/Connection methods
  async sendCollegePingRequest(collegeId) {
    try {
      const response = await this.api.post(`/colleges/ping/${collegeId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to send ping request to college"
      );
    }
  }

  async getCollegePingRequests() {
    try {
      const response = await this.api.get("/colleges/ping-requests");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college ping requests"
      );
    }
  }

  async acceptCollegePingRequest(requestId) {
    try {
      const response = await this.api.put(`/colleges/ping/${requestId}/accept`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to accept college ping request"
      );
    }
  }

  async rejectCollegePingRequest(requestId) {
    try {
      const response = await this.api.put(`/colleges/ping/${requestId}/reject`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to reject college ping request"
      );
    }
  }

  async getCollegeConnections() {
    try {
      const response = await this.api.get("/colleges/connections");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college connections"
      );
    }
  }

  async getCollegeConnectionCount() {
    try {
      const response = await this.api.get("/colleges/connections/count");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to fetch college connection count"
      );
    }
  }

  async checkCollegePingStatus(collegeId) {
    try {
      const response = await this.api.get(`/colleges/ping-status/${collegeId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to check college ping status"
      );
    }
  }

  // College Programs methods
  async getCollegePrograms(collegeId = null) {
    try {
      const endpoint = collegeId
        ? `/college-profile/programs/${collegeId}`
        : "/college-profile/programs";
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college programs"
      );
    }
  }

  async createCollegeProgram(programData) {
    try {
      const response = await this.api.post("/colleges/programs", programData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college program"
      );
    }
  }

  async updateCollegeProgram(programId, programData) {
    try {
      const response = await this.api.put(
        `/colleges/programs/${programId}`,
        programData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college program"
      );
    }
  }

  async deleteCollegeProgram(programId) {
    try {
      const response = await this.api.delete(`/colleges/programs/${programId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college program"
      );
    }
  }

  // College Events methods
  async getCollegeEvents() {
    try {
      const response = await this.api.get("/colleges/events");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college events"
      );
    }
  }

  async createCollegeEvent(eventData) {
    try {
      const response = await this.api.post("/colleges/events", eventData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college event"
      );
    }
  }

  // College Faculty methods
  async getCollegeFaculty() {
    try {
      const response = await this.api.get("/colleges/faculty");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college faculty"
      );
    }
  }

  async saveCollegeFaculty(facultyData) {
    try {
      const response = await this.api.post("/colleges/faculty", facultyData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to save college faculty"
      );
    }
  }

  async updateCollegeFaculty(facultyData) {
    try {
      const response = await this.api.put("/colleges/faculty", facultyData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college faculty"
      );
    }
  }

  // Individual Faculty Member methods
  async addFacultyMember(memberData) {
    try {
      const response = await this.api.post(
        "/colleges/faculty/member",
        memberData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add faculty member"
      );
    }
  }

  async updateFacultyMember(memberId, memberData) {
    try {
      const response = await this.api.put(
        `/colleges/faculty/member/${memberId}`,
        memberData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update faculty member"
      );
    }
  }

  async deleteFacultyMember(memberId) {
    try {
      const response = await this.api.delete(
        `/colleges/faculty/member/${memberId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete faculty member"
      );
    }
  }

  // College Alumni methods
  async getCollegeAlumni() {
    try {
      const response = await this.api.get("/college-profile/alumni");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college alumni"
      );
    }
  }

  async updateCollegeAlumni(alumniData) {
    try {
      const response = await this.api.put(
        "/college-profile/alumni",
        alumniData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college alumni"
      );
    }
  }

  async createCollegeAlumni(alumniData) {
    try {
      const response = await this.api.post(
        "/college-profile/alumni",
        alumniData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college alumni"
      );
    }
  }

  async deleteCollegeAlumni(alumniId) {
    try {
      const response = await this.api.delete(
        `/college-profile/alumni/${alumniId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college alumni"
      );
    }
  }

  // College Events methods (enhanced)
  async updateCollegeEvents(eventsData) {
    try {
      const response = await this.api.put(
        "/college-profile/events",
        eventsData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college events"
      );
    }
  }

  async updateCollegeEvent(eventId, eventData) {
    try {
      const response = await this.api.put(
        `/college-profile/events/${eventId}`,
        eventData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college event"
      );
    }
  }

  async deleteCollegeEvent(eventId) {
    try {
      const response = await this.api.delete(
        `/college-profile/events/${eventId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college event"
      );
    }
  }

  // College Placement methods
  async getCollegePlacements() {
    try {
      const response = await this.api.get("/colleges/placements");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college placements"
      );
    }
  }

  async addCollegePlacement(placementData) {
    try {
      const response = await this.api.post(
        "/colleges/placements",
        placementData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college placement"
      );
    }
  }

  async savePlacementData(placementData) {
    try {
      const response = await this.api.post(
        "/colleges/placements",
        placementData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to save placement data"
      );
    }
  }

  async uploadCompanyLogo(file) {
    try {
      const formData = new FormData();
      formData.append("logo", file);

      const response = await this.api.post(
        "/colleges/placements/upload-logo",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to upload company logo"
      );
    }
  }

  // College Downloads methods
  async getCollegeDownloads() {
    try {
      const response = await this.api.get("/colleges/downloads");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college downloads"
      );
    }
  }

  async addCollegeDownload(downloadData) {
    try {
      const response = await this.api.post(
        "/colleges/downloads",
        downloadData,
        {
          headers:
            downloadData instanceof FormData
              ? {
                  "Content-Type": "multipart/form-data",
                }
              : {
                  "Content-Type": "application/json",
                },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college download"
      );
    }
  }

  async updateCollegeDownload(downloadId, downloadData) {
    try {
      const response = await this.api.put(
        `/colleges/downloads/${downloadId}`,
        downloadData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college download"
      );
    }
  }

  async deleteCollegeDownload(downloadId) {
    try {
      const response = await this.api.delete(
        `/colleges/downloads/${downloadId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to delete college download"
      );
    }
  }

  async incrementDownloadCount(downloadId) {
    try {
      const response = await this.api.post(
        `/colleges/downloads/${downloadId}/increment`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to increment download count"
      );
    }
  }

  // College Reviews methods
  async getCollegeReviews() {
    try {
      const response = await this.api.get("/colleges/reviews");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch college reviews"
      );
    }
  }

  async addCollegeReview(reviewData) {
    try {
      const response = await this.api.post("/colleges/reviews", reviewData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to add college review"
      );
    }
  }

  // Industry Ping/Connection methods
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

// Create API objects for backward compatibility
const studentAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/students/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get student profile"
      );
    }
  },

  async updateProfile(studentData) {
    try {
      const response = await apiService.api.put("/students/me", studentData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update student profile"
      );
    }
  },

  async getStudentAbout() {
    return apiService.getStudentAbout();
  },

  async getStudentConnection() {
    return apiService.getStudentConnection();
  },

  async updateStudentAbout(aboutData) {
    return apiService.updateStudentAbout(aboutData);
  },

  async addSkill(studentId, skillData) {
    throw new Error(
      "Skills feature not implemented in current Prisma backend. Please update your student profile through the main profile update."
    );
  },

  async deleteSkill(studentId, skillId) {
    throw new Error(
      "Skills feature not implemented in current Prisma backend."
    );
  },

  async addCertification(studentId, certData) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async updateCertification(studentId, certId, certData) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async deleteCertification(studentId, certId) {
    throw new Error(
      "Certifications feature not implemented in current Prisma backend."
    );
  },

  async addCourse(studentId, courseData) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async updateCourse(studentId, courseId, courseData) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async deleteCourse(studentId, courseId) {
    throw new Error(
      "Courses feature not implemented in current Prisma backend."
    );
  },

  async addEducation(studentId, educationData) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async updateEducation(studentId, educationId, educationData) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async deleteEducation(studentId, educationId) {
    throw new Error(
      "Education feature not implemented in current Prisma backend."
    );
  },

  async addExperience(studentId, experienceData) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async updateExperience(studentId, experienceId, experienceData) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async deleteExperience(studentId, experienceId) {
    throw new Error(
      "Experience feature not implemented in current Prisma backend."
    );
  },

  async addProject(studentId, projectData) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async updateProject(studentId, projectId, projectData) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async deleteProject(studentId, projectId) {
    throw new Error(
      "Projects feature not implemented in current Prisma backend."
    );
  },

  async addRecommendation(studentId, recommendationData) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },

  async updateRecommendation(studentId, recommendationId, recommendationData) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },

  async deleteRecommendation(studentId, recommendationId) {
    throw new Error(
      "Recommendations feature not implemented in current Prisma backend."
    );
  },
};

const collegeAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/colleges/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college profile"
      );
    }
  },

  async updateProfile(collegeData) {
    try {
      const response = await apiService.api.put("/colleges/me", collegeData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update college profile"
      );
    }
  },

  async getInformation() {
    return apiService.getCollegeInformation();
  },

  async updateInformation(informationData) {
    return apiService.updateCollegeInformation(informationData);
  },

  async getAbout() {
    return apiService.getCollegeAbout();
  },

  async updateAbout(aboutData) {
    return apiService.updateCollegeAbout(aboutData);
  },

  async getDepartments() {
    return apiService.getCollegeDepartments();
  },

  async getFaculty() {
    return apiService.getCollegeFaculty();
  },

  async getPrograms() {
    return apiService.getCollegePrograms();
  },

  async getAlumni() {
    return apiService.getCollegeAlumni();
  },

  async updateAlumni(alumniData) {
    return apiService.updateCollegeAlumni(alumniData);
  },

  async createAlumni(alumniData) {
    return apiService.createCollegeAlumni(alumniData);
  },

  async deleteAlumni(alumniId) {
    return apiService.deleteCollegeAlumni(alumniId);
  },

  async getEvents() {
    try {
      const endpoint = "/college-profile/events";
      const response = await apiService.api.get(endpoint);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get college events"
      );
    }
  },

  async updateEvents(eventsData) {
    return apiService.updateCollegeEvents(eventsData);
  },

  async createEvent(eventData) {
    try {
      const response = await apiService.api.post(
        "/college-profile/events",
        eventData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to create college event"
      );
    }
  },

  async updateEvent(eventId, eventData) {
    return apiService.updateCollegeEvent(eventId, eventData);
  },

  async deleteEvent(eventId) {
    return apiService.deleteCollegeEvent(eventId);
  },

  async getFacilities() {
    return apiService.getCollegeFacilities();
  },

  async getPlacements() {
    return apiService.getCollegePlacements();
  },

  async getRankings() {
    return apiService.getCollegeRankings();
  },

  async getAdmissions() {
    return apiService.getCollegeAdmissionsNew();
  },

  async updateAdmissions(admissionsData) {
    return apiService.updateCollegeAdmissions(admissionsData);
  },

  async createAdmission(admissionData) {
    return apiService.createCollegeAdmission(admissionData);
  },

  async updateAdmission(admissionId, admissionData) {
    return apiService.updateCollegeAdmission(admissionId, admissionData);
  },

  async deleteAdmission(admissionId) {
    return apiService.deleteCollegeAdmission(admissionId);
  },

  async getCampuses() {
    return apiService.getCollegeCampuses();
  },

  async createCampus(campusData) {
    return apiService.createCollegeCampus(campusData);
  },

  async updateCampuses(campusesData) {
    return apiService.updateCollegeCampuses(campusesData);
  },

  async updateCampus(campusId, campusData) {
    return apiService.updateCollegeCampus(campusId, campusData);
  },

  async deleteCampus(campusId) {
    return apiService.deleteCollegeCampus(campusId);
  },

  async getCampusesWithLocations() {
    return apiService.getCampusesWithLocations();
  },

  async getHostel() {
    try {
      const response = await apiService.api.get("/college-profile/hostel");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to get college hostel information"
      );
    }
  },

  async updateHostel(hostelData) {
    try {
      const response = await apiService.api.put(
        "/college-profile/hostel",
        hostelData
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Failed to update college hostel information"
      );
    }
  },
};

const startupAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/startups/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get startup profile"
      );
    }
  },

  async updateProfile(startupData) {
    try {
      const response = await apiService.api.put("/startups/me", startupData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update startup profile"
      );
    }
  },
};

const industryAPI = {
  async getProfile() {
    try {
      const response = await apiService.api.get("/industries/me");
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to get industry profile"
      );
    }
  },

  async updateProfile(industryData) {
    try {
      const response = await apiService.api.put("/industries/me", industryData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to update industry profile"
      );
    }
  },
};

const apiService = new ApiService();

// Attach the separate API objects to the main instance
apiService.collegeAPI = collegeAPI;
apiService.studentAPI = studentAPI;
apiService.startupAPI = startupAPI;
apiService.industryAPI = industryAPI;

export default apiService;
export { studentAPI, collegeAPI, startupAPI, industryAPI };
