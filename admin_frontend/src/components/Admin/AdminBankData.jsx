import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Form,
  InputGroup,
  Button,
  Spinner,
  Container,
} from "react-bootstrap";
import BankDetails from "../User/BankDetails";
import { useNavigate } from "react-router-dom";

function AdminBankData() {
  const navigate = useNavigate();

  const [allBank, setAllBank] = useState([]); // state for all bank details
  const [searchKeyword, setSearchKeyword] = useState(""); // state for search input
  const [isLoading, setIsLoading] = useState(true); // loading state

  // fetch all bank details
  useEffect(() => {
    const fetchBank = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bank/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllBank(response.data.allBank);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBank();
  }, []);

  // search into bank data
  const filteredBanks = allBank.filter((item) => {
    const keyword = searchKeyword.toLowerCase();
    return (
      item.accountHolderName.toLowerCase().includes(keyword) ||
      item.bankName.toLowerCase().includes(keyword) ||
      item.branchName.toLowerCase().includes(keyword) ||
      item.ifscCode.toLowerCase().includes(keyword)
    );
  });

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading bank data...</p>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Card className="mb-4 shadow rounded border-0">
        <Card.Header className="bg-primary text-white text-center fw-semibold">
          Bank Details
        </Card.Header>
        <Card.Body className="bg-light">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name, branch, IFSC..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="rounded-pill"
            />
          </InputGroup>
          {searchKeyword && (
            <small className="text-muted mt-2 d-block">
              Found {filteredBanks.length} result(s) for "{searchKeyword}"
            </small>
          )}
        </Card.Body>
        <div style={{ height: "74vh", overflowY: "auto" }} className="bg-white">
          <ListGroup variant="flush">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((item, index) => (
                <ListGroup.Item
                  key={item._id}
                  className={`${
                    index % 2 === 0 ? "bg-light" : "bg-white"
                  } border-bottom`}
                >
                  <BankDetails
                    accountNumber={item.accountNumber}
                    ifscCode={item.ifscCode}
                    branchName={item.branchName}
                    bankName={item.bankName}
                    accountHolderName={item.accountHolderName}
                  />
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="text-center bg-light py-5">
                {searchKeyword ? (
                  <div>
                    <i
                      className="bi bi-search text-muted"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <p className="mt-2 text-muted">
                      No results found for "{searchKeyword}"
                    </p>
                    <small className="text-muted">
                      Try searching with different keywords
                    </small>
                  </div>
                ) : allBank.length === 0 ? (
                  <div>
                    <i
                      className="bi bi-bank text-muted"
                      style={{ fontSize: "2rem" }}
                    ></i>
                    <p className="mt-2 text-muted">No bank data available</p>
                  </div>
                ) : (
                  "No results found."
                )}
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </Card>
      <div className="d-flex justify-content-center">
        <Button
          variant="outline-primary"
          size="md"
          className="rounded-pill fw-semibold px-4"
        >
          Filter Data
        </Button>

        <Button
          onClick={() => navigate("/login/admin/dashboard")}
          variant="outline-warning"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
        >
          Go Back
        </Button>
      </div>
    </>
  );
}

export default AdminBankData;
