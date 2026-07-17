import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/courses");
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

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
      maxWidth: "1100px",
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
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "24px",
    },
    courseCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "18px",
      padding: "28px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
      transition: "transform 0.2s ease, border-color 0.2s ease",
    },
    courseTitle: {
      fontSize: "1.35rem",
      fontWeight: "700",
      margin: "0 0 10px 0",
      color: "#f1f5f9",
      lineHeight: "1.4",
    },
    courseDesc: {
      fontSize: "0.92rem",
      color: "#94a3b8",
      lineHeight: "1.6",
      margin: "0 0 20px 0",
      display: "-webkit-box",
      WebkitLineClamp: "3",
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    categoryTag: {
      display: "inline-block",
      background: "rgba(147, 51, 234, 0.12)",
      color: "#c084fc",
      border: "1px solid rgba(147, 51, 234, 0.25)",
      borderRadius: "6px",
      padding: "4px 10px",
      fontSize: "0.78rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: "24px",
      alignSelf: "flex-start",
    },
    detailsBtn: {
      width: "100%",
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
      textAlign: "center",
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
        <h1 style={styles.title}>🌐 Explore All Courses</h1>

        {courses.length === 0 ? (
          <div style={styles.emptyState}>
            <h3>No courses are currently available in the catalog.</h3>
          </div>
        ) : (
          <div style={styles.grid}>
            {courses.map((course) => (
              <div
                key={course._id}
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
                  <h2 style={styles.courseTitle}>{course.title}</h2>
                  <p style={styles.courseDesc}>{course.description}</p>
                  <div style={styles.categoryTag}>{course.category}</div>
                </div>

                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  style={styles.detailsBtn}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.15)";
                  }}
                >
                  View Details & Syllabi
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCourses;