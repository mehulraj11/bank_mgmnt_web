import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UserLogin() {
  const navigate = useNavigate();
  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        { email: adminLoginData.email, password: adminLoginData.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.user.role);
      if (res.data.user.role === "admin") {
        navigate("/login/admin/dashboard");
      } else {
        navigate("/login/user/dashboard");
      }
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log("login error : ", error.message);
    }
  };
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 w-100 bg-light"
    >
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h2 className="mb-4 text-center">User Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={adminLoginData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={adminLoginData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default UserLogin;
