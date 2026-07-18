import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'What is SmartStay?',
      answer: 'SmartStay is a modern residential rental platform offering fully-furnished, designer-curated homes with flexible lock-in periods. We handle everything from high-speed fiber internet setups to bi-weekly cleaning services.'
    },
    {
      question: 'How do the billing and utilities work?',
      answer: 'Our pricing is highly transparent. All costs—rent, premium Wi-Fi, electricity, water, and building maintenance—are rolled into a single consolidated monthly bill. You can easily view, split, and pay online through your portal.'
    },
    {
      question: 'Are security deposits refundable?',
      answer: 'Yes, absolutely. We charge a minimal, refundable security deposit equivalent to only 1 month of rent. Upon check-out and inspection of the premises, your deposit is automatically refunded back to your account within 7 working days.'
    },
    {
      question: 'Can I schedule a physical tour before booking?',
      answer: 'Yes, you can schedule physical tours or live virtual walkthroughs. Simply click the "View Details" button on any property card, select a time slot that fits your schedule, and our property manager will meet you there.'
    },
    {
      question: 'What is the minimum lock-in period?',
      answer: 'We support modern flexible living schedules. Our minimum lease agreement lock-in is just 3 months, after which it moves to a simple month-to-month renewal structure. Perfect for remote tech professionals and contractors.'
    }
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="pricing" className="faq-section">
      <div className="container">
        <div className="faq-container">
          {/* Left Column */}
          <div className="faq-left">
            <span className="section-tag">FAQ</span>
            <h2>Questions, answered.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
              Can't find the answers you are looking for? Reach out to our 24/7 dedicated customer success desk at 
              <strong style={{ color: 'var(--primary-color)', display: 'block', marginTop: '8px' }}>support@smartstay.com</strong>
            </p>
            <button className="btn btn-secondary">Contact Support</button>
          </div>

          {/* Right Column (Accordion) */}
          <div className="faq-accordion">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;
              return (
                <div key={index} className={`faq-item ${isActive ? 'active' : ''}`}>
                  <button 
                    className="faq-question-btn" 
                    onClick={() => handleToggle(index)}
                    aria-expanded={isActive}
                  >
                    <h3>{faq.question}</h3>
                    <div className="faq-icon-wrapper">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </div>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
