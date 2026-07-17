import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    alert("Logged Out Successfully");
    navigate("/login");
  };

  // Integrated Dashboard Theme Styles
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 15% 20%, rgba(0, 255, 136, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
    },
    card: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      webkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "20px",
      padding: "40px 35px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      margin: "0 0 24px 0",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    avatarPlaceholder: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(0, 255, 136, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)",
      border: "1px solid rgba(0, 255, 136, 0.3)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      margin: "0 auto 20px auto",
      boxShadow: "0 0 20px rgba(0, 255, 136, 0.1)",
    },
    name: {
      fontSize: "1.5rem",
      color: "#f8fafc",
      fontWeight: "600",
      margin: "0 0 6px 0",
    },
    email: {
      fontSize: "0.95rem",
      color: "#94a3b8",
      margin: "0 0 20px 0",
    },
    roleBadge: {
      display: "inline-block",
      background: "rgba(147, 51, 234, 0.15)",
      color: "#c084fc",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      margin: "0 0 30px 0",
    },
    logoutBtn: {
      width: "100%",
      background: "rgba(239, 68, 68, 0.1)",
      color: "#ef4444",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      padding: "14px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Profile</h1>

        {/* Added a neat neon profile picture placeholder */}
        <div style={styles.avatarPlaceholder}>👤</div>

        <h3 style={styles.name}>{userInfo?.name || "User Name"}</h3>
        <p style={styles.styles?.email || styles.email}>{userInfo?.email || "user@example.com"}</p>

        <div>
          <span style={styles.roleBadge}>Role: {userInfo?.role || "Student"}</span>
        </div>

        <button
          onClick={handleLogout}
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(239, 68, 68, 0.25)";
            e.currentTarget.style.transform = "scale(1.01)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;