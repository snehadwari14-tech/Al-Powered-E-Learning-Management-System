import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // Integrated CSS Styles inspired by image_7b56ce.jpg
  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      background: "rgba(18, 16, 35, 0.75)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "700",
      margin: 0,
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    ul: {
      display: "flex",
      alignItems: "center",
      listStyle: "none",
      margin: 0,
      padding: 0,
      gap: "24px",
    },
    link: {
      color: "#94a3b8",
      textDecoration: "none",
      fontSize: "0.95rem",
      fontWeight: "500",
      transition: "color 0.2s ease",
    },
    logoutBtn: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#ef4444",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      padding: "8px 16px",
      fontSize: "0.9rem",
      fontWeight: "500",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  // Helper functions for interactive link hover states
  const handleMouseEnter = (e) => (e.target.style.color = "#00ff88");
  const handleMouseLeave = (e) => (e.target.style.color = "#94a3b8");

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Learnly.AI</h2>

      <ul style={styles.ul}>
        <li>
          <Link
            to="/"
            style={styles.link}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Home
          </Link>
        </li>

        {userInfo ? (
          <>
            <li>
              <Link
                to="/dashboard"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Profile
              </Link>
            </li>

            <li>
              <Link
                to="/ai-tutor"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Chatbot
              </Link>
            </li>

            {/* Cart Button */}
            <li>
              <Link
                to="/cart"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Cart
              </Link>
            </li>

            <li>
              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.2)";
                  e.target.style.boxShadow = "0 0 10px rgba(239, 68, 68, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to="/register"
                style={styles.link}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;