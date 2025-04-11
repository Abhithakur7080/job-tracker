import express from 'express';
import { postJob, getAllJobs, getJobById, updateJob, deleteJob } from '../controllers/job.controllers.js';

const router = express.Router();

/**
 * @route POST /api/v1/jobs/post
 * @desc Create a new job
 */
router.route("/post").post(postJob);

/**
 * @route GET /api/v1/jobs
 * @desc Get all jobs with search, pagination, sorting, and filtering
 * @query search, page, limit, sortBy, order, status, experienceNeeded
 */
router.route("/").get(getAllJobs);

/**
 * @route GET /api/v1/jobs/:id
 * @desc Get a job by its ID
 */
router.route("/:id").get(getJobById);

/**
 * @route POST /api/v1/jobs/update/:id
 * @desc Update a job by its ID
 */
router.route("/update/:id").put(updateJob);

/**
 * @route DELETE /api/v1/jobs/delete/:id
 * @desc Delete a job by its ID
 */
router.route("/delete/:id").delete(deleteJob);

export default router;