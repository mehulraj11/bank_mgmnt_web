import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import BankDetails from "../User/BankDetails";
function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});
  const [bankList, setBankList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/bank/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(res.data.user[0].user);

        setCurrentUser(res.data.user[0].user);
        // console.log(res.data.user)
        setBankList(res.data.userBankData);
      } catch (error) {
        console.error("Fetch user error:", error.message);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // console.log(currentUser);
  // console.log(bankList);

  return (
    <Card
      className="my-4 mx-auto shadow rounded border-0"
      style={{ width: "28rem" }}
    >
      <Card.Header
        as="h5"
        className="text-center text-white bg-primary bg-gradient fw-semibold"
      >
        User Details
      </Card.Header>

      <ListGroup variant="flush">
        <ListGroup.Item className="border-bottom">
          <strong>ID:</strong> {currentUser._id}
        </ListGroup.Item>
        <ListGroup.Item className="border-bottom">
          <strong>Username:</strong> {currentUser.username}
        </ListGroup.Item>
        <ListGroup.Item className="border-bottom">
          <strong>Email:</strong> {currentUser.email}
        </ListGroup.Item>

        <ListGroup.Item className="p-0 border-0">
          <div
            className="overflow-auto bg-light"
            style={{
              maxHeight: "350px",
              borderTop: "1px solid #dee2e6",
            }}
          >
            {bankList.length > 0 ? (
              bankList.map((item, index) => (
                <div
                  key={item._id}
                  className={`border-bottom px-3 py-2 ${
                    index % 2 === 0 ? "bg-white" : "bg-light"
                  }`}
                >
                  <BankDetails
                    accountNumber={item.accountNumber}
                    ifscCode={item.ifscCode}
                    branchName={item.branchName}
                    bankName={item.bankName}
                    accountHolderName={item.accountHolderName}
                  />
                </div>
              ))
            ) : (
              <div className="p-3 text-center">No Bank Details Found.</div>
            )}
          </div>
        </ListGroup.Item>
      </ListGroup>

      <Card.Footer className="text-center bg-primary bg-gradient">
        <Button
          onClick={() => navigate("/login/admin/dashboard/user")}
          variant="outline-light"
          size="md"
          className="rounded-pill fw-semibold px-4"
        >
          Go Back
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Profile;
