import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: ''
  });

  const handleUpdate = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("New password and confirmation do not match!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: '', newPass: '', confirm: '' });
  };

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '95vh', background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }}>
          
          {/* Side Nav Widget */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 12px 16px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>Resident Portal</h3>
            
            <Link to="/dashboard" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>📊 Dashboard</Link>
            <Link to="/my-bookings" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔑 My Bookings</Link>
            <Link to="/profile" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>👤 My Profile</Link>
            <Link to="/my-reviews" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>★ My Reviews</Link>
            <Link to="/change-password" className="btn btn-secondary" style={{ textAlign: 'left', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--accent-color)', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}>🔒 Security</Link>
          </div>

          {/* Main Workspace */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', background: '#FFFFFF', width: '100%', maxWidth: '480px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '8px' }}>Update Password</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px' }}>Ensure your account uses a secure, random password.</p>
              
              <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Current Password</label>
                  <input 
                    type="password" 
                    value={passwords.current}
                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    required
                    placeholder="••••••••"
                    style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>New Password</label>
                  <input 
                    type="password" 
                    value={passwords.newPass}
                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                    required
                    placeholder="Minimum 8 characters"
                    style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    required
                    placeholder="••••••••"
                    style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  Update Password
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
