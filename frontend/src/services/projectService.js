// services/projectService.js
import axios from "axios";

export const fetchProjects = async () => {
  try {
    const response = await axios.get("/api/all/projects"); // adjust if backend URL is different
    return response.data.projects;
  } catch (error) {
    if (import.meta.env.NODE_ENV !== "production") {
      console.error("Error fetching projects:", error);
    }
    return [];
  }
};
