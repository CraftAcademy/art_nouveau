import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Project = () => {
  const { state } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
   !state && navigate('/')
  }, [state, navigate])
  
  return (
    <>
      <h1>{state?.project?.title}</h1>
      <p>{state?.project?.description}</p>
    </>
  );
};

export default Project;
