import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
      flexDirection: "column",
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
      padding: "40px",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      fontWeight: "800",
      margin: "0 0 10px 0",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    welcomeText: {
      fontSize: "1.2rem",
      color: "#94a3b8",
      fontWeight: "400",
      margin: "0 0 30px 0",
    },
    nameHighlight: {
      color: "#00ff88",
      fontWeight: "600",
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    button: {
      background: "rgba(255, 255, 255, 0.03)",
      color: "#cbd5e1",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "14px 20px",
      fontSize: "0.95rem",
      fontWeight: "500",
      borderRadius: "12px",
      cursor: "pointer",
      textAlign: "left",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.25s ease",
    },
    primaryButton: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "15px 20px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 20px rgba(0, 255, 136, 0.25)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
  };

  // Hover animations for the list-style action buttons
  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "rgba(0, 255, 136, 0.05)";
    e.currentTarget.style.border = "1px solid rgba(0, 255, 136, 0.3)";
    e.currentTarget.style.color = "#00ff88";
    e.currentTarget.style.transform = "translateX(4px)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
    e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    e.currentTarget.style.color = "#cbd5e1";
    e.currentTarget.style.transform = "translateX(0px)";
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Dashboard</h1>
        <h2 style={styles.welcomeText}>
          Welcome, <span style={styles.nameHighlight}>{userInfo?.name || "User"}</span>!
        </h2>

        <div style={styles.actionContainer}>
          {/* Main Action Button */}
          <button
            onClick={() => navigate("/profile")}
            style={styles.primaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 255, 136, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.25)";
            }}
          >
            Go to Profile 👤
          </button>

          {/* Conditional Student Actions */}
          {userInfo?.role === "student" && (
            <button
              onClick={() => navigate("/view-courses")}
              style={styles.button}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span>📚 View Enrolled Courses</span>
              <span>➔</span>
            </button>
          )}

          {/* Conditional Admin/Instructor Actions */}
          {(userInfo?.role === "admin" || userInfo?.role === "instructor") && (
            <>
              <button
                onClick={() => navigate("/add-courses")}
                style={styles.button}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>➕ Add New Course</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate("/courses")}
                style={styles.button}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>⚙️ Manage Existing Courses</span>
                <span>➔</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;