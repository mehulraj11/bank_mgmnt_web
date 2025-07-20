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
        setBankList(response.data.data);
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
  const handleAddSuccess = (newBank) => {
    setBankList((prevBankList) => [...prevBankList, newBank]);
  };

  return (
    <>
      {bank && <h2 className="text-center">Bank Deatils</h2>}
      {showAddBank && (
        <AddBank
          handleAddBankClick={handleAddBankClick}
          onAddSuccess={handleAddSuccess}
          setShowAddBank={setShowAddBank}
        />
      )}
      <div style={{ maxHeight: "600px", overflowY: "auto" }}>
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
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="outline-primary"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
          onClick={handleAddBankClick}
        >
          Add Bank
        </Button>
        <Button
          variant="outline-danger"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default UserDashboard;
