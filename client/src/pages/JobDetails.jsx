import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get(`/jobs/${id}`).then((res) => setJob(res.data));
  }, [id]);

  const apply = async () => {
    try {
      await api.post(`/applications/${id}`);
      setMsg("Applied successfully");
    } catch (err) {
      setMsg(err.response?.data?.message || "Apply failed");
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>Type: {job.jobType}</p>

      
      {user?.role === "jobseeker" && (
        <button onClick={apply}>Apply</button>
      )}

      {msg && <p>{msg}</p>}
    </div>
  );
}
