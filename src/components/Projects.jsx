import { Button, List, ListItem, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectsService from "../modules/ProjectsService";

const Projects = () => {
  const { projects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    ProjectsService.index();
  }, []);

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
