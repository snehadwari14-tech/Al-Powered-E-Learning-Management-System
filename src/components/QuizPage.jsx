import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [quizId, setQuizId] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchQuiz();
  }, [courseId]);

  const fetchQuiz = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/quizzes/${courseId}`);
      setQuestions(data.questions || []);
      setQuizId(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleSubmit = async () => {
    try {
      const answers = questions.map((question) => selectedAnswers[question._id]);
      const { data } = await axios.post(
        "http://localhost:5000/api/quizzes/submit",
        { quizId, answers },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setScore(data.score);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Quiz submission failed");
    }
  };

  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614",
      backgroundImage: `
        radial-gradient(circle at 15% 20%, rgba(0, 255, 136, 0.06) 0%, transparent 45%),
        radial-gradient(circle at 85% 80%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
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
      textAlign: "center",
      margin: "0 0 40px 0",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    questionCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "30px",
      marginBottom: "24px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    },
    questionText: {
      fontSize: "1.2rem",
      fontWeight: "600",
      margin: "0 0 20px 0",
      color: "#f1f5f9",
    },
    optionsList: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    optionLabel: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      background: "rgba(255, 255, 255, 0.03)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "10px",
      padding: "14px 18px",
      fontSize: "0.95rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    submitButton: {
      width: "100%",
      background: "linear-gradient(135deg, #9333ea 0%, #6b21a8 100%)",
      color: "#ffffff",
      border: "none",
      padding: "16px",
      fontSize: "1.05rem",
      fontWeight: "600",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 0 20px rgba(147, 51, 234, 0.25)",
      transition: "all 0.2s ease",
      marginTop: "20px",
    },
    scoreCard: {
      background: "rgba(0, 255, 136, 0.04)",
      border: "1px solid rgba(0, 255, 136, 0.2)",
      borderRadius: "16px",
      padding: "30px",
      textAlign: "center",
      marginTop: "30px",
    },
    scoreText: {
      fontSize: "1.8rem",
      fontWeight: "700",
      color: "#00ff88",
      margin: "0 0 20px 0",
    },
    navButton: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "#cbd5e1",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "12px 24px",
      borderRadius: "10px",
      fontSize: "0.95rem",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Knowledge Assessment</h1>

        {score === null ? (
          <>
            {questions.map((question, index) => (
              <div key={question._id} style={styles.questionCard}>
                <h3 style={styles.questionText}>
                  {index + 1}. {question.question}
                </h3>
                <div style={styles.optionsList}>
                  {question.options.map((option, i) => {
                    const isChecked = selectedAnswers[question._id] === option;
                    return (
                      <label
                        key={i}
                        style={{
                          ...styles.optionLabel,
                          ...(isChecked && {
                            borderColor: "#00ff88",
                            background: "rgba(0, 255, 136, 0.03)",
                            color: "#00ff88",
                          }),
                        }}
                      >
                        <input
                          type="radio"
                          name={question._id}
                          value={option}
                          checked={isChecked}
                          onChange={() => handleOptionChange(question._id, option)}
                          style={{ accentColor: "#00ff88", transform: "scale(1.1)" }}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {questions.length > 0 && (
              <button
                onClick={handleSubmit}
                style={styles.submitButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.01)";
                  e.currentTarget.style.boxShadow = "0 0 25px rgba(147, 51, 234, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(147, 51, 234, 0.25)";
                }}
              >
                Submit Examination
              </button>
            )}
          </>
        ) : (
          <div style={styles.scoreCard}>
            <h2 style={styles.scoreText}>
              Complete! 🎉 Your Score: {score} / {questions.length}
            </h2>
            <button
              onClick={() => navigate(`/assignment/${courseId}`)}
              style={styles.navButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.borderColor = "#00ff88";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              Go To Assignments ➔
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;