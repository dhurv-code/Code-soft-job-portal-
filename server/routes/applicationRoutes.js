import express from "express";
import {
  applyToJob,
  getApplicantsForJob,
} from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:jobId", protect, applyToJob);

router.get("/job/:jobId", protect, getApplicantsForJob);

export default router;
