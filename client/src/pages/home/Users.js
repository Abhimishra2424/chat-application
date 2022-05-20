import React from "react";
import { Col, Image } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      imageurl
      createdAt
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

export default function Users({ setSelectedUser }) {
  const { loading, data, error } = useQuery(GET_USERS);

  let usersMarkup;
  if (!data || loading) {
    usersMarkup = <p>Loading..</p>;
  } else if (data.getUsers.length === 0) {
    usersMarkup = <p>No users have joined yet</p>;
  } else if (data.getUsers.length > 0) {
    usersMarkup = data.getUsers.map((user) => (
      <div
        className="d-flex p-3"
        key={user.username}
        onClick={() => setSelectedUser(user.username)}
      >
        <Image
          src={user.imageurl}
          roundedCircle
          className="mr-2"
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
        <div>
          <p className="text-success">{user.username}</p>
          <p className="font-weight-light">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }
  return (
    <Col xs={4} className="p-0 bg-secondary">
      {usersMarkup}
    </Col>
  );
}
