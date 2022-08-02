import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { isDeveloper } from "../modules/userRoles";

const Project = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  const fetchProject = async (id) => {
    const { data } = await axios.get(`/projects/${id}`);
    setProject(data.project);
  };

  useEffect(() => {
    if (!state && id) {
      fetchProject(id);
    } else if (state) {
      setProject(state.project);
    } else {
      navigate("/");
    }
  }, [state, navigate, id]);

  return (
    <>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      {currentUser && isDeveloper(currentUser) && (
        <Button data-cy="project-join">Join</Button>
      )}
    </>
  );
};

export default Project;
