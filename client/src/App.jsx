import Header from "./components/Header";
import Home from "./pages/Home";
import jobbanner from "./assets/jobbanner.svg";
import API from "./services/api";
import { useCallback, useState } from "react";

export default function App() {
  // State to store the list of jobs
  const [jobs, setJobs] = useState([]);

  // State to store filters for fetching jobs
  const [filters, setFilters] = useState({
    search: "", // Search query for filtering jobs
    page: 1, // Current page for pagination
    limit: 10, // Number of jobs per page
    sortBy: "Latest", // Field to sort jobs by
    order: "desc", // Order of sorting (ascending or descending)
    status: "", // Filter by job status (e.g., Applied, Interview)
    experienceNeeded: 0, // Minimum experience required for the job
  });

  // Function to fetch jobs from the API based on filters
  const fetchJobs = useCallback(async () => {
    const query = new URLSearchParams(filters).toString(); // Convert filters to query string
    const res = await API.get(`/job?${query}`); // Make API call to fetch jobs
    setJobs(res.data.jobs); // Update the jobs state with the fetched data
  }, [filters]); // Re-run the function whenever filters change

  return (
    <>
      {/* Header Component */}
      <Header fetchJobs={fetchJobs} setFilters={setFilters} />

      {/* Background Banner */}
      <img src={jobbanner} alt="banner" className="fixed -z-10" />

      {/* Home Component */}
      <Home
        fetchJobs={fetchJobs}
        jobs={jobs}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}
