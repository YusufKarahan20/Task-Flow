import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { userRole } = useAuth();

  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
