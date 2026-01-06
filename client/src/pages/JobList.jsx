import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  return (
    <div>
      <h1>All Jobs</h1>

      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <Link to={`/jobs/${job._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
}
