import { configureStore } from "@reduxjs/toolkit";
import projectSlice from "../helper/Project/projectSlice";

export default configureStore({
  reducer: {
    projects: projectSlice,
  },
});
