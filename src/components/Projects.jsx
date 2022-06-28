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
    <ul data-cy="projects-list">
      {projects.map((project) => {
        return (
          <li key={project.id}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {currentUser && (
              <p
                onClick={() =>
                  navigate(`/projects/${project.id}`, {
                    state: { project: project },
                  })
                }
                data-cy={`project-${project.id}-link`}
              >
                read more...
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Projects;
