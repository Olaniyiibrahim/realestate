// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
// import { useAuth } from "../../components/context/AuthContext";
import useUserType from "../../Utilities/hooks/useUserType";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUserType();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
