import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Users({ id, username, email, setCurrentUser }) {
  const navigate = useNavigate();
  const handleClick = async () => {
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
      navigate(`/profile/${id}`); // Pass user ID in URL
    } catch (error) {
      console.error("Fetch user error:", error.message);
    }
  };
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body className="d-flex justify-content-between align-items-center">
        {/* Left: User Info */}
        <div>
          <Card.Title>{username}</Card.Title>
          <Card.Subtitle className="mb-1 text-muted">ID: {id}</Card.Subtitle>
          <Card.Text className="mb-0">Email: {email}</Card.Text>
        </div>

        {/* Right: Buttons */}
        <div className="d-flex gap-3">
          <Button variant="primary" size="md" onClick={handleClick}>
            View
          </Button>
          <Button variant="danger" size="md">
            Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Users;
