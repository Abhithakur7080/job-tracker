import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function CustomSelect({ label, options, value, onChange }) {
  // State to manage whether the dropdown is open or closed
  const [open, setOpen] = useState(false);

  // Ref to track the dropdown element for outside click detection
  const selectRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      // Check if the click is outside the dropdown
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpen(false); // Close the dropdown
      }
    }

    // Add event listener for outside clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      {/* Label for the dropdown */}
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

      {/* Dropdown toggle */}
      <div
        className="border border-gray-300 bg-white p-2 rounded-md flex items-center justify-between cursor-pointer hover:shadow focus:ring-2 focus:ring-green-500"
        onClick={() => setOpen((prev) => !prev)} // Toggle dropdown open/close state
      >
        {/* Display the selected value or placeholder */}
        <span className="capitalize">{value || `Select ${label}`}</span>

        {/* Chevron icon with rotation animation */}
        <FaChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown options */}
      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-gray-200 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((opt, idx) => (
            <li
              key={idx}
              onClick={() => {
                onChange(opt); // Update the selected value
                setOpen(false); // Close the dropdown
              }}
              className={`px-4 py-2 hover:bg-green-500 cursor-pointer ${
                opt === value ? "bg-green-300 font-semibold" : ""
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
