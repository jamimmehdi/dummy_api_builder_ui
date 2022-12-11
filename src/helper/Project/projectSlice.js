import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
  },
  reducers: {
    setProjects: (state, actions) => {
      state.projects = [...actions.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProjects } = projectSlice.actions;

export default projectSlice.reducer;
