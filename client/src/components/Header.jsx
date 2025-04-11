import React, { useState, useEffect, useRef } from "react";
import JobForm from "./JobForm";
import { FaMailchimp, FaPhoneAlt, FaRegQuestionCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { IoMdMail } from "react-icons/io";

const Header = ({ fetchJobs, setFilters }) => {
  // State to manage the visibility of the job creation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage the visibility of the support dropdown
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // State to store the search query entered by the user
  const [searchQuery, setSearchQuery] = useState("");

  // Ref to track the support dropdown for outside click detection
  const supportRef = useRef(null);

  // Function to handle the search functionality
  const handleSearch = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: searchQuery, // Update the search query in filters
      page: 1, // Reset to the first page when searching
    }));
    fetchJobs(); // Fetch jobs with the updated filters
  };

  // Close the support dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supportRef.current && !supportRef.current.contains(event.target)) {
        setIsSupportOpen(false); // Close the dropdown
      }
    };

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <span className="-m-1.5 p-1.5">
            <span className="sr-only">Hire me!</span>
            <img
              className="h-8 w-auto"
              src="https://jobtracker.es/wp-content/uploads/2019/02/jobtracker-2019-vol4.png"
              alt="logo"
            />
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4 relative p-2">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            className="w-full border border-gray-300 rounded-full focus:ring-2 focus:ring-green-700 focus:outline-none p-2 pl-4"
          />
          <button
            onClick={handleSearch} // Trigger search on button click
            className="absolute top-1 right-1.5 text-white bg-green-700 rounded-full p-2 m-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="7" />
              <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        </div>

        {/* Support Icon */}
        <div
          ref={supportRef}
          className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4 mr-4"
        >
          <div className="relative">
            <FaRegQuestionCircle
              className="text-gray-600 text-2xl cursor-pointer hover:text-gray-800"
              title="Support"
              onClick={() => setIsSupportOpen(!isSupportOpen)} // Toggle support dropdown
            />
            {isSupportOpen && (
              <>
                {/* Support Dropdown */}
                <div className="absolute top-1 right-1/2 mt-2 w-72 bg-white rounded-md overflow-hidden shadow-lg z-20">
                  <div className="text-center">
                    <h2 className="text-lg font-semibold mb-2 bg-gray-200 border-b flex items-center justify-between px-4 py-3">
                      Help & Support
                      <button
                        onClick={() => setIsSupportOpen(false)} // Close dropdown
                        className="text-gray-900 float-right cursor-pointer"
                      >
                        <RxCross1 />
                      </button>
                    </h2>
                    <p className="text-lg text-start px-4 py-3 font-bold text-gray-600 mb-2">
                      Contact Support
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 px-4 py-2">
                      <FaPhoneAlt />
                      <strong>Phone:</strong> 1800-0000-000
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 px-4 py-2">
                      <IoMdMail />
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:support@jobtracker.com"
                        className="text-blue-500 hover:underline"
                      >
                        support@jobtracker.com
                      </a>
                    </p>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjDGMp734S91sDuUFqL51_xRTXS15iiRoHew&s"
                      alt="Support"
                      className="mt-4 mx-auto rounded mb-6"
                    />
                  </div>
                </div>
                {/* Overlay to close dropdown on outside click */}
                <div
                  className="fixed top-0 left-0 z-10 w-screen h-screen bg-black/50"
                  onClick={() => setIsSupportOpen(false)}
                ></div>
              </>
            )}
          </div>
        </div>

        {/* Create Job Button */}
        <button
          className="text-sm/6 font-semibold bg-green-700 rounded-md p-2 px-4 hover:bg-green-800 cursor-pointer text-white flex items-center gap-1"
          onClick={() => setIsModalOpen(true)} // Open job creation modal
        >
          <span className="text-2xl">+</span> Create Job
        </button>

        {/* Modal for Job Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md scale-up-center">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="text-red-500 float-right"
              >
                <RxCross1 />
              </button>
              <JobForm
                fetchJobs={fetchJobs} // Pass fetchJobs to JobForm
                closeModal={() => setIsModalOpen(false)} // Close modal after job creation
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
