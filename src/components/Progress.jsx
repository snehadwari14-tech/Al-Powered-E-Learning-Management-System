import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/progress/completed",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setLessons(data);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.08) 0%, transparent 45%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      padding: "60px 20px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#f8fafc",
    },
    container: {
      maxWidth: "700px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.4rem",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      fontSize: "1.2rem",
      fontWeight: "500",
      color: "#94a3b8",
      marginBottom: "35px",
    },
    progressCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "18px",
      padding: "35px",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
      marginBottom: "30px",
    },
    listContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
    },
    lessonItem: {
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      transition: "all 0.2s ease",
    },
    checkIcon: {
      color: "#00ff88",
      fontSize: "1.2rem",
      fontWeight: "bold",
    },
    lessonTitle: {
      fontSize: "1.05rem",
      fontWeight: "600",
      color: "#f1f5f9",
      margin: 0,
    },
    emptyStateText: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "1.1rem",
      margin: "20px 0",
    },
    backBtn: {
      background: "rgba(255, 255, 255, 0.04)",
      color: "#cbd5e1",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "14px 28px",
      fontSize: "0.95rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>📈 Learning Analytics</h1>
        <h2 style={styles.subtitle}>Completed Lessons Track</h2>

        <div style={styles.progressCard}>
          {lessons.length === 0 ? (
            <h3 style={styles.emptyStateText}>No academic steps completed yet.</h3>
          ) : (
            <div style={styles.listContainer}>
              {lessons.map((item) => (
                <div
                  key={item._id}
                  style={styles.lessonItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 255, 136, 0.02)";
                    e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <span style={styles.checkIcon}>✓</span>
                  <h3 style={styles.lessonTitle}>{item.lesson.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/my-courses")}
          style={styles.backBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
          }}
        >
          ← Return to Portal Hub
        </button>
      </div>
    </div>
  );
};

export default Progress;