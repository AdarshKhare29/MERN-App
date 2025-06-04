import React, { useEffect } from "react";
// import { logout } from "../../reducers/authSlice";
import { logout } from "../../reducers/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    handleLogout()
  }, [])
  const handleLogout = () => {
    dispatch(logout() as any);
    navigate("/");
  };

  return <></>;
};
export default Logout;
