import React from 'react';

const TrustedBy = () => {
  return (
    <section className="trusted-section">
      <div className="container">
        <h2 className="trusted-title">Trusted by leading property partners</h2>
        
        <div className="trusted-logos">
          <div className="partner-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>LuxeStay</span>
          </div>

          <div className="partner-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
            </svg>
            <span>UrbanSpace</span>
          </div>

          <div className="partner-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <polygon points="12 2 2 22 22 22"></polygon>
            </svg>
            <span>ApexRentals</span>
          </div>

          <div className="partner-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 12h8"></path>
            </svg>
            <span>VistaHomes</span>
          </div>

          <div className="partner-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px'}}>
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            <span>MetroLiving</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
