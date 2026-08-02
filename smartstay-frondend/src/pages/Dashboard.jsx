import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserById } from "../services/userService";
import { getUserBookings } from "../services/bookingService";
import { getWishlist } from "../services/wishlistService";
import { getReviewsByUser } from "../services/reviewService";

const Dashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/login");
            return;
        }

        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);
            const userId = loggedInUser.userId;

            const userData = await getUserById(userId);
            setUser(userData);

            const bookingData = await getUserBookings(userId);
            setBookings(bookingData || []);

            const wishlistData = await getWishlist(userId);
            setWishlist(wishlistData || []);

            const reviewData = await getReviewsByUser(userId);
            setReviews(reviewData || []);

        } catch (err) {
            console.error("Dashboard Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const activeBooking = bookings.find(
        (b) => b.status === "CONFIRMED" || b.status === "ACTIVE"
    );

    const dashboardStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .smartstay-dashboard-canvas {
      min-height: 100vh;
      width: 100%;
      background: #eef2f6;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
      padding: 16px;
      box-sizing: border-box;
    }

    .smartstay-app-frame {
      background: #f8fafc;
      border-radius: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
      display: flex;
      min-height: calc(100vh - 32px);
      overflow: hidden;
    }

    /* SLIM DARK FLOATING SIDEBAR */
    .dash-sidebar-dock {
      background: #0f172a;
      color: #ffffff;
      width: 80px;
      padding: 24px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-sizing: border-box;
      z-index: 20;
    }

    .dash-sidebar-dock.expanded {
      width: 230px;
      align-items: stretch;
    }

    .dock-brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
      color: #ffffff;
    }

    .dock-brand-icon {
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

    .dock-brand-name {
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: -0.02em;
    }

    .dock-nav-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      margin-top: 36px;
    }

    .dock-nav-item {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      height: 46px;
      border-radius: 14px;
      color: #94a3b8;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      padding: 0 14px;
      font-size: 0.92rem;
      font-weight: 600;
    }

    .dash-sidebar-dock.expanded .dock-nav-item {
      justify-content: flex-start;
    }

    .dock-nav-item:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #ffffff;
    }

    .dock-nav-item.active {
      background: #1e293b;
      color: #ffffff;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
      position: relative;
    }

    .dock-nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      bottom: 10px;
      width: 4px;
      background: #6366f1;
      border-radius: 0 4px 4px 0;
    }

    .dock-badge {
      margin-left: auto;
      background: #6366f1;
      color: #ffffff;
      font-size: 0.7rem;
      font-weight: 800;
      padding: 2px 8px;
      border-radius: 10px;
    }

    .dock-user-anchor {
      margin-top: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .dock-avatar {
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }

    /* MAIN CONTENT VIEWPORT */
    .dash-content-viewport {
      flex: 1;
      padding: 32px 36px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    /* HEADER & CHIP NAV */
    .dash-top-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .dash-main-title {
      font-size: 2.2rem;
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
    }

    .btn-icon-circle {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #0f172a;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
    }

    .btn-icon-circle:hover {
      background: #f1f5f9;
      transform: scale(1.04);
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
    }

    .btn-create-scenario:hover {
      background: #1e293b;
      color: #ffffff;
      transform: translateY(-1px);
    }

    /* HORIZONTAL FILTER CHIPS */
    .dash-filter-chips-row {
      display: flex;
      align-items: center;
      gap: 10px;
      overflow-x: auto;
      padding-bottom: 8px;
      margin-bottom: 28px;
      scrollbar-width: none;
    }

    .dash-chip {
      background: #ffffff;
      color: #475569;
      border: 1px solid #e2e8f0;
      padding: 9px 20px;
      border-radius: 30px;
      font-size: 0.86rem;
      font-weight: 700;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      box-shadow: 0 2px 6px rgba(15, 23, 42, 0.02);
    }

    .dash-chip:hover {
      background: #f8fafc;
      color: #0f172a;
      border-color: #cbd5e1;
    }

    .dash-chip.active {
      background: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
      box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
    }

    /* DRIBBBLE-STYLE METRICS & CARDS GRID */
    .dash-main-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }

    @media (max-width: 1024px) {
      .dash-main-grid {
        grid-template-columns: 1fr;
      }
    }

    .dash-left-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .dash-cards-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 20px;
    }

    /* CARD 1: OPERATIONS / ACTIVE STAY (WHITE) */
    .dribbble-card-white {
      background: #ffffff;
      border-radius: 24px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 200px;
    }

    .card-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .card-title-group {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #0f172a;
    }

    .card-dot-icon {
      width: 24px;
      height: 24px;
      border-radius: 8px;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .card-metric-val {
      font-size: 2.6rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.04em;
      line-height: 1;
      margin: 16px 0 6px 0;
      display: flex;
      align-items: baseline;
      gap: 10px;
    }

    .card-pill-tag {
      background: #d9f99d;
      color: #365314;
      font-size: 0.72rem;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    /* CAPSULE METER (ROW OF CAPSULES 0000000) */
    .capsule-meter-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 14px;
    }

    .capsule-pill {
      height: 28px;
      flex: 1;
      border-radius: 14px;
      background: #f1f5f9;
      transition: all 0.2s ease;
    }

    .capsule-pill.filled {
      background: #0f172a;
    }

    .capsule-pill.accent {
      background: #d9f99d;
    }

    .capsule-pill.indigo {
      background: #6366f1;
    }

    /* CARD 2: VIBRANT LIME / ACCENT CARD */
    .dribbble-card-lime {
      background: #e0e7ff;
      border-radius: 24px;
      padding: 24px;
      border: 1px solid #c7d2fe;
      box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.15);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 200px;
    }

    /* CARD 3: DARK FEATURE HERO BANNER */
    .dribbble-card-dark {
      background: #0f172a;
      color: #ffffff;
      border-radius: 24px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
      min-height: 200px;
      box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.3);
    }

    .dark-card-heading {
      font-size: 1.25rem;
      font-weight: 800;
      line-height: 1.3;
      margin-bottom: 8px;
      letter-spacing: -0.02em;
    }

    .dark-card-sub {
      font-size: 0.8rem;
      color: #94a3b8;
      line-height: 1.4;
    }

    .btn-upgrade-white {
      background: #ffffff;
      color: #0f172a;
      font-weight: 800;
      font-size: 0.85rem;
      padding: 10px 20px;
      border-radius: 30px;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin-top: 16px;
      transition: all 0.2s ease;
    }

    .btn-upgrade-white:hover {
      background: #f8fafc;
      color: #6366f1;
      transform: scale(1.02);
    }

    /* RIGHT COLUMN SIDE WIDGETS */
    .dash-right-column {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .widget-link-card {
      background: #ffffff;
      border-radius: 20px;
      padding: 18px 22px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-decoration: none;
      color: #0f172a;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
    }

    .widget-link-card:hover {
      border-color: #cbd5e1;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
    }

    .widget-left-group {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .widget-icon-bg {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
    }

    .widget-title {
      font-weight: 800;
      font-size: 0.92rem;
      margin: 0;
      color: #0f172a;
    }

    .widget-desc {
      font-size: 0.78rem;
      color: #64748b;
      margin: 2px 0 0 0;
    }

    .widget-arrow-icon {
      color: #94a3b8;
      transition: color 0.2s ease;
    }

    .widget-link-card:hover .widget-arrow-icon {
      color: #6366f1;
    }

    /* STATISTICS VISUAL CHART CARD */
    .dribbble-chart-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
    }

    .chart-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .chart-title {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .chart-legend {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 0.8rem;
      font-weight: 700;
      color: #64748b;
    }

    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: inline-block;
      margin-right: 6px;
    }

    /* CUSTOM DRIBBBLE BAR CHART GRAPH */
    .chart-bars-container {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      height: 180px;
      padding-top: 20px;
      border-bottom: 1px solid #f1f5f9;
    }

    .bar-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .bar-capsule-wrapper {
      width: 36px;
      height: 140px;
      background: #f1f5f9;
      border-radius: 18px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      position: relative;
    }

    .bar-filled-dark {
      background: #0f172a;
      width: 100%;
      border-radius: 18px;
      position: relative;
    }

    .bar-filled-lime {
      background: #d9f99d;
      width: 100%;
      border-radius: 18px;
    }

    .bar-filled-indigo {
      background: #6366f1;
      width: 100%;
      border-radius: 18px;
    }

    .bar-label-date {
      font-size: 0.72rem;
      font-weight: 700;
      color: #94a3b8;
    }

    /* TABLE DESIGN */
    .dribbble-table-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 24px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      margin-top: 24px;
    }

    .dribbble-table {
      width: 100%;
      border-collapse: collapse;
    }

    .dribbble-table th {
      padding: 12px 16px;
      font-size: 0.75rem;
      font-weight: 800;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #f1f5f9;
    }

    .dribbble-table td {
      padding: 16px;
      font-size: 0.9rem;
      color: #334155;
      font-weight: 600;
      border-bottom: 1px solid #f8fafc;
    }

    .status-badge-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.76rem;
      font-weight: 800;
    }

    .status-badge-chip.confirmed { background: #dcfce7; color: #166534; }
    .status-badge-chip.active { background: #e0e7ff; color: #3730a3; }
    .status-badge-chip.cancelled { background: #fee2e2; color: #991b1b; }

    /* PROFILE & WISHLIST CARDS */
    .dribbble-info-card {
      background: #ffffff;
      border-radius: 24px;
      padding: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
    }
  `;

    if (loading) {
        return (
            <div className="smartstay-dashboard-canvas text-center py-5">
                <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
                <div className="spinner-border text-dark" style={{ width: "3.5rem", height: "3.5rem" }}></div>
                <h4 className="mt-4 fw-bold text-dark">Loading Your Dashboard...</h4>
            </div>
        );
    }

    return (
        <div className="smartstay-dashboard-canvas">
            <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />

            {/* Main Outer App Frame */}
            <div className="smartstay-app-frame">

                {/* Left Floating Slim Dark Sidebar Dock */}
                <aside className={`dash-sidebar-dock ${isSidebarOpen ? "expanded" : ""}`}>
                    <div>
                        <Link to="/" className="dock-brand-box">
                            <div className="dock-brand-icon">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </div>
                            {isSidebarOpen && <span className="dock-brand-name">SmartStay</span>}
                        </Link>

                        <div className="dock-nav-group">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`dock-nav-item ${activeTab === "overview" ? "active" : ""}`}
                                title="Overview"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                                {isSidebarOpen && <span>Overview</span>}
                            </button>

                            <button
                                onClick={() => setActiveTab("bookings")}
                                className={`dock-nav-item ${activeTab === "bookings" ? "active" : ""}`}
                                title="My Bookings"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                </svg>
                                {isSidebarOpen && (
                                    <>
                                        <span>Bookings</span>
                                        <span className="dock-badge">{bookings.length}</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab("wishlist")}
                                className={`dock-nav-item ${activeTab === "wishlist" ? "active" : ""}`}
                                title="Wishlist"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                {isSidebarOpen && (
                                    <>
                                        <span>Wishlist</span>
                                        <span className="dock-badge" style={{ background: "#ec4899" }}>{wishlist.length}</span>
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`dock-nav-item ${activeTab === "reviews" ? "active" : ""}`}
                                title="Reviews"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                                {isSidebarOpen && <span>Reviews</span>}
                            </button>

                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`dock-nav-item ${activeTab === "profile" ? "active" : ""}`}
                                title="Profile Settings"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                {isSidebarOpen && <span>Profile</span>}
                            </button>
                        </div>
                    </div>

                    <div className="dock-user-anchor">
                        <div className="dock-avatar">
                            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                        </div>
                        {isSidebarOpen && (
                            <div className="text-truncate">
                                <div className="fw-bold text-white small">{user?.fullName || "User"}</div>
                                <div className="text-muted extra-small">{user?.role || "GUEST"}</div>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main Dashboard Viewport */}
                <main className="dash-content-viewport">

                    {/* Top Header Row with Dribbble-Style Title */}
                    <div className="dash-top-header">
                        <div>
                            <h1 className="dash-main-title">
                                Managing Your Stay
                                <span className="dash-title-pill">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </span>
                                and Bookings
                            </h1>
                        </div>

                        <div className="dash-header-actions">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="btn-icon-circle"
                                title="Toggle Sidebar Width"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </button>

                            <Link to="/find-pg" className="btn-create-scenario">
                                <span>+ Find New PG</span>
                            </Link>

                            <button onClick={handleLogout} className="btn-icon-circle" title="Logout Account">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Pill Navigation Chips */}
                    <div className="dash-filter-chips-row">
                        <button
                            onClick={() => setActiveTab("overview")}
                            className={`dash-chip ${activeTab === "overview" ? "active" : ""}`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab("bookings")}
                            className={`dash-chip ${activeTab === "bookings" ? "active" : ""}`}
                        >
                            My Bookings ({bookings.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("wishlist")}
                            className={`dash-chip ${activeTab === "wishlist" ? "active" : ""}`}
                        >
                            Saved Wishlist ({wishlist.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("reviews")}
                            className={`dash-chip ${activeTab === "reviews" ? "active" : ""}`}
                        >
                            Reviews ({reviews.length})
                        </button>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`dash-chip ${activeTab === "profile" ? "active" : ""}`}
                        >
                            Profile Settings
                        </button>
                        <Link to="/change-password" className="dash-chip" style={{ textDecoration: "none" }}>
                            Change Password ↗
                        </Link>
                    </div>

                    {/* OVERVIEW TAB CONTENT */}
                    {activeTab === "overview" && (
                        <div>
                            {/* Dribbble 2-Column Main Grid */}
                            <div className="dash-main-grid">

                                {/* Left Main Column */}
                                <div className="dash-left-column">

                                    {/* Top Row: Dribbble Feature Cards */}
                                    <div className="dash-cards-row">

                                        {/* Card 1: Active Stay / Operations */}
                                        <div className="dribbble-card-white">
                                            <div className="card-top-row">
                                                <div className="card-title-group">
                                                    <div className="card-dot-icon">🏡</div>
                                                    <span>Active Accommodation</span>
                                                </div>
                                                <span className="text-muted fw-bold">⋮</span>
                                            </div>

                                            <div>
                                                <div className="card-metric-val">
                                                    {activeBooking ? activeBooking.pgName : "No Active Stay"}
                                                </div>
                                                <span className="card-pill-tag">
                                                    ● {activeBooking ? activeBooking.status : "0 Active"}
                                                </span>
                                            </div>

                                            <div className="capsule-meter-row">
                                                <div className="capsule-pill filled"></div>
                                                <div className="capsule-pill filled"></div>
                                                <div className="capsule-pill filled"></div>
                                                <div className="capsule-pill filled"></div>
                                                <div className="capsule-pill indigo"></div>
                                                <div className="capsule-pill"></div>
                                                <div className="capsule-pill"></div>
                                            </div>
                                        </div>

                                        {/* Card 2: Wishlist & Activity Meter */}
                                        <div className="dribbble-card-lime">
                                            <div className="card-top-row">
                                                <div className="card-title-group">
                                                    <div className="card-dot-icon" style={{ background: "#c7d2fe" }}>❤️</div>
                                                    <span>Saved Wishlist PGs</span>
                                                </div>
                                                <span className="text-muted fw-bold">⋮</span>
                                            </div>

                                            <div>
                                                <div className="card-metric-val">
                                                    {wishlist.length}
                                                    <span style={{ fontSize: "1rem", color: "#4f46e5", fontWeight: 700 }}>Saved PGs</span>
                                                </div>
                                                <span className="card-pill-tag" style={{ background: "#ffffff", color: "#4f46e5" }}>
                                                    {bookings.length} Total Bookings
                                                </span>
                                            </div>

                                            <div className="capsule-meter-row">
                                                <div className="capsule-pill indigo"></div>
                                                <div className="capsule-pill indigo"></div>
                                                <div className="capsule-pill indigo"></div>
                                                <div className="capsule-pill filled"></div>
                                                <div className="capsule-pill"></div>
                                            </div>
                                        </div>

                                        {/* Card 3: Dark Feature Hero Banner */}
                                        <div className="dribbble-card-dark">
                                            <div>
                                                <div className="dark-card-heading">
                                                    Find Stays With Zero Brokerage ↗
                                                </div>
                                                <div className="dark-card-sub">
                                                    Explore 10,000+ verified PGs near tech hubs.
                                                </div>
                                            </div>

                                            <Link to="/find-pg" className="btn-upgrade-white">
                                                Explore Stays ↗
                                            </Link>
                                        </div>

                                    </div>

                                    {/* Dribbble Visual Chart & Statistics Card */}
                                    <div className="dribbble-chart-card">
                                        <div className="chart-header">
                                            <h3 className="chart-title">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <line x1="18" y1="20" x2="18" y2="10" />
                                                    <line x1="12" y1="20" x2="12" y2="4" />
                                                    <line x1="6" y1="20" x2="6" y2="14" />
                                                </svg>
                                                Booking & Activity Overview
                                            </h3>

                                            <div className="chart-legend">
                                                <span><span className="legend-dot" style={{ background: "#0f172a" }}></span>Bookings</span>
                                                <span><span className="legend-dot" style={{ background: "#d9f99d" }}></span>Wishlist</span>
                                                <span><span className="legend-dot" style={{ background: "#6366f1" }}></span>Reviews</span>
                                            </div>
                                        </div>

                                        {/* Dribbble Bar Graph Representation */}
                                        <div className="chart-bars-container">
                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-dark" style={{ height: "65%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Mon</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-lime" style={{ height: "45%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Tue</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-dark" style={{ height: "85%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Wed</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-indigo" style={{ height: "55%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Thu</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-dark" style={{ height: "95%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Fri</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-lime" style={{ height: "40%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Sat</span>
                                            </div>

                                            <div className="bar-column">
                                                <div className="bar-capsule-wrapper">
                                                    <div className="bar-filled-indigo" style={{ height: "75%" }}></div>
                                                </div>
                                                <span className="bar-label-date">Sun</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Right Side Column Widgets */}
                                <div className="dash-right-column">

                                    <button onClick={() => setActiveTab("bookings")} className="widget-link-card" style={{ border: "none", cursor: "pointer", width: "100%", textStyle: "left" }}>
                                        <div className="widget-left-group">
                                            <div className="widget-icon-bg">📖</div>
                                            <div>
                                                <h4 className="widget-title">My Bookings History</h4>
                                                <p className="widget-desc">View {bookings.length} reservations</p>
                                            </div>
                                        </div>
                                        <span className="widget-arrow-icon">↗</span>
                                    </button>

                                    <button onClick={() => setActiveTab("wishlist")} className="widget-link-card" style={{ border: "none", cursor: "pointer", width: "100%", textStyle: "left" }}>
                                        <div className="widget-left-group">
                                            <div className="widget-icon-bg" style={{ background: "#fdf2f8" }}>❤️</div>
                                            <div>
                                                <h4 className="widget-title">Saved Wishlist</h4>
                                                <p className="widget-desc">Access {wishlist.length} saved PGs</p>
                                            </div>
                                        </div>
                                        <span className="widget-arrow-icon">↗</span>
                                    </button>

                                    <button onClick={() => setActiveTab("reviews")} className="widget-link-card" style={{ border: "none", cursor: "pointer", width: "100%", textStyle: "left" }}>
                                        <div className="widget-left-group">
                                            <div className="widget-icon-bg" style={{ background: "#fefce8" }}>⭐</div>
                                            <div>
                                                <h4 className="widget-title">My Ratings & Reviews</h4>
                                                <p className="widget-desc">{reviews.length} reviews posted</p>
                                            </div>
                                        </div>
                                        <span className="widget-arrow-icon">↗</span>
                                    </button>

                                    <button onClick={() => setActiveTab("profile")} className="widget-link-card" style={{ border: "none", cursor: "pointer", width: "100%", textStyle: "left" }}>
                                        <div className="widget-left-group">
                                            <div className="widget-icon-bg" style={{ background: "#f0fdf4" }}>👤</div>
                                            <div>
                                                <h4 className="widget-title">Profile Settings</h4>
                                                <p className="widget-desc">{user?.email || "Account info"}</p>
                                            </div>
                                        </div>
                                        <span className="widget-arrow-icon">↗</span>
                                    </button>

                                    <Link to="/change-password" className="widget-link-card">
                                        <div className="widget-left-group">
                                            <div className="widget-icon-bg">🔒</div>
                                            <div>
                                                <h4 className="widget-title">Change Password</h4>
                                                <p className="widget-desc">Update account security</p>
                                            </div>
                                        </div>
                                        <span className="widget-arrow-icon">↗</span>
                                    </Link>

                                </div>

                            </div>

                            {/* Recent Bookings Dribbble Table */}
                            <div className="dribbble-table-card">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="fw-bold text-dark m-0">Recent Bookings Summary</h4>
                                    <button onClick={() => setActiveTab("bookings")} className="btn btn-link text-decoration-none fw-bold small text-dark p-0">
                                        View All ({bookings.length}) ↗
                                    </button>
                                </div>

                                {bookings.length === 0 ? (
                                    <div className="text-center py-4 text-muted small">No bookings available.</div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="dribbble-table">
                                            <thead>
                                                <tr>
                                                    <th>Booking ID</th>
                                                    <th>PG Accommodation</th>
                                                    <th>Room</th>
                                                    <th>Status</th>
                                                    <th>Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {bookings.slice(0, 5).map((b) => (
                                                    <tr key={b.bookingId}>
                                                        <td className="fw-bold">#{b.bookingId}</td>
                                                        <td className="fw-bold text-dark">{b.pgName}</td>
                                                        <td>{b.roomId || "Standard"}</td>
                                                        <td>
                                                            <span className={`status-badge-chip ${
                                                                b.status === "CONFIRMED" ? "confirmed" :
                                                                b.status === "ACTIVE" ? "active" : "cancelled"
                                                            }`}>
                                                                ● {b.status}
                                                            </span>
                                                        </td>
                                                        <td>{b.bookingDate}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* BOOKINGS TAB */}
                    {activeTab === "bookings" && (
                        <div className="dribbble-info-card">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold text-dark m-0">My Bookings History</h3>
                                <Link to="/find-pg" className="btn-create-scenario">
                                    + Book New PG
                                </Link>
                            </div>

                            {bookings.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <h5>No Bookings Found</h5>
                                    <Link to="/find-pg" className="btn-create-scenario mt-2">Find PGs</Link>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="dribbble-table">
                                        <thead>
                                            <tr>
                                                <th>Booking ID</th>
                                                <th>PG Accommodation</th>
                                                <th>Room</th>
                                                <th>Rent</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((b) => (
                                                <tr key={b.bookingId}>
                                                    <td className="fw-bold">#{b.bookingId}</td>
                                                    <td className="fw-bold text-dark">{b.pgName}</td>
                                                    <td>{b.roomId || "Standard"}</td>
                                                    <td className="fw-bold text-primary">₹{b.rent}</td>
                                                    <td>
                                                        <span className={`status-badge-chip ${
                                                            b.status === "CONFIRMED" ? "confirmed" :
                                                            b.status === "ACTIVE" ? "active" : "cancelled"
                                                        }`}>
                                                            ● {b.status}
                                                        </span>
                                                    </td>
                                                    <td>{b.bookingDate}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* WISHLIST TAB */}
                    {activeTab === "wishlist" && (
                        <div className="dribbble-info-card">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold text-dark m-0">Saved Wishlist PGs</h3>
                                <Link to="/find-pg" className="btn-create-scenario">Explore PGs</Link>
                            </div>

                            {wishlist.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <h5>Wishlist is Empty</h5>
                                    <Link to="/find-pg" className="btn-create-scenario mt-2">Browse Stays</Link>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {wishlist.map((item) => (
                                        <div key={item.wishlistId} className="col-md-4">
                                            <div className="card shadow-sm border-0 rounded-4 p-4 h-100" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                                <span className="badge bg-danger-subtle text-danger align-self-start mb-2 px-3 py-2 rounded-pill fw-bold">❤️ Wishlist Item</span>
                                                <h5 className="fw-bold text-dark mb-1">{item.pgName}</h5>
                                                <p className="text-muted small mb-3">📍 {item.city || "Bangalore"}</p>
                                                <Link to={`/pg/${item.pgId || ""}`} className="text-decoration-none fw-bold text-primary mt-auto">
                                                    View Details ↗
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* REVIEWS TAB */}
                    {activeTab === "reviews" && (
                        <div className="dribbble-info-card">
                            <h3 className="fw-bold text-dark mb-4">My Submitted Reviews</h3>

                            {reviews.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <h5>No Reviews Posted</h5>
                                </div>
                            ) : (
                                <div className="row g-3">
                                    {reviews.map((rev) => (
                                        <div key={rev.reviewId} className="col-md-6">
                                            <div className="card shadow-sm border-0 rounded-4 p-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                                                <div className="fw-bold text-warning mb-2" style={{ fontSize: "1.1rem" }}>
                                                    {"⭐".repeat(rev.rating || 5)} ({rev.rating}/5)
                                                </div>
                                                <p className="text-secondary fst-italic mb-0">"{rev.comment}"</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* PROFILE TAB */}
                    {activeTab === "profile" && (
                        <div className="dribbble-info-card">
                            <h3 className="fw-bold text-dark mb-4">Profile & Account Info</h3>

                            <div className="d-flex align-items-center gap-3 border-bottom pb-4 mb-4">
                                <div className="dock-avatar" style={{ width: "56px", height: "56px", fontSize: "22px" }}>
                                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
                                </div>
                                <div>
                                    <h3 className="fw-bold text-dark m-0">{user?.fullName || "User"}</h3>
                                    <span className="badge bg-dark text-white fw-bold px-3 py-1 mt-1 rounded-pill">Role: {user?.role || "GUEST"}</span>
                                </div>
                            </div>

                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label className="form-label text-muted fw-bold small">FULL NAME</label>
                                    <div className="form-control rounded-3 bg-light fw-semibold py-2 px-3">{user?.fullName || "N/A"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted fw-bold small">EMAIL ADDRESS</label>
                                    <div className="form-control rounded-3 bg-light fw-semibold py-2 px-3">{user?.email || "N/A"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted fw-bold small">PHONE NUMBER</label>
                                    <div className="form-control rounded-3 bg-light fw-semibold py-2 px-3">{user?.phone || "Not provided"}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted fw-bold small">GENDER</label>
                                    <div className="form-control rounded-3 bg-light fw-semibold py-2 px-3">{user?.gender || "Not specified"}</div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Link to="/change-password" className="btn-create-scenario">
                                    🔒 Change Password
                                </Link>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default Dashboard;
