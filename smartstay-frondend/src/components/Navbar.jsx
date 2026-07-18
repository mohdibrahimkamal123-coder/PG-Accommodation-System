import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for scroll redirect parameters
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const scrollTarget = query.get('scroll');
    if (scrollTarget && location.pathname === '/') {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // clean query params
        navigate('/', { replace: true });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleNavClick = (value, isAnchor) => {
    setMobileMenuOpen(false);
    if (isAnchor) {
      if (location.pathname !== '/') {
        navigate(`/?scroll=${value}`);
      } else {
        const element = document.getElementById(value);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else {
      navigate(value);
    }
  };

  const navLinks = [
    { label: 'Home', value: '/', isAnchor: false },
    { label: 'Explore', value: '/find-pg', isAnchor: false },
    { label: 'Cities', value: 'cities', isAnchor: true },
    { label: 'Pricing', value: 'pricing', isAnchor: true },
    { label: 'About', value: '/about', isAnchor: false }
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          {/* Logo */}
          <Link to="/" className="navbar-brand" onClick={() => handleNavClick('/', false)}>
            <img src="/logo.png" alt="SmartStay Logo" className="navbar-logo-img" />
          </Link>

          {/* Nav Links - Desktop */}
          <ul className="navbar-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.isAnchor ? `#${link.value}` : link.value}
                  className={`navbar-link ${
                    (!link.isAnchor && location.pathname === link.value) ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.value, link.isAnchor);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA / Actions - Desktop */}
          <div className="navbar-actions">
            <Link to="/login" className="btn btn-text">Login</Link>
            <Link to="/find-pg" className="btn btn-primary">Book Now</Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.isAnchor ? `#${link.value}` : link.value}
                  className={`navbar-link ${
                    (!link.isAnchor && location.pathname === link.value) ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.value, link.isAnchor);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
            <Link to="/login" className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>Login</Link>
            <Link to="/find-pg" className="btn btn-primary" style={{ width: '100%' }} onClick={() => setMobileMenuOpen(false)}>Book Now</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
