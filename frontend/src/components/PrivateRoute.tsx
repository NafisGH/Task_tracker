import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute({ children }: { children: React.JSX.Element }) {
  const isAuthenticated = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
