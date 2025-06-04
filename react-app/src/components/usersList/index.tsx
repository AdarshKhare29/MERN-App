import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";
import { RootState } from "../../store"; // ✅ Import RootState

const UserList: React.FC = () => {
  const dispatch = useDispatch();

  // ✅ Fix selector: use correct reducer key
  const { loading, users, error } = useSelector(
    (state: RootState) => state.userInfo
  );

  useEffect(() => {
    dispatch(fetchUsers() as any); // ✅ Ensure TypeScript doesn't complain
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("loading", loading, users);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
