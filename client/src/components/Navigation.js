import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/events", label: "Events" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/skillstorm", label: "SkillStorm" },
    { path: "/gallery", label: "Gallery" },
    { path: "/scorecards", label: "Scorecards" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="https://cdn.builder.io/api/v1/assets/c5794fad86854d05a0a2b5f05a97b44d/e-week_logo_-2025-322131?format=webp&width=800"
            alt="E-Week 2025"
          />
          E-WEEK 2025
        </Link>

        {/* Desktop Navigation */}
        <ul className="navbar-nav">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "active" : ""}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "active" : ""}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
