import React, { useRef } from 'react';

const Categories = () => {
  const sliderRef = useRef(null);

  const categories = [
    {
      title: 'Shared Spaces',
      type: 'Shared',
      description: 'Premium shared rooms with curated flatmates and community spaces.',
      image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80',
      count: '14 properties available'
    },
    {
      title: 'Solo Studio',
      type: 'Private',
      description: 'Quiet, private apartments designed for focused work and relaxation.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
      count: '28 properties available'
    },
    {
      title: 'Coliving Suites',
      type: 'Coliving',
      description: 'Vibrant communal homes for networking and shared experiences.',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      count: '19 properties available'
    },
    {
      title: 'Serviced Lofts',
      type: 'Serviced',
      description: 'Fully-furnished luxury apartments with cleaning and concierge services.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      count: '12 properties available'
    }
  ];

  const handleScroll = (direction) => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = 304; // card width + gap (280 + 24)
      slider.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="explore" className="categories-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <span className="section-tag">Categories</span>
            <h2>A stay for every lifestyle.</h2>
            <p className="section-subtitle">Find your comfort zone in our handpicked room types.</p>
          </div>
          
          {/* Controls */}
          <div className="slider-controls">
            <button 
              className="slider-btn" 
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <button 
              className="slider-btn" 
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Cards Slider */}
        <div className="category-slider" ref={sliderRef}>
          {categories.map((cat, index) => (
            <div key={index} className="category-card hover-lift">
              <div className="category-img-wrapper hover-zoom-img-container">
                <img src={cat.image} alt="" />
              </div>
              <div className="category-info">
                <span className="badge badge-gray" style={{ marginBottom: '12px', fontSize: '11px', padding: '4px 10px' }}>
                  {cat.type}
                </span>
                <h3>{cat.title}</h3>
                <p style={{ minHeight: '66px', marginBottom: '12px' }}>{cat.description}</p>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-color)' }}>
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
