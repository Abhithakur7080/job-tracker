import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
  const { company, role, status, appliedDate, link, experienceNeeded } = req.body;

  try {
    const job = await Job.create({
      company,
      role,
      status,
      appliedDate,
      link,
      experienceNeeded
    });

    res
      .status(201)
      .json({ message: "Job posted successfully", success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      status,
      experienceNeeded,
    } = req.query;

    // Build the query object
    const query = {};

    // Search by company or role
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by experience needed
    if (experienceNeeded) {
      query.experienceNeeded = { $gte: Number(experienceNeeded) };
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Sorting
    const sortOptions = { [sortBy]: order === "asc" ? 1 : -1 };

    // Fetch jobs with filters, pagination, and sorting
    const jobs = await Job.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
      message: "Jobs fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res
      .status(200)
      .json({ success: true, job, message: "Job fetched successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res
      .status(200)
      .json({ success: true, job, message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
