import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("adminId");

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If token exists, render the protected routes
  return <Outlet />;
};

export default PrivateRoutes;
