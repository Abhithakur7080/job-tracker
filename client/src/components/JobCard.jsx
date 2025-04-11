export default function JobCard({ job, onDelete, onUpdate }) {
  return (
    <div className="p-6 rounded-lg shadow-lg bg-white flex justify-between items-start flex-wrap hover:shadow-lg transition-shadow duration-300">
      {/* Job Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{job.company}</h2>
        <p className="text-sm text-gray-600">{job.role}</p>
        <p className="text-sm text-gray-500">
          Applied on: {new Date(job.appliedDate).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          Experience Needed: 0-{job.experienceNeeded} years
        </p>
        {job.link && (
          <a
            href={job.link}
            className="text-blue-500 text-sm hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            View Application
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-3">
        {/* Status Dropdown */}
        <select
          value={job.status}
          onChange={(e) => onUpdate(job._id, e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(job._id)}
          className="text-red-500 text-sm hover:underline hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
