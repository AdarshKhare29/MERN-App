import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHandler = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Do not redirect on Home page
    if (!isAuthenticated && location.pathname !== "/") {
      navigate("/login");
    }
  }, [isAuthenticated, location, navigate]);

  return null; // No UI needed
};

export default AuthHandler;
