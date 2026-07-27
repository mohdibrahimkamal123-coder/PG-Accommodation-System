import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin/dashboard', label: '📊 Dashboard', icon: '📊' },
    { path: '/admin/users', label: '👤 Users', icon: '👤' },
    { path: '/admin/owners', label: '🏢 Owners', icon: '🏢' },
    { path: '/admin/pgs', label: '🏠 PGs', icon: '🏠' },
    { path: '/admin/bookings', label: '📅 Bookings', icon: '📅' },
    { path: '/admin/reviews', label: '⭐ Reviews', icon: '⭐' },
    { path: '/admin/reports', label: '📈 Reports', icon: '📈' },
  ];

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.logo}>
        <h2>🏠 SmartStay</h2>
        <p style={styles.subtitle}>Admin Panel</p>
      </div>

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navLink,
              ...(isActive ? styles.active : {}),
            })}
          >
            <span style={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button style={styles.logoutBtn} onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    height: '100vh',
    background: '#1a1a2e',
    color: '#fff',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  logo: {
    padding: '24px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  subtitle: {
    fontSize: '12px',
    color: '#888',
    marginTop: '4px',
  },
  nav: {
    flex: 1,
    padding: '20px 0',
    overflowY: 'auto',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: '#aaa',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    gap: '12px',
  },
  active: {
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    borderRight: '3px solid #1a73e8',
  },
  icon: {
    fontSize: '18px',
    width: '24px',
  },
  logoutBtn: {
    margin: '20px',
    padding: '12px',
    background: '#ea4335',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background 0.3s ease',
  },
};

export default AdminSidebar;  // ⬅️ YEH IMPORTANT HAI