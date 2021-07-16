import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import Loading from "./Components/Loading";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const listener = auth.onAuthStateChanged((authUser) => {
      setLoading(false);
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
      }
    });
    return () => listener();
  }, [dispatch]);

  const removeRoom = (roomid) => {
    db.collection("Rooms")
      .doc(roomid)
      .delete()
      .then(() => {
        alert("Room Deleted");
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router basename={process.env.PUBLIC_URL}>
            <Switch>
              <Route path="/" exact>
                <Sidebar hide={false} />
                <Chat hide={true} removeRoom={removeRoom} />
                <div className="project__info">
                  <img
                    src="https://www.logo.wine/a/logo/WhatsApp/WhatsApp-Logo.wine.svg"
                    alt=""
                  />
                  <div className="text">
                    <h1>WhatsApp Web Clone</h1>
                    <p>- By Piyush Sati</p>
                  </div>
                </div>
              </Route>
              <Route path="/rooms/:roomId">
                <Sidebar hide={true} />
                <Chat hide={false} removeRoom={removeRoom} />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
