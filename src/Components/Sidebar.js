import React, { useEffect, useState } from "react";
import { Avatar, ClickAwayListener, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { SearchOutlined } from "@material-ui/icons";
import db, { auth } from "../firebase";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";

function Sidebar({ hide }) {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [search, setSearch] = useState("");
  const [showdropdown, setDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = db.collection("Rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        setDropdown(!showdropdown);
        //localStorage.clear();
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const createChat = () => {
    setDropdown(!showdropdown);
    const roomName = prompt("Please enter name for Room");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return (
    <div className={hide ? "sidebar side__bar" : "sidebar"}>
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton
            onClick={() =>
              alert(
                "Not added this functionality.\nClick on three dots to logout and add new room."
              )
            }
          >
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="dropdown">
              <IconButton
                onClick={() => {
                  setDropdown(!showdropdown);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <div
                className={
                  showdropdown ? "dropdown__list" : "dropdown__list hide"
                }
              >
                <ul>
                  <li onClick={createChat}>Add Room</li>
                  <li onClick={signOut}>Log Out</li>
                  <li
                    onClick={() =>
                      alert(
                        "Not added this functionality.\nTry Logout and add Room options"
                      )
                    }
                  >
                    Help ?
                  </li>
                </ul>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Search a room"
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {rooms.map((room) => {
          if (
            room.data.name.toLowerCase().includes(search.toLowerCase()) ||
            search === ""
          ) {
            return (
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
}

export default Sidebar;
