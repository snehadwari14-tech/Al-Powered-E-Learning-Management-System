import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleEnroll = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/enrollments/enroll",
        { course: id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      alert("Enrolled Successfully");
      navigate("/my-courses");
    } catch (error) {
      alert(error.response?.data?.message || "Enrollment Failed");
    }
  };

  const handleAddToCart = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart/add",
        { courseId: id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      alert("Course Added To Cart");
    } catch (error) {
      alert(error.response?.data?.message || "Failed To Add");
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
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "20px",
      padding: "40px",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      margin: "0 0 30px 0",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    actionContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
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
      transition: "all 0.2s ease",
    },
    secondaryButton: {
      background: "rgba(255, 255, 255, 0.03)",
      color: "#cbd5e1",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "14px 20px",
      fontSize: "0.95rem",
      fontWeight: "500",
      borderRadius: "12px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.25s ease",
    },
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.background = "rgba(0, 255, 136, 0.05)";
    e.currentTarget.style.borderColor = "rgba(0, 255, 136, 0.3)";
    e.currentTarget.style.color = "#00ff88";
    e.currentTarget.style.transform = "translateX(4px)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
    e.currentTarget.style.color = "#cbd5e1";
    e.currentTarget.style.transform = "translateX(0px)";
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Course Details</h1>

        <div style={styles.actionContainer}>
          {/* Student Panel Actions */}
          {userInfo && userInfo.role === "student" && (
            <>
              <button
                onClick={handleEnroll}
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
                🚀 Enroll Course
              </button>

              <button
                onClick={handleAddToCart}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>🛒 Add To Cart</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate(`/lesson-page/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>📖 Start Learning</span>
                <span>➔</span>
              </button>
            </>
          )}

          {/* Admin / Instructor Panel Actions */}
          {userInfo && (userInfo.role === "admin" || userInfo.role === "instructor") && (
            <>
              <button
                onClick={() => navigate(`/lesson-page/${id}`)}
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
                🖥️ View Lessons
              </button>

              <button
                onClick={() => navigate(`/add-lesson/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>➕ Add Lesson</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate(`/add-quiz/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>📝 Add Quiz</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate(`/add-assignment/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>📌 Add Assignment</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate(`/assignment/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>📂 View Assignments</span>
                <span>➔</span>
              </button>

              <button
                onClick={() => navigate(`/quiz-results/${id}`)}
                style={styles.secondaryButton}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span>📊 View Quiz Results</span>
                <span>➔</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;