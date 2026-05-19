import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // 1. Check if token exists
  // 2. Ensure it's not the string "undefined" (a common JS bug)
  // 3. Ensure it's not an empty string
  const isAuthenticated = token && token !== "undefined" && token !== "";

  if (!isAuthenticated) {
    console.warn("User not authenticated or invalid token found. Redirecting...");
    return <Navigate to="/login" />;
  }

  return children;
}