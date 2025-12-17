import { Navigate } from "react-router";

export default function AdminRoute({ children }) {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const role = sessionStorage.getItem("role");
  if (!isLoggedIn || role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
}
