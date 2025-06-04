import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
// import ShowFormData from "../showFormData";
import About from "../about";
import Home from "../home";
// import Dashboard from "../dashboard";
import Login from "../login";
import Profile from "../profile";
import Register from "../register";
import Layout from "../layout";
import Logout from "../logout";
const Dashboard = lazy(() => import("../dashboard"));

const Routering = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading....</div>}>
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="logout" element={<Logout />} />
            </Route>
          </Routes>
        </>
      </Suspense>
    </Router>
  );
};
export default Routering;
