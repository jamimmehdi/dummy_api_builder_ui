import { Route, Routes } from "react-router-dom";

import { HOME, NEW_PROJECT, PROJECT } from "./routes";

import Home from "./component/screens/Home";
import Project from "./component/screens/Project";
import Navbar from "./component/common/Navbar";
import NewProject from "./component/screens/NewProject";
import Toast from "./component/common/Toast";

function App() {
  return (
    <>
      <Navbar />
      <Toast />
      <Routes>
        <Route path={HOME} element={<Home />} />
        <Route path={PROJECT} element={<Project />} />
        <Route path={NEW_PROJECT} element={<NewProject />} />
      </Routes>
    </>
  );
}

export default App;
