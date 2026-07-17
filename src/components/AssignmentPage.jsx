import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [assignments, setAssignments] = useState([]);
  const [fileLink, setFileLink] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/assignments/${courseId}`
      );
      setAssignments(data);
    } catch (error) {
      console.log(error);
    }
  };

  const submitAssignment = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/api/assignments/submit/${id}`,
        { fileLink },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      alert("Assignment Submitted Successfully");
      setFileLink("");
    } catch (error) {
      alert(error.response?.data?.message);
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
      padding: "50px 20px",
      boxSizing: "border-box",
      fontFamily: "'Inter', system-ui, sans-serif",
      color: "#f8fafc",
    },
    container: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    pageHeader: {
      fontSize: "2.4rem",
      fontWeight: "800",
      marginBottom: "40px",
      textAlign: "center",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    assignmentCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "30px",
      marginBottom: "24px",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
      transition: "border-color 0.25s ease",
    },
    assignmentTitle: {
      fontSize: "1.5rem",
      fontWeight: "700",
      margin: "0 0 12px 0",
      color: "#f1f5f9",
    },
    assignmentDesc: {
      fontSize: "0.98rem",
      color: "#94a3b8",
      lineHeight: "1.6",
      margin: "0 0 24px 0",
    },
    submissionActionArea: {
      display: "flex",
      flexDirection: "column",
      gap: "14px",
      maxWidth: "500px",
    },
    input: {
      background: "rgba(255, 255, 255, 0.04)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "10px",
      padding: "14px 16px",
      color: "#f8fafc",
      fontSize: "0.95rem",
      outline: "none",
      transition: "all 0.25s ease",
      width: "100%",
      boxSizing: "border-box",
    },
    submitButton: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "12px 24px",
      fontSize: "0.95rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      alignSelf: "flex-start",
      boxShadow: "0 0 15px rgba(0, 255, 136, 0.2)",
      transition: "all 0.2s ease",
    },
    viewButton: {
      background: "rgba(147, 51, 234, 0.1)",
      color: "#c084fc",
      border: "1px solid rgba(147, 51, 234, 0.3)",
      padding: "12px 24px",
      fontSize: "0.95rem",
      fontWeight: "600",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    noDataText: {
      textAlign: "center",
      color: "#64748b",
      fontSize: "1.1rem",
      marginTop: "40px",
    }
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
        <h1 style={styles.pageHeader}>Course Assignments</h1>

        {assignments.length === 0 ? (
          <p style={styles.noDataText}>No assignments posted for this course module yet.</p>
        ) : (
          assignments.map((assignment) => (
            <div
              key={assignment._id}
              style={styles.assignmentCard}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"}
            >
              <h2 style={styles.assignmentTitle}>{assignment.title}</h2>
              <p style={styles.assignmentDesc}>{assignment.description}</p>

              {/* Student Role Interface */}
              {userInfo.role === "student" && (
                <div style={styles.submissionActionArea}>
                  <input
                    type="text"
                    placeholder="🔗 Paste cloud submission link (Google Drive, GitHub...)"
                    value={fileLink}
                    onChange={(e) => setFileLink(e.target.value)}
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  <button
                    onClick={() => submitAssignment(assignment._id)}
                    style={styles.submitButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.2)";
                    }}
                  >
                    Submit Assignment
                  </button>
                </div>
              )}

              {/* Admin / Instructor Role Interface */}
              {(userInfo.role === "admin" || userInfo.role === "instructor") && (
                <button
                  onClick={() => navigate(`/submissions/${assignment._id}`)}
                  style={styles.viewButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(147, 51, 234, 0.2)";
                    e.currentTarget.style.borderColor = "#a855f7";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(147, 51, 234, 0.1)";
                    e.currentTarget.style.borderColor = "rgba(147, 51, 234, 0.3)";
                  }}
                >
                  📊 View Student Submissions
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssignmentPage;