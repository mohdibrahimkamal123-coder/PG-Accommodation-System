import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/userService";

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        role: "USER",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser(user);

            alert("Registration Successful");

            navigate("/login");
        } catch (error) {
            console.log(error);
            alert("Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Top Brand Navigation Bar */}
            <div style={styles.topBar}>
                <Link to="/" style={styles.brandLogo}>
                    <div style={styles.brandIconBox}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    SmartStay
                </Link>

                <Link to="/login" style={styles.topLoginLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign In
                </Link>
            </div>

            {/* Main Unique Hero Card */}
            <div style={styles.card}>
                {/* Decorative Top-Right Corner Geometric SVG Accent */}
                <div style={styles.cardDecorTopRight}>
                    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="90" cy="50" r="45" fill="url(#paint0_linear)" fillOpacity="0.18" />
                        <circle cx="105" cy="35" r="25" fill="#6366f1" fillOpacity="0.12" />
                        <rect x="50" y="20" width="60" height="60" rx="30" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.3" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="45" y1="5" x2="135" y2="95" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6366f1" />
                                <stop offset="1" stopColor="#a855f7" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Decorative Bottom-Left Dots SVG Grid */}
                <div style={styles.cardDecorBottomLeft}>
                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                        <g fill="#6366f1" fillOpacity="0.15">
                            <circle cx="10" cy="10" r="3" />
                            <circle cx="30" cy="10" r="3" />
                            <circle cx="50" cy="10" r="3" />
                            <circle cx="10" cy="30" r="3" />
                            <circle cx="30" cy="30" r="3" />
                            <circle cx="50" cy="30" r="3" />
                            <circle cx="10" cy="50" r="3" />
                            <circle cx="30" cy="50" r="3" />
                            <circle cx="50" cy="50" r="3" />
                        </g>
                    </svg>
                </div>

                {/* Card Header Content */}
                <div style={styles.header}>
                    <div style={styles.badgeWrapper}>
                        <span style={styles.tagBadge}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            Join SmartStay Stays
                        </span>
                    </div>

                    <h1 style={styles.headline}>
                        Your stays, your bookings, all in one place
                    </h1>
                    <p style={styles.subheadline}>
                        Create your verified guest account to browse 10,000+ zero-brokerage PGs.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Full Name */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={user.fullName}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email Address</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@email.com"
                                value={user.email}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={user.password}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Mobile number"
                                value={user.phone}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Gender</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </span>
                            <select
                                name="gender"
                                value={user.gender}
                                onChange={handleChange}
                                style={styles.select}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Unique Dark Capsule Submit Button */}
                    <button type="submit" style={styles.submitBtn} disabled={loading}>
                        {loading ? (
                            <span>Registering...</span>
                        ) : (
                            <>
                                <span>Get started</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Callout */}
                <div style={styles.footerBox}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.loginLink}>
                        Login
                    </Link>
                </div>
            </div>

            {/* Security badge footer */}
            <div style={styles.securityBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>256-Bit Encrypted SmartStay Registration</span>
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
    topLoginLink: {
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
        maxWidth: "520px",
        boxShadow: "0 30px 60px -15px rgba(99, 102, 241, 0.18), 0 12px 24px -10px rgba(15, 23, 42, 0.06)",
        position: "relative",
        overflow: "hidden",
        zIndex: 5,
        marginTop: "50px",
        boxSizing: "border-box",
    },
    cardDecorTopRight: {
        position: "absolute",
        top: "-15px",
        right: "-15px",
        pointerEvents: "none",
        zIndex: 1,
    },
    cardDecorBottomLeft: {
        position: "absolute",
        bottom: "0px",
        left: "0px",
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
    label: {
        fontSize: "12px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "#475569",
        margin: 0,
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
    select: {
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
        cursor: "pointer",
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
    loginLink: {
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

export default Register;
