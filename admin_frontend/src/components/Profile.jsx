import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
function Profile() {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Fetch user error:", error.message);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  console.log(currentUser);

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
          <strong>ID:</strong> {currentUser.id}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Username:</strong> {currentUser.username}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Email:</strong> {currentUser.email}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Bank Details:</strong>
          <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
            <div>
              <strong>Account No:</strong>
            </div>
            <div>
              <strong>Bank Name:</strong>
            </div>
            <div>
              <strong>IFSC:</strong>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Card.Footer className="text-center">
        <Button variant="primary">Update Details</Button>
      </Card.Footer>
    </Card>
  );
}

export default Profile;
