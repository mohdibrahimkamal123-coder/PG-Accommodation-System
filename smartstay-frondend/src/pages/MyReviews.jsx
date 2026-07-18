import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyReviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      property: 'Lotus Heritage Studio',
      location: 'Adyar, Chennai',
      rating: 5,
      date: 'June 20, 2025',
      content: 'Fantastic stay! Clean rooms, cooperative flatmates, and standard checkout parameters made my 6-month stay extremely peaceful.'
    }
  ]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
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
            <Link to="/my-reviews" className="btn btn-secondary" style={{ textAlign: 'left', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--accent-color)', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}>★ My Reviews</Link>
            <Link to="/change-password" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔒 Security</Link>
          </div>

          {/* Main Workspace */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span className="section-tag">Your Contribution</span>
              <h1 style={{ fontSize: '32px' }}>My Reviews</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage ratings and feedback written for past tenancies.</p>
            </div>

            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }} className="glass-panel">
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>⭐</span>
                <h3 style={{ marginBottom: '8px' }}>No reviews written yet</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Reviews can be written once a lease booking is completed.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.map((rev) => (
                  <div key={rev.id} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block' }}>{rev.property}</strong>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>📍 {rev.location} | Reviewed on {rev.date}</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => alert("Edit review interface coming soon!")}
                          className="btn btn-text" 
                          style={{ padding: '6px 12px', fontSize: '13px', color: 'var(--accent-color)', fontWeight: '600' }}
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(rev.id)}
                          className="btn btn-text" 
                          style={{ padding: '6px 12px', fontSize: '13px', color: '#EF4444', fontWeight: '600' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <span key={i} style={{ color: '#F59E0B' }}>★</span>
                      ))}
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                      "{rev.content}"
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyReviews;
