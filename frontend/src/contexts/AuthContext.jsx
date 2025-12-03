import React, { createContext, useContext, useState, useEffect } from "react";
import apiService from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

 
  const clearAuthState = () => {
    setUser(null);
    setError(null);
  };

  const getCurrentUser = async () => {
    try {
      const data = await apiService.getCurrentUser();
      setUser(data.user || data); // backend may return {user:{}} or raw data
      setError(null);
      return data;
    } catch (err) {
      clearAuthState();
      console.log(err.message); // log the backend error
      return null; // don’t throw to prevent unhandled promise
    }
  };

  const initializeAuth = async () => {
    try {
      await getCurrentUser();
    } finally {
      setLoading(false); // always stop loading
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []); // run once on mount
  // Registration methods
  const registerStudent = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register({
        ...userData,
        role: "student",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerCollege = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register({
        ...userData,
        role: "college",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerStartup = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register({
        ...userData,
        role: "startup",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerIndustry = async (userData) => {
    try {
      setError(null);
      const response = await apiService.register({
        ...userData,
        role: "industry",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Generic register method
  const register = async (userData, role) => {
    try {
      setError(null);
      const response = await apiService.register({ ...userData, role });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Login methods
  const loginStudent = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login({
        ...credentials,
        role: "student",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const loginCollege = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login({
        ...credentials,
        role: "college",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const loginStartup = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login({
        ...credentials,
        role: "startup",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const loginIndustry = async (credentials) => {
    try {
      setError(null);
      const response = await apiService.login({
        ...credentials,
        role: "industry",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Generic login method
  const login = async (credentials, role) => {
    try {
      setError(null);
      const response = await apiService.login({ ...credentials, role });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Google OAuth methods
  const loginWithGoogle = async (userData) => {
    try {
      setError(null);
      // Map Google user data to expected format
      const mappedData = {
        email: userData.email,
        googleId: userData.id, // Map 'id' to 'googleId'
        firstName: userData.firstName,
        lastName: userData.lastName,
        profilePicture: userData.imageUrl,
        accessToken: userData.accessToken,
      };
      const response = await apiService.loginWithGoogle(mappedData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerWithGoogle = async (userData) => {
    try {
      setError(null);
      const response = await apiService.registerWithGoogle(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerStudentWithGoogle = async (userData) => {
    try {
      setError(null);
      const response = await apiService.registerWithGoogle({
        ...userData,
        role: "student",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerCollegeWithGoogle = async (userData) => {
    try {
      setError(null);
      const response = await apiService.registerWithGoogle({
        ...userData,
        role: "college",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerStartupWithGoogle = async (userData) => {
    try {
      setError(null);
      const response = await apiService.registerWithGoogle({
        ...userData,
        role: "startup",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const registerIndustryWithGoogle = async (userData) => {
    try {
      setError(null);
      const response = await apiService.registerWithGoogle({
        ...userData,
        role: "industry",
      });
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Profile management
  const updateProfile = async (userData) => {
    try {
      setError(null);
      const response = await apiService.updateProfile(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      setError(null);
      const response = await apiService.changePassword(passwordData);
      return response;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiService.logout();
      clearAuthState();
      return { success: true };
    } catch (error) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("Logout error:", error);
      }
      clearAuthState(); // Clear state even if logout fails
      return { success: true };
    }
  };

  // Utility methods
  const isAuthenticated = () => {
    return !!user && apiService.isAuthenticated();
  };

  const isStudent = () => {
    return user?.role === "student";
  };

  const isCollege = () => {
    return user?.role === "college";
  };

  const isStartup = () => {
    return user?.role === "startup";
  };

  const isIndustry = () => {
    return user?.role === "industry";
  };

  const getUserRole = () => {
    return user?.role;
  };

  const getUserId = () => {
    return user?.id;
  };

  const getFullName = () => {
    if (!user) return "";
    return `${user.firstName || ""} ${user.lastName || ""}`.trim();
  };

  const getDisplayName = () => {
    if (!user) return "";

    // For colleges, show college name
    if (user.role === "college") {
      return user.name || user.collegeName || getFullName();
    }

    // For startups, show startup name
    if (user.role === "startup") {
      return user.startupName || getFullName();
    }

    // For industries, show company name
    if (user.role === "industry") {
      return user.companyName || getFullName();
    }

    // For students, show full name
    return getFullName();
  };

  const getRoleDisplayName = () => {
    const roleNames = {
      student: "Student",
      college: "College",
      startup: "Startup",
      industry: "Industry Professional",
    };
    return roleNames[user?.role] || "User";
  };

  // Backward compatibility methods
  const loginUser = async (credentials) => {
    // Use generic login method
    return await login(credentials, credentials.role || "student");
  };

  const registerUser = async (userData) => {
    // Use generic register method
    return await register(userData, userData.role || "student");
  };

  const loginWithGitHub = async (userData) => {
    // GitHub OAuth is not implemented yet, show error
    throw new Error(
      "GitHub OAuth is not implemented yet. Please use Google OAuth instead."
    );
  };

  const registerWithGitHub = async (userData) => {
    // GitHub OAuth is not implemented yet, show error
    throw new Error(
      "GitHub OAuth is not implemented yet. Please use Google OAuth instead."
    );
  };

  const checkAuthStatus = async () => {
    // Check if user is authenticated and get current user
    try {
      if (isAuthenticated()) {
        await getCurrentUser();
        return { success: true, user };
      }
      return { success: false, user: null };
    } catch (error) {
      return { success: false, user: null, error: error.message };
    }
  };

  const value = {
    // State
    user,
    loading,
    error,

    // Authentication methods
    register,
    registerStudent,
    registerCollege,
    registerStartup,
    registerIndustry,

    login,
    loginStudent,
    loginCollege,
    loginStartup,
    loginIndustry,

    // Google OAuth methods
    loginWithGoogle,
    registerWithGoogle,
    registerStudentWithGoogle,
    registerCollegeWithGoogle,
    registerStartupWithGoogle,
    registerIndustryWithGoogle,

    // Backward compatibility methods
    loginUser,
    registerUser,
    loginWithGitHub,
    registerWithGitHub,
    checkAuthStatus,

    // Profile management
    updateProfile,
    changePassword,
    getCurrentUser,

    // Logout
    logout,

    // Utility methods
    isAuthenticated,
    isStudent,
    isCollege,
    isStartup,
    isIndustry,
    getUserRole,
    getUserId,
    getFullName,
    getDisplayName,
    getRoleDisplayName,

    // Error handling
    setError,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;