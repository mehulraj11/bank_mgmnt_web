import { Container, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const naivgate = useNavigate();
  const handleUserClick = () => {
    naivgate("/login/admin/dashboard/user");
  };
  return (
    <Container className="mt-5 text-center">
      <h2>Select Login Type</h2>
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button variant="primary" size="lg" onClick={handleUserClick}>
            User Data
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            variant="success"
            size="lg"
            onClick={() => naivgate("/login/admin/dashboard/bank")}
          >
            Bank Data
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
