import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password, role }
      );
      alert(data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  // Full Page Deep Sci-Fi Dashboard Theme Styles
  const styles = {
    pageWrapper: {
      minHeight: "100vh",
      backgroundColor: "#0d0614", // Solid base fallback
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
      webkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "20px",
      padding: "40px 35px",
      width: "100%",
      maxWidth: "400px",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      textAlign: "center",
    },
    title: {
      fontSize: "2.2rem",
      fontWeight: "800",
      margin: "0 0 28px 0",
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
      marginTop: "10px",
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
        <h1 style={styles.title}>Register</h1>
        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            onFocus={handleFocus}
            onBlur={handleBlur}
            required
          >
            <option value="" style={{ background: "#0b071e", color: "#64748b" }}>
              Select Role
            </option>
            <option value="student" style={{ background: "#0b071e", color: "#f8fafc" }}>
              Student
            </option>
            <option value="instructor" style={{ background: "#0b071e", color: "#f8fafc" }}>
              Instructor
            </option>
            <option value="admin" style={{ background: "#0b071e", color: "#f8fafc" }}>
              Admin
            </option>
          </select>

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;