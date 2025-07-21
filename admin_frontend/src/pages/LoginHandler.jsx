import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginHandler() {
  const navigate = useNavigate();
  
  const handleAdminLogin = () => {
    navigate("/login/admin");
  };

  const handleUserLogin = () => {
    navigate("/login/user");
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Select Login Type</h2>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button variant="primary" size="lg" onClick={handleAdminLogin}>
            Admin Login
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="success" size="lg" onClick={handleUserLogin}>
            User Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginHandler;
