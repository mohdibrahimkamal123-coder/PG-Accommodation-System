import React from 'react';

const PopularCities = () => {
  const cities = [
    {
      name: 'Bengaluru',
      count: '142 properties',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Mumbai',
      count: '98 properties',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'New Delhi',
      count: '115 properties',
      image: 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Chennai',
      count: '64 properties',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section id="cities" className="cities-section">
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ alignItems: 'flex-end' }}>
          <div className="section-header-left">
            <span className="section-tag">Destinations</span>
            <h2>Where SmartStay lives.</h2>
            <p className="section-subtitle">Discover premium living spaces in India's leading metropolitan business hubs.</p>
          </div>
        </div>

        {/* Cities Grid */}
        <div className="cities-grid">
          {cities.map((city, index) => (
            <div key={index} className="city-card hover-zoom-img-container hover-lift">
              <div className="city-card-overlay">
                <h3 className="city-name">{city.name}</h3>
                <span className="city-properties">{city.count}</span>
              </div>
              <img src={city.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCities;
