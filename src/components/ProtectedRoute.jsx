import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <div>You can't do that!</div>;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
