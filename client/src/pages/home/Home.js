import React, {useState, Fragment } from "react";
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuthDispatch } from "../../context/auth";

import Users from "./Users";
import Messages from "./Messages";


export default function Home({ history }) {
  const dispatch = useAuthDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/login");
  };

  return (
    <Fragment>
      <div className="bg-white d-flex justify-content-around mb-1">
        <Link to="/login">
          <Button variant="success">Login</Button>
        </Link>
        <Link to="/register">
          <Button variant="success">Register</Button>
        </Link>
        <Button variant="warning" onClick={logout}>
          Logout
        </Button>
      </div>

      <Row className="bg-white">
        <Users setSelectedUser={setSelectedUser} />
        <Messages selectedUser={selectedUser} />
      </Row>
    </Fragment>
  );
}
