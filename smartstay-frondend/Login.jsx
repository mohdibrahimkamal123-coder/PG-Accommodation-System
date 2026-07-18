import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in successfully with email: ${formData.email}`);
    navigate('/dashboard'); // redirect to user dashboard
  };

  return (
    <div className="section flex-center" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '48px', borderRadius: '28px', background: '#FFFFFF', width: '100%', maxWidth: '440px', boxShadow: 'var(--shadow-lg)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Welcome Back</span>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Log In</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Access your booking dashboard and wishlist.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
                placeholder="name@email.com"
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Password</label>
                <Link to="/change-password" style={{ fontSize: '12px', color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</Link>
              </div>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="••••••••"
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Continue
            </button>
          </form>

          {/* Bottom Callout */}
          <div style={{ textAlign: 'center', marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
