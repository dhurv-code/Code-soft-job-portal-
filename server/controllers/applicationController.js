import Application from "../models/Application.js";

export const applyToJob = async (req, res) => {
  try {
    if (req.user.role !== "jobseeker") {
      return res.status(403).json({ message: "Only jobseekers can apply" });
    }

    const { jobId } = req.params;

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
    });

    res.status(201).json(application);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Already applied" });
    }
    res.status(500).json({ message: "Apply failed" });
  }
};


export const getApplicantsForJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers allowed" });
    }

    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("applicant", "email name")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("GET APPLICANTS ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch applicants" });
  }
};

