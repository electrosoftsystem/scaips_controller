import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
 // Change this to your backend URL
  withCredentials: true, // Optional: if your backend uses cookies/session
});

// You can add interceptors for auth token here if needed

export default api;
