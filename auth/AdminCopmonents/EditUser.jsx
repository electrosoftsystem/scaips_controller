import React, { useEffect, useState } from "react";
import axios from "axios";

export const EditUser = ({ userId, navigateTo, isDark }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    collegeName: "",
    contactNo: "",
    isActive: true,
    profilePicture: "",
  });

  // Fetch existing student
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/students/${userId}`, {
      withCredentials: true
    })
    .then(res => setForm(res.data))
    .catch(err => console.log(err));
  }, [userId]);

  // INPUT HANDLER
  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT UPDATED DATA
  const submitUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/admin/students/${userId}`,
        form,
        { withCredentials: true }
      );

      alert("Student updated successfully!");
      navigateTo("users");
    } catch (error) {
      console.error("Update error:", error);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Edit Student</h2>

      <form onSubmit={submitUpdate} className="space-y-4">

        <input name="firstName" value={form.firstName} onChange={updateField}
          className="w-full p-2 border rounded" placeholder="First Name" />

        <input name="lastName" value={form.lastName} onChange={updateField}
          className="w-full p-2 border rounded" placeholder="Last Name" />

        <input name="email" value={form.email} onChange={updateField}
          className="w-full p-2 border rounded" placeholder="Email" />

        <input name="contactNo" value={form.contactNo} onChange={updateField}
          className="w-full p-2 border rounded" placeholder="Contact Number" />

        <input name="collegeName" value={form.collegeName} onChange={updateField}
          className="w-full p-2 border rounded" placeholder="College Name" />

        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
};
