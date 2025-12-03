/**
 * Simple file upload utility
 * Works like the PHP version - just upload and get URL back
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const uploadFile = async (file) => {
  try {
    if (import.meta.env.NODE_ENV !== "production") {
      console.log("🚀 Uploading file:", file.name);
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/simple/upload`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      if (import.meta.env.NODE_ENV !== "production") {
        console.log("✅ Upload successful!");
        console.log("📌 URL:", result.url);
      }
      return result.url;
    } else {
      if (import.meta.env.NODE_ENV !== "production") {
        console.error("❌ Upload failed:", result.message);
      }
      throw new Error(result.message);
    }
  } catch (error) {
    if (import.meta.env.NODE_ENV !== "production") {
      console.error("❌ Upload error:", error);
    }
    throw error;
  }
};
