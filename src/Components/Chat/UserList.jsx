import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ currentUser, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
  const getUsers = async () => {
    try {
      const response = await axios.get(`${VITE_BACKEND_API}/api/auth/allusers`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="user-list">
      <h2 className="text-2xl ">Users</h2>
      {users.map(user => (
        user._id !== currentUser._id && (
          <div key={user._id} onClick={() => onSelectUser(user)}>
            {user.username}
          </div>
        )
      ))}
    </div>
  );
};

export default UserList;
