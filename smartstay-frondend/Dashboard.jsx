import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Leases', value: '1', icon: '🔑' },
    { label: 'Saved Wishlist', value: '2 Stays', icon: '❤️' },
    { label: 'KYC Status', value: 'Verified', icon: '🛡️', color: '#10B981' },
    { label: 'Ledger Balance', value: '₹0.00', icon: '💰' }
  ];

  const notifications = [
    { id: 1, title: 'Draft Lease ready for digital signature', time: '2 hours ago', type: 'urgent' },
    { id: 2, title: 'Welcome kit and check-in instructions shared', time: '1 day ago', type: 'info' }
  ];

  const handleLogout = () => {
    alert("Logged out successfully.");
    navigate('/');
  };

  return (
    <div className="section" style={{ paddingTop: '160px', minHeight: '95vh', background: 'var(--bg-color)' }}>
      <div className="container">
        
        {/* Dashboard Shell Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }}>
          
          {/* Side Nav Widget */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: '#FFFFFF', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-secondary)', padding: '0 12px 16px 12px', borderBottom: '1px solid var(--border-color)', marginBottom: '12px' }}>Resident Portal</h3>
            
            <Link to="/dashboard" className="btn btn-secondary" style={{ textAlign: 'left', background: 'rgba(37, 99, 235, 0.05)', color: 'var(--accent-color)', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}>📊 Dashboard</Link>
            <Link to="/my-bookings" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔑 My Bookings</Link>
            <Link to="/profile" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>👤 My Profile</Link>
            <Link to="/my-reviews" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>★ My Reviews</Link>
            <Link to="/change-password" className="btn btn-text" style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: 'var(--text-primary)' }}>🔒 Security</Link>
            
            <button 
              onClick={handleLogout}
              className="btn btn-text" 
              style={{ textAlign: 'left', justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px', color: '#EF4444', borderTop: '1px solid var(--border-color)', marginTop: '24px', width: '100%' }}
            >
              🚪 Sign Out
            </button>
          </div>

          {/* Main Content Workspace */}
          <div>
            {/* Header Greeting */}
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="section-tag" style={{ marginBottom: '8px' }}>Resident Console</span>
                <h1 style={{ fontSize: '32px' }}>Welcome, John!</h1>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to="/find-pg" className="btn btn-primary">Book Another Stay</Link>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid-cols-4 grid" style={{ gap: '20px', marginBottom: '40px' }}>
              {stats.map((s, idx) => (
                <div key={idx} className="glass-panel" style={{ padding: '24px', borderRadius: '20px', background: '#FFFFFF' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{s.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: s.color || 'var(--text-primary)' }}>{s.value}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase' }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Active Stays & Notifications */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }}>
              
              {/* Active Lease Info */}
              <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#FFFFFF' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Current Stay</h3>
                
                <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', alignItems: 'center' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=150&q=80" 
                    alt="" 
                    style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }}
                  />
                  <div>
                    <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>Indiranagar Smart Residency</strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Room #302-A | Indiranagar, Bengaluru</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Rent Cycle:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>1st to 5th monthly</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Lease Period:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>6 Months (Expires Dec 2026)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Payment Status:</span>
                    <strong style={{ color: '#10B981' }}>Paid (Jul 2026)</strong>
                  </div>
                </div>
              </div>

              {/* Alert Notifications list */}
              <div className="glass-panel" style={{ padding: '32px', borderRadius: '24px', background: '#FFFFFF' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Inbox Notifications</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {notifications.map((n) => (
                    <div key={n.id} style={{ padding: '16px', borderRadius: '16px', background: n.type === 'urgent' ? 'rgba(37, 99, 235, 0.04)' : 'var(--bg-color)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        {n.type === 'urgent' ? '⚡ ' : '📝 '}
                        {n.title}
                      </strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
