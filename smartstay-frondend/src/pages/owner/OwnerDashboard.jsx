import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboard } from "../../services/ownerService";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
// import OwnerNavbar from "../../components/owner/OwnerNavbar";

const OwnerDashboard = () => {
  const owner = JSON.parse(localStorage.getItem("owner"));
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await getDashboard(owner.ownerId);
      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .owner-dashboard-wrapper {
      display: flex;
      min-height: 100vh;
      background: #eef2f6;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    .owner-dashboard-main {
      flex: 1;
      margin-left: 240px;
      padding: 0;
      background: #eef2f6;
      min-height: 100vh;
    }

    .dashboard-content {
      padding: 25px 30px;
    }

    /* HEADER */
    .dash-top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 28px;
      flex-wrap: wrap;
      gap: 15px;
    }

    .dash-main-title {
      font-size: 2rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      color: #0f172a;
      margin: 0;
      line-height: 1.15;
    }

    .dash-title-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: #d9f99d;
      border-radius: 50%;
      margin: 0 6px;
      vertical-align: middle;
    }

    .dash-header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-create-scenario {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0f172a;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.88rem;
      padding: 12px 22px;
      border-radius: 30px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
      border: none;
      cursor: pointer;
    }

    .btn-create-scenario:hover {
      background: #1e293b;
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* Welcome Badge */
    .welcome-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #eef2ff;
      color: #4f46e5;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 24px;
    }

    /* STATS GRID */
    .dash-stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    @media (max-width: 1024px) {
      .dash-stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .dash-stats-grid {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      text-decoration: none;
      display: block;
      cursor: pointer;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 40px -10px rgba(15, 23, 42, 0.1);
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }

    .stat-card.purple::before { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
    .stat-card.green::before { background: linear-gradient(90deg, #22c55e, #4ade80); }
    .stat-card.orange::before { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .stat-card.blue::before { background: linear-gradient(90deg, #3b82f6, #60a5fa); }

    .stat-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 16px;
    }

    .stat-icon.purple { background: #eef2ff; }
    .stat-icon.green { background: #dcfce7; }
    .stat-icon.orange { background: #fef3c7; }
    .stat-icon.blue { background: #dbeafe; }

    .stat-label {
      font-size: 0.86rem;
      font-weight: 600;
      color: #64748b;
      margin: 0 0 8px 0;
    }

    .stat-value {
      font-size: 2.4rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin: 0;
      line-height: 1;
    }

    .stat-change {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 12px;
      margin-top: 12px;
    }

    .stat-change.up { background: #dcfce7; color: #166534; }
    .stat-change.down { background: #fee2e2; color: #991b1b; }

    /* GRID FOR CHARTS */
    .dash-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    @media (max-width: 1024px) {
      .dash-main-grid {
        grid-template-columns: 1fr;
      }
    }

    .dribbble-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
    }

    .card-header-custom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .card-title-custom {
      font-size: 1.1rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .status-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
      transition: all 0.2s ease;
    }

    .status-item:last-child {
      border-bottom: none;
    }

    .status-item:hover {
      padding-left: 8px;
      background: #f8fafc;
      border-radius: 8px;
    }

    .status-label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      color: #334155;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }

    .status-dot.green { background: #22c55e; }
    .status-dot.yellow { background: #f59e0b; }
    .status-dot.red { background: #ef4444; }
    .status-dot.blue { background: #3b82f6; }
    .status-dot.purple { background: #8b5cf6; }

    .status-value {
      font-weight: 700;
      font-size: 1.1rem;
      color: #0f172a;
    }

    .progress-bar-custom {
      width: 100%;
      height: 8px;
      background: #f1f5f9;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 8px;
    }

    .progress-fill {
      height: 100%;
      border-radius: 10px;
      transition: width 0.8s ease;
    }

    .progress-fill.green { background: linear-gradient(90deg, #22c55e, #4ade80); }
    .progress-fill.blue { background: linear-gradient(90deg, #3b82f6, #60a5fa); }
    .progress-fill.purple { background: linear-gradient(90deg, #6366f1, #8b5cf6); }
    .progress-fill.yellow { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
    .progress-fill.red { background: linear-gradient(90deg, #ef4444, #f87171); }

    .quick-actions-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    @media (max-width: 768px) {
      .quick-actions-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    .quick-action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 20px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      text-decoration: none;
      color: #0f172a;
      transition: all 0.2s ease;
      font-weight: 600;
      font-size: 0.85rem;
    }

    .quick-action-btn:hover {
      background: #ffffff;
      border-color: #6366f1;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.1);
    }

    .quick-action-icon {
      font-size: 28px;
    }

    /* Loading */
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: #eef2f6;
    }

    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid #e2e8f0;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .view-all-link {
      font-size: 0.75rem;
      color: #6366f1;
      font-weight: 700;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .view-all-link:hover {
      color: #4f46e5;
      text-decoration: underline;
    }
  `;

  if (loading) {
    return (
      <div className="owner-dashboard-wrapper">
        <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
        <OwnerSidebar />
        <div className="owner-dashboard-main">
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-dashboard-wrapper">
      <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
      
      {/* Existing Sidebar Component */}
      <OwnerSidebar />

      {/* Main Content with Navbar */}
      <div className="owner-dashboard-main">
        {/* Existing Navbar Component */}
        {/* <OwnerNavbar /> */}

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Header */}
          <div className="dash-top-header">
            <div>
              <h1 className="dash-main-title">
                Dashboard
                <span className="dash-title-pill">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                Overview
              </h1>
            </div>

            <div className="dash-header-actions">
              <Link to="/owner/pgs" className="btn-create-scenario">
                <span>+ Add New PG</span>
              </Link>
            </div>
          </div>

          {/* Welcome Badge */}
          <div className="welcome-badge">
            👋 Welcome back, {dashboard.fullName || owner?.fullName || "Owner"}!
          </div>

          {/* Stats Grid */}
          <div className="dash-stats-grid">
            <Link to="/owner/pgs" className="stat-card purple">
              <div className="stat-icon purple">🏠</div>
              <p className="stat-label">Total PGs</p>
              <h3 className="stat-value">{dashboard.totalPGs || 0}</h3>
              <span className="stat-change up">↑ Active Properties</span>
            </Link>

            <Link to="/owner/rooms" className="stat-card green">
              <div className="stat-icon green">🛏️</div>
              <p className="stat-label">Total Rooms</p>
              <h3 className="stat-value">{dashboard.totalRooms || 0}</h3>
              <span className="stat-change up">↑ {dashboard.availableRooms || 0} available</span>
            </Link>

            <Link to="/owner/bookings" className="stat-card orange">
              <div className="stat-icon orange">📋</div>
              <p className="stat-label">Pending Bookings</p>
              <h3 className="stat-value">{dashboard.pendingBookings || 0}</h3>
              <span className="stat-change down">⏳ Awaiting approval</span>
            </Link>

            <Link to="/owner/bookings" className="stat-card blue">
              <div className="stat-icon blue">✅</div>
              <p className="stat-label">Total Bookings</p>
              <h3 className="stat-value">{dashboard.totalBookings || 0}</h3>
              <span className="stat-change up">↑ {dashboard.approvedBookings || 0} approved</span>
            </Link>
          </div>

          {/* Two Column Charts */}
          <div className="dash-main-grid">
            {/* Room Status Card */}
            <div className="dribbble-card">
              <div className="card-header-custom">
                <h4 className="card-title-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Room Status
                </h4>
                <Link to="/owner/rooms" className="view-all-link">
                  View All →
                </Link>
              </div>

              <div className="status-item">
                <span className="status-label">
                  <span className="status-dot green"></span>
                  Available Rooms
                </span>
                <span className="status-value">{dashboard.availableRooms || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill green" 
                  style={{ width: `${dashboard.totalRooms ? ((dashboard.availableRooms || 0) / dashboard.totalRooms) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="status-item" style={{ marginTop: "16px" }}>
                <span className="status-label">
                  <span className="status-dot blue"></span>
                  Occupied Rooms
                </span>
                <span className="status-value">{dashboard.occupiedRooms || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill blue" 
                  style={{ width: `${dashboard.totalRooms ? ((dashboard.occupiedRooms || 0) / dashboard.totalRooms) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Booking Status Card */}
            <div className="dribbble-card">
              <div className="card-header-custom">
                <h4 className="card-title-custom">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                  </svg>
                  Booking Status
                </h4>
                <Link to="/owner/bookings" className="view-all-link">
                  View All →
                </Link>
              </div>

              <div className="status-item">
                <span className="status-label">
                  <span className="status-dot green"></span>
                  Approved
                </span>
                <span className="status-value">{dashboard.approvedBookings || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill green" 
                  style={{ width: `${dashboard.totalBookings ? ((dashboard.approvedBookings || 0) / dashboard.totalBookings) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="status-item" style={{ marginTop: "12px" }}>
                <span className="status-label">
                  <span className="status-dot yellow"></span>
                  Pending
                </span>
                <span className="status-value">{dashboard.pendingBookings || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill yellow" 
                  style={{ width: `${dashboard.totalBookings ? ((dashboard.pendingBookings || 0) / dashboard.totalBookings) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="status-item" style={{ marginTop: "12px" }}>
                <span className="status-label">
                  <span className="status-dot red"></span>
                  Rejected
                </span>
                <span className="status-value">{dashboard.rejectedBookings || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill red" 
                  style={{ width: `${dashboard.totalBookings ? ((dashboard.rejectedBookings || 0) / dashboard.totalBookings) * 100 : 0}%` }}
                ></div>
              </div>

              <div className="status-item" style={{ marginTop: "12px" }}>
                <span className="status-label">
                  <span className="status-dot purple"></span>
                  Completed
                </span>
                <span className="status-value">{dashboard.completedBookings || 0}</span>
              </div>
              <div className="progress-bar-custom">
                <div 
                  className="progress-fill purple" 
                  style={{ width: `${dashboard.totalBookings ? ((dashboard.completedBookings || 0) / dashboard.totalBookings) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
        
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;