import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer id="about" className="footer">
      <div className="container">
        {/* Main Footer Links & Branding */}
        <div className="footer-grid">
          {/* Col 1: Logo & Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-logo">
              <img src="/logo.png" alt="SmartStay Logo" style={{ height: '70px', width: 'auto', objectFit: 'contain' }} />
            </Link>
            <p>
              Premium rental housing and shared workspaces designed for the modern remote professional. Settle in instantly, stay flexibly.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4>Explore</h4>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/">Home</Link></li>
              <li className="footer-link"><Link to="/find-pg">Stays</Link></li>
              <li className="footer-link"><Link to="/?scroll=cities">Cities</Link></li>
              <li className="footer-link"><Link to="/?scroll=pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/unauthorized">Partner Portal</Link></li>
              <li className="footer-link"><Link to="/not-found">Safety Guides</Link></li>
              <li className="footer-link"><Link to="/contact">Help Center</Link></li>
              <li className="footer-link"><Link to="/wishlist">My Wishlist</Link></li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="footer-col">
            <h4>Company</h4>
            <ul className="footer-links">
              <li className="footer-link"><Link to="/about">About Us</Link></li>
              <li className="footer-link"><Link to="/dashboard">Dashboard</Link></li>
              <li className="footer-link"><Link to="/profile">My Profile</Link></li>
              <li className="footer-link"><Link to="/my-bookings">My Bookings</Link></li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <h4>Stay Updated</h4>
            <div className="footer-newsletter">
              <p style={{ fontSize: '13px', marginBottom: '8px' }}>
                Subscribe to receive special offers, tips, and new city launches.
              </p>
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for newsletter"
                />
                <button type="submit">Join</button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SmartStay. All rights reserved. Settle in, live smart.</p>
          
          <div className="footer-socials">
            {/* Twitter */}
            <a href="#" className="social-link" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
