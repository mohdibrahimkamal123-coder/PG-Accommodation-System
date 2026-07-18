import React from 'react';
import { Link } from 'react-router-dom';

const MyBookings = () => {
  const bookings = [
    {
      id: 'SS-9281-B',
      title: 'Indiranagar Smart Residency',
      location: 'Indiranagar, Bengaluru',
      room: 'Room #302-A (Private Studio)',
      moveIn: 'Jul 2026',
      moveOut: 'Jan 2027',
      rent: '₹11,500/month',
      status: 'Active',
      statusColor: '#10B981',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'SS-1102-K',
      title: 'Lotus Heritage Studio',
      location: 'Adyar, Chennai',
      room: 'Room #104 (Coliving Shared)',
      moveIn: 'Jan 2025',
      moveOut: 'Jun 2025',
      rent: '₹24,000/month',
      status: 'Completed',
      statusColor: 'var(--text-secondary)',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=150&q=80'
    }
  ];

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '95vh', background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }}>
          
          {/* Side Nav Widget */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 12px 16px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>Resident Portal</h3>
            
            <Link to="/dashboard" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>📊 Dashboard</Link>
            <Link to="/my-bookings" className="btn btn-secondary" style={{ textAlign: 'left', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--accent-color)', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}>🔑 My Bookings</Link>
            <Link to="/profile" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>👤 My Profile</Link>
            <Link to="/my-reviews" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>★ My Reviews</Link>
            <Link to="/change-password" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔒 Security</Link>
          </div>

          {/* Main Workspace */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span className="section-tag">Booking History</span>
              <h1 style={{ fontSize: '32px' }}>My Bookings</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Review active tenancies, historic leases, and receipt drafts.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {bookings.map((book) => (
                <div key={book.id} className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <img 
                      src={book.image} 
                      alt="" 
                      style={{ width: '80px', height: '80px', borderRadius: '16px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{book.title}</strong>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.08)', color: book.statusColor }}>
                          {book.status}
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>📍 {book.location} | {book.room}</p>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                        📅 Tenancy period: <strong>{book.moveIn} - {book.moveOut}</strong>
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block' }}>Monthly Rent</span>
                      <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>{book.rent}</strong>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading signed lease agreement: ${book.id}.pdf`)}
                      className="btn btn-secondary" 
                      style={{ padding: '8px 16px', fontSize: '13px' }}
                    >
                      📄 Download Lease
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyBookings;
