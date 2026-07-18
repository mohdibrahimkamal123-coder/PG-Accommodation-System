import React from 'react';
import { Link } from 'react-router-dom';

const BookingSuccess = () => {
  return (
    <div className="section flex-center" style={{ paddingTop: '160px', minHeight: '85vh' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="glass-panel" style={{ padding: '60px 48px', borderRadius: '28px', background: '#FFFFFF', width: '100%', maxWidth: '500px', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          {/* Animated Checkmark Placeholder */}
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 99, 235, 0.08)', color: 'var(--accent-color)', margin: '0 auto 28px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>
            ✓
          </div>

          <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Success</span>
          <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Booking Confirmed!</h1>
          
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
            Thank you! Your deposit payment was processed successfully. We have generated your draft lease agreement and sent a copy to your email address.
          </p>

          {/* Booking Info Card */}
          <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '20px', padding: '24px', textAlign: 'left', marginBottom: '36px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Stay:</span>
              <strong style={{ color: 'var(--text-primary)' }}>Indiranagar Smart Residency</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Location:</span>
              <strong style={{ color: 'var(--text-primary)' }}>Indiranagar, Bengaluru</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Booking Ref:</span>
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>SS-9281-B</strong>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/dashboard" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
              Go to Dashboard
            </Link>
            <Link to="/" className="btn btn-secondary" style={{ width: '100%', textDecoration: 'none' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
