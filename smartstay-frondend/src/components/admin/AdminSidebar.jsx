import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👤' },
    { path: '/admin/owners', label: 'Owners', icon: '🏢' },
    { path: '/admin/pgs', label: 'PGs', icon: '🏠' },
    { path: '/admin/bookings', label: 'Bookings', icon: '📅' },
    { path: '/admin/reviews', label: 'Reviews', icon: '⭐' },
    { path: '/admin/reports', label: 'Reports', icon: '📈' },
  ];

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of the admin panel",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Logout!',
      cancelButtonText: 'Cancel',
      background: '#ffffff',
      backdrop: 'rgba(15, 23, 42, 0.6)',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('admin');
      
      Swal.fire({
        icon: 'success',
        title: 'Logged Out!',
        text: 'See you soon 👋',
        confirmButtonColor: '#6366f1',
        timer: 1500,
        timerProgressBar: true,
      });
      
      setTimeout(() => {
        navigate('/admin/login');
      }, 1500);
    }
  };

  const sidebarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .admin-sidebar-premium {
      width: 250px;
      min-height: 100vh;
      height: 100vh;
      background: #0f172a;
      padding: 24px 16px;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-y: auto;
      z-index: 1000;
      border-right: 1px solid rgba(255, 255, 255, 0.06);
    }

    .admin-sidebar-premium::-webkit-scrollbar {
      width: 4px;
    }

    .admin-sidebar-premium::-webkit-scrollbar-track {
      background: transparent;
    }

    .admin-sidebar-premium::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      padding-bottom: 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      margin-bottom: 24px;
    }

    .sidebar-brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.35);
      flex-shrink: 0;
      font-size: 20px;
    }

    .sidebar-brand-name {
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
      color: #ffffff;
    }

    .sidebar-brand-sub {
      font-size: 0.6rem;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .sidebar-nav {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .sidebar-nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      color: #94a3b8;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      position: relative;
    }

    .sidebar-nav-item:hover {
      background: rgba(255, 255, 255, 0.06);
      color: #ffffff;
    }

    .sidebar-nav-item.active {
      background: #1e293b;
      color: #ffffff;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .sidebar-nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 4px;
      background: #6366f1;
      border-radius: 0 4px 4px 0;
    }

    .sidebar-nav-icon {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }

    .sidebar-nav-text {
      flex: 1;
    }

    .sidebar-badge {
      background: #6366f1;
      color: #ffffff;
      font-size: 0.65rem;
      font-weight: 800;
      padding: 2px 10px;
      border-radius: 12px;
      min-width: 20px;
      text-align: center;
    }

    .sidebar-badge.pink {
      background: #ec4899;
    }

    .sidebar-badge.green {
      background: #22c55e;
    }

    .sidebar-badge.orange {
      background: #f59e0b;
    }

    .sidebar-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.06);
      margin: 8px 16px;
    }

    .sidebar-footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .sidebar-admin-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 12px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
    }

    .sidebar-avatar {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }

    .sidebar-admin-info-text {
      flex: 1;
      min-width: 0;
    }

    .sidebar-admin-name {
      font-weight: 700;
      color: #ffffff;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-admin-role {
      color: #94a3b8;
      font-size: 0.6rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .sidebar-logout-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: none;
      background: transparent;
      color: #94a3b8;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      cursor: pointer;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .sidebar-logout-btn:hover {
      background: rgba(239, 68, 68, 0.15);
      color: #f87171;
    }

    .sidebar-logout-btn svg {
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }

    @media (max-width: 768px) {
      .admin-sidebar-premium {
        transform: translateX(-100%);
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .admin-sidebar-premium.open {
        transform: translateX(0);
      }
    }
  `;

  // Get admin data
  const admin = JSON.parse(localStorage.getItem('admin'));

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sidebarStyles }} />
      
      <div className="admin-sidebar-premium">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">🏠</div>
          <div>
            <div className="sidebar-brand-name">SmartStay</div>
            <div className="sidebar-brand-sub">Admin Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `sidebar-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-text">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-admin-info">
            <div className="sidebar-avatar">
              {admin?.fullName ? admin.fullName.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="sidebar-admin-info-text">
              <div className="sidebar-admin-name">{admin?.fullName || 'Admin'}</div>
              <div className="sidebar-admin-role">Administrator</div>
            </div>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;