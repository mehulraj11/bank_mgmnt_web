import axios from "axios";
import React, { useState } from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AddBank({ handleAddBankClick, onAddSuccess, setShowAddBank }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    bankName: "",
    branchName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/bank/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newBank = response.data;
      onAddSuccess(newBank);
      alert("Bank Added Successfully");
      setShowAddBank(false);

      // Reset form data
      setFormData({
        accountNumber: "",
        accountHolderName: "",
        ifscCode: "",
        bankName: "",
        branchName: "",
      });
    } catch (error) {
      console.log(error.message);
      alert("Failed to add bank details. Please try again.");
    } finally {
      setIsSubmitting(false);
    }

    console.log("Form Data:", formData);
  };

  return (
    <Container className="mt-3">
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
            disabled={isSubmitting}
            required
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
            disabled={isSubmitting}
            required
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
            disabled={isSubmitting}
            required
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
            disabled={isSubmitting}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bank Branch</Form.Label>
          <Form.Control
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            placeholder="Enter Bank Branch"
            disabled={isSubmitting}
            required
          />
        </Form.Group>

        <Button
          variant="outline-success"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Saving...
            </>
          ) : (
            "Save Bank Details"
          )}
        </Button>

        <Button
          variant="outline-danger"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
          onClick={handleAddBankClick}
          disabled={isSubmitting}
        >
          Close
        </Button>
      </Form>
    </Container>
  );
}

export default AddBank;
