import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import BankDetails from "./BankDetails";
function Profile() {
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
        // console.log(res.data);

        setCurrentUser(res.data.user);
        setBankList(res.data.bankList);
      } catch (error) {
        console.error("Fetch user error:", error.message);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  // console.log(currentUser);
  console.log(bankList);

  return (
    <Card
      style={{
        width: "24rem",
        margin: "2rem auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Card.Header as="h5" className="text-center">
        User Details
      </Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <strong>ID:</strong> {currentUser._id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Username:</strong> {currentUser.username}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Email:</strong> {currentUser.email}
        </ListGroup.Item>
        {bankList.map((item, index) => {
          return <BankDetails
            key={item._id}
            accountNumber={item.accountNumber}
            ifscCode={item.ifscCode}
            branchName={item.branchName}
            bankName={item.bankName}
            accountHolderName={item.accountHolderName}
          />;
        })}
      </ListGroup>
      <Card.Footer className="text-center">
        <Button variant="primary">Update Details</Button>
      </Card.Footer>
    </Card>
  );
}

export default Profile;
