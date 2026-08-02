import React, { useState } from 'react';
import { loginUser } from "../services/authService";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
        const response = await loginUser(formData);

        console.log(response);

        // Save user details
        localStorage.setItem("user", JSON.stringify(response));

        navigate("/dashboard");

    } catch (error) {

        console.error(error);

        if (error.response) {
            setErrorMessage(error.response.data.message || "Invalid Email or Password");
        } else {
            setErrorMessage("Unable to connect to server");
        }
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Top Brand Bar */}
      <div style={styles.topBar}>
        <Link to="/" style={styles.brandLogo}>
          <div style={styles.brandIconBox}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span style={styles.brandText}>SmartStay</span>
        </Link>

        <Link to="/" style={styles.topHomeLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Stays
        </Link>
      </div>

      {/* Main Hero Glass Card */}
      <div style={styles.card}>
        {/* Top Right Corner Geometric SVG Accent */}
        <div style={styles.cardDecorTopRight}>
          <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="50" r="60" fill="url(#loginGrad1)" fillOpacity="0.16" />
            <circle cx="120" cy="35" r="35" fill="url(#loginGrad2)" fillOpacity="0.22" />
            <path d="M30 20 Q100 50 140 140" stroke="url(#loginGrad1)" strokeWidth="2" strokeDasharray="5 5" strokeOpacity="0.35" />
            <defs>
              <linearGradient id="loginGrad1" x1="40" y1="0" x2="160" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="loginGrad2" x1="80" y1="0" x2="160" y2="70" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Bottom Left Dots SVG Grid Accent */}
        <div style={styles.cardDecorBottomLeft}>
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <g fill="#6366f1" fillOpacity="0.14">
              <circle cx="15" cy="70" r="3" />
              <circle cx="35" cy="70" r="3" />
              <circle cx="55" cy="70" r="3" />
              <circle cx="15" cy="90" r="3" />
              <circle cx="35" cy="90" r="3" />
              <circle cx="55" cy="90" r="3" />
            </g>
          </svg>
        </div>

        {/* Header Content */}
        <div style={styles.header}>
          <div style={styles.badgeWrapper}>
            <span style={styles.tagBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Welcome Back
            </span>
          </div>
          <h1 style={styles.headline}>Log In</h1>
          <p style={styles.subheadline}>Access your booking dashboard and wishlist.</p>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div style={styles.errorAlert}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="name@email.com"
                style={styles.input}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <div style={styles.labelRow}>
              <label style={styles.label}>Password</label>
              <Link to="/change-password" style={styles.forgotLink}>Forgot password?</Link>
            </div>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="••••••••"
                style={styles.input}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitBtn}>
            <span>Continue</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </form>

        {/* Footer Callout */}
        <div style={styles.footerBox}>
          Don't have an account? <Link to="/register" style={styles.signupLink}>Sign up</Link>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div style={styles.securityBadge}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span>256-Bit Encrypted SSL SmartStay Authentication</span>
      </div>
    </div>
  );
};

