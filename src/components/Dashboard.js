import React from "react";
import { useAuth } from "./AuthContext";
import "./styles/dashboard.css";

const Dashboard = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Call the logout function from the AuthContext
    logout();
  };

  return (
    <div className="dashboard-container">
      <p className="dashboard-title">Home Page</p>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
