import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QuizResults = () => {
  const { courseId } = useParams();
  const [results, setResults] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/quizzes/results/course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setResults(data);
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
      maxWidth: "850px",
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
      textAlign: "center",
    },
    grid: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    resultCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "24px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      transition: "all 0.2s ease",
    },
    studentInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    studentName: {
      fontSize: "1.3rem",
      fontWeight: "700",
      color: "#f1f5f9",
      margin: 0,
    },
    studentEmail: {
      fontSize: "0.9rem",
      color: "#94a3b8",
      margin: 0,
    },
    scoreBadgeArea: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
    },
    metricBox: {
      textAlign: "right",
    },
    scoreLabel: {
      fontSize: "0.8rem",
      textTransform: "uppercase",
      color: "#64748b",
      letterSpacing: "1px",
      marginBottom: "2px",
    },
    scoreValue: {
      fontSize: "1.2rem",
      fontWeight: "600",
      color: "#cbd5e1",
      margin: 0,
    },
    percentageBadge: {
      background: "rgba(0, 255, 136, 0.06)",
      border: "1px solid rgba(0, 255, 136, 0.2)",
      borderRadius: "12px",
      padding: "12px 18px",
      textAlign: "center",
      minWidth: "75px",
    },
    percentageText: {
      fontSize: "1.4rem",
      fontWeight: "800",
      color: "#00ff88",
      margin: 0,
    },
    emptyText: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "1.1rem",
      marginTop: "40px",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>📊 Quiz Metrics Registry</h1>

        {results.length === 0 ? (
          <p style={styles.emptyText}>No evaluation submissions recorded yet.</p>
        ) : (
          <div style={styles.grid}>
            {results.map((result) => (
              <div
                key={result._id}
                style={styles.resultCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={styles.studentInfo}>
                  <h3 style={styles.studentName}>{result.student.name}</h3>
                  <p style={styles.studentEmail}>{result.student.email}</p>
                </div>

                <div style={styles.scoreBadgeArea}>
                  <div style={styles.metricBox}>
                    <div style={styles.scoreLabel}>Raw Score</div>
                    <p style={styles.scoreValue}>
                      {result.score} / {result.totalQuestions}
                    </p>
                  </div>
                  <div style={styles.percentageBadge}>
                    <p style={styles.percentageText}>{result.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResults;