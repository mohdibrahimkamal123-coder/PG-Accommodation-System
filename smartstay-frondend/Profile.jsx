import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@email.com',
    phone: '+91 98765 43210',
    kycStatus: 'Verified',
    proofType: 'Aadhaar Card'
  });

  const handleSave = (e) => {
    e.preventDefault();
    alert("Profile configurations saved successfully!");
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
            <Link to="/profile" className="btn btn-secondary" style={{ textAlign: 'left', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--accent-color)', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}>👤 My Profile</Link>
            <Link to="/my-reviews" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>★ My Reviews</Link>
            <Link to="/change-password" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔒 Security</Link>
          </div>

          {/* Main Workspace */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span className="section-tag">Manage Account</span>
              <h1 style={{ fontSize: '32px' }}>Profile Details</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Update contact info and verify digital KYC credentials.</p>
            </div>

            <div className="grid-cols-2 grid" style={{ gap: '32px', alignItems: 'stretch' }}>
              {/* Profile details form */}
              <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: '#FFFFFF' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Personal Information</h2>
                
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
                    <input 
                      type="text" 
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Address</label>
                    <input 
                      type="email" 
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      value={user.phone}
                      onChange={(e) => setUser({ ...user, phone: e.target.value })}
                      required
                      style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                    Save Changes
                  </button>
                </form>
              </div>

              {/* KYC Information Card */}
              <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Identity Verification (KYC)</h2>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '24px' }}>
                    <span style={{ fontSize: '24px' }}>🛡️</span>
                    <div>
                      <strong style={{ fontSize: '14px', color: '#10B981', display: 'block' }}>KYC Fully Vetted</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Verified via digilocker interface</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>KYC Type:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>{user.proofType}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Verification Date:</span>
                      <strong style={{ color: 'var(--text-primary)' }}>Jul 15, 2026</strong>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '16px', background: 'var(--bg-color)', borderRadius: '12px', fontSize: '12px', border: '1px solid var(--border-color)', marginTop: '24px' }}>
                  🔒 Documents are safely stored using end-to-end encryption complying with residential lease audit rules.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