const styles = {
    wrapper: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f8fafc",
        backgroundImage: `
      radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width='180' height='120' viewBox='0 0 180 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%236366f1' fill-opacity='0.09'%3E%3Crect x='10' y='10' width='45' height='26' rx='13'/%3E%3Crect x='65' y='10' width='105' height='26' rx='13'/%3E%3Crect x='10' y='47' width='105' height='26' rx='13'/%3E%3Crect x='125' y='47' width='45' height='26' rx='13'/%3E%3Crect x='10' y='84' width='45' height='26' rx='13'/%3E%3Crect x='65' y='84' width='105' height='26' rx='13'/%3E%3C/g%3E%3C/svg%3E")
    `,
        backgroundRepeat: "repeat",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px 40px 20px",
        boxSizing: "border-box",
        position: "relative",
    },
    topBar: {
        position: "absolute",
        top: "24px",
        left: "32px",
        right: "32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 10,
    },
    brandLogo: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none",
        fontWeight: "800",
        fontSize: "1.3rem",
        color: "#0f172a",
    },
    brandIconBox: {
        width: "38px",
        height: "38px",
        background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        boxShadow: "0 4px 14px rgba(99, 102, 241, 0.35)",
    },
    brandText: {
        fontSize: "1.3rem",
        fontWeight: "800",
        color: "#0f172a",
    },
    topHomeLink: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        color: "#64748b",
        textDecoration: "none",
        fontWeight: "600",
        fontSize: "0.9rem",
        padding: "8px 16px",
        borderRadius: "20px",
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(226, 232, 240, 0.8)",
    },
    card: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1.5px solid rgba(255, 255, 255, 0.9)",
        borderRadius: "36px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "460px",
        boxShadow: "0 30px 60px -15px rgba(99, 102, 241, 0.18), 0 12px 24px -10px rgba(15, 23, 42, 0.06)",
        position: "relative",
        overflow: "hidden",
        zIndex: 5,
        marginTop: "50px",
        boxSizing: "border-box",
    },
    cardDecorTopRight: {
        position: "absolute",
        top: "-20px",
        right: "-20px",
        pointerEvents: "none",
        zIndex: 1,
    },
    cardDecorBottomLeft: {
        position: "absolute",
        bottom: "-10px",
        left: "-10px",
        pointerEvents: "none",
        zIndex: 1,
    },
    header: {
        textAlign: "center",
        marginBottom: "28px",
        position: "relative",
        zIndex: 2,
    },
    badgeWrapper: {
        display: "flex",
        justifyContent: "center",
    },
    tagBadge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
        border: "1px solid rgba(99, 102, 241, 0.25)",
        color: "#4f46e5",
        fontSize: "12px",
        fontWeight: "800",
        padding: "6px 18px",
        borderRadius: "30px",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: "16px",
    },
    headline: {
        fontSize: "28px",
        fontWeight: "800",
        color: "#0f172a",
        letterSpacing: "-0.03em",
        lineHeight: "1.25",
        marginBottom: "10px",
        marginTop: "0",
    },
    subheadline: {
        color: "#64748b",
        fontSize: "14px",
        marginBottom: "20px",
        marginTop: "0",
        lineHeight: "1.5",
    },
    errorAlert: {
        background: "#fef2f2",
        border: "1px solid #fca5a5",
        color: "#dc2626",
        padding: "12px 16px",
        borderRadius: "16px",
        fontSize: "14px",
        fontWeight: "700",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        position: "relative",
        zIndex: 2,
    },
    formGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    labelRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: "12px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#475569",
        margin: 0,
    },
    forgotLink: {
        fontSize: "13px",
        color: "#6366f1",
        textDecoration: "none",
        fontWeight: "700",
    },
    inputWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    inputIcon: {
        position: "absolute",
        left: "16px",
        color: "#94a3b8",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: "100%",
        padding: "13px 16px 13px 46px",
        borderRadius: "20px",
        border: "1.5px solid #e2e8f0",
        outline: "none",
        background: "#f8fafc",
        fontSize: "15px",
        color: "#0f172a",
        fontWeight: "600",
        boxSizing: "border-box",
        transition: "all 0.25s ease",
    },
    submitBtn: {
        width: "100%",
        background: "#0f172a",
        color: "#ffffff",
        border: "none",
        borderRadius: "30px",
        padding: "15px",
        fontSize: "16px",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow: "0 10px 25px rgba(15, 23, 42, 0.25)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "12px",
        transition: "all 0.3s ease",
    },
    footerBox: {
        textAlign: "center",
        marginTop: "24px",
        borderTop: "1px solid #f1f5f9",
        paddingTop: "20px",
        fontSize: "14px",
        color: "#64748b",
        position: "relative",
        zIndex: 2,
    },
    signupLink: {
        color: "#6366f1",
        textDecoration: "none",
        fontWeight: "800",
        marginLeft: "4px",
    },
    securityBadge: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        color: "#94a3b8",
        fontSize: "12px",
        fontWeight: "600",
        marginTop: "20px",
    },
};

export default Login;
