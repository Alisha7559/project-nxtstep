import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaComments, FaUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import "./navbar.css";
import logo from "../component/images/logofinall.png";

const Navbar = () => {

  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [search, setSearch] = useState("");

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

  /* 🔎 SEARCH FUNCTION */

  const handleSearch = (e) => {

    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/courses?search=${search}`);

    setSearch("");

  };

  return (

    <nav className="navbar-fixed">

      <div className="navbar-container">

        {/* LOGO */}

        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {/* HAMBURGER */}

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={22}/> : <FaBars size={22}/>}
        </div>

        {/* NAV LINKS */}

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li>
            <Link to="/" onClick={()=>setMenuOpen(false)}>Home</Link>
          </li>

          <li>
            <Link to="/courses" onClick={()=>setMenuOpen(false)}>Courses</Link>
          </li>

          <li>
            <Link to="/institutions" onClick={()=>setMenuOpen(false)}>Institutions</Link>
          </li>

          <li>
            <Link to="/degrees" onClick={()=>setMenuOpen(false)}>Degrees</Link>
          </li>

        </ul>

        {/* SEARCH */}

        <form className="navbar-search" onSubmit={handleSearch}>

          <input
            type="search"
            placeholder="Search courses..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

          <button type="submit" className="search-btn">
            <FaSearch/>
          </button>

        </form>

        {/* RIGHT SIDE */}

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
                <FaUserCircle size={26}/>
                <span style={{ marginLeft:6 }}>
                  {student.studentname}
                </span>
              </div>

              {showDropdown && (

                <div className="dropdown">

                  <p><strong>Name:</strong> {student.studentname}</p>

                  <p><strong>Email:</strong> {student.email}</p>

                  <hr/>

                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                  >
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

export default Navbar;