import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // role mismatch
  if (
    role &&
    user.role?.toLowerCase() !== role.toLowerCase()
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
