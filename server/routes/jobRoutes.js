import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  getEmployerJobs,
} from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getJobs);


router.get("/my", protect, getEmployerJobs);


router.get("/:id", getJobById);

router.post("/", protect, createJob);

export default router;
