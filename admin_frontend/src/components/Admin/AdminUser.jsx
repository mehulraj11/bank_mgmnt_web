import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Container, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Users from "./Users";

function AdminUser({ setCurrentUser }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); // state to store fetched user list
  const [isLoading, setIsLoading] = useState(true); // loading state

  useEffect(() => {
    // fetch user data
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/getusers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setUsers(res.data.users.slice(1));
        // console.log(res.data.users);
      } catch (error) {
        console.log("data fetch error:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary" size="lg">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading User data...</p>
        </div>
      </Container>
    );
  }
  return (
    <Container className="mt-5">
      <h2 className="bg-primary bg-gradient text-white text-center fw-bold py-1">
        List of Current Users
      </h2>
      <div style={{ height: "500px", overflowY: "auto" }}>
        {users && users.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {users.map((item) => (
              <Users
                key={item._id}
                id={item._id}
                email={item.email}
                username={item.username}
                setCurrentUser={setCurrentUser}
              />
            ))}
          </div>
        ) : (
          <Alert variant="info" className="text-center">
            No users found.
          </Alert>
        )}
      </div>

      <div className="d-flex justify-content-center mt-4 gap-3">
        <Button
          onClick={() => navigate("/login/admin/dashboard")}
          variant="outline-warning"
          size="md"
          className="rounded-pill fw-semibold px-4 mx-2"
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
}

export default AdminUser;
