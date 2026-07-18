import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FindPG = () => {
  const [filters, setFilters] = useState({
    city: 'all',
    type: 'all',
    priceRange: 'all'
  });

  const properties = [
    {
      id: 'pg-1',
      title: 'Indiranagar Smart Residency',
      location: 'Indiranagar, Bengaluru',
      city: 'bangalore',
      type: 'shared',
      rating: '4.9',
      price: 11500,
      priceLabel: '₹11,500',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
      tag: 'Double Sharing'
    },
    {
      id: 'pg-2',
      title: 'Bandra Premium Coliving',
      location: 'Bandra West, Mumbai',
      city: 'mumbai',
      type: 'private',
      rating: '4.8',
      price: 16500,
      priceLabel: '₹16,500',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      tag: 'Single Room'
    },
    {
      id: 'pg-3',
      title: 'Hauz Khas Cozy Studio',
      location: 'Hauz Khas, New Delhi',
      city: 'delhi',
      type: 'private',
      rating: '4.9',
      price: 9800,
      priceLabel: '₹9,800',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=600&q=80',
      tag: 'Triple Sharing'
    },
    {
      id: 'pg-4',
      title: 'Lotus Heritage PG',
      location: 'Adyar, Chennai',
      city: 'chennai',
      type: 'shared',
      rating: '4.7',
      price: 8200,
      priceLabel: '₹8,200',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80',
      tag: 'Double Sharing'
    },
    {
      id: 'pg-5',
      title: 'Koramangala Executive Coliving',
      location: 'Koramangala, Bengaluru',
      city: 'bangalore',
      type: 'coliving',
      rating: '4.9',
      price: 13500,
      priceLabel: '₹13,500',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      tag: 'Single Room'
    },
    {
      id: 'pg-6',
      title: 'Bandra Skylight Studio',
      location: 'Bandra Kurla, Mumbai',
      city: 'mumbai',
      type: 'serviced',
      rating: '4.9',
      price: 22000,
      priceLabel: '₹22,000',
      image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&q=80',
      tag: 'Single Studio'
    }
  ];

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredProperties = properties.filter(prop => {
    // City filter
    if (filters.city !== 'all' && prop.city !== filters.city) return false;
    
    // Room Type filter
    if (filters.type !== 'all' && prop.type !== filters.type) return false;
    
    // Price Range filter
    if (filters.priceRange !== 'all') {
      if (filters.priceRange === 'low' && prop.price > 10000) return false;
      if (filters.priceRange === 'medium' && (prop.price <= 10000 || prop.price > 18000)) return false;
      if (filters.priceRange === 'high' && prop.price <= 18000) return false;
    }
    
    return true;
  });

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <span className="section-tag">Explore Stays</span>
          <h1 style={{ fontSize: '36px', marginBottom: '12px' }}>Find your perfect stay.</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Showing {filteredProperties.length} verified listings in our active business hubs.
          </p>
        </div>

        {/* FindPG Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px' }} className="find-pg-layout">
          {/* Filters Sidebar */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#FFFFFF', height: 'fit-content' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Filters</h2>
            
            {/* Filter: City */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>City</label>
              <select 
                value={filters.city} 
                onChange={(e) => handleFilterChange('city', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px', fontWeight: '500' }}
              >
                <option value="all">All Cities</option>
                <option value="bangalore">Bengaluru</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">New Delhi</option>
                <option value="chennai">Chennai</option>
              </select>
            </div>

            {/* Filter: Room Type */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Room Type</label>
              <select 
                value={filters.type} 
                onChange={(e) => handleFilterChange('type', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px', fontWeight: '500' }}
              >
                <option value="all">All Types</option>
                <option value="shared">Shared Room</option>
                <option value="private">Private Studio</option>
                <option value="coliving">Coliving Suite</option>
                <option value="serviced">Serviced Loft</option>
              </select>
            </div>

            {/* Filter: Price Range */}
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Budget</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'All Budgets', value: 'all' },
                  { label: 'Under ₹10,000', value: 'low' },
                  { label: '₹10,000 - ₹18,000', value: 'medium' },
                  { label: 'Over ₹18,000', value: 'high' }
                ].map((range) => (
                  <button 
                    key={range.value}
                    onClick={() => handleFilterChange('priceRange', range.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '1px solid',
                      borderColor: filters.priceRange === range.value ? 'var(--accent-color)' : 'var(--border-color)',
                      background: filters.priceRange === range.value ? 'rgba(37, 99, 235, 0.05)' : 'white',
                      color: filters.priceRange === range.value ? 'var(--accent-color)' : 'var(--text-primary)',
                      textAlign: 'left',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div>
            {filteredProperties.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0' }} className="glass-panel">
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🔍</span>
                <h3 style={{ marginBottom: '8px' }}>No stays match your filters</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Try broadening your search criteria or resetting filters.</p>
                <button 
                  onClick={() => setFilters({ city: 'all', type: 'all', priceRange: 'all' })}
                  className="btn btn-secondary" 
                  style={{ marginTop: '20px' }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="property-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {filteredProperties.map((prop) => (
                  <div key={prop.id} className="property-card" style={{ background: '#FFFFFF' }}>
                    <div className="property-image-wrapper hover-zoom-img-container">
                      <span className="property-tag">{prop.tag}</span>
                      <img src={prop.image} alt="" />
                    </div>
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
                      <div className="property-location" style={{ marginBottom: '16px' }}>
                        <span>📍 {prop.location}</span>
                      </div>
                      <div className="property-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                        <div className="property-price">
                          <span>{prop.priceLabel}</span>/month
                        </div>
                        <Link to={`/pg/${prop.id}`} className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px' }}>
                          View Stay
                        </Link>
                      </div>
                    </div>
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

export default FindPG;
