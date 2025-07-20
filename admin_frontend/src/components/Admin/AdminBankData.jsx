import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, ListGroup, Form, InputGroup, Button } from "react-bootstrap";
import BankDetails from "../User/BankDetails";
import { useNavigate } from "react-router-dom";

function AdminBankData() {
  const navigate = useNavigate();

  const [allBank, setAllBank] = useState([]); // state for all bank details

  const [searchKeyword, setSearchKeyword] = useState(""); // state for search input

  // fetch all bank details
  useEffect(() => {
    const fetchBank = async () => {
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
                  {" "}
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
              <ListGroup.Item className="text-center bg-light">
                No results found.
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
