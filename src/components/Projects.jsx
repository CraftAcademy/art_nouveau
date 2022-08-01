import { Button, List, ListItem, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectsService from "../modules/ProjectsService";
import { setMessage } from "../state/features/messageSlice";

const Projects = () => {
  const { projects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location?.state?.message) {
      dispatch(
        setMessage([{ content: location.state.message, status: "error" }])
      );
    }
    ProjectsService.index();
  }, [location, dispatch]);

  const handleClick = (project) => {
    if (currentUser) {
      navigate(`/projects/${project.id}`, {
        state: { project: project },
      });
    } else {
      navigate("/auth", {
        replace: true,
        state: { originalRoute: { pathname: `/projects/${project.id}` } },
      });
    }
  };
  return (
    <List data-cy="projects-list">
      {projects.map((project) => {
        return (
          <ListItem key={project.id}>
            <Text fontSize={20}>{project.title}</Text>
            <Text>{project.description}</Text>

            <Button
              colorScheme="teal"
              size="xs"
              onClick={() => handleClick(project)}
              data-cy={`project-${project.id}-link`}
            >
              read more...
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Projects;
