import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmployerDashboard from "./pages/EmployerDashboard";
import JobSeekerDashboard from "./pages/JobSeekerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/employer"
            element={
              <ProtectedRoute role="employer">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute role="jobseeker">
                <JobSeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/jobs" element={
            <ProtectedRoute role="jobseeker">
              <JobList />
            </ProtectedRoute>
          } />

          <Route path="/jobs/:id" element={
            <ProtectedRoute role="jobseeker">
              <JobDetails />
            </ProtectedRoute>
          } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
