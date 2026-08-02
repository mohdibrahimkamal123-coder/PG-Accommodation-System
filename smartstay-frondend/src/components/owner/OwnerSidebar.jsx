import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OwnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("owner");
    navigate("/owner/login");
  };

  const owner = JSON.parse(localStorage.getItem("owner"));

  const sidebarStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .owner-sidebar-premium {
      width: 240px;
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

    .owner-sidebar-premium::-webkit-scrollbar {
      width: 4px;
    }

    .owner-sidebar-premium::-webkit-scrollbar-track {
      background: transparent;
    }

    .owner-sidebar-premium::-webkit-scrollbar-thumb {
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
      width: 20px;
      height: 20px;
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

    .sidebar-user-section {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sidebar-avatar {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    .sidebar-user-info {
      flex: 1;
      min-width: 0;
    }

    .sidebar-user-name {
      font-weight: 700;
      color: #ffffff;
      font-size: 0.85rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-user-role {
      color: #94a3b8;
      font-size: 0.65rem;
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
      margin-top: 4px;
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
  `;

  // Get menu items with badges
  const menuItems = [
    { path: "/owner/dashboard", icon: "🏠", label: "Dashboard", badge: null },
    { path: "/owner/pgs", icon: "🏢", label: "My PGs", badge: null },
    { path: "/owner/rooms", icon: "🚪", label: "Rooms", badge: null },
    { path: "/owner/bookings", icon: "📖", label: "Bookings", badge: null },
    { path: "/owner/profile", icon: "👤", label: "Profile", badge: null },
    { path: "/owner/change-password", icon: "🔒", label: "Change Password", badge: null },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: sidebarStyles }} />
      
      <div className="owner-sidebar-premium">
        {/* Brand */}
        <Link to="/owner/dashboard" className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <div className="sidebar-brand-name">SmartStay</div>
            <div className="sidebar-brand-sub">Owner Portal</div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-nav-item ${location.pathname === item.path ? "active" : ""}`}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span className="sidebar-nav-text">{item.label}</span>
              {item.badge && (
                <span className={`sidebar-badge ${item.badgeColor || ""}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="sidebar-user-section">
          <div className="sidebar-avatar">
            {owner?.fullName ? owner.fullName.charAt(0).toUpperCase() : "O"}
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{owner?.fullName || "Owner"}</div>
            <div className="sidebar-user-role">Property Owner</div>
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={logout} className="sidebar-logout-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
};

export default OwnerSidebar;