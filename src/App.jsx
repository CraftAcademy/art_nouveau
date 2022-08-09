import { Routes, Route } from "react-router-dom";
import Navigation from "./components/ui_elements/navigation/Navigation";
import Project from "./components/project/Project";
import ProjectCreate from "./components/project/ProjectCreate";
import Landing from "./components/ui_elements/landing/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./components/auth/SignUp";
import Toast from "./components/ui_elements/navigation/Toast";
import Footer from "./components/ui_elements/footer/Footer";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box height={"100vh"}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/create" element={<ProjectCreate />} />
        </Route>
        <Route path="/auth" element={<SignUp />} />
      </Routes>
      <Footer />
      <Toast />
    </Box>
  );
};
export default App;
