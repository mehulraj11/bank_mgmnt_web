import React, { useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import AddBank from "./AddBank";

function UserDashboard() {
  // Example: current bank details (you'll fetch from API in real app)
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "1234567890",
    accountHolderName: "Mehul Raj",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
    bankBranch: "Noida Sector 62",
  });

  const [showAddBank, setShowAddBank] = useState(false);

  const handleAddBankClick = () => {
    setShowAddBank(true);
  };

  return (
    <Container className="mt-5">
      <h2 style={{ textAlign: "center" }}>User Dashboard</h2>

      <Card className="mt-4">
        <Card.Header>Bank Details</Card.Header>
        <Card.Body>
          <Row className="mb-2">
            <Col>
              <strong>Account Number:</strong> {bankDetails.accountNumber}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Account Holder Name:</strong>{" "}
              {bankDetails.accountHolderName}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>IFSC Code:</strong> {bankDetails.ifscCode}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Bank Name:</strong> {bankDetails.bankName}
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <strong>Bank Branch:</strong> {bankDetails.bankBranch}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="mt-4 text-end">
        <Button variant="primary" onClick={handleAddBankClick}>
          Add Bank
        </Button>
      </div>

      {showAddBank && <AddBank />}
    </Container>
  );
}

export default UserDashboard;
