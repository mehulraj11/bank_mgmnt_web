import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [adminLoginData, setAdminLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      localStorage.setItem("role", res.data.user.role);
    } catch (error) {
      console.log("login error : ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 w-100 bg-light"
    >
      <Card className="p-4 shadow" style={{ width: "400px" }}>
        <h2 className="mb-4 text-center">Admin Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={adminLoginData.email}
              onChange={handleChange}
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-100"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default AdminLogin;
