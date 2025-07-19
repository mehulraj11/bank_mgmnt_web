import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
function BankDetails({
  accountHolderName,
  accountNumber,
  bankName,
  branchName,
  ifscCode,
}) {
  return (
    <Container className="mt-5">
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
        </Card.Body>
      </Card>
    </Container>
  );
}

export default BankDetails;
