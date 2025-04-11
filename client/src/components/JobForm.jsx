import { useState } from "react";
import API from "../services/api";
import successAlert from "./SwitAlert";

export default function JobForm({ fetchJobs, closeModal }) {
  // State to manage the form data
  const [form, setForm] = useState({
    company: "", // Company name
    role: "", // Job role
    status: "Applied", // Default job status
    appliedDate: "", // Date of application
    link: "", // Application link
    experienceNeeded: 0, // Minimum experience required
  });

  // Function to handle input changes and update the form state
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    await API.post("/job/post", form); // Send form data to the API
    successAlert("Job added successfully!", "success"); // Show success alert
    fetchJobs(); // Refresh the job list
    closeModal(); // Close the modal
    setForm({
      company: "", // Reset company field
      role: "", // Reset role field
      status: "Applied", // Reset status to default
      appliedDate: "", // Reset applied date
      link: "", // Reset application link
      experienceNeeded: 0, // Reset experienceNeeded field
    });
  };

  return (
    <form
      onSubmit={handleSubmit} // Handle form submission
      className="space-y-6 p-6 bg-white rounded-2xl max-w-2xl mx-auto"
    >
      {/* Form Title */}
      <h2 className="text-2xl font-bold pb-2 text-green-600 text-center">
        Add New Job Application
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Field */}
        <div className="relative">
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 focus:outline-none focus:border-blue-600"
            placeholder=" "
          />
          <label className="absolute left-1 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Company
          </label>
        </div>

        {/* Role Field */}
        <div className="relative">
          <input
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 focus:outline-none focus:border-blue-600"
            placeholder=" "
          />
          <label className="absolute left-1 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Role
          </label>
        </div>

        {/* Applied Date Field */}
        <div className="relative">
          <input
            type="date"
            name="appliedDate"
            value={form.appliedDate}
            onChange={handleChange}
            required
            className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 focus:outline-none focus:border-blue-600"
            placeholder=" "
          />
          <label className="absolute left-1 top-2 text-gray-500 text-sm peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Date of Application
          </label>
        </div>

        {/* Application Link Field */}
        <div className="relative">
          <input
            type="url"
            name="link"
            value={form.link}
            onChange={handleChange}
            className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 focus:outline-none focus:border-blue-600"
            placeholder=" "
          />
          <label className="absolute left-1 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
            Application Link
          </label>
        </div>

        {/* Experience Needed Field */}
        <div className="relative">
          <input
            type="number"
            name="experienceNeeded"
            value={form.experienceNeeded}
            onChange={handleChange}
            min="0"
            required
            className="peer w-full border-b-2 border-gray-300 bg-transparent px-1 pt-6 pb-2 focus:outline-none focus:border-blue-600"
            placeholder=" "
          />
          <label className="absolute left-1 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400">
            Experience (Years)
          </label>
        </div>

        {/* Status Dropdown */}
        <div className="col-span-full md:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          ➕ Add Job
        </button>
      </div>
    </form>
  );
}
