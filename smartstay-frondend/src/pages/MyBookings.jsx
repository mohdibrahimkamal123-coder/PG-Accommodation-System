// src/pages/MyBookings.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import {
  getUserBookings,
  cancelBooking,
} from "../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings(user.userId);
      setBookings(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load bookings',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId, pgName) => {
    const result = await Swal.fire({
      title: 'Cancel Booking?',
      text: `Are you sure you want to cancel booking for ${pgName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Cancel!',
      cancelButtonText: 'No, Keep it',
    });

    if (result.isConfirmed) {
      try {
        await cancelBooking(bookingId);
        Swal.fire({
          icon: 'success',
          title: 'Cancelled!',
          text: 'Booking cancelled successfully',
          confirmButtonColor: '#6366f1',
          timer: 2000,
          timerProgressBar: true,
        });
        loadBookings();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data || 'Unable to cancel booking',
          confirmButtonColor: '#6366f1',
        });
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'PENDING': { class: 'pending', label: '⏳ Pending', color: '#f59e0b', bg: '#fef3c7' },
      'APPROVED': { class: 'approved', label: '✅ Approved', color: '#166534', bg: '#dcfce7' },
      'REJECTED': { class: 'rejected', label: '❌ Rejected', color: '#991b1b', bg: '#fee2e2' },
      'COMPLETED': { class: 'completed', label: '✓ Completed', color: '#3730a3', bg: '#e0e7ff' },
      'CANCELLED': { class: 'cancelled', label: '✕ Cancelled', color: '#991b1b', bg: '#fee2e2' }
    };
    return statusMap[status] || { class: 'pending', label: status, color: '#64748b', bg: '#f1f5f9' };
  };

  const filteredBookings = bookings.filter(booking => {
    const searchMatch = 
      booking.pgName?.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingNumber?.toLowerCase().includes(search.toLowerCase()) ||
      booking.city?.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'ALL') return searchMatch;
    return searchMatch && booking.status === filter;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'PENDING').length,
    approved: bookings.filter(b => b.status === 'APPROVED').length,
    completed: bookings.filter(b => b.status === 'COMPLETED').length,
    cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
  };

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .my-bookings-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
    }

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
    }

    .btn-primary-premium {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0f172a;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.88rem;
      padding: 12px 24px;
      border-radius: 30px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
      border: none;
      cursor: pointer;
    }

    .btn-primary-premium:hover {
      background: #1e293b;
      transform: translateY(-1px);
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 1024px) {
      .stats-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    @media (max-width: 640px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .stat-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 14px 18px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .stat-icon.blue { background: #dbeafe; }
    .stat-icon.yellow { background: #fef3c7; }
    .stat-icon.green { background: #dcfce7; }
    .stat-icon.purple { background: #e0e7ff; }
    .stat-icon.red { background: #fee2e2; }

    .stat-info {
      flex: 1;
    }

    .stat-label {
      font-size: 0.7rem;
      color: #64748b;
      font-weight: 600;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .stat-value {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }

    /* Search & Filter */
    .search-filter-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      align-items: center;
    }

    .search-box {
      flex: 1;
      min-width: 200px;
      position: relative;
    }

    .search-box input {
      width: 100%;
      padding: 12px 16px 12px 44px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 500;
      background: #ffffff;
      transition: all 0.2s ease;
      color: #0f172a;
      outline: none;
    }

    .search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .search-box .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 18px;
    }

    .filter-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-chip {
      padding: 8px 18px;
      border-radius: 30px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      color: #475569;
      font-weight: 700;
      font-size: 0.78rem;
      cursor: pointer;
      transition: all 0.2s ease;
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

    .filter-chip .count {
      background: rgba(255, 255, 255, 0.2);
      padding: 1px 8px;
      border-radius: 10px;
      font-size: 0.65rem;
      margin-left: 4px;
    }

    .filter-chip.active .count {
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
    }

    .table-card-badge {
      background: #eef2ff;
      color: #4f46e5;
      font-size: 0.7rem;
      font-weight: 700;
      padding: 2px 12px;
      border-radius: 12px;
    }

    .table-wrap {
      overflow-x: auto;
      padding: 0 24px 24px;
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

    .booking-number {
      font-weight: 700;
      color: #0f172a;
    }

    .pg-name-cell {
      font-weight: 600;
      color: #0f172a;
    }

    .pg-city {
      color: #94a3b8;
      font-size: 0.8rem;
    }

    .room-detail {
      color: #475569;
    }

    .rent-amount {
      font-weight: 700;
      color: #4f46e5;
    }

    /* Status Badge */
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.7rem;
      font-weight: 700;
    }

    .status-badge .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      display: inline-block;
    }

    .status-badge.pending { background: #fef3c7; color: #92400e; }
    .status-badge.pending .dot { background: #f59e0b; }

    .status-badge.approved { background: #dcfce7; color: #166534; }
    .status-badge.approved .dot { background: #22c55e; }

    .status-badge.rejected { background: #fee2e2; color: #991b1b; }
    .status-badge.rejected .dot { background: #ef4444; }

    .status-badge.completed { background: #e0e7ff; color: #3730a3; }
    .status-badge.completed .dot { background: #4f46e5; }

    .status-badge.cancelled { background: #fee2e2; color: #991b1b; }
    .status-badge.cancelled .dot { background: #ef4444; }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

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
    }

    .btn-action:hover {
      transform: scale(1.05);
    }

    .btn-action.cancel {
      background: #fee2e2;
      color: #991b1b;
    }

    .btn-action.cancel:hover {
      background: #fecaca;
    }

    .btn-action.closed {
      background: #f1f5f9;
      color: #94a3b8;
      cursor: not-allowed;
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
    }

    .empty-state-desc {
      color: #94a3b8;
      font-size: 0.95rem;
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
      .my-bookings-content {
        padding: 16px;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }

      .search-filter-section {
        flex-direction: column;
      }

      .filter-chips {
        width: 100%;
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 8px;
      }

      .filter-chip {
        white-space: nowrap;
        font-size: 0.7rem;
        padding: 6px 14px;
      }

      .table-card-header {
        flex-direction: column;
        gap: 12px;
        align-items: flex-start;
      }

      .action-buttons {
        flex-direction: column;
        gap: 4px;
      }

      .btn-action {
        justify-content: center;
        width: 100%;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  if (loading) {
    return (
      <UserLayout>
        <div className="my-bookings-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      
      <div className="my-bookings-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              My Bookings
              <span className="page-title-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              History
            </h1>
            <p className="page-subtitle">Manage and track all your booking requests</p>
          </div>
          <Link to="/find-pg" className="btn-primary-premium">
            + Find New PG
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon blue">📊</div>
            <div className="stat-info">
              <p className="stat-label">Total</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon yellow">⏳</div>
            <div className="stat-info">
              <p className="stat-label">Pending</p>
              <p className="stat-value">{stats.pending}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">✅</div>
            <div className="stat-info">
              <p className="stat-label">Approved</p>
              <p className="stat-value">{stats.approved}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon purple">✓</div>
            <div className="stat-info">
              <p className="stat-label">Completed</p>
              <p className="stat-value">{stats.completed}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">✕</div>
            <div className="stat-info">
              <p className="stat-label">Cancelled</p>
              <p className="stat-value">{stats.cancelled}</p>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by PG name, booking ID or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-chips">
            {['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                className={`filter-chip ${filter === status ? 'active' : ''}`}
                onClick={() => setFilter(status)}
              >
                {status === 'ALL' ? '📋 All' : status}
                <span className="count">
                  {status === 'ALL' ? stats.total : 
                   status === 'PENDING' ? stats.pending :
                   status === 'APPROVED' ? stats.approved :
                   status === 'COMPLETED' ? stats.completed :
                   stats.cancelled}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div className="table-card-header">
            <h4 className="table-card-title">
              📋 Booking List
              <span className="table-card-badge">{filteredBookings.length} Bookings</span>
            </h4>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <div className="empty-state-title">No Bookings Found</div>
              <div className="empty-state-desc">
                {search ? "Try adjusting your search" : "You haven't made any bookings yet"}
              </div>
              <Link to="/find-pg" className="btn-primary-premium" style={{ marginTop: '16px', display: 'inline-flex' }}>
                Find PG
              </Link>
            </div>
          ) : (
            <div className="table-wrap">
              <table className="premium-table">
                <thead>
                  <tr>
                    <th>Booking No.</th>
                    <th>PG</th>
                    <th>Room</th>
                    <th>Move-In</th>
                    <th>Stay</th>
                    <th>Rent</th>
                    <th>Status</th>
                    <th>Booking Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => {
                    const statusInfo = getStatusBadge(booking.status);
                    return (
                      <tr key={booking.bookingId}>
                        <td className="booking-number">#{booking.bookingNumber}</td>
                        <td>
                          <div className="pg-name-cell">{booking.pgName}</div>
                          <div className="pg-city">📍 {booking.city || "N/A"}</div>
                        </td>
                        <td>
                          <div className="room-detail">{booking.roomNumber || "Standard"}</div>
                          <div className="pg-city">{booking.roomType || ""}</div>
                        </td>
                        <td>
                          {booking.moveInDate
                            ? new Date(booking.moveInDate).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{booking.expectedStayMonths || 0} Month(s)</td>
                        <td className="rent-amount">₹{booking.rent}</td>
                        <td>
                          <span className={`status-badge ${statusInfo.class}`}>
                            <span className="dot"></span>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {(booking.status === "PENDING" || booking.status === "APPROVED") ? (
                              <button
                                className="btn-action cancel"
                                onClick={() => handleCancel(booking.bookingId, booking.pgName)}
                              >
                                ✕ Cancel
                              </button>
                            ) : (
                              <button className="btn-action closed" disabled>
                                Closed
                              </button>
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
    </UserLayout>
  );
};

export default MyBookings;