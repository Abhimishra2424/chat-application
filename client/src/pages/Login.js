import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

import { gql, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import { useAuthDispatch } from "../context/auth";

const LOGIN_USER = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      email
      username
      createdAt
      token
    }
  }
`;

export default function Login(props) {
  const [variables, setVariables] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({});

  const dispatch = useAuthDispatch();

  const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
    onError: (err) => setError(err.graphQLErrors[0].extensions.errors),
    onCompleted(data) {
    
      dispatch({ type: "LOGIN", payload: data.login });
      props.history.push("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Login</h1>
        <Card>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={error.username && "text-danger"}>
                {error.username ?? "Username"}
              </Form.Label>
              <Form.Control
                type="text"
                className={error.username && "is-invalid"}
                value={variables.username}
                onChange={(e) =>
                  setVariables({ ...variables, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={error.password && "text-danger"}>
                {error.password ?? "Password"}
              </Form.Label>
              <Form.Control
                type="password"
                className={error.password && "is-invalid"}
                value={variables.password}
                onChange={(e) =>
                  setVariables({ ...variables, password: e.target.value })
                }
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "loading..." : "Login"}
              </Button>
              <br />
              <small>
                Don't have an account? <Link to="/register">Register</Link>
              </small>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
