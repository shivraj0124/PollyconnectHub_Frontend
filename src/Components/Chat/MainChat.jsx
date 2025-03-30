import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
const VITE_BACKEND_API = import.meta.env.VITE_BACKEND_API;
const socket = io(VITE_BACKEND_API);

const Chat = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`${VITE_BACKEND_API}/api/messages/${currentUser._id}/${selectedUser._id}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error(err));
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      if (message.sender === selectedUser._id || message.receiver === selectedUser._id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      message: newMessage,
    };

    try {
      const { data } = await axios.post(`${VITE_BACKEND_API}/api/messages`, messageData);
      socket.emit("send_message", data);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Message send error", error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat with {selectedUser?.username}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === currentUser._id ? "sent" : "received"}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
