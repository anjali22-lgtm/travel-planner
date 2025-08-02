import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Travel Guide</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>         {/* ✅ Link to routes */}
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


