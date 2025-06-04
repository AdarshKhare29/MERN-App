import React, { useState } from "react";
import { useSelector } from "react-redux";
import Login from "../login";
import Home from "../home";
import { useNavigate } from "react-router-dom";
const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const isAuth = useSelector((state: any) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    console.log("isAuth", isAuth);
    if (!isAuth) {
      return (
        <h2>
          Access Deneied
          <Login />
          <button onClick={() => navigate("/")}>Go To Home</button>
        </h2>
      );
    }
    return <WrappedComponent {...props} />;
  };
};
export default withAuth;
