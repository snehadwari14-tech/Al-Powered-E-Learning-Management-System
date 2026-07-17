import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/enrollments/my-courses",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 10% 15%, rgba(0, 255, 136, 0.05) 0%, transparent 40%),
        radial-gradient(circle at 90% 85%, rgba(147, 51, 234, 0.08) 0%, transparent 45%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      padding: "60px 20px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#f8fafc",
    },
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.4rem",
      fontWeight: "800",
      marginBottom: "40px",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
      gap: "24px",
    },
    courseCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "18px",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
      transition: "transform 0.2s ease, border-color 0.2s ease",
    },
    courseTitle: {
      fontSize: "1.45rem",
      fontWeight: "700",
      margin: "0 0 10px 0",
      color: "#f1f5f9",
    },
    courseDesc: {
      fontSize: "0.95rem",
      color: "#94a3b8",
      lineHeight: "1.6",
      margin: "0 0 24px 0",
      flexGrow: 1,
    },
    btnGroup: {
      display: "flex",
      gap: "12px",
    },
    continueBtn: {
      flex: 2,
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "12px 20px",
      fontSize: "0.9rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(0, 255, 136, 0.15)",
      transition: "all 0.2s ease",
    },
    progressBtn: {
      flex: 1,
      background: "rgba(255, 255, 255, 0.04)",
      color: "#cbd5e1",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "12px 16px",
      fontSize: "0.9rem",
      fontWeight: "500",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    emptyState: {
      textAlign: "center",
      padding: "40px",
      background: "rgba(18, 16, 35, 0.4)",
      border: "1px dashed rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      color: "#64748b",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>📚 My Enrolled Courses</h1>

        {courses.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>You have not enrolled in any academic streams yet.</h3>
          </div>
        ) : (
          <div style={styles.grid}>
            {courses.map((item) => (
              <div
                key={item._id}
                style={styles.courseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <div>
                  <h2 style={styles.courseTitle}>{item.course.title}</h2>
                  <p style={styles.courseDesc}>{item.course.description}</p>
                </div>

                <div style={styles.btnGroup}>
                  <button
                    onClick={() => navigate(`/lesson-page/${item.course._id}`)}
                    style={styles.continueBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.15)";
                    }}
                  >
                    Continue Learning
                  </button>
                  <button
                    onClick={() => navigate(`/progress/${item.course._id}`)}
                    style={styles.progressBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  >
                    Metrics
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;