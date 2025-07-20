import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import Users from "./Users";
function AdminUser({ setCurrentUser }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
        setUsers(res.data.users);
        console.log(res.data.users);
      } catch (error) {
        console.log("data fetch error:", error.message);
      }
    };

    fetchData();
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">List of Current Users</h2>
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
      <div className="d-flex justify-content-center">
        <Button variant="danger" onClick={handleLogout}>
          Log out
        </Button>
        <Button
          variant="primary"
          onClick={() => navigate("/login/admin/dashboard")}
          className="mx-2"
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
}

export default AdminUser;
