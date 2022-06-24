import React from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

const Project = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { state } = useLocation();
  return (
    <>
      {!currentUser && <Navigate to="/restricted" />}

      <h2>This is project page</h2>
      <h1> {state?.project?.title}</h1>
      <p>{state?.project?.description}</p>
    </>
  );
};

export default Project;
