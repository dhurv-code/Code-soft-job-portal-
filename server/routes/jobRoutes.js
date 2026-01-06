import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  getEmployerJobs,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getJobs);

// 🔴 PROTECTED EMPLOYER ROUTE — MUST COME BEFORE :id
router.get("/my", protect, getEmployerJobs);

// PUBLIC SINGLE JOB
router.get("/:id", getJobById);

// EMPLOYER CREATE JOB
router.post("/", protect, createJob);

export default router;
