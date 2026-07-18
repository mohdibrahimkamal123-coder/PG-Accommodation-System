import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    agree: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("Please agree to the Terms of Service.");
      return;
    }
    alert(`Account created successfully for: ${formData.name}`);
    navigate('/login');
  };

  return (
    <div className="section flex-center" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '48px', borderRadius: '28px', background: '#FFFFFF', width: '100%', maxWidth: '460px', boxShadow: 'var(--shadow-lg)' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Join SmartStay</span>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Sign up to book verified homes instantly.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
                placeholder="John Doe"
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
              />
            </div>

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
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required 
                placeholder="+91 98765 43210"
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
                placeholder="Minimum 8 characters"
                style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
              />
            </div>

            {/* Checkbox */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '4px' }}>
              <input 
                type="checkbox" 
                id="agree" 
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                style={{ marginTop: '4px', cursor: 'pointer' }}
              />
              <label htmlFor="agree" style={{ fontSize: '13px', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: '1.4' }}>
                I agree to the <Link to="/unauthorized" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Terms of Service</Link> and <Link to="/unauthorized" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '500' }}>Privacy Policy</Link>.
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              Create Account
            </button>
          </form>

          {/* Bottom Callout */}
          <div style={{ textAlign: 'center', marginTop: '28px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '600' }}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
