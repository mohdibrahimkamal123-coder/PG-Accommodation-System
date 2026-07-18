import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="section flex-center" style={{ paddingTop: '160px', minHeight: '85vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '60px 48px', borderRadius: '28px', background: '#FFFFFF', width: '100%', maxWidth: '480px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ fontSize: '72px', fontWeight: '800', color: 'rgba(15, 23, 42, 0.08)', marginBottom: '16px', letterSpacing: '-0.05em' }}>
            404
          </div>
          
          <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Error</span>
          <h1 style={{ fontSize: '28px', marginBottom: '16px' }}>Page Not Found</h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            The path you are trying to reach does not exist or has been shifted. Let's redirect you back to safety.
          </p>

          <Link to="/" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
