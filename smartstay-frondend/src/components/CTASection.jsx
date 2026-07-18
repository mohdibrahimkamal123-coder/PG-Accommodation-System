import React from 'react';

const CTASection = () => {
  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-card">
          {/* Glass Decor Circles */}
          <div className="cta-glass-decor-1"></div>
          <div className="cta-glass-decor-2"></div>

          {/* Banner Content */}
          <div className="cta-banner-content">
            <h2>Ready to find your next home?</h2>
            <p>
              Join thousands of digital nomads, remote workers, and creators who enjoy modern, worry-free flexible stays.
            </p>
            <div className="cta-banner-buttons">
              <button className="btn btn-accent">Explore Properties</button>
              <button 
                className="btn" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  color: 'white', 
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
