import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import "./SidebarChat.css";
import db from "../firebase";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((resultsnap) => {
          setMessages(
            resultsnap.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    }
  }, [id]);

  const createChat = () => {
    const roomName = prompt("Please enter name for Room");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>
            {messages[0]?.message.substring(0, 15)}
            {messages[0]?.message.length > 15 && "..."}
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat" id="add__chat">
      <h2>+ Add new Room</h2>
    </div>
  );
}

export default SidebarChat;
