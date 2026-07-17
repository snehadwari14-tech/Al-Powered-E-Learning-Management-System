import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/courses");
      setCourses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      alert("Course Deleted");
      fetchCourses();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 15% 20%, rgba(0, 255, 136, 0.08) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      padding: "60px 40px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#f8fafc",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      maxWidth: "1200px",
      margin: "0 auto 40px auto",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      margin: 0,
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    createButton: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "12px 24px",
      fontSize: "0.95rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 20px rgba(0, 255, 136, 0.25)",
      transition: "all 0.2s ease",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: "24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    card: {
      background: "rgba(18, 16, 35, 0.55)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      transition: "transform 0.25s ease, border-color 0.25s ease",
    },
    courseTitle: {
      fontSize: "1.3rem",
      fontWeight: "700",
      margin: "0 0 12px 0",
      color: "#f8fafc",
    },
    courseDesc: {
      fontSize: "0.95rem",
      color: "#94a3b8",
      lineHeight: "1.5",
      margin: "0 0 24px 0",
      flexGrow: 1,
    },
    deleteButton: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#ef4444",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      padding: "10px 16px",
      fontSize: "0.9rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      alignSelf: "flex-start",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.headerRow}>
        <h1 style={styles.title}>Manage Courses</h1>
        <button
          onClick={() => navigate("/add-courses")}
          style={styles.createButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 255, 136, 0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.25)";
          }}
        >
          ➕ Add Course
        </button>
      </div>

      <div style={styles.grid}>
        {courses.map((course) => (
          <div
            key={course._id}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.2)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
              e.currentTarget.style.transform = "translateY(0px)";
            }}
          >
            <div>
              <h2 style={styles.courseTitle}>{course.title}</h2>
              <p style={styles.courseDesc}>{course.description}</p>
            </div>
            <button
              onClick={() => deleteCourse(course._id)}
              style={styles.deleteButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
              }}
            >
              🗑️ Delete Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;