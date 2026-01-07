import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Applicants() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api
      .get(`/applications/job/${jobId}`)
      .then((res) => setApps(res.data))
      .catch(() => alert("Failed to load applicants"));
  }, [jobId]);

  return (
    <div>
      <h2>Applicants</h2>

      {apps.length === 0 && <p>No applications yet</p>}

      {apps.map((a) => (
        <div key={a._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <p><b>Email:</b> {a.applicant?.email}</p>
          <p><b>Status:</b> {a.status}</p>
        </div>
      ))}
    </div>
  );
}
