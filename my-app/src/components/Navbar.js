
import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            CoreTechTalks
          </Link>
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
            About
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/services" style={{ textDecoration: "none", color: "inherit" }}>
            Services
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/blogs" style={{ textDecoration: "none", color: "inherit" }}>
            Blogs
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/tools" style={{ textDecoration: "none", color: "inherit" }}>
            Tools
          </Link>
        </Button>
        <Button color="inherit">
          <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
            Contact
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
