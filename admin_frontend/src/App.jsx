import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/profile/:userId"
          element={<Profile currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
}

const Root = () => {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
