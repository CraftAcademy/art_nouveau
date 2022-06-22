import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectsService from "../modules/ProjectsService";

const Projects = () => {
  const { projects } = useSelector((state) => state.projects);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    ProjectsService.index();
  }, []);

  return (
    <ul data-cy="projects-list">
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {currentUser && <p>read more...</p>}
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
