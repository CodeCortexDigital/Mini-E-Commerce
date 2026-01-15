import { Navigate } from "react-router-dom";
import React from "react";
import { isAuthenticated, isAdmin } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
