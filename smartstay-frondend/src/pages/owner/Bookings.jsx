import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
    getBookings,
    approveBooking,
    rejectBooking,
    completeBooking
} from "../../services/ownerService";

const Bookings = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        loadBookings();
    }, []);

    const loadBookings = async () => {
        try {
            const response = await getBookings(owner.ownerId);
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (window.confirm("Approve this booking?")) {
            try {
                await approveBooking(id);
                alert("Booking Approved Successfully");
                loadBookings();
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        }
    };

    const handleReject = async (id) => {
        if (window.confirm("Reject this booking?")) {
            try {
                await rejectBooking(id);
                alert("Booking Rejected");
                loadBookings();
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        }
    };

    const handleComplete = async (id) => {
        if (window.confirm("Mark this booking as completed?")) {
            try {
                await completeBooking(id);
                alert("Booking Completed");
                loadBookings();
            } catch (error) {
                console.log(error);
                alert("Something went wrong");
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            "PENDING": { class: "pending", label: "⏳ Pending" },
            "APPROVED": { class: "approved", label: "✅ Approved" },
            "REJECTED": { class: "rejected", label: "❌ Rejected" },
            "COMPLETED": { class: "completed", label: "✓ Completed" }
        };
        return statusMap[status] || { class: "pending", label: status };
    };

    const filteredBookings = filter === "ALL" 
        ? bookings 
        : bookings.filter(b => b.status === filter);

    const stats = {
        total: bookings.length,
        pending: bookings.filter(b => b.status === "PENDING").length,
        approved: bookings.filter(b => b.status === "APPROVED").length,
        completed: bookings.filter(b => b.status === "COMPLETED").length,
        rejected: bookings.filter(b => b.status === "REJECTED").length
    };

    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .bookings-wrapper {
            display: flex;
            min-height: 100vh;
            background: #eef2f6;
        }

        .bookings-main {
            flex: 1;
            margin-left: 240px;
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
        }

        /* Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #0f172a;
            margin: 0;
            line-height: 1.15;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .page-title-pill {
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

        .page-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Stats Cards */
        .stats-mini-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }

        @media (max-width: 1024px) {
            .stats-mini-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }

        @media (max-width: 640px) {
            .stats-mini-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }

        .stat-mini-card {
            background: #ffffff;
            border-radius: 16px;
            padding: 16px 20px;
            border: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 14px;
            transition: all 0.2s ease;
        }

        .stat-mini-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
        }

        .stat-mini-icon {
            width: 42px;
            height: 42px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            flex-shrink: 0;
        }

        .stat-mini-icon.blue { background: #dbeafe; }
        .stat-mini-icon.yellow { background: #fef3c7; }
        .stat-mini-icon.green { background: #dcfce7; }
        .stat-mini-icon.purple { background: #eef2ff; }
        .stat-mini-icon.red { background: #fee2e2; }

        .stat-mini-info {
            flex: 1;
        }

        .stat-mini-label {
            font-size: 0.7rem;
            color: #64748b;
            font-weight: 600;
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        .stat-mini-value {
            font-size: 1.4rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            line-height: 1.2;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Filter Chips */
        .filter-chips {
            display: flex;
            gap: 10px;
            margin-bottom: 24px;
            flex-wrap: wrap;
        }

        .filter-chip {
            padding: 8px 20px;
            border-radius: 30px;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #475569;
            font-weight: 700;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .filter-chip:hover {
            background: #f8fafc;
            border-color: #cbd5e1;
        }

        .filter-chip.active {
            background: #0f172a;
            color: #ffffff;
            border-color: #0f172a;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
        }

        .filter-chip .badge-count {
            background: rgba(255, 255, 255, 0.2);
            padding: 1px 8px;
            border-radius: 10px;
            font-size: 0.65rem;
            margin-left: 4px;
        }

        .filter-chip.active .badge-count {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Table Card */
        .table-card {
            background: #ffffff;
            border-radius: 24px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
            overflow: hidden;
        }

        .table-card-header {
            padding: 20px 24px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-card-title {
            font-size: 1.1rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-card-badge {
            background: #eef2ff;
            color: #4f46e5;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 12px;
            border-radius: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .table-wrap {
            overflow-x: auto;
            padding: 0 24px 24px;
        }

        .premium-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table thead th {
            padding: 16px 12px;
            font-size: 0.7rem;
            font-weight: 800;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid #f1f5f9;
            text-align: left;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody td {
            padding: 16px 12px;
            color: #334155;
            font-weight: 600;
            border-bottom: 1px solid #f8fafc;
            vertical-align: middle;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .premium-table tbody tr:hover {
            background: #f8fafc;
        }

        .premium-table tbody tr:last-child td {
            border-bottom: none;
        }

        .booking-id-cell {
            font-weight: 700;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .booking-user-cell {
            font-weight: 600;
            color: #0f172a;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .booking-pg-cell {
            font-weight: 600;
            color: #475569;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .booking-rent-cell {
            font-weight: 700;
            color: #4f46e5;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Status Badges */
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .status-badge.pending {
            background: #fef3c7;
            color: #92400e;
        }

        .status-badge.approved {
            background: #dcfce7;
            color: #166534;
        }

        .status-badge.rejected {
            background: #fee2e2;
            color: #991b1b;
        }

        .status-badge.completed {
            background: #e0e7ff;
            color: #3730a3;
        }

        /* Action Buttons */
        .btn-action {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            border-radius: 8px;
            font-size: 0.75rem;
            font-weight: 700;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-action.approve {
            background: #dcfce7;
            color: #166534;
        }

        .btn-action.approve:hover {
            background: #bbf7d0;
            transform: scale(1.05);
        }

        .btn-action.reject {
            background: #fee2e2;
            color: #991b1b;
        }

        .btn-action.reject:hover {
            background: #fecaca;
            transform: scale(1.05);
        }

        .btn-action.complete {
            background: #e0e7ff;
            color: #3730a3;
        }

        .btn-action.complete:hover {
            background: #c7d2fe;
            transform: scale(1.05);
        }

        .action-buttons {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
        }

        /* Empty State */
        .empty-state {
            text-align: center;
            padding: 60px 20px;
        }

        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }

        .empty-state-title {
            font-size: 1.3rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 8px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .empty-state-desc {
            color: #94a3b8;
            font-size: 0.95rem;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Loading */
        .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .bookings-main {
                margin-left: 0;
                padding: 16px;
            }

            .page-title {
                font-size: 1.5rem;
            }

            .stats-mini-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .table-card-header {
                flex-direction: column;
                gap: 12px;
                align-items: flex-start;
            }

            .action-buttons {
                flex-direction: column;
                gap: 6px;
            }

            .btn-action {
                justify-content: center;
                width: 100%;
            }

            .filter-chips {
                gap: 6px;
            }

            .filter-chip {
                font-size: 0.7rem;
                padding: 6px 14px;
            }
        }

        @media (max-width: 480px) {
            .stats-mini-grid {
                grid-template-columns: 1fr 1fr;
            }
        }
    `;

    if (loading) {
        return (
            <div className="bookings-wrapper">
                <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
                <OwnerSidebar />
                <div className="bookings-main">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bookings-wrapper">
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <OwnerSidebar />

            <div className="bookings-main">
                {/* Header */}
                <div className="page-header">
                    <div>
                        <h1 className="page-title">
                            Bookings
                            <span className="page-title-pill">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            Management
                        </h1>
                        <p className="page-subtitle">Track and manage all your booking requests</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="stats-mini-grid">
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon blue">📊</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Total Bookings</p>
                            <p className="stat-mini-value">{stats.total}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon yellow">⏳</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Pending</p>
                            <p className="stat-mini-value">{stats.pending}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon green">✅</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Approved</p>
                            <p className="stat-mini-value">{stats.approved}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon purple">✓</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Completed</p>
                            <p className="stat-mini-value">{stats.completed}</p>
                        </div>
                    </div>
                    <div className="stat-mini-card">
                        <div className="stat-mini-icon red">✕</div>
                        <div className="stat-mini-info">
                            <p className="stat-mini-label">Rejected</p>
                            <p className="stat-mini-value">{stats.rejected}</p>
                        </div>
                    </div>
                </div>

                {/* Filter Chips */}
                <div className="filter-chips">
                    <button 
                        className={`filter-chip ${filter === "ALL" ? "active" : ""}`}
                        onClick={() => setFilter("ALL")}
                    >
                        All 
                        <span className="badge-count">{stats.total}</span>
                    </button>
                    <button 
                        className={`filter-chip ${filter === "PENDING" ? "active" : ""}`}
                        onClick={() => setFilter("PENDING")}
                    >
                        ⏳ Pending
                        <span className="badge-count">{stats.pending}</span>
                    </button>
                    <button 
                        className={`filter-chip ${filter === "APPROVED" ? "active" : ""}`}
                        onClick={() => setFilter("APPROVED")}
                    >
                        ✅ Approved
                        <span className="badge-count">{stats.approved}</span>
                    </button>
                    <button 
                        className={`filter-chip ${filter === "COMPLETED" ? "active" : ""}`}
                        onClick={() => setFilter("COMPLETED")}
                    >
                        ✓ Completed
                        <span className="badge-count">{stats.completed}</span>
                    </button>
                    <button 
                        className={`filter-chip ${filter === "REJECTED" ? "active" : ""}`}
                        onClick={() => setFilter("REJECTED")}
                    >
                        ❌ Rejected
                        <span className="badge-count">{stats.rejected}</span>
                    </button>
                </div>

                {/* Table */}
                <div className="table-card">
                    <div className="table-card-header">
                        <h4 className="table-card-title">
                            📋 Booking List
                            <span className="table-card-badge">
                                {filteredBookings.length} {filter === "ALL" ? "Total" : filter.toLowerCase()}
                            </span>
                        </h4>
                    </div>

                    {filteredBookings.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state-icon">📅</div>
                            <div className="empty-state-title">No Bookings Found</div>
                            <div className="empty-state-desc">
                                {filter === "ALL" 
                                    ? "No bookings have been made yet" 
                                    : `No ${filter.toLowerCase()} bookings found`}
                            </div>
                        </div>
                    ) : (
                        <div className="table-wrap">
                            <table className="premium-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>PG</th>
                                        <th>Room</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBookings.map((booking) => {
                                        const statusInfo = getStatusBadge(booking.status);
                                        return (
                                            <tr key={booking.bookingId}>
                                                <td className="booking-id-cell">#{booking.bookingId}</td>
                                                <td className="booking-user-cell">{booking.userName}</td>
                                                <td className="booking-pg-cell">{booking.pgName}</td>
                                                <td>Room #{booking.roomId}</td>
                                                <td>{booking.bookingDate}</td>
                                                <td>
                                                    <span className={`status-badge ${statusInfo.class}`}>
                                                        {statusInfo.label}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        {booking.status === "PENDING" && (
                                                            <>
                                                                <button
                                                                    className="btn-action approve"
                                                                    onClick={() => handleApprove(booking.bookingId)}
                                                                >
                                                                    ✅ Approve
                                                                </button>
                                                                <button
                                                                    className="btn-action reject"
                                                                    onClick={() => handleReject(booking.bookingId)}
                                                                >
                                                                    ❌ Reject
                                                                </button>
                                                            </>
                                                        )}
                                                        {booking.status === "APPROVED" && (
                                                            <button
                                                                className="btn-action complete"
                                                                onClick={() => handleComplete(booking.bookingId)}
                                                            >
                                                                ✓ Complete
                                                            </button>
                                                        )}
                                                        {booking.status === "COMPLETED" && (
                                                            <span style={{ 
                                                                fontSize: "0.75rem", 
                                                                color: "#94a3b8",
                                                                fontWeight: 600,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                                                            }}>
                                                                ✓ Done
                                                            </span>
                                                        )}
                                                        {booking.status === "REJECTED" && (
                                                            <span style={{ 
                                                                fontSize: "0.75rem", 
                                                                color: "#94a3b8",
                                                                fontWeight: 600,
                                                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                                                            }}>
                                                                ✕ Rejected
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;