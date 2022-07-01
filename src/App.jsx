import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Project from "./components/Project";
import ProjectCreate from "./components/ProjectCreate";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const toast = useToast();
  const { content } = useSelector((state) => state.messages);
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
        </Route>
      </Routes>
      {content.length > 0 && toast({ title: content[0], status: 'error' })}
    </>
  );
};
export default App;
