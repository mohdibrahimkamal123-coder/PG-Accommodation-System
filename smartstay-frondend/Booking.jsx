import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    moveInDate: '',
    duration: '6',
    occupantName: '',
    occupantEmail: '',
    paymentMode: 'card'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert("Lease agreement draft generated! Directing to payment authentication...");
    navigate('/booking-success');
  };

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '90vh' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <span className="section-tag">Reservation</span>
          <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>Finalize Reservation</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review lease parameters and authenticate checkout.</p>
        </div>

        {/* Content columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '48px' }}>
          {/* Left Form */}
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '24px', background: '#FFFFFF' }}>
            <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Lease Configuration</h2>
            
            <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="grid-cols-2 grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Move-in Date</label>
                  <input 
                    type="date" 
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleChange}
                    required
                    style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Duration</label>
                  <select 
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px', fontWeight: '500' }}
                  >
                    <option value="3">3 Months (Min)</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months (Recommended)</option>
                  </select>
                </div>
              </div>

              <h2 style={{ fontSize: '20px', margin: '16px 0 8px 0', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>Occupant Information</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Full Name</label>
                <input 
                  type="text" 
                  name="occupantName"
                  value={formData.occupantName}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email Address</label>
                <input 
                  type="email" 
                  name="occupantEmail"
                  value={formData.occupantEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@email.com"
                  style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-color)', fontSize: '14px' }}
                />
              </div>

              <h2 style={{ fontSize: '20px', margin: '16px 0 8px 0', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>Secure Checkout</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Payment Mode</label>
                {[
                  { id: 'card', label: '💳 Credit / Debit Card', desc: 'Secure authorization via gateway' },
                  { id: 'upi', label: '📱 UPI Payment', desc: 'Google Pay, PhonePe, or BHIM' }
                ].map((mode) => (
                  <label 
                    key={mode.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '16px',
                      borderRadius: '16px',
                      border: '1.5px solid',
                      borderColor: formData.paymentMode === mode.id ? 'var(--accent-color)' : 'var(--border-color)',
                      background: formData.paymentMode === mode.id ? 'rgba(37, 99, 235, 0.04)' : 'white',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <input 
                      type="radio" 
                      name="paymentMode" 
                      value={mode.id}
                      checked={formData.paymentMode === mode.id}
                      onChange={handleChange}
                      style={{ cursor: 'pointer' }}
                    />
                    <div>
                      <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{mode.label}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{mode.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <button type="submit" className="btn btn-accent" style={{ width: '100%', marginTop: '16px' }}>
                Authenticate & Book Stay
              </button>
            </form>
          </div>

          {/* Right Summary */}
          <div>
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: '#FFFFFF' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>Booking Summary</h2>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
                <img 
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=150&q=80" 
                  alt="" 
                  style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>Indiranagar Smart Residency</strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Indiranagar, Bengaluru</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Monthly Rent</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹11,500</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Security Deposit (Refundable)</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹11,500</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Lease Setup Fee</span>
                  <strong style={{ color: 'var(--accent-color)' }}>FREE</strong>
                </div>
              </div>

              <div style={{ borderTop: '1.5px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Due Immediately</span>
                <strong style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)' }}>₹23,000</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
