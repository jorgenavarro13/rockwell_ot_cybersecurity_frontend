import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";

export function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user || !user.isAdmin) return <Navigate to="/login" replace />;

  return children;
}