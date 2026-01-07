import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Available Jobs</h2>

      {jobs.length === 0 && <p>No jobs available</p>}

      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>

          <Link to={`/jobs/${job._id}`}>View Job</Link>
        </div>
      ))}
    </div>
  );
}
