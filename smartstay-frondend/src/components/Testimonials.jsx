import React, { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote: "Finding an apartment in Bengaluru as a remote engineer used to be a nightmare. With SmartStay, I completed my booking in 5 minutes. The high-speed fiber internet and quiet study workspace are incredible.",
      name: "Sarah Fernandes",
      title: "Senior Android Developer",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "The coliving space is clean, modern, and has amazing flatmates. I love the weekly community meetups and the hassle-free split payments. It feels like a boutique hotel but at a fractional price.",
      name: "Michael Chen",
      title: "Product Designer, Linear",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Extremely secure, professional service, and premium furniture. The instant booking feature meant I could move in immediately without dealing with local broker fees. Highly recommended!",
      name: "David K.",
      title: "Financial Consultant",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="section-tag" style={{ margin: '0 auto 12px auto' }}>Reviews</span>
          <h2>Words from the community.</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Hear from hundreds of creators, developers, and professionals who call SmartStay home.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((test, index) => {
            const isHighlighted = activeIndex === index;
            return (
              <div 
                key={index} 
                className="testimonial-card hover-lift"
                style={{
                  border: isHighlighted ? '1.5px solid var(--accent-color)' : '1px solid rgba(15, 23, 42, 0.04)',
                  transform: isHighlighted ? 'scale(1.02) translateY(-4px)' : 'none',
                  boxShadow: isHighlighted ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transition: 'var(--transition-smooth)',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div>
                  {/* Quote Icon */}
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-color)" strokeWidth="1.5" style={{ opacity: 0.8, marginBottom: '24px' }}>
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c0 4-3 6-5 7v2zm11 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c0 4-3 6-5 7v2z"></path>
                  </svg>
                  <p className="testimonial-quote">"{test.quote}"</p>
                </div>

                <div className="testimonial-user">
                  <img src={test.avatar} alt={test.name} className="testimonial-avatar" />
                  <div className="testimonial-info">
                    <h4 className="testimonial-user-name">{test.name}</h4>
                    <span className="testimonial-user-title">{test.title}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel indicator controls */}
        <div className="testimonials-controls-row">
          <div className="indicator-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show testimonial ${index + 1}`}
                style={{ border: 'none', outline: 'none' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
