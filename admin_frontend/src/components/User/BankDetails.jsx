import React, { useState } from "react";
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap";
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
  const [isDeleting, setIsDeleting] = useState(false);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/login/user/dashboard/update/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bank account?")) {
      setIsDeleting(true);
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
        alert("Failed to delete bank account. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow rounded-4 border-0 overflow-hidden">
        <Card.Header className="bg-primary bg-gradient text-white text-center fw-bold py-3">
          Bank Details
        </Card.Header>

        <Card.Body className="bg-light">
          <Row className="mb-3">
            <Col>
              <strong>Account Number:</strong> {accountNumber}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Account Holder Name:</strong>{" "}
              {accountHolderName.toUpperCase()}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>IFSC Code:</strong> {ifscCode.toUpperCase()}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Bank Name:</strong> {bankName.toUpperCase()}
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <strong>Bank Branch:</strong> {branchName.toUpperCase()}
            </Col>
          </Row>

          {role !== "admin" && (
            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button
                variant="outline-warning"
                size="md"
                className="rounded-pill fw-semibold px-4 mx-2"
                onClick={() => handleUpdate(id)}
                disabled={isDeleting}
              >
                Update
              </Button>
              <Button
                variant="outline-danger"
                size="md"
                className="rounded-pill fw-semibold px-4 mx-2"
                onClick={() => handleDelete(id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BankDetails;