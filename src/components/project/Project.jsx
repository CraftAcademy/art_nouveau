import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import ProjectUI from "./ProjectUI";

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
      {project && currentUser && (
        <ProjectUI project={project} currentUser={currentUser} />
      )}
    </>
  );
};

export default Project;
