import React, { useState } from "react";
import axios from "axios";

const AITutor = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // AI Tutor States
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Summary States
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  // Quiz Generator States
  const [topic, setTopic] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [quiz, setQuiz] = useState("");

  // API Call: Ask Tutor
  const askTutor = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/tutor",
        { question },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setAnswer(data.answer);
    } catch (error) {
      alert(error.response?.data?.message || "Error calling AI Tutor");
    }
  };

  // API Call: Generate Summary
  const generateSummary = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/summary",
        { text },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSummary(data.summary);
    } catch (error) {
      alert(error.response?.data?.message || "Error generating summary");
    }
  };

  // API Call: Generate Quiz
  const generateQuiz = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/ai/quiz",
        { topic, numberOfQuestions },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setQuiz(data.quiz);
    } catch (error) {
      alert(error.response?.data?.message || "Error generating quiz");
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 10% 15%, rgba(0, 255, 136, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 90% 85%, rgba(147, 51, 234, 0.1) 0%, transparent 45%),
        linear-gradient(135deg, #0b071e 0%, #060b11 100%)
      `,
      padding: "50px 30px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#f8fafc",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    mainHeader: {
      fontSize: "2.6rem",
      fontWeight: "800",
      margin: "0 0 40px 0",
      textAlign: "center",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-1px",
    },
    dashboardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
    },
    panelCard: {
      background: "rgba(18, 16, 35, 0.6)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "18px",
      padding: "30px",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    panelTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      margin: "0 0 18px 0",
      color: "#f1f5f9",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      flexGrow: 1,
    },
    textarea: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      padding: "14px",
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.25s ease",
      width: "100%",
      boxSizing: "border-box",
      resize: "vertical",
      fontFamily: "inherit",
    },
    input: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      padding: "14px",
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.25s ease",
      width: "100%",
      boxSizing: "border-box",
    },
    actionButton: {
      width: "100%",
      background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
      color: "#ffffff",
      border: "none",
      padding: "14px",
      fontSize: "0.95rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(147, 51, 234, 0.2)",
      transition: "all 0.2s ease",
      marginTop: "16px",
    },
    outputContainer: {
      marginTop: "18px",
      background: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.04)",
      borderRadius: "10px",
      padding: "14px",
      fontSize: "0.9rem",
      color: "#cbd5e1",
      lineHeight: "1.5",
      maxHeight: "200px",
      overflowY: "auto",
    },
    preOutput: {
      margin: 0,
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.85rem",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      color: "#00ff88",
    },
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #00ff88";
    e.target.style.background = "rgba(0, 255, 136, 0.02)";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    e.target.style.background = "rgba(255, 255, 255, 0.04)";
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.mainHeader}>⚡ Core Intelligence Hub</h1>

        <div style={styles.dashboardGrid}>
          {/* Card 1: AI Tutor */}
          <div style={styles.panelCard}>
            <div style={styles.formGroup}>
              <h2 style={styles.panelTitle}>🤖 Private AI Tutor</h2>
              <textarea
                rows="4"
                placeholder="Inquire or query any concept..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={styles.textarea}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                onClick={askTutor}
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.2)";
                }}
              >
                Transmit Query
              </button>
            </div>
            {answer && (
              <div style={styles.outputContainer}>
                <strong>Response:</strong> {answer}
              </div>
            )}
          </div>

          {/* Card 2: Summary Generator */}
          <div style={styles.panelCard}>
            <div style={styles.formGroup}>
              <h2 style={styles.panelTitle}>📝 Executive Summary</h2>
              <textarea
                rows="4"
                placeholder="Paste contextual text streams here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={styles.textarea}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                onClick={generateSummary}
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.2)";
                }}
              >
                Condense Text
              </button>
            </div>
            {summary && (
              <div style={styles.outputContainer}>
                <strong>Summary Matrix:</strong> {summary}
              </div>
            )}
          </div>

          {/* Card 3: Quiz Generator */}
          <div style={styles.panelCard}>
            <div style={styles.formGroup}>
              <h2 style={styles.panelTitle}>🎯 Synthetic Quiz Matrix</h2>
              <input
                type="text"
                placeholder="Target Topic / Field"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                style={styles.input}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <button
                onClick={generateQuiz}
                style={styles.actionButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(147, 51, 234, 0.2)";
                }}
              >
                Compile Template
              </button>
            </div>
            {quiz && (
              <div style={styles.outputContainer}>
                <pre style={styles.preOutput}>{quiz}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITutor;