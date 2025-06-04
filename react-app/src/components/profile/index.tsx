import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user } = useSelector((state: any) => state.authReducer);
  return (
    <>
      <div>
        <span>User Name : {user.name}</span>
        <span>User Email: {user.email}</span>
      </div>
    </>
  );
};
export default Profile;
