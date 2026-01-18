import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function EmployerDashboard() {
  const { user, logout } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();


  const fetchMyJobs = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/jobs/my"); // ✅ FIXED
      setJobs(res.data);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/jobs", {
        title,
        description,
        company,
        location,
        jobType,
        salary,
      });

      
      setTitle("");
      setDescription("");
      setCompany("");
      setLocation("");
      setJobType("");
      setSalary("");

      
      fetchMyJobs();
    } catch (err) {
      console.error("Create job error:", err);
      setError(err.response?.data?.message || "Job creation failed");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h1>Employer Dashboard</h1>
      <p>
        Logged in as: <b>{user?.email}</b>
      </p>

      <button onClick={logout} style={{ marginBottom: "20px" }}>
        Logout
      </button>

      <hr />

      <h2>Create Job</h2>
      <form onSubmit={handleCreateJob}>
        <input placeholder="Job Title" value={title} required onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input placeholder="Job Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
        <br />
        <input placeholder="Company" value={company} required onChange={(e) => setCompany(e.target.value)} />
        <br />
        <input placeholder="Location" value={location} required onChange={(e) => setLocation(e.target.value)} />
        <br />
        <select value={jobType} required onChange={(e) => setJobType(e.target.value)}>
          <option value="">Select Job Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
        </select>

        <br />
        <input placeholder="Salary" value={salary} required onChange={(e) => setSalary(e.target.value)} />
        <br />
        <button type="submit">Post Job</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <h2>My Jobs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>Type: {job.jobType}</p>
            <p>Salary: {job.salary}</p>

          
            <button
              onClick={() =>
                navigate(`/employer/jobs/${job._id}/applicants`)
              }
            >
              View Applicants
            </button>
          </div>
        ))

      )}
    </div>
  );
}
