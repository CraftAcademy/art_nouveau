import React, { useEffect, useState } from "react";
// import axios from "axios";
import ProjectsService from '../modules/ProjectsService'

const Projects = () => {
  const [projects, setProjects] = useState([]);

  // const fetchProjects = async () => {
  //   const { data } = await axios.get("http://localhost:3001/projects");
  //   setProjects(data.projects);
  // };

  useEffect(() => {
    // ProjectsService.index().then(projectsData => {
    //   setProjects(projectsData)
    // });
    ProjectsService.index(setProjects)
  }, []);

  const projectsList = projects.map((project) => {
    return (
      <li key={project.id}>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </li>
    );
  });

  return <ul data-cy="projects-list">{projectsList}</ul>;
};

export default Projects;
