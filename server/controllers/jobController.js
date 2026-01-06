import Job from "../models/Job.js";

// CREATE JOB (Employer only)
export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }

    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    console.error("CREATE JOB ERROR:", err.message);
    res.status(500).json({ message: "Job creation failed" });
  }
};

// GET ALL JOBS (Public)
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

// GET SINGLE JOB (Public)
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

// GET EMPLOYER JOBS (Protected)
export const getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch employer jobs" });
  }
};
