// src/pages/Dashboard.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";

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

            // Store in localStorage for sidebar
            localStorage.setItem("bookings", JSON.stringify(bookingData || []));
            localStorage.setItem("wishlist", JSON.stringify(wishlistData || []));

        } catch (err) {
            console.error("Dashboard Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const activeBooking = bookings.find(
        (b) => b.status === "CONFIRMED" || b.status === "ACTIVE"
    );

    const dashboardStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .dashboard-content {
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
        }

        .dash-top-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
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
            transform: translateY(-1px);
        }

        .stats-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
            .stats-row {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        @media (max-width: 640px) {
            .stats-row {
                grid-template-columns: 1fr;
            }
        }

        .stat-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 20px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.2s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            flex-shrink: 0;
        }

        .stat-icon.blue { background: #dbeafe; }
        .stat-icon.green { background: #dcfce7; }
        .stat-icon.purple { background: #eef2ff; }
        .stat-icon.orange { background: #fef3c7; }

        .stat-info {
            flex: 1;
        }

        .stat-label {
            font-size: 0.75rem;
            color: #64748b;
            font-weight: 600;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        .stat-value {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            line-height: 1.2;
        }

        .booking-card {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            margin-bottom: 24px;
        }

        .booking-card-header {
            background: #0f172a;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .booking-card-header h5 {
            color: #ffffff;
            margin: 0;
            font-weight: 700;
            font-size: 1rem;
        }

        .booking-card-body {
            padding: 24px;
        }

        .booking-empty {
            text-align: center;
            padding: 30px 20px;
        }

        .booking-empty h4 {
            color: #94a3b8;
            margin-bottom: 12px;
        }

        .bottom-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-top: 24px;
        }

        @media (max-width: 768px) {
            .bottom-grid {
                grid-template-columns: 1fr;
            }
        }

        .info-card {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }

        .info-card-header {
            padding: 16px 24px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .info-card-header h5 {
            margin: 0;
            font-weight: 700;
            font-size: 1rem;
            color: #0f172a;
        }

        .info-card-body {
            padding: 20px 24px;
            max-height: 250px;
            overflow-y: auto;
        }

        .info-card-body::-webkit-scrollbar {
            width: 4px;
        }

        .info-card-body::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
        }

        .review-item {
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .review-item:last-child {
            border-bottom: none;
        }

        .review-rating {
            font-weight: 700;
            color: #f59e0b;
            font-size: 0.9rem;
        }

        .review-comment {
            color: #475569;
            font-size: 0.85rem;
            margin: 4px 0 0 0;
        }

        .wishlist-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .wishlist-item:last-child {
            border-bottom: none;
        }

        .wishlist-name {
            font-weight: 600;
            color: #0f172a;
            font-size: 0.9rem;
        }

        .wishlist-city {
            color: #94a3b8;
            font-size: 0.8rem;
        }

        .wishlist-link {
            color: #6366f1;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.8rem;
        }

        .wishlist-link:hover {
            text-decoration: underline;
        }

        .empty-state {
            text-align: center;
            color: #94a3b8;
            padding: 20px 0;
            font-size: 0.9rem;
        }

        .table-card {
            background: #ffffff;
            border-radius: 20px;
            border: 1px solid #e2e8f0;
            overflow: hidden;
            margin-top: 24px;
        }

        .table-card-header {
            padding: 16px 24px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-card-header h5 {
            margin: 0;
            font-weight: 700;
            font-size: 1rem;
            color: #0f172a;
        }

        .table-wrap {
            padding: 0 24px 24px;
            overflow-x: auto;
        }

        .premium-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
        }

        .premium-table thead th {
            padding: 14px 12px;
            font-size: 0.7rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #f1f5f9;
            text-align: left;
        }

        .premium-table tbody td {
            padding: 14px 12px;
            color: #334155;
            font-weight: 600;
            border-bottom: 1px solid #f8fafc;
            vertical-align: middle;
        }

        .premium-table tbody tr:hover {
            background: #f8fafc;
        }

        .premium-table tbody tr:last-child td {
            border-bottom: none;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 700;
        }

        .status-badge.confirmed {
            background: #dcfce7;
            color: #166534;
        }

        .status-badge.active {
            background: #e0e7ff;
            color: #3730a3;
        }

        .status-badge.cancelled {
            background: #fee2e2;
            color: #991b1b;
        }

        .status-badge.pending {
            background: #fef3c7;
            color: #92400e;
        }

        .status-badge .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            display: inline-block;
        }

        .status-badge.confirmed .dot { background: #22c55e; }
        .status-badge.active .dot { background: #4f46e5; }
        .status-badge.cancelled .dot { background: #ef4444; }
        .status-badge.pending .dot { background: #f59e0b; }

        .view-all-link {
            color: #6366f1;
            text-decoration: none;
            font-weight: 700;
            font-size: 0.8rem;
            transition: color 0.2s ease;
        }

        .view-all-link:hover {
            color: #4f46e5;
            text-decoration: underline;
        }

        .booking-id {
            font-weight: 700;
            color: #0f172a;
        }

        .booking-pg {
            font-weight: 600;
            color: #0f172a;
        }

        @media (max-width: 768px) {
            .dashboard-content {
                padding: 16px;
            }

            .stats-row {
                grid-template-columns: 1fr 1fr;
            }

            .bottom-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .stats-row {
                grid-template-columns: 1fr;
            }

            .dash-main-title {
                font-size: 1.5rem;
            }
        }
    `;

    if (loading) {
        return (
            <UserLayout>
                <div className="dashboard-content">
                    <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout>
            <style dangerouslySetInnerHTML={{ __html: dashboardStyles }} />
            
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
                        <Link to="/find-pg" className="btn-create-scenario">
                            + Find New PG
                        </Link>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon blue">📖</div>
                        <div className="stat-info">
                            <p className="stat-label">Total Bookings</p>
                            <p className="stat-value">{bookings.length}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon green">❤️</div>
                        <div className="stat-info">
                            <p className="stat-label">Wishlist</p>
                            <p className="stat-value">{wishlist.length}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon purple">⭐</div>
                        <div className="stat-info">
                            <p className="stat-label">Reviews</p>
                            <p className="stat-value">{reviews.length}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon orange">👤</div>
                        <div className="stat-info">
                            <p className="stat-label">Account Type</p>
                            <p className="stat-value" style={{ fontSize: '1rem' }}>{user?.role || "GUEST"}</p>
                        </div>
                    </div>
                </div>

               

                {/* Recent Bookings Table */}
                <div className="table-card">
                    <div className="table-card-header">
                        <h5>📋 Recent Bookings</h5>
                        <Link to="/my-bookings" className="view-all-link">View All ({bookings.length}) →</Link>
                    </div>
                    <div className="table-wrap">
                        {bookings.length === 0 ? (
                            <div className="empty-state">No bookings available.</div>
                        ) : (
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>Booking Number</th>
                                        <th>PG</th>
                                        {/* <th>Room</th> */}
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.slice(0, 5).map((b) => (
                                        <tr key={b.bookingId}>
                                            <td className="booking-id">#{b.bookingNumber}</td>
                                            <td className="booking-pg">{b.pgName}</td>
                                            {/* <td>{b.roomId || "Standard"}</td> */}
                                            <td>
                                                <span className={`status-badge ${b.status === "CONFIRMED" ? "confirmed" :
                                                        b.status === "ACTIVE" ? "active" : 
                                                        b.status === "CANCELLED" ? "cancelled" : "pending"}`}>
                                                    <span className="dot"></span>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td>{b.bookingDate}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {/* Reviews & Wishlist Grid */}
                <div className="bottom-grid">
                    <div className="info-card">
                        <div className="info-card-header">
                            <h5>⭐ My Reviews</h5>
                            <Link to="/profile" className="view-all-link">View All →</Link>
                        </div>
                        <div className="info-card-body">
                            {reviews.length === 0 ? (
                                <div className="empty-state">No reviews yet.</div>
                            ) : (
                                reviews.slice(0, 5).map((review) => (
                                    <div key={review.reviewId} className="review-item">
                                        <div className="review-rating">⭐ {review.rating}/5</div>
                                        <p className="review-comment">"{review.comment}"</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="info-card">
                        <div className="info-card-header">
                            <h5>❤️ Wishlist</h5>
                            <Link to="/wishlist" className="view-all-link">View All →</Link>
                        </div>
                        <div className="info-card-body">
                            {wishlist.length === 0 ? (
                                <div className="empty-state">No wishlist items.</div>
                            ) : (
                                wishlist.slice(0, 5).map((item) => (
                                    <div key={item.wishlistId} className="wishlist-item">
                                        <div>
                                            <div className="wishlist-name">{item.pgName}</div>
                                            <div className="wishlist-city">📍 {item.city || "Bangalore"}</div>
                                        </div>
                                        <Link to={`/pg/${item.pgId || ""}`} className="wishlist-link">View →</Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default Dashboard;