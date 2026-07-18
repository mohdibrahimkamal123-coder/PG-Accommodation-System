import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message Sent!\nThank you ${formData.name}. We will get back to you within 24 hours.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '80vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="section-tag">Get in Touch</span>
          <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Let's start a conversation.</h1>
          <p className="hero-subtitle" style={{ maxWidth: '580px', margin: '0 auto' }}>
            Have questions about bookings, corporate leases, or room setups? Drop us a line and our team will guide you.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid-cols-2 grid" style={{ gap: '64px', alignItems: 'stretch' }}>
          {/* Contact Details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '28px', marginBottom: '24px' }}>Office Hubs</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>🏢 Bengaluru Head Office</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    102, 80 Feet Road, Indiranagar<br />
                    Bengaluru, Karnataka - 560038
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>🏢 Mumbai Hub</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    Sleek Spaces, Off Link Road, Bandra West<br />
                    Mumbai, Maharashtra - 400050
                  </p>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>✉️ Corporate Support</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                    General Support: support@smartstay.com<br />
                    Partnerships: partners@smartstay.com
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px', marginTop: '32px' }}>
              <p style={{ fontSize: '14px', fontWeight: '500' }}>
                🕒 <strong>Support Hours:</strong> 24/7 client concierge support for all active residents. For viewings, tours run 9:00 AM - 7:00 PM daily.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="glass-panel" style={{ padding: '48px', borderRadius: '28px', background: '#FFFFFF' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Send a Message</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="John Doe"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="john@email.com"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Subject</label>
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  placeholder="Booking Inquiry"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Your Message</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required 
                  placeholder="Tell us what you are looking for..."
                  rows="4"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
