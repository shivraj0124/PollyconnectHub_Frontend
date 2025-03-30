import React, { useState } from "react";
import Chat from "./MainChat";
import UserList from "./UserList";
import themeHook from "../Context";
const ChatApp = () => {
    const {userDetails} = themeHook()
  const [currentUser, setCurrentUser] = useState({
    _id: userDetails._id, // Replace with actual logged-in user ID
    fullName: userDetails.username,
  });
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="app-container">
      <UserList currentUser={currentUser} onSelectUser={setSelectedUser} />
      {selectedUser && <Chat currentUser={currentUser} selectedUser={selectedUser} />}
    </div>
  );
};

export default ChatApp;
