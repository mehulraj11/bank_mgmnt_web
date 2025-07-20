import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const navigate = useNavigate();
  const [adminRegisterData, setAdminRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          username: adminRegisterData.username,
          email: adminRegisterData.email,
          password: adminRegisterData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("User Registered Succesfully.");
      navigate("/login/admin/dashboard");
    } catch (error) {
      console.log("login error : ", error.message);
    }
  };
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 w-100 bg-light"
      >
        <Card className="p-4 shadow" style={{ width: "400px" }}>
          <h2 className="mb-4 text-center">User Creation</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter username"
                value={adminRegisterData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={adminRegisterData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={adminRegisterData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

export default Register;
