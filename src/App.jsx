import React from "react";
import { Routes, Route } from "react-router-dom";
import Project from "./components/Project";
import Projects from "./components/Projects";
import Restricted from "./components/Restricted";


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/projects/:id" element={<Project />} />
        <Route path="*" element={<Restricted />} />
      </Routes>
    </>
  );
};
export default App;
