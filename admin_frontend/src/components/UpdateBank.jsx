import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

function UpdateBank() {
  const [fetchedBankDetails, setFetchedBankDetails] = useState({});
  const [updatedData, setUpdatedData] = useState({
    accountNumber: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBank = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bank/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFetchedBankDetails(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBank();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(updatedData);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/bank/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Update successful:", response.data);
      alert("Bank details updated successfully!");
      navigate("/login/user/dashboard");
    } catch (error) {
      console.log(error.message);
      alert("Failed to update bank details");
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>Update Bank Details</Card.Header>
        <Card.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Previous Account Number:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={fetchedBankDetails.accountNumber || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Account Number:</Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={updatedData.accountNumber}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Previous Account Holder Name:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={fetchedBankDetails.accountHolderName || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Account Holder Name:</Form.Label>
              <Form.Control
                type="text"
                name="accountHolderName"
                value={updatedData.accountHolderName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Previous Bank Name:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={fetchedBankDetails.bankName || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Bank Name:</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={updatedData.bankName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Previous Branch Name:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={fetchedBankDetails.branchName || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New Branch Name:</Form.Label>
              <Form.Control
                type="text"
                name="branchName"
                value={updatedData.branchName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Previous IFSC Code:
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={fetchedBankDetails.ifscCode || ""}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>New IFSC Code:</Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={updatedData.ifscCode}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Bank Details
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateBank;
