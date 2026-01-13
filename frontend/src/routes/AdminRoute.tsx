import { Navigate } from "react-router-dom";
import React from "react";
import { isAdmin } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem("isAuth");
  const admin = isAdmin();

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!admin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
