
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

import logo from "../component/images/logofinall.png";
import "./navbar.css";

const Navbar = () => {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [student, setStudent] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    const user = localStorage.getItem("student");
    setStudent(user ? JSON.parse(user) : null);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/courses?search=${search}`);
    setSearch("");
  };

  const navItems = ["Home", "Courses", "Institutions", "Degrees"];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="sticky" className="navbar-appbar">
        <Toolbar className="navbar-toolbar">

          {/* LEFT SECTION */}
          <Box className="navbar-left">

            {/* LOGO */}
            <Box
              className="logo-container"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt="logo"
                className="logo-img"
              />

              <Box>
                <Typography className="logo-title">
                  NXTSTEP
                </Typography>

                <Typography className="logo-subtitle" >
                  Design Your Future
                </Typography>
              </Box>
            </Box>

            {/* NAV LINKS */}
            <Box className="nav-links">
              {navItems.map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="nav-button"
                >
                  {item}
                </Button>
              ))}
            </Box>

          </Box>

          {/* MOBILE MENU ICON */}
          <Box className="mobile-menu">
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* RIGHT SECTION */}
          <Box className="right-section">

            {/* SEARCH */}
            <Box
              component="form"
              onSubmit={handleSearch}
              className="search-box"
            >
              <SearchIcon className="search-icon" />

              <InputBase
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </Box>

            {/* CHAT */}
            <Tooltip title="Chat with AI" arrow placement="bottom">
              <IconButton
                onClick={() => navigate("/chatbot")}
                className="chat-icon"
              >
                <AutoAwesomeIcon fontSize="medium" />
              </IconButton>
            </Tooltip>

            {/* LOGIN */}
            <Button
              onClick={() => navigate("/login")}
              className="login-btn"
            >
              Login
            </Button>

            {/* SIGNUP */}
            <Button
              onClick={() => navigate("/signup")}
              className="signup-btn"
            >
              Sign Up
            </Button>

          </Box>

        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        <Box className="drawer-box">

          <List>

            {navItems.map((item) => (

              <ListItem key={item} disablePadding>

                <ListItemButton
                  component={Link}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={handleDrawerToggle}
                >

                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{
                      className: "drawer-text"
                    }}
                  />

                </ListItemButton>

              </ListItem>

            ))}

          </List>

        </Box>
      </Drawer>

    </>
  );
};

export default Navbar;

