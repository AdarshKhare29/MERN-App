import React, { useEffect, useState } from "react";
// import { login } from "../../reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../reducers/auth";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error, user } = useSelector((state: any) => state.authReducer);

  const [userInfo, setUserInfo] = useState({
    name: "",
    password: "",
    email: "",
  });
  const handleChange = (fieldName: any, value: any) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      register(userInfo.name, userInfo.email, userInfo.password) as any
    );
    console.log("result", token, user, error);
  };
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  console.log("user", user);

  return (
    <>
      <div>
        <label>Enter Name:</label>
        <input
          type="text"
          value={userInfo.name}
          placeholder="Enter Name"
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <div>
          <label>Enter Email:</label>
          <input
            type="text"
            value={userInfo.email}
            placeholder="Enter Password"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label>Enter Password:</label>
          <input
            type="text"
            value={userInfo.password}
            placeholder="Enter Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && (
          <p style={{ color: "red" }}>Email or Password Wrong Try Again</p>
        )}
      </div>
    </>
  );
};
export default Register;
