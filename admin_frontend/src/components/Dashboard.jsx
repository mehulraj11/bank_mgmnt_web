import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Users from "./Users";

function Dashboard({ setCurrentUser }) {
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
  const handleDeleteClick = async ({ id }) => {
    try {
      const token = localStorage.getItem("token");
      axios.delete(`${import.meta.env.VITE_BACKEND_URL}/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Delete user error:", error.message);
    }
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
    </Container>
  );
}

export default Dashboard;
