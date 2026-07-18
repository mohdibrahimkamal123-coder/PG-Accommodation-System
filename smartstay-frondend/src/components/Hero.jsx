import React, { useState } from 'react';

const Hero = () => {
  const [searchParams, setSearchParams] = useState({
    city: 'bangalore',
    checkIn: '',
    checkOut: '',
    guests: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for properties in ${searchParams.city} from ${searchParams.checkIn || 'anytime'} to ${searchParams.checkOut || 'anytime'} for ${searchParams.guests} guest(s).`);
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        {/* Badge */}
        <div className="hero-badge">
          <span>✨ Introducing SmartStay Premium</span>
        </div>

        {/* Headline */}
        <h1 className="hero-title">
          Find your perfect stay. <br />
          <span>Live better. </span> <span className="highlight"><em>Stay smarter.</em></span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Discover curated homes designed for modern living. Flexible stays, verified spaces, and premium locations built around your lifestyle.
        </p>

        {/* Featured Showcase & Search Widget */}
        <div className="hero-showcase">
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80" 
              alt="" 
            />
          </div>

          {/* Search Widget */}
          <form className="search-widget glass-panel" onSubmit={handleSearch}>
            <div className="search-fields">
              {/* Location */}
              <div className="search-field">
                <label htmlFor="search-city">Location</label>
                <select 
                  id="search-city"
                  name="city" 
                  value={searchParams.city} 
                  onChange={handleChange}
                >
                  <option value="bangalore">Bengaluru, India</option>
                  <option value="mumbai">Mumbai, India</option>
                  <option value="delhi">New Delhi, India</option>
                  <option value="chennai">Chennai, India</option>
                </select>
              </div>

              <div className="search-divider"></div>

              {/* Check-In */}
              <div className="search-field">
                <label htmlFor="search-checkin">Check-in</label>
                <input 
                  id="search-checkin"
                  type="date" 
                  name="checkIn" 
                  value={searchParams.checkIn} 
                  onChange={handleChange}
                />
              </div>

              <div className="search-divider"></div>

              {/* Check-Out */}
              <div className="search-field">
                <label htmlFor="search-checkout">Check-out</label>
                <input 
                  id="search-checkout"
                  type="date" 
                  name="checkOut" 
                  value={searchParams.checkOut} 
                  onChange={handleChange}
                />
              </div>

              <div className="search-divider"></div>

              {/* Guests */}
              <div className="search-field">
                <label htmlFor="search-guests">Guests</label>
                <select 
                  id="search-guests"
                  name="guests" 
                  value={searchParams.guests} 
                  onChange={handleChange}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4+ Guests</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="search-btn" aria-label="Search properties">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
