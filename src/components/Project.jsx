import { useLocation } from "react-router-dom";

const Project = () => {
  const { state } = useLocation();
  return (
    <>
      <h1>{state.project.title}</h1>
      <p>{state.project.description}</p>
    </>
  );
};

export default Project;
