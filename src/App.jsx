import React from "react";
import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import Projects from "./components/Projects";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>
    </>
  );
};
export default App;
