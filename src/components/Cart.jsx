import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchCart();
  }, []);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Remove From Cart
  const removeFromCart = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${courseId}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      alert("Course Removed");
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Razorpay Popup
  const openRazorpay = (order, key, course) => {
    const options = {
      key: key,
      amount: order.amount * 100,
      currency: "INR",
      name: "Learnly.AI",
      description: course.title,
      order_id: order.razorpayOrderId,
      handler: async (response) => {
        try {
          // Verify Payment
          await axios.post(
            "http://localhost:5000/api/payment/verify",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
            },
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          // Remove From Cart
          await axios.delete(
            `http://localhost:5000/api/cart/remove/${course._id}`,
            {
              headers: {
                Authorization: `Bearer ${userInfo.token}`,
              },
            }
          );

          alert("Payment Successful");
          fetchCart();
        } catch (error) {
          console.log(error);
          alert("Payment Verification Failed");
        }
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  // Buy Now
  const handleBuyNow = async (course) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      openRazorpay(data.order, data.key, course);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create order");
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
      maxWidth: "800px",
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
    },
    emptyStateCard: {
      background: "rgba(18, 16, 35, 0.4)",
      border: "1px dashed rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      padding: "40px",
      textAlign: "center",
      color: "#64748b",
    },
    emptyStateText: {
      fontSize: "1.2rem",
      fontWeight: "500",
      margin: 0,
    },
    cartList: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    courseCard: {
      background: "rgba(18, 16, 35, 0.65)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "24px 28px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "24px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.2s ease, border-color 0.2s ease",
    },
    infoBlock: {
      flex: "1 1 400px",
    },
    courseTitle: {
      fontSize: "1.4rem",
      fontWeight: "700",
      margin: "0 0 8px 0",
      color: "#f1f5f9",
    },
    courseDesc: {
      fontSize: "0.92rem",
      color: "#94a3b8",
      lineHeight: "1.5",
      margin: 0,
    },
    actionBlock: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      flexWrap: "wrap",
    },
    priceTag: {
      fontSize: "1.35rem",
      fontWeight: "800",
      color: "#00ff88",
      margin: 0,
    },
    btnGroup: {
      display: "flex",
      gap: "10px",
    },
    buyBtn: {
      background: "linear-gradient(135deg, #00ff88 0%, #00b36b 100%)",
      color: "#060b11",
      border: "none",
      padding: "10px 20px",
      fontSize: "0.9rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      boxShadow: "0 0 15px rgba(0, 255, 136, 0.2)",
      transition: "all 0.2s ease",
    },
    removeBtn: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#f87171",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      padding: "9px 18px",
      fontSize: "0.9rem",
      fontWeight: "600",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h1 style={styles.title}>🛒 My Cart Storage</h1>

        {cart.length === 0 ? (
          <div style={styles.emptyStateCard}>
            <h3 style={styles.emptyStateText}>Your selection manifest is empty.</h3>
          </div>
        ) : (
          <div style={styles.cartList}>
            {cart.map((course) => (
              <div
                key={course._id}
                style={styles.courseCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                }}
              >
                <div style={styles.infoBlock}>
                  <h2 style={styles.courseTitle}>{course.title}</h2>
                  <p style={styles.courseDesc}>{course.description}</p>
                </div>

                <div style={styles.actionBlock}>
                  <h3 style={styles.priceTag}>₹{course.price}</h3>
                  <div style={styles.btnGroup}>
                    <button
                      onClick={() => handleBuyNow(course)}
                      style={styles.buyBtn}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 22px rgba(0, 255, 136, 0.45)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.2)";
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => removeFromCart(course._id)}
                      style={styles.removeBtn}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                        e.currentTarget.style.borderColor = "#ef4444";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                        e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
                      }}
                    >
                      Remove
                    </button>
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

export default Cart;