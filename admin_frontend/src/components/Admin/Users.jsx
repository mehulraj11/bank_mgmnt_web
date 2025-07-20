import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Users({ id, username, email }) {
  const navigate = useNavigate();
  const handleViewClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/auth/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("User fetched:", res.data);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.error("Fetch user error:", error.message);
    }
  };
  return (
    <Card
      className="mb-3 shadow-sm"
      style={{
        border: "none",
        borderRadius: "1rem",
        overflow: "hidden",
        background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title
            style={{
              marginBottom: "0.2rem",
              fontWeight: "600",
              color: "#4e54c8",
            }}
          >
            {username.toUpperCase()}
          </Card.Title>
          <Card.Subtitle
            className="mb-1 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            ID: {id}
          </Card.Subtitle>
          <Card.Text
            className="mb-0"
            style={{ fontSize: "0.95rem", color: "#555" }}
          >
            Email: {email}
          </Card.Text>
        </div>

        <div className="d-flex gap-2">
          <Button
            onClick={handleViewClick}
            variant="outline-primary"
            size="md"
            className="rounded-pill fw-semibold px-4"
          >
            View
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Users;
