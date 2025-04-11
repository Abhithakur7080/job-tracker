import CustomSelect from "./CustomSelect";
import ThinRangeBar from "./ThinRangeBar";

export default function FilterBar({ filter, setFilter }) {
  return (
    <div className="w-full p-4 bg-white rounded-xl sticky top-4 h-fit">
      {/* Status Filter */}
      <div className="mb-6">
        {/* Dropdown to filter jobs by status */}
        <CustomSelect
          label="Status"
          options={["Applied", "Interview", "Offer", "Rejected"]} // Status options
          value={filter.status} // Current selected status
          onChange={(val) => setFilter({ ...filter, status: val })} // Update the filter state
        />
      </div>

      {/* Sort Filter */}
      <div className="mb-6">
        {/* Dropdown to sort jobs by latest or oldest */}
        <CustomSelect
          label="Sort By"
          options={["Latest", "Oldest"]} // Sorting options
          value={filter.sortBy} // Current selected sorting option
          onChange={(val) => setFilter({ ...filter, sort: val })} // Update the filter state
        />
      </div>

      {/* Experience Level Filter */}
      <div>
        {/* Range slider to filter jobs by minimum experience needed */}
        <ThinRangeBar
          value={filter.experienceNeeded} // Current experience filter value
          onChange={(e) => setFilter({ ...filter, experienceNeeded: e.target.value })} // Update the filter state
        />
      </div>
    </div>
  );
}
