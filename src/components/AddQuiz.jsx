import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddQuiz = () => {
  const { courseId } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/quizzes/create",
        {
          title,
          course: courseId,
          questions: [
            {
              question,
              options: [option1, option2, option3, option4],
              correctAnswer,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Quiz Added Successfully");
      setTitle("");
      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectAnswer("");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
      padding: "60px 20px",
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
      maxWidth: "600px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      margin: "0 0 28px 0",
      textAlign: "center",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    sectionLabel: {
      color: "#9333ea",
      fontSize: "0.85rem",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginTop: "10px",
      marginBottom: "-6px",
    },
    input: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      padding: "15px 18px",
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.25s ease",
      width: "100%",
      boxSizing: "border-box",
    },
    optionsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "14px",
    },
    button: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "15px",
      fontSize: "1rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 20px rgba(0, 255, 136, 0.25)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      marginTop: "15px",
    },
  };

  const handleFocus = (e) => {
    e.target.style.border = "1px solid #00ff88";
    e.target.style.background = "rgba(0, 255, 136, 0.03)";
    e.target.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.1)";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid rgba(255, 255, 255, 0.08)";
    e.target.style.background = "rgba(255, 255, 255, 0.04)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Add Quiz</h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.sectionLabel}>Quiz Configuration</div>
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <div style={styles.sectionLabel}>Question 1</div>
          <input
            type="text"
            placeholder="Enter Question Text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <div style={styles.sectionLabel}>Answer Options</div>
          <div style={styles.optionsGrid}>
            <input
              type="text"
              placeholder="Option 1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <input
              type="text"
              placeholder="Option 2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <input
              type="text"
              placeholder="Option 3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
            <input
              type="text"
              placeholder="Option 4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
              style={styles.input}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <div style={styles.sectionLabel}>Evaluation</div>
          <input
            type="text"
            placeholder="Correct Answer (Must match the exact text of the chosen option)"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(0, 255, 136, 0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.25)";
            }}
          >
            Create Quiz Template
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuiz;