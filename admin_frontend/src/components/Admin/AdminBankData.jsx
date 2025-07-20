import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import BankDetails from "../User/BankDetails";

function AdminBankData() {
  const [allBank, SetAllBank] = useState([]);
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
        console.log(response.data.allBank);
        SetAllBank(response.data.allBank);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchBank();
  }, []);

  return (
    <>
      {allBank.map((item, index) => {
        return (
          <BankDetails
            key={item._id}
            accountNumber={item.accountNumber}
            ifscCode={item.ifscCode}
            branchName={item.branchName}
            bankName={item.bankName}
            accountHolderName={item.accountHolderName}
          />
        );
      })}
    </>
  );
}

export default AdminBankData;
