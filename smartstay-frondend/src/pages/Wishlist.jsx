import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 'pg-1',
      title: 'Indiranagar Smart Residency',
      location: 'Indiranagar, Bengaluru',
      rating: '4.9',
      priceLabel: '₹11,500',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      tag: 'Double Sharing'
    },
    {
      id: 'pg-2',
      title: 'Bandra Premium Coliving',
      location: 'Bandra West, Mumbai',
      rating: '4.8',
      priceLabel: '₹16,500',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      tag: 'Single Room'
    }
  ]);

  const handleRemove = (id) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span className="section-tag">Saved Stays</span>
          <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Your Wishlist</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Manage your favorited properties and setup tours.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }} className="glass-panel">
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>❤️</span>
            <h3 style={{ marginBottom: '8px' }}>Your wishlist is empty</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Browse our spaces and save your favorites to compare.</p>
            <Link to="/find-pg" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Explore Stays
            </Link>
          </div>
        ) : (
          <div className="property-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {wishlist.map((item) => (
              <div key={item.id} className="property-card" style={{ background: '#FFFFFF' }}>
                <div className="property-image-wrapper hover-zoom-img-container">
                  <span className="property-tag">{item.tag}</span>
                  <button 
                    onClick={() => handleRemove(item.id)}
                    style={{ position: 'absolute', top: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: '3' }}
                    aria-label="Remove from wishlist"
                  >
                    <span style={{ color: '#EF4444', fontSize: '16px' }}>❤️</span>
                  </button>
                  <img src={item.image} alt="" />
                </div>
                <div className="property-content">
                  <div className="property-header">
                    <h3 className="property-title">{item.title}</h3>
                    <div className="property-rating">
                      <span>★ {item.rating}</span>
                    </div>
                  </div>
                  <div className="property-location" style={{ marginBottom: '16px' }}>
                    <span>📍 {item.location}</span>
                  </div>
                  <div className="property-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <div className="property-price">
                      <span>{item.priceLabel}</span>/month
                    </div>
                    <Link to={`/pg/${item.id}`} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
