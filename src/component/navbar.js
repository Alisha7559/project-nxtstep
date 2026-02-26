
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "./navbar.css";
import logo from "../component/images/logofinall.png";

const Navbar = () => {

  const navigate = useNavigate();

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
          <input type="search" placeholder="Search courses, topics..." />
        </div>

        <div className="navbar-actions">

          <div
            className="icon-btn"
            onClick={() => navigate("/chatbot")}
          >
            <FaComments size={20} />
          </div>

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

        </div>

      </div>
    </nav>
  );
};

export default Navbar;