// routes/applicationRoutes.js
import express from "express";
import { applyToJob } from "../controllers/applicationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/applications/:jobId
router.post("/:jobId", protect, applyToJob);

export default router;
