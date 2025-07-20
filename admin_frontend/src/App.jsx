import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginHandler from "./pages/LoginHandler";
import AdminLogin from "./pages/AdminLogin";
import UserLogin from "./pages/UserLogin";
import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/User/UserDashboard";
import Profile from "./components/Admin/Profile";
import UpdateBank from "./components/User/UpdateBank";
import AdminUser from "./components/Admin/AdminUser";
import AdminBankData from "./components/Admin/AdminBankData";
function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/login" element={<LoginHandler />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route
          path="/login/admin/dashboard"
          element={<AdminDashboard setCurrentUser={setCurrentUser} />}
        />
        <Route path="/login/admin/dashboard/user" element={<AdminUser />} />
        <Route path="/login/admin/dashboard/bank" element={<AdminBankData />} />
        <Route
          path="/login/user/dashboard"
          element={<UserDashboard setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/login/user/dashboard/update/:id"
          element={<UpdateBank />}
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
  const role = localStorage.getItem("role");

  return isAuthenticated ? (
    <Navigate to={`login/${role}/dashboard`} />
  ) : (
    <Navigate to="/login" />
  );
};

export default App;
