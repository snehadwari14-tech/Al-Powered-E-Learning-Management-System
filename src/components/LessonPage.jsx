import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const LessonPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, [courseId]);

  const fetchLessons = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/lessons/${courseId}`
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
      maxWidth: "900px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.4rem",
      fontWeight: "800",
      marginBottom: "35px",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
      textAlign: "center",
    },
    lessonList: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      marginBottom: "40px",
    },
    lessonCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "18px",
      padding: "30px",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.35)",
    },
    lessonTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      margin: "0 0 20px 0",
      color: "#f1f5f9",
    },
    videoWrapper: {
      width: "100%",
      maxWidth: "650px",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "#000000",
      marginBottom: "20px",
    },
    videoElement: {
      width: "100%",
      display: "block",
    },
    pdfLink: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      color: "#00ff88",
      textDecoration: "none",
      fontSize: "0.95rem",
      fontWeight: "600",
      transition: "color 0.2s ease",
    },
    navigationArea: {
      display: "flex",
      justifyContent: "center",
      marginTop: "40px",
    },
    quizBtn: {
      background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
      color: "#ffffff",
      border: "none",
      padding: "14px 35px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(147, 51, 234, 0.2)",
      transition: "all 0.2s ease",
    },
    emptyText: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "1.1rem",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Course Module Lessons</h1>

        {lessons.length === 0 ? (
          <p style={styles.emptyText}>No lessons uploaded for this module yet.</p>
        ) : (
          <div style={styles.lessonList}>
            {lessons.map((lesson) => (
              <div key={lesson._id} style={styles.lessonCard}>
                <h2 style={styles.lessonTitle}>{lesson.title}</h2>

                {lesson.video && (
                  <div style={styles.videoWrapper}>
                    <video style={styles.videoElement} controls>
                      <source
                        src={`http://localhost:5000${lesson.video}`}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                )}

                {lesson.pdf && (
                  <div>
                    <a
                      href={`http://localhost:5000${lesson.pdf}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.pdfLink}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00cc6a")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#00ff88")}
                    >
                      📄 Reference Material (View PDF)
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={styles.navigationArea}>
          <button
            onClick={() => navigate(`/quiz/${courseId}`)}
            style={styles.quizBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(147, 51, 234, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.2)";
            }}
          >
            Go To Quiz Matrix →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;