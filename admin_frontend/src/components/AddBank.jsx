import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
function AddBank({ handleAddBankClick }) {
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
    bankBranch: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Send formData to backend API here
  };
  return (
    <Container className="mt-5">
      <h2>Add Bank Details</h2>
      <Form onSubmit={handleSubmit} className="mt-4">
        <Form.Group className="mb-3">
          <Form.Label>Account Number</Form.Label>
          <Form.Control
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            placeholder="Enter Account Number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Account Holder Name</Form.Label>
          <Form.Control
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            placeholder="Enter Account Holder Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>IFSC Code</Form.Label>
          <Form.Control
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            placeholder="Enter IFSC Code"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bank Name</Form.Label>
          <Form.Control
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Enter Bank Name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bank Branch</Form.Label>
          <Form.Control
            type="text"
            name="bankBranch"
            value={formData.bankBranch}
            onChange={handleChange}
            placeholder="Enter Bank Branch"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Bank Details
        </Button>
        <Button variant="danger" onClick={handleAddBankClick}>
          Close
        </Button>
      </Form>
    </Container>
  );
}

export default AddBank;
