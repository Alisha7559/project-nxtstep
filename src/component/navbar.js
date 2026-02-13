import React from "react";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import "./navbar.css";
import logo from "../component/images/logofinall.png"

const Navbar = () => {
  return (
    <nav className="navbar-fixed">
      <div className="navbar-container">

        <Link to="/" className="logo">
          <img src={logo} alt="Logo" className="logo-img" />
          
        </Link>

        <ul className="nav-links">
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/institutions">Institutions</Link></li>
          <li><Link to="/degrees">Online Degrees</Link></li>
          <li><Link to="/roles">Explore Roles</Link></li>
        </ul>

        <div className="navbar-search">
          <input type="search" placeholder="Search courses, topics..." />
        </div>

        <div className="navbar-actions">
          <Link to="/chatbot" className="icon-btn">
            <FaComments size={20} />
          </Link>
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
