import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AddBank from "./AddBank";
import BankDetails from "./BankDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [bankList, setBankList] = useState([]);
  const [bank, setBank] = useState(false);
  const [showAddBank, setShowAddBank] = useState(false);
  const navigate = useNavigate();
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
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };
  const handleDeleteSuccess = (deletedId) => {
    setBankList((prevBankList) =>
      prevBankList.filter((bank) => bank._id !== deletedId)
    );
  };
  return (
    <>
      {bank && <h2 className="text-center">Bank Deatils</h2>}
      <div className="mt-4 text-center">
        <Button variant="primary" onClick={handleAddBankClick}>
          Add Bank
        </Button>
      </div>

      {showAddBank && <AddBank handleAddBankClick={handleAddBankClick} />}
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        {!showAddBank &&
          bankList.map((item) => (
            <BankDetails
              key={item._id}
              id={item._id}
              accountHolderName={item.accountHolderName}
              accountNumber={item.accountNumber}
              bankName={item.bankName}
              branchName={item.branchName}
              ifscCode={item.ifscCode}
              onDeleteSuccess={handleDeleteSuccess} 
            />
          ))}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <Button variant="warning" className="text-end" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
}

export default UserDashboard;
