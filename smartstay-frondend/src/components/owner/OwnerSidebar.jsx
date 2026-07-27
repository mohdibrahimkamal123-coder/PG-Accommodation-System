import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OwnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("owner");
    navigate("/owner/login");
  };

  const menuStyle = (path) => ({
    display: "block",
    padding: "12px 15px",
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#212529",
    backgroundColor: location.pathname === path ? "#0d6efd" : "transparent",
    borderRadius: "5px",
    marginBottom: "5px",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#f8f9fa",
        borderRight: "1px solid #ddd",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h3 className="text-center mb-4 text-primary">SmartStay</h3>

      <Link to="/owner/dashboard" style={menuStyle("/owner/dashboard")}>
        🏠 Dashboard
      </Link>

      <Link to="/owner/pgs" style={menuStyle("/owner/pgs")}>
        🏢 My PGs
      </Link>

      <Link to="/owner/rooms" style={menuStyle("/owner/rooms")}>
        🚪 Rooms
      </Link>

      <Link to="/owner/bookings" style={menuStyle("/owner/bookings")}>
        📖 Bookings
      </Link>

      <Link to="/owner/profile" style={menuStyle("/owner/profile")}>
        👤 Profile
      </Link>

      <Link
        to="/owner/change-password"
        style={menuStyle("/owner/change-password")}
      >
        🔒 Change Password
      </Link>

      <button
        onClick={logout}
        className="btn btn-danger w-100 mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default OwnerSidebar;