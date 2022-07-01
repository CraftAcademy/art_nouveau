import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./features/messageSlice";
import projectsSlice from "./features/projectsSlice";
import userSlice from './features/userSlice'


export const store = configureStore({
  reducer: {
    projects: projectsSlice,
    user: userSlice,
    messages: messageSlice
  },
});
