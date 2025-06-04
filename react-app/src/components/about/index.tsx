import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HOC from "../hoc";
import withAuth from "../hoc/withAuth";
import { useSelector, useDispatch } from "react-redux";
const About = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch({ type: "NAVIGATE_PROTECTED", payload: navigate });
    }
  }, [isAuthenticated, dispatch, navigate]);
  return (
    <div>

      <button onClick={() => navigate("/")}>Go To Home</button>
    </div>
  );
};

export default About;
