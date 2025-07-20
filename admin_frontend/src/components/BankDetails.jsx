import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BankDetails({
  id,
  accountHolderName,
  accountNumber,
  bankName,
  branchName,
  ifscCode,
  onDeleteSuccess,
}) {
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/login/user/dashboard/update/${id}`);
  };
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/bank/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDeleteSuccess(id);
    } catch (error) {
      console.error("Delete user error:", error.message);
    }
  };
  return (
    <Container className="mt-3">
      <Card className="mt-4">
        <Card.Header>Bank Details</Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col>
              <strong>Account Number:</strong> {accountNumber}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Account Holder Name:</strong> {accountHolderName}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>IFSC Code:</strong> {ifscCode}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Bank Name:</strong> {bankName}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Bank Branch:</strong> {branchName}
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="warning" onClick={() => handleUpdate(id)}>
              Update
            </Button>
            <Button variant="danger" onClick={() => handleDelete(id)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BankDetails;
