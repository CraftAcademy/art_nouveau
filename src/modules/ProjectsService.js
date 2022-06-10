import axios from "axios";
import { setProjects } from "../state/features/projectsSlice";
import { store } from "../state/store";

const ProjectsService = {
  async index() {
    const { data } = await axios.get("http://localhost:3001/projects");
    store.dispatch(setProjects(data.projects));
  },
};

export default ProjectsService;
