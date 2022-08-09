import {
  Button,
  Grid,
  List,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ProjectsService from "../modules/ProjectsService";
import { setMessage } from "../state/features/messageSlice";
import ProjectsUI from "./project/ProjectsUI";

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

  const handleProjectNavigation = (project) => {
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
    <Grid
      m={"20px"}
      templateColumns={"repeat(3, 1fr)"}
      gap={6}
      data-cy="projects-list"
      // direction={["column", "row"]}
      spacing={"20px"}
    >
      {projects.map((project) => {
        return (
          <ProjectsUI
            key={project.id}
            project={project}
            handleProjectNavigation={handleProjectNavigation}
          />
          // <ListItem key={project.id}>
          //   <Text fontSize={20}>{project.title}</Text>
          //   <Text>{project.description}</Text>

          //   <Button
          //     colorScheme="teal"
          //     size="xs"
          //     onClick={() => handleProjectNavigation(project)}
          //     data-cy={`project-${project.id}-link`}
          //   >
          //     read more...
          //   </Button>
          // </ListItem>
        );
      })}
    </Grid>
  );
};

export default Projects;
