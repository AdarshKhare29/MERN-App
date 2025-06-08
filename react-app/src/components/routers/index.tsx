import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "../home";
import Login from "../login";
import Register from "../register";
import Layout from "../layout";
import Logout from "../logout";
import Dashboard from "../dashboard";
import ProtectedRoute from "./protectedRoute";

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
              <Route path="logout" element={<Logout />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </>
      </Suspense>
    </Router>
  );
};
export default Routering;
