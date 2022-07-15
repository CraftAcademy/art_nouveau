import { Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Project from "./components/Project";
import ProjectCreate from "./components/ProjectCreate";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/auth/SignUp";
import Toast from "./components/navigation/Toast";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
        </Route>
        <Route path="/auth" element={<SignUp />} />
      </Routes>
      <Toast />
    </>
  );
};
export default App;
