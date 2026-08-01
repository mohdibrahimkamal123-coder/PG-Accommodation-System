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

  const loginStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .smartstay-login-page {
      min-height: 100vh !important;
      width: 100% !important;
      background: radial-gradient(circle at 15% 15%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
                  radial-gradient(circle at 85% 85%, rgba(139, 92, 246, 0.12) 0%, transparent 40%),
                  radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.06) 0%, transparent 60%),
                  #f8fafc !important;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 40px 20px !important;
      position: relative !important;
      overflow: hidden !important;
    }

    .smartstay-login-page .login-top-bar {
      position: absolute !important;
      top: 24px !important;
      left: 32px !important;
      right: 32px !important;
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
      z-index: 10 !important;
    }

    .smartstay-login-page .brand-logo-login {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      text-decoration: none !important;
      font-weight: 800 !important;
      font-size: 1.3rem !important;
      color: #0f172a !important;
    }

    .smartstay-login-page .brand-icon-box {
      width: 38px !important;
      height: 38px !important;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) !important;
      border-radius: 12px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: white !important;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35) !important;
    }

    .smartstay-login-page .back-home-link {
      display: inline-flex !important;
      align-items: center !important;
      gap: 8px !important;
      color: #64748b !important;
      text-decoration: none !important;
      font-weight: 600 !important;
      font-size: 0.9rem !important;
      padding: 8px 16px !important;
      border-radius: 20px !important;
      background: rgba(255, 255, 255, 0.8) !important;
      backdrop-filter: blur(10px) !important;
      border: 1px solid rgba(226, 232, 240, 0.8) !important;
      transition: all 0.2s ease !important;
    }

    .smartstay-login-page .back-home-link:hover {
      color: #6366f1 !important;
      background: #ffffff !important;
      transform: translateX(-3px) !important;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.1) !important;
    }

    .smartstay-login-page .login-glass-card {
      background: rgba(255, 255, 255, 0.92) !important;
      backdrop-filter: blur(20px) !important;
      -webkit-backdrop-filter: blur(20px) !important;
      border: 1px solid rgba(255, 255, 255, 0.8) !important;
      border-radius: 32px !important;
      padding: 48px 40px !important;
      width: 100% !important;
      max-width: 450px !important;
      box-shadow: 0 30px 70px -15px rgba(99, 102, 241, 0.15), 0 15px 30px -10px rgba(15, 23, 42, 0.05) !important;
      position: relative !important;
      z-index: 5 !important;
      margin-top: 40px !important;
    }

    .smartstay-login-page .tag-badge {
      display: inline-flex !important;
      align-items: center !important;
      gap: 6px !important;
      background: #eef2ff !important;
      border: 1px solid rgba(99, 102, 241, 0.2) !important;
      color: #4f46e5 !important;
      font-size: 0.75rem !important;
      font-weight: 800 !important;
      padding: 4px 14px !important;
      border-radius: 20px !important;
      letter-spacing: 0.04em !important;
      text-transform: uppercase !important;
      margin-bottom: 16px !important;
    }

    .smartstay-login-page .login-title {
      font-size: 2.1rem !important;
      font-weight: 800 !important;
      color: #0f172a !important;
      letter-spacing: -0.02em !important;
      margin-bottom: 8px !important;
    }

    .smartstay-login-page .login-subtitle {
      color: #64748b !important;
      font-size: 0.95rem !important;
      margin-bottom: 24px !important;
      line-height: 1.5 !important;
    }

    .smartstay-login-page .error-alert-banner {
      background: #fef2f2 !important;
      border: 1px solid #fca5a5 !important;
      color: #dc2626 !important;
      padding: 12px 16px !important;
      border-radius: 16px !important;
      font-size: 0.88rem !important;
      font-weight: 700 !important;
      margin-bottom: 20px !important;
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      animation: fadeIn 0.2s ease !important;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .smartstay-login-page .form-group-custom {
      display: flex !important;
      flex-direction: column !important;
      gap: 8px !important;
      margin-bottom: 22px !important;
    }

    .smartstay-login-page .input-label-row {
      display: flex !important;
      justify-content: space-between !important;
      align-items: center !important;
    }

    .smartstay-login-page .form-label-custom {
      font-size: 0.78rem !important;
      font-weight: 800 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      color: #475569 !important;
      margin: 0 !important;
    }

    .smartstay-login-page .forgot-pass-link {
      font-size: 0.82rem !important;
      color: #6366f1 !important;
      text-decoration: none !important;
      font-weight: 700 !important;
      transition: color 0.2s ease !important;
    }

    .smartstay-login-page .forgot-pass-link:hover {
      color: #4f46e5 !important;
      text-decoration: underline !important;
    }

    .smartstay-login-page .input-wrapper-rel {
      position: relative !important;
      display: flex !important;
      align-items: center !important;
    }

    .smartstay-login-page .input-icon-left {
      position: absolute !important;
      left: 16px !important;
      color: #94a3b8 !important;
      pointer-events: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    .smartstay-login-page .form-input-custom {
      width: 100% !important;
      padding: 14px 16px 14px 46px !important;
      border-radius: 16px !important;
      border: 1.5px solid #e2e8f0 !important;
      outline: none !important;
      background: #f8fafc !important;
      font-size: 0.95rem !important;
      color: #0f172a !important;
      font-weight: 600 !important;
      transition: all 0.25s ease !important;
    }

    .smartstay-login-page .form-input-custom::placeholder {
      color: #94a3b8 !important;
      font-weight: 500 !important;
    }

    .smartstay-login-page .form-input-custom:focus {
      background: #ffffff !important;
      border-color: #6366f1 !important;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15) !important;
    }

    .smartstay-login-page .btn-login-submit {
      width: 100% !important;
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%) !important;
      color: white !important;
      border: none !important;
      border-radius: 16px !important;
      padding: 14px !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      cursor: pointer !important;
      box-shadow: 0 8px 22px rgba(99, 102, 241, 0.35) !important;
      transition: all 0.3s ease !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 10px !important;
      margin-top: 10px !important;
    }

    .smartstay-login-page .btn-login-submit:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%) !important;
      transform: translateY(-2px) !important;
      box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45) !important;
    }

    .smartstay-login-page .btn-login-submit:active {
      transform: translateY(0) !important;
    }

    .smartstay-login-page .login-card-footer {
      text-align: center !important;
      margin-top: 30px !important;
      border-top: 1px solid #f1f5f9 !important;
      padding-top: 22px !important;
    }

    .smartstay-login-page .signup-prompt {
      font-size: 0.92rem !important;
      color: #64748b !important;
      margin: 0 !important;
    }

    .smartstay-login-page .signup-link-custom {
      color: #6366f1 !important;
      text-decoration: none !important;
      font-weight: 800 !important;
      transition: color 0.2s ease !important;
      margin-left: 4px !important;
    }

    .smartstay-login-page .signup-link-custom:hover {
      color: #4f46e5 !important;
      text-decoration: underline !important;
    }

    .smartstay-login-page .security-badge-footer {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 6px !important;
      color: #94a3b8 !important;
      font-size: 0.78rem !important;
      font-weight: 600 !important;
      margin-top: 24px !important;
    }
  `;

  return (
    <div className="smartstay-login-page">
      {/* Safe Embedded CSS */}
      <style dangerouslySetInnerHTML={{ __html: loginStyles }} />

      {/* Top Header Navigation */}
      <div className="login-top-bar">
        <Link to="/" className="brand-logo-login">
          <div className="brand-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          SmartStay
        </Link>

        <Link to="/" className="back-home-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to Stays
        </Link>
      </div>

      {/* Main Glassmorphism Login Card */}
      <div className="login-glass-card">
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <span className="tag-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Welcome Back
          </span>
          <h1 className="login-title">Log In</h1>
          <p className="login-subtitle">Access your booking dashboard and wishlist.</p>
        </div>

        {/* Inline Error Message Banner (Replaces Browser Alert) */}
        {errorMessage && (
          <div className="error-alert-banner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group-custom">
            <label className="form-label-custom">Email Address</label>
            <div className="input-wrapper-rel">
              <span className="input-icon-left">
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
                className="form-input-custom"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="form-group-custom">
            <div className="input-label-row">
              <label className="form-label-custom">Password</label>
              <Link to="/change-password" className="forgot-pass-link">Forgot password?</Link>
            </div>
            <div className="input-wrapper-rel">
              <span className="input-icon-left">
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
                className="form-input-custom"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-login-submit">
            <span>Continue</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </form>

        {/* Bottom Callout */}
        <div className="login-card-footer">
          <p className="signup-prompt">
            Don't have an account? <Link to="/register" className="signup-link-custom">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Footer Security Badge */}
      <div className="security-badge-footer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <span>256-Bit Encrypted SSL SmartStay Authentication</span>
      </div>
    </div>
  );
};

export default Login;
