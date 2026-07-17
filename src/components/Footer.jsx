import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "30px 60px",
      // Forces the true sci-fi dashboard base color to override any white background bleed
      backgroundColor: "#060b11", 
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      fontFamily: "'Inter', system-ui, sans-serif",
      width: "100%",
      boxSizing: "border-box",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "700",
      margin: 0,
      background: "linear-gradient(90deg, #00ff88 0%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    text: {
      fontSize: "0.85rem",
      color: "#475569", // Premium slate gray for a muted look
      margin: 0,
      fontWeight: "400",
    },
  };

  return (
    <footer style={styles.footer}>
      <h3 style={styles.title}>Learnly.AI</h3>
      <p style={styles.text}>© 2026 All Rights Reserved</p>
    </footer>
  );
};

export default Footer;