import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewSubmissions = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/assignments/submissions/${assignmentId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSubmissions(data);
    } catch (error) {
      console.log(error);
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
    container: {
      maxWidth: "1000px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      marginBottom: "35px",
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    listLayout: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    submissionRow: {
      background: "rgba(18, 16, 35, 0.55)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "14px",
      padding: "20px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
      transition: "all 0.2s ease",
    },
    studentInfo: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    studentName: {
      fontSize: "1.1rem",
      fontWeight: "600",
      color: "#f8fafc",
      margin: 0,
    },
    studentEmail: {
      fontSize: "0.85rem",
      color: "#94a3b8",
      margin: 0,
    },
    metaInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: "8px",
    },
    timeStamp: {
      fontSize: "0.8rem",
      color: "#64748b",
      margin: 0,
    },
    linkButton: {
      background: "rgba(0, 255, 136, 0.1)",
      color: "#00ff88",
      border: "1px solid rgba(0, 255, 136, 0.2)",
      padding: "8px 16px",
      borderRadius: "8px",
      fontSize: "0.85rem",
      fontWeight: "600",
      textDecoration: "none",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>Assignment Submissions</h1>

        <div style={styles.listLayout}>
          {submissions.map((submission) => (
            <div
              key={submission._id}
              style={styles.submissionRow}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(147, 51, 234, 0.3)";
                e.currentTarget.style.background = "rgba(18, 16, 35, 0.75)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.background = "rgba(18, 16, 35, 0.55)";
              }}
            >
              <div style={styles.studentInfo}>
                <h3 style={styles.studentName}>
                  👤 {submission.student?.name || "Anonymous Student"}
                </h3>
                <p style={styles.studentEmail}>{submission.student?.email}</p>
              </div>

              <div style={styles.metaInfo}>
                <p style={styles.timeStamp}>
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </p>
                <a
                  href={submission.fileLink}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.linkButton}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 255, 136, 0.2)";
                    e.currentTarget.style.boxShadow = "0 0 12px rgba(0, 255, 136, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 255, 136, 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  📄 View Submission Link
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSubmissions;