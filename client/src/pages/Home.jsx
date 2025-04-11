import { useEffect } from "react";
import JobCard from "../components/JobCard";
import FilterBar from "../components/FilterBar";
import { FaFilter } from "react-icons/fa";
import API from "../services/api";

export default function Home({ jobs, fetchJobs, filters, setFilters }) {
  // Function to delete a job by its ID
  const deleteJob = async (id) => {
    await API.delete(`/job/delete/${id}`);
    fetchJobs(); // Refresh the job list after deletion
  };

  // Function to update the status of a job
  const updateStatus = async (id, status) => {
    await API.put(`/job/update/${id}`, { status });
    fetchJobs(); // Refresh the job list after updating the status
  };

  // Function to handle pagination: Go to the next page
  const handleNextPage = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1, // Increment the page number
    }));
  };

  // Function to handle pagination: Go to the previous page
  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page - 1, // Decrement the page number
      }));
    }
  };

  // Fetch jobs whenever the filters or fetchJobs function changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="flex p-4 space-x-6">
      {/* Sidebar */}
      <div className="w-1/5 bg-white p-4 rounded-lg shadow-md h-[calc(100vh-9rem)] flex flex-col">
        <h2 className="text-lg font-semibold mb-4 flex gap-2 items-center">
          <FaFilter className="text-green-600" /> Filters
        </h2>
        {/* FilterBar Component */}
        <FilterBar filter={filters} setFilter={setFilters} />
        <div className="flex flex-col justify-center mt-auto gap-1.5">
          <p className="flex items-center gap-2 justify-center text-sm">version: 1.0.1</p>
          <p className="flex items-center justify-center text-sm text-center">
            All reserved by Abhijeet Kumar &copy; 2025
          </p>
        </div>
      </div>

      {/* Job Cards Section */}
      <div className="flex-1 space-y-4 h-[calc(100vh-9rem)] overflow-y-auto">
        {jobs.length > 0 ? (
          // Render a list of JobCard components
          jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onDelete={deleteJob}
              onUpdate={updateStatus}
            />
          ))
        ) : (
          // Display a message if no jobs are found
          <p className="text-center text-gray-500">
            No jobs found. Try adjusting the filters.
          </p>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg shadow-md">
          {/* Previous Page Button */}
          <button
            onClick={handlePrevPage}
            disabled={filters.page === 1} // Disable if on the first page
            className={`px-4 py-2 rounded-md ${
              filters.page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          {/* Current Page Indicator */}
          <p className="text-sm text-gray-600">
            Page {filters.page}
          </p>
          {/* Next Page Button */}
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
