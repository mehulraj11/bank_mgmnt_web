import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

function UpdateBank() {
  const [fetchedBankDetails, setFetchedBankDetails] = useState({});
  const [updatedData, setUpdatedData] = useState({
    accountNumber: "",
    accountHolderName: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBank = async () => {
      setIsLoading(true);
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
        setFetchedBankDetails(response.data.bankData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBank();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

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
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading bank details...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow rounded-4 border-0">
        <Card.Header className="bg-primary bg-gradient text-white text-center fw-semibold">
          Update Bank Details
        </Card.Header>

        <Card.Body className="p-4">
          <Form onSubmit={handleUpdate}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="fw-semibold">
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
              <Form.Label className="fw-semibold">
                New Account Number:
              </Form.Label>
              <Form.Control
                type="text"
                name="accountNumber"
                value={updatedData.accountNumber}
                onChange={handleChange}
                className="rounded-pill px-3 py-2"
                disabled={isUpdating}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="fw-semibold">
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
              <Form.Label className="fw-semibold">
                New Account Holder Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="accountHolderName"
                value={updatedData.accountHolderName}
                onChange={handleChange}
                className="rounded-pill px-3 py-2"
                disabled={isUpdating}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="fw-semibold">
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
              <Form.Label className="fw-semibold">New Bank Name:</Form.Label>
              <Form.Control
                type="text"
                name="bankName"
                value={updatedData.bankName}
                onChange={handleChange}
                className="rounded-pill px-3 py-2"
                disabled={isUpdating}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="fw-semibold">
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
              <Form.Label className="fw-semibold">New Branch Name:</Form.Label>
              <Form.Control
                type="text"
                name="branchName"
                value={updatedData.branchName}
                onChange={handleChange}
                className="rounded-pill px-3 py-2"
                disabled={isUpdating}
              />
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4" className="fw-semibold">
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

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">New IFSC Code:</Form.Label>
              <Form.Control
                type="text"
                name="ifscCode"
                value={updatedData.ifscCode}
                onChange={handleChange}
                className="rounded-pill px-3 py-2"
                disabled={isUpdating}
              />
            </Form.Group>

            <div className="text-center">
              <Button
                type="submit"
                variant="success"
                size="md"
                className="rounded-pill px-4 fw-semibold"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Updating...
                  </>
                ) : (
                  "Update Bank Details"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UpdateBank;
