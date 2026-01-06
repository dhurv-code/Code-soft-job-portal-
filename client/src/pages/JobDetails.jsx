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
    <div>
      <h2>{job.title}</h2>
      <p>{job.description}</p>

      {user?.role === "jobseeker" && (
        <button onClick={apply}>Apply</button>
      )}

      {msg && <p>{msg}</p>}
    </div>
  );
}