import React,{ useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";

import { gql, useMutation } from "@apollo/client";

import { Link } from "react-router-dom";

const RIGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      email
      username
      createdAt
    }
  }
`;

export default function Register(props) {
  const [variables, setVariables] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});

  const [registerUser, { loading }] = useMutation(RIGISTER_USER, {
    update: (_, __) => props.history.push("/login"),
    onError: (err) => setError(err.graphQLErrors[0].extensions.errors),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables });
  };

  return (
    <Row className="bg-white py-5 justify-content-center">
      <Col sm={8} md={6} lg={4}>
        <h1>Register</h1>
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

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={error.email && "text-danger"}>
                {error.username ?? "Email"}
              </Form.Label>
              <Form.Control
                type="email"
                className={error.email && "is-invalid"}
                value={variables.email}
                onChange={(e) =>
                  setVariables({ ...variables, email: e.target.value })
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={error.confirmPassword && "text-danger"}>
                {error.confirmPassword ?? "Confirm Password"}
              </Form.Label>
              <Form.Control
                type="password"
                className={error.confirmPassword && "is-invalid"}
                value={variables.confirmPassword}
                onChange={(e) =>
                  setVariables({
                    ...variables,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit" disabled={loading}>
                {loading ? "loading..." : "Register"}
              </Button>
              <br />
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
