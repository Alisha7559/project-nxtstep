import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaComments, FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import logo from "../component/images/logofinall.png";

const Navbar = () => {

  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {

    const syncLogin = () => {
      const user = localStorage.getItem("student");
      setStudent(user ? JSON.parse(user) : null);
    };

    syncLogin();
    window.addEventListener("storage", syncLogin);

    return () => window.removeEventListener("storage", syncLogin);

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("student");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav className="navbar-fixed">
      <div className="navbar-container">

        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        <ul className="nav-links">
          <li onClick={() => navigate("/courses")}>Courses</li>
          <li onClick={() => navigate("/institutions")}>Institutions</li>
          <li onClick={() => navigate("/degrees")}>Online Degrees</li>
          <li onClick={() => navigate("/roles")}>Explore Roles</li>
        </ul>

        <div className="navbar-search">
          <input type="search" placeholder="Search courses..." />
        </div>

        <div className="navbar-actions">

          <div
            className="icon-btn"
            onClick={() => navigate("/chatbot")}
          >
            <FaComments size={20} />
          </div>

          {!student ? (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

              <button
                className="signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <div style={{ position: "relative" }}>
              <div
                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <FaUserCircle size={26} />
                <span style={{ marginLeft: 6 }}>
                  {student.name}
                </span>
              </div>

              {showDropdown && (
                <div style={dropdownStyle}>
                  <p><strong>Name:</strong> {student.studentname}</p>
                  <p><strong>Email:</strong> {student.email}</p>
                  
                  <hr />
                  <button onClick={handleLogout} style={logoutBtn}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

const dropdownStyle = {
  position: "absolute",
  top: 40,
  right: 0,
  background: "#fff",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  borderRadius: 8,
  width: 220,
  padding: 15,
  zIndex: 1000
};

const logoutBtn = {
  width: "100%",
  padding: 8,
  border: "none",
  borderRadius: 5,
  background: "#f97316",
  color: "#fff",
  cursor: "pointer"
};

export default Navbar;