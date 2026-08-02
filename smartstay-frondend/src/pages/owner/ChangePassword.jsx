import React, { useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import { changePassword } from "../../services/ownerService";

const ChangePassword = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New Password and Confirm Password do not match");
            return;
        }

        if (formData.newPassword.length < 6) {
            alert("New Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            const response = await changePassword(owner.ownerId, formData);
            alert(response.data || "Password Changed Successfully");
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: ""
            });
        } catch (error) {
            alert(error.response?.data || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .password-wrapper {
            display: flex;
            min-height: 100vh;
            background: #eef2f6;
        }

        .password-main {
            flex: 1;
            margin-left: 240px;
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Page Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #0f172a;
            margin: 0;
            line-height: 1.15;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .page-title-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #d9f99d;
            border-radius: 50%;
            margin: 0 6px;
            vertical-align: middle;
        }

        .page-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Password Card */
        .password-card {
            background: #ffffff;
            border-radius: 28px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
            max-width: 520px;
            width: 100%;
            overflow: hidden;
        }

        /* Card Header */
        .password-card-header {
            background: #0f172a;
            padding: 32px 40px 28px;
            text-align: center;
        }

        .password-icon {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
            font-size: 32px;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .password-card-title {
            font-size: 1.4rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .password-card-sub {
            font-size: 0.85rem;
            color: #94a3b8;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Card Body */
        .password-card-body {
            padding: 32px 40px 40px;
        }

        .password-card-body .security-note {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f0fdf4;
            padding: 12px 16px;
            border-radius: 12px;
            margin-bottom: 24px;
            border: 1px solid #bbf7d0;
        }

        .password-card-body .security-note .note-icon {
            font-size: 20px;
        }

        .password-card-body .security-note .note-text {
            font-size: 0.8rem;
            color: #166534;
            font-weight: 600;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            display: block;
            margin-bottom: 6px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-group .input-wrapper {
            position: relative;
        }

        .form-group .input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 18px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px 12px 46px;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            background: #f8fafc;
            color: #0f172a;
            padding-right: 46px;
        }

        .form-group input:focus {
            outline: none;
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .form-group input::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }

        .form-group .toggle-password {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #94a3b8;
            cursor: pointer;
            font-size: 18px;
            padding: 4px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .form-group .toggle-password:hover {
            color: #0f172a;
        }

        .form-group .password-strength {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-top: 8px;
        }

        .form-group .strength-bar {
            flex: 1;
            height: 4px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
        }

        .form-group .strength-bar .strength-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;
        }

        .form-group .strength-label {
            font-size: 0.7rem;
            font-weight: 700;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            white-space: nowrap;
            min-width: 60px;
        }

        .form-divider {
            height: 1px;
            background: #f1f5f9;
            margin: 24px 0;
        }

        .btn-primary-premium {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.92rem;
            padding: 14px 32px;
            border-radius: 30px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
            border: none;
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            width: 100%;
        }

        .btn-primary-premium:hover:not(:disabled) {
            background: #1e293b;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
        }

        .btn-primary-premium:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .btn-primary-premium .icon {
            font-size: 18px;
        }

        .btn-primary-premium .spinner-small {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid #ffffff;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Loading Container */
        .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            width: 100%;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
            .password-main {
                margin-left: 0;
                padding: 16px;
            }

            .password-card-header {
                padding: 24px 20px 20px;
            }

            .password-card-body {
                padding: 24px 20px 30px;
            }

            .password-icon {
                width: 60px;
                height: 60px;
                font-size: 26px;
            }

            .password-card-title {
                font-size: 1.2rem;
            }

            .page-title {
                font-size: 1.5rem;
            }

            .form-group input {
                padding: 10px 14px 10px 40px;
                font-size: 0.9rem;
                padding-right: 40px;
            }

            .btn-primary-premium {
                padding: 12px 24px;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 480px) {
            .password-card {
                border-radius: 20px;
            }

            .password-card-body {
                padding: 20px 16px 24px;
            }

            .password-card-body .security-note {
                padding: 10px 12px;
                flex-direction: column;
                text-align: center;
            }

            .form-group .password-strength {
                flex-direction: column;
                align-items: flex-start;
                gap: 4px;
            }
        }
    `;

    // Password strength checker
    const getPasswordStrength = (password) => {
        if (!password) return { score: 0, label: "Weak", color: "#ef4444", width: "20%" };
        
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 10) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        const strengths = [
            { score: 0, label: "Weak", color: "#ef4444", width: "20%" },
            { score: 1, label: "Weak", color: "#ef4444", width: "20%" },
            { score: 2, label: "Fair", color: "#f59e0b", width: "40%" },
            { score: 3, label: "Good", color: "#8b5cf6", width: "60%" },
            { score: 4, label: "Strong", color: "#22c55e", width: "80%" },
            { score: 5, label: "Very Strong", color: "#22c55e", width: "100%" }
        ];

        return strengths[Math.min(score, 5)];
    };

    const strength = getPasswordStrength(formData.newPassword);

    return (
        <div className="password-wrapper">
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <OwnerSidebar />

            <div className="password-main">
                {/* Password Card */}
                <div className="password-card">
                    {/* Card Header */}
                    <div className="password-card-header">
                        <div className="password-icon">🔒</div>
                        <h2 className="password-card-title">Change Password</h2>
                        <p className="password-card-sub">Keep your account secure</p>
                    </div>

                    {/* Card Body */}
                    <div className="password-card-body">
                        {/* Security Note */}
                        <div className="security-note">
                            <span className="note-icon">🔐</span>
                            <span className="note-text">
                                Use a strong password with at least 6 characters
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {/* Old Password */}
                            <div className="form-group">
                                <label>Current Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🔑</span>
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        name="oldPassword"
                                        value={formData.oldPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your current password"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                    >
                                        {showOldPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="form-group">
                                <label>New Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">🛡️</span>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter new password (min 6 chars)"
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                                
                                {/* Password Strength Indicator */}
                                {formData.newPassword && (
                                    <div className="password-strength">
                                        <div className="strength-bar">
                                            <div 
                                                className="strength-fill" 
                                                style={{ 
                                                    width: strength.width,
                                                    background: strength.color
                                                }}
                                            ></div>
                                        </div>
                                        <span 
                                            className="strength-label"
                                            style={{ color: strength.color }}
                                        >
                                            {strength.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">✓</span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        placeholder="Confirm your new password"
                                        style={{
                                            borderColor: formData.confirmPassword && 
                                                formData.newPassword !== formData.confirmPassword 
                                                ? "#ef4444" 
                                                : formData.confirmPassword && 
                                                  formData.newPassword === formData.confirmPassword
                                                ? "#22c55e"
                                                : ""
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                                    </button>
                                </div>
                                {formData.confirmPassword && (
                                    <div style={{ 
                                        fontSize: "0.7rem", 
                                        fontWeight: 600,
                                        marginTop: "4px",
                                        color: formData.newPassword === formData.confirmPassword 
                                            ? "#22c55e" 
                                            : "#ef4444",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                                    }}>
                                        {formData.newPassword === formData.confirmPassword 
                                            ? "✓ Passwords match" 
                                            : "✗ Passwords do not match"}
                                    </div>
                                )}
                            </div>

                            <div className="form-divider"></div>

                            <button 
                                type="submit" 
                                className="btn-primary-premium"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-small"></span>
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <span className="icon">🔄</span>
                                        Change Password
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;