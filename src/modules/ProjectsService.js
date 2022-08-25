import axios from "axios";
import { setProjects } from "../state/features/projectsSlice";
import { store } from "../state/store";

const ProjectsService = {
  async index() {
    const { data } = await axios.get("/projects");
    if (process.env.NODE_ENV === "production") {
      store.dispatch(setProjects(data));
    } else {
      store.dispatch(setProjects(data.projects));
    }
  },
};

export default ProjectsService;
