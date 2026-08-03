// src/pages/owner/OwnerRegister.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ownerRegister } from "../services/ownerService";

const OwnerRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Enhanced validation function with field-specific errors
    const validateField = (name, value) => {
        let error = "";
        
        switch(name) {
            case "fullName":
                if (!value.trim()) {
                    error = "Full name is required";
                } else if (value.trim().length < 2) {
                    error = "Full name must be at least 2 characters";
                } else if (value.trim().length > 50) {
                    error = "Full name must not exceed 50 characters";
                } else if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
                    error = "Full name should only contain letters, spaces, hyphens, and apostrophes";
                }
                break;
                
            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Please enter a valid email address";
                } else if (value.length > 100) {
                    error = "Email must not exceed 100 characters";
                }
                break;
                
            case "mobileNumber":
                if (!value.trim()) {
                    error = "Phone number is required";
                } else {
                    // Remove all non-digit characters for validation
                    const digitsOnly = value.replace(/\D/g, '');
                    
                    // Check if exactly 10 digits
                    if (digitsOnly.length !== 10) {
                        error = "Phone number must be exactly 10 digits";
                    } 
                    // Check if starts with 6, 7, 8, or 9 (Indian mobile number format)
                    else if (!/^[6-9]/.test(digitsOnly)) {
                        error = "Phone number must start with 6, 7, 8, or 9";
                    }
                    // Check if all characters are valid (should be, since we removed non-digits)
                    else if (!/^\d{10}$/.test(digitsOnly)) {
                        error = "Phone number must contain only digits";
                    }
                }
                break;
                
            case "password":
                if (!value) {
                    error = "Password is required";
                } else if (value.length < 6) {
                    error = "Password must be at least 6 characters";
                } else if (value.length > 30) {
                    error = "Password must not exceed 30 characters";
                } else if (!/(?=.*[a-z])/.test(value)) {
                    error = "Password must contain at least one lowercase letter";
                } else if (!/(?=.*[A-Z])/.test(value)) {
                    error = "Password must contain at least one uppercase letter";
                } else if (!/(?=.*\d)/.test(value)) {
                    error = "Password must contain at least one number";
                } else if (!/(?=.*[@$!%*?&])/.test(value)) {
                    error = "Password must contain at least one special character (@$!%*?&)";
                }
                break;
                
            default:
                break;
        }
        
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        let processedValue = value;
        
        // For mobile number, only allow digits and format for better UX
        if (name === "mobileNumber") {
            // Remove all non-digit characters
            processedValue = value.replace(/\D/g, '');
            // Limit to 10 digits
            if (processedValue.length > 10) {
                processedValue = processedValue.slice(0, 10);
            }
        }
        
        // Update form data
        setFormData({
            ...formData,
            [name]: processedValue
        });
        
        // Validate field on change (realtime validation)
        const error = validateField(name, processedValue);
        setFieldErrors({
            ...fieldErrors,
            [name]: error
        });
        
        // Clear general error if any
        if (error) {
            setError("");
        }
    };

    // Validate all fields before submission
    const validateForm = () => {
        const errors = {};
        let hasError = false;
        
        // Validate each field
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                errors[key] = error;
                hasError = true;
            }
        });
        
        setFieldErrors(errors);
        return !hasError;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const isValid = validateForm();
        
        if (!isValid) {
            // Find first field with error and focus it
            const firstErrorField = Object.keys(fieldErrors)[0];
            if (firstErrorField) {
                const element = document.querySelector(`[name="${firstErrorField}"]`);
                if (element) {
                    element.focus();
                }
            }
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            // Prepare data for API - ensure mobile number is clean
            const apiData = {
                ...formData,
                mobileNumber: formData.mobileNumber.replace(/\D/g, '') // Ensure clean digits
            };
            
            await ownerRegister(apiData);
            setSuccess("Registration successful! Redirecting to login...");
            
            setTimeout(() => {
                navigate("/owner/login");
            }, 2000);

        } catch (err) {
            if (err.response?.data?.errors) {
                setError(Object.values(err.response.data.errors).join(", "));
            } else if (typeof err.response?.data === 'string') {
                setError(err.response.data);
            } else {
                setError(err.response?.data?.message || "Registration failed! Please try again.");
            }
        } finally {
            setLoading(false);
        }
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
        illustrationBox: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "16px",
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
        successAlert: {
            background: "#dcfce7",
            border: "1px solid #86efac",
            color: "#166534",
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
        inputError: {
            borderColor: "#dc2626",
            background: "#fef2f2",
        },
        errorText: {
            color: "#dc2626",
            fontSize: "12px",
            fontWeight: "600",
            marginTop: "4px",
        },
        passwordStrengthContainer: {
            marginTop: "6px",
        },
        passwordStrengthBar: {
            height: "4px",
            background: "#e2e8f0",
            borderRadius: "2px",
            overflow: "hidden",
        },
        passwordStrengthFill: {
            height: "100%",
            transition: "width 0.3s ease",
        },
        passwordStrengthLabels: {
            display: "flex",
            justifyContent: "space-between",
            fontSize: "10px",
            color: "#64748b",
            marginTop: "4px",
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
        submitBtnDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
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

    // Calculate password strength
    const getPasswordStrength = (password) => {
        if (!password) return 0;
        let strength = 0;
        if (password.length >= 6) strength += 1;
        if (password.length >= 10) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/\d/.test(password)) strength += 1;
        if (/[@$!%*?&]/.test(password)) strength += 1;
        return Math.min(strength, 5);
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength <= 1) return "#ef4444";
        if (strength <= 3) return "#eab308";
        return "#22c55e";
    };

    const getPasswordStrengthText = (strength) => {
        if (strength <= 1) return "Weak";
        if (strength <= 3) return "Medium";
        return "Strong";
    };

    const passwordStrength = getPasswordStrength(formData.password);

    return (
        <div style={styles.wrapper}>
            {/* Top Brand Navigation Bar */}
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

                <Link to="/owner/login" style={styles.topLoginLink}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                        <polyline points="10 17 15 12 10 7"/>
                        <line x1="15" y1="12" x2="3" y2="12"/>
                    </svg>
                    Login
                </Link>
            </div>

            {/* Main High-Level Hero Card */}
            <div style={styles.card}>
                {/* High-Level SVG Background Waves & Orbits Accent */}
                <div style={styles.cardDecorTopRight}>
                    <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="120" cy="60" r="70" fill="url(#ownerGrad1)" fillOpacity="0.16" />
                        <circle cx="140" cy="40" r="40" fill="url(#ownerGrad2)" fillOpacity="0.22" />
                        <path d="M40 20 Q120 60 160 160" stroke="url(#ownerGrad1)" strokeWidth="2" strokeDasharray="6 6" strokeOpacity="0.4" />
                        <circle cx="120" cy="60" r="85" stroke="#8b5cf6" strokeWidth="1.5" strokeOpacity="0.2" strokeDasharray="3 9" />
                        <defs>
                            <linearGradient id="ownerGrad1" x1="50" y1="0" x2="180" y2="130" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6366f1" />
                                <stop offset="0.5" stopColor="#8b5cf6" />
                                <stop offset="1" stopColor="#ec4899" />
                            </linearGradient>
                            <linearGradient id="ownerGrad2" x1="100" y1="0" x2="180" y2="80" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#06b6d4" />
                                <stop offset="1" stopColor="#6366f1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* High-Level Bottom Left Isometric SVG Accent */}
                <div style={styles.cardDecorBottomLeft}>
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <path d="M0 80 Q 40 40 80 120" stroke="#6366f1" strokeWidth="2" strokeOpacity="0.2" />
                        <g fill="#6366f1" fillOpacity="0.12">
                            <circle cx="15" cy="85" r="3.5" />
                            <circle cx="35" cy="85" r="3.5" />
                            <circle cx="55" cy="85" r="3.5" />
                            <circle cx="15" cy="105" r="3.5" />
                            <circle cx="35" cy="105" r="3.5" />
                            <circle cx="55" cy="105" r="3.5" />
                        </g>
                    </svg>
                </div>

                {/* High-Level Custom Header Art Illustration */}
                <div style={styles.header}>
                    <div style={styles.illustrationBox}>
                        <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Outer Glow Shield Aura */}
                            <circle cx="42" cy="42" r="38" fill="url(#ownerHeroGlow)" fillOpacity="0.15" />
                            <circle cx="42" cy="42" r="30" fill="#ffffff" />
                            
                            {/* 3D Property Building & Key Vector */}
                            <path d="M26 48L42 34L58 48V62A2 2 0 0 1 56 64H28A2 2 0 0 1 26 62V48Z" fill="url(#ownerHouseGrad)" />
                            <path d="M42 22L20 40L24 43L42 28L60 43L64 40L42 22Z" fill="url(#ownerRoofGrad)" />
                            <rect x="37" y="50" width="10" height="14" rx="2" fill="#ffffff" />
                            <circle cx="42" cy="38" r="4" fill="#ffffff" />
                            
                            {/* Floating Sparkle Stars */}
                            <path d="M62 24L63.5 28L67.5 29.5L63.5 31L62 35L60.5 31L56.5 29.5L60.5 28L62 24Z" fill="#ec4899" />
                            <path d="M20 20L21 23L24 24L21 25L20 28L19 25L16 24L19 23L20 20Z" fill="#06b6d4" />
                            
                            <defs>
                                <radialGradient id="ownerHeroGlow" cx="42" cy="42" r="38" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
                                </radialGradient>
                                <linearGradient id="ownerHouseGrad" x1="26" y1="34" x2="58" y2="64" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#6366f1" />
                                    <stop offset="1" stopColor="#4f46e5" />
                                </linearGradient>
                                <linearGradient id="ownerRoofGrad" x1="20" y1="22" x2="64" y2="43" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#8b5cf6" />
                                    <stop offset="1" stopColor="#ec4899" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div style={styles.badgeWrapper}>
                        <span style={styles.tagBadge}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18"/>
                                <path d="M9 8h1"/>
                                <path d="M9 12h1"/>
                                <path d="M9 16h1"/>
                                <path d="M14 8h1"/>
                                <path d="M14 12h1"/>
                                <path d="M14 16h1"/>
                                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>
                            </svg>
                            Property Owner Registration
                        </span>
                    </div>

                    <h1 style={styles.headline}>Create Account</h1>
                    <p style={styles.subheadline}>Register to manage your properties.</p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div style={styles.errorAlert}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Success Banner */}
                {success && (
                    <div style={styles.successAlert}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>{success}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Full Name Field */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Enter Full Name"
                                value={formData.fullName}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(fieldErrors.fullName && styles.inputError)
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.fullName && (
                            <div style={styles.errorText}>{fieldErrors.fullName}</div>
                        )}
                    </div>

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
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(fieldErrors.email && styles.inputError)
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.email && (
                            <div style={styles.errorText}>{fieldErrors.email}</div>
                        )}
                    </div>

                    {/* Phone Field - Updated with proper validation */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Phone Number</label>
                        <div style={styles.inputWrapper}>
                            <span style={styles.inputIcon}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder="Enter 10-digit phone number"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                maxLength="10"
                                style={{
                                    ...styles.input,
                                    ...(fieldErrors.mobileNumber && styles.inputError)
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.mobileNumber && (
                            <div style={styles.errorText}>{fieldErrors.mobileNumber}</div>
                        )}
                        {!fieldErrors.mobileNumber && formData.mobileNumber.length > 0 && (
                            <div style={{ 
                                color: '#22c55e', 
                                fontSize: '12px', 
                                fontWeight: '600', 
                                marginTop: '4px' 
                            }}>
                                ✓ Valid phone number format
                            </div>
                        )}
                    </div>

                    {/* Password Field */}
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
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
                                placeholder="Enter Password (Min 6 chars)"
                                value={formData.password}
                                onChange={handleChange}
                                style={{
                                    ...styles.input,
                                    ...(fieldErrors.password && styles.inputError)
                                }}
                                required
                            />
                        </div>
                        {fieldErrors.password && (
                            <div style={styles.errorText}>{fieldErrors.password}</div>
                        )}
                        
                        {/* Password strength indicator */}
                        {formData.password && !fieldErrors.password && (
                            <div style={styles.passwordStrengthContainer}>
                                <div style={styles.passwordStrengthBar}>
                                    <div style={{
                                        ...styles.passwordStrengthFill,
                                        width: `${(passwordStrength / 5) * 100}%`,
                                        background: getPasswordStrengthColor(passwordStrength)
                                    }} />
                                </div>
                                <div style={styles.passwordStrengthLabels}>
                                    <span>Weak</span>
                                    <span style={{ fontWeight: '600', color: getPasswordStrengthColor(passwordStrength) }}>
                                        {getPasswordStrengthText(passwordStrength)}
                                    </span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={{
                            ...styles.submitBtn,
                            ...(loading && styles.submitBtnDisabled)
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <span>Registering...</span>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"/>
                                    <polyline points="12 5 19 12 12 19"/>
                                </svg>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Switch Link */}
                <div style={styles.footerBox}>
                    Already have an account?{" "}
                    <Link to="/owner/login" style={styles.loginLink}>
                        Login
                    </Link>
                </div>
            </div>

            {/* Footer Security Badge */}
            <div style={styles.securityBadge}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>256-Bit Encrypted SmartStay Owner Portal</span>
            </div>
        </div>
    );
};

export default OwnerRegister;