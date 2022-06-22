import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./features/projectsSlice";
import userSlice from './features/userSlice'

export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    user: userSlice
  },
});
