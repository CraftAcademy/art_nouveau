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
      dispatch(setMessage([location.state.message]))
    }
    ProjectsService.index();
  }, [location, dispatch]);

  return (
    <List data-cy="projects-list">
      {projects.map((project) => {
        return (
          <ListItem key={project.id}>
            <Text fontSize={20}>{project.title}</Text>
            <Text>{project.description}</Text>
            {currentUser && (
              <Button
                colorScheme="teal"
                size="xs"
                onClick={() =>
                  navigate(`/projects/${project.id}`, {
                    state: { project: project },
                  })
                }
                data-cy={`project-${project.id}-link`}
              >
                read more...
              </Button>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Projects;
