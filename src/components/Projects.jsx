import React, { useEffect, useState} from "react";
import axios from "axios";


const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get('http://localhost:3001/projects')
      setProjects(data.projects)
    }

    fetchProjects()
  }, [])
  
  return <div data-cy="projects-list">Hello Projects!</div>;
};

export default Projects;
