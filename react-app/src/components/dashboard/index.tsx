import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import UserList from "../usersList";
import Logout from "../logout";

const Dashboard = () => {
  const navigate = useNavigate(); // Get the navigation function
  const goToAbout = () => {
    navigate("/about"); // Navigate to /about when button is clicked
  };
  const goToProfile = () => {
    navigate("/profile");
  };
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(5);
  const expensiveCalculation = useMemo(() => {
    console.log("Calculating...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result += number;
    }
    return result;
  }, [number]);
  const [activeTab, setActiveTab] = useState("debouce");
  const handleClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <>
    </>
  );
};
export default Dashboard;
