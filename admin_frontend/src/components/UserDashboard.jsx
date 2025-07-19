import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import AddBank from "./AddBank";
import BankDetails from "./BankDetails";
import axios from "axios";

function UserDashboard() {
  // Example: current bank details (you'll fetch from API in real app)
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);

  const handleAddBankClick = () => {
    setShowAddBank(!showAddBank);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bank/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBankList(response.data);
        setBank(true);
        console.log(response);

        console.log(bankList);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {bank && <h2 className="text-center">Bank Deatils</h2>}
      <div className="mt-4 text-center">
        <Button variant="primary" onClick={handleAddBankClick}>
          Add Bank
        </Button>
      </div>

      {showAddBank && <AddBank handleAddBankClick={handleAddBankClick} />}

      {!showAddBank &&
        bankList.map((item) => (
          <BankDetails
            key={item._id}
            accountHolderName={item.accountHolderName}
            accountNumber={item.accountNumber}
            bankName={item.bankName}
            branchName={item.branchName}
            ifscCode={item.ifscCode}
          />
        ))}
    </>
  );
}

export default UserDashboard;
