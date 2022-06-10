import axios from "axios";

const ProjectsService = {
  async index(stateSetter) {
    const { data } = await axios.get("http://localhost:3001/projects");
    stateSetter(data.projects);
  },
};

export default ProjectsService;
