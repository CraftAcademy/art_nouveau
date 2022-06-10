import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import axios from "axios";
import ProjectsService from "../modules/ProjectsService";

const Projects = () => {
  // const [projects, setProjects] = useState([]);
  const { projects } = useSelector((state) => state.projects);

  // const fetchProjects = async () => {
  //   const { data } = await axios.get("http://localhost:3001/projects");
  //   setProjects(data.projects);
  // };

  useEffect(() => {
    // ProjectsService.index().then(projectsData => {
    //   setProjects(projectsData)
    // });
    ProjectsService.index();
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
