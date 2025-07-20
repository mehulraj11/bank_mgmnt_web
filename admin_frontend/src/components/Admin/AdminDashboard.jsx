import { Container, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  // handle logout : clear local storage & redirects to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  const handleRegister = () => {
    if (role !== "admin") return;
    navigate("/createuser");
  };
  return (
    <>
      <Container className="mt-5 text-center">
        <h2 className="fw-bold mb-4">Hello Admin!</h2>
        <Row className="justify-content-center gap-3">
          <Col xs="auto">
            <Button
              variant="primary"
              size="lg"
              className="rounded-pill px-4 fw-semibold shadow-sm"
              onClick={() => navigate("/login/admin/dashboard/user")}
            >
              View User Data
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="success"
              size="lg"
              className="rounded-pill px-4 fw-semibold shadow-sm"
              onClick={() => navigate("/login/admin/dashboard/bank")}
            >
              View Bank Data
            </Button>
          </Col>
          <Col xs="auto">
            <Button
              variant="warning"
              size="lg"
              className="rounded-pill px-4 fw-semibold shadow-sm"
              onClick={handleRegister}
            >
              Create a user
            </Button>
          </Col>
        </Row>
        <div className="d-flex justify-content-center mt-5">
          <Button
            variant="danger"
            size="lg"
            className="rounded-pill px-4 fw-semibold shadow-sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Container>
    </>
  );
}

export default AdminDashboard;
