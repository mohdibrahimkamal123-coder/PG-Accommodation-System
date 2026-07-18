import React, { useState } from 'react';

const FeaturedListings = () => {
  const [favorites, setFavorites] = useState([false, false, false]);

  const properties = [
    {
      id: 0,
      title: 'Indiranagar Smart Residency',
      location: 'Indiranagar, Bengaluru',
      rating: '4.9',
      reviews: '48 reviews',
      tag: 'Double Sharing',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      price: '₹11,500',
      amenities: [
        { name: 'Wifi Backup', icon: '📶' },
        { name: 'Split AC', icon: '❄️' },
        { name: 'Meals Inc.', icon: '🍳' }
      ]
    },
    {
      id: 1,
      title: 'Bandra Premium Coliving',
      location: 'Bandra West, Mumbai',
      rating: '4.8',
      reviews: '92 reviews',
      tag: 'Single Room',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      price: '₹16,500',
      amenities: [
        { name: 'Private desk', icon: '🏢' },
        { name: 'Wifi Backup', icon: '📶' },
        { name: 'Gym Access', icon: '🏋️' }
      ]
    },
    {
      id: 2,
      title: 'Hauz Khas Cozy Studio',
      location: 'Hauz Khas, New Delhi',
      rating: '4.9',
      reviews: '64 reviews',
      tag: 'Triple Sharing',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=800&q=80',
      price: '₹8,500',
      amenities: [
        { name: 'Study Desk', icon: '🛏️' },
        { name: 'High-speed Wifi', icon: '📶' },
        { name: 'Kitchenette', icon: '🍳' }
      ]
    }
  ];

  const toggleFavorite = (index) => {
    setFavorites(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <section id="explore" className="featured-listings-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-header-left">
            <span className="section-tag">Featured Stays</span>
            <h2>Handpicked homes this week.</h2>
            <p className="section-subtitle">Stunning apartments vetted for quality, design, and high-speed connectivity.</p>
          </div>
          
          <button className="btn btn-secondary">
            View All Stays
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {properties.map((prop) => (
            <div key={prop.id} className="property-card">
              {/* Image & Badges */}
              <div className="property-image-wrapper hover-zoom-img-container">
                <span className="property-tag">{prop.tag}</span>
                <button 
                  className={`property-fav-btn ${favorites[prop.id] ? 'active' : ''}`}
                  onClick={() => toggleFavorite(prop.id)}
                  aria-label="Add to favorites"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={favorites[prop.id] ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <img src={prop.image} alt="" />
              </div>

              {/* Card Body */}
              <div className="property-content">
                <div className="property-header">
                  <h3 className="property-title">{prop.title}</h3>
                  <div className="property-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{prop.rating}</span>
                  </div>
                </div>

                <div className="property-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{prop.location}</span>
                </div>

                {/* Amenities */}
                <div className="property-amenities">
                  {prop.amenities.map((amenity, idx) => (
                    <div key={idx} className="amenity">
                      <span>{amenity.icon}</span>
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="property-footer">
                  <div className="property-price">
                    <span>{prop.price}</span>/month
                  </div>
                  <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
