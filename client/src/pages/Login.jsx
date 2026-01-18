import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      if (!token) {
        throw new Error("Token missing from response");
      }

     
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      const user = {
        id: payload.id,
        role: payload.role,
      };

      
      login(token, user);

      if (user.role === "employer") {
        navigate("/employer");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
