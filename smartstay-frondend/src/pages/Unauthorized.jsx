import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="section flex-center" style={{ paddingTop: '160px', minHeight: '85vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '60px 48px', borderRadius: '28px', background: '#FFFFFF', width: '100%', maxWidth: '480px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ fontSize: '72px', fontWeight: '800', color: 'rgba(239, 68, 68, 0.08)', marginBottom: '16px', letterSpacing: '-0.05em' }}>
            403
          </div>
          
          <span className="section-tag" style={{ margin: '0 auto 12px auto', background: 'rgba(239, 68, 68, 0.06)', color: '#EF4444' }}>Restricted</span>
          <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>Access Denied</h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            You do not have administrative clearance to access this portal. Please sign in with an approved account.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/login" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
              Sign In
            </Link>
            <Link to="/" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
              Back to Safety
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
