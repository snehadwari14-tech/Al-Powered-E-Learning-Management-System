import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Integrated CSS Styles
  const styles = {
    main: {
      minHeight: "100vh",
      backgroundColor: "#0d0614", // Base dark purple-black
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(0, 255, 136, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 90% 80%, rgba(147, 51, 234, 0.12) 0%, transparent 50%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      color: "#e2e8f0",
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      gap: "30px",
    },
    heroSection: {
      background: "rgba(18, 16, 35, 0.6)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "20px",
      padding: "40px",
      maxWidth: "650px",
      textAlign: "center",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    },
    title: {
      fontSize: "3rem",
      fontWeight: "800",
      margin: "0 0 15px 0",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-1px",
    },
    subtitle: {
      fontSize: "1.15rem",
      color: "#94a3b8",
      lineHeight: "1.6",
      margin: "0 0 30px 0",
    },
    button: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "14px 28px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      boxShadow: "0 0 20px rgba(0, 255, 136, 0.3)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    featuresSection: {
      background: "rgba(18, 16, 35, 0.4)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid rgba(255, 255, 255, 0.03)",
      borderRadius: "20px",
      padding: "35px",
      maxWidth: "650px",
      width: "100%",
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
    },
    featuresTitle: {
      fontSize: "1.5rem",
      color: "#00ff88",
      margin: "0 0 20px 0",
      textAlign: "center",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    featureList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "12px",
    },
    featureItem: {
      background: "rgba(255, 255, 255, 0.03)",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "0.95rem",
      color: "#cbd5e1",
      borderLeft: "3px solid #9333ea", // Purple accent line on items
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <main style={styles.main}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}>Learnly.AI</h1>
        <p style={styles.subtitle}>
          AI Powered E-Learning Management System with Courses, Quizzes,
          Assignments and AI Tutor.
        </p>
        <button
          style={styles.button}
          onClick={() => navigate("/view-courses")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 255, 136, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.3)";
          }}
        >
          Explore Courses
        </button>
      </section>

      <section style={styles.featuresSection}>
        <h2 style={styles.featuresTitle}>Our Features</h2>
        <ul style={styles.featureList}>
          <li style={styles.featureItem}>✨ Video Lessons</li>
          <li style={styles.featureItem}>✨ PDF Notes</li>
          <li style={styles.featureItem}>✨ Progress Tracking</li>
          <li style={styles.featureItem}>✨ Quizzes and Assignments</li>
          <li style={styles.featureItem}>✨ AI Tutor</li>
          <li style={styles.featureItem}>✨ AI Summary Generator</li>
          <li style={styles.featureItem}>✨ AI Quiz Generator</li>
        </ul>
      </section>
    </main>
  );
};

export default Home;