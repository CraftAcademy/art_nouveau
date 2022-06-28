import React from "react";
import { useLocation } from "react-router-dom";

const Project = () => {
  const { state } = useLocation();
  return (
    <>
      <h2>This is project page</h2>
      <h1> {state?.project?.title}</h1>
      <p>{state?.project?.description}</p>
    </>
  );
};

export default Project;
