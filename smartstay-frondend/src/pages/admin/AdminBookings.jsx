// src/pages/admin/AdminBookings.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
<<<<<<< HEAD
import { getAllBookings, deleteBooking} from '../../services/adminService';
=======
import { getAllBookings, deleteBooking } from '../../services/adminService';
>>>>>>> 3a35031 (push)

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data);
        } catch (error) {
            console.error(error);
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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Booking?',
            text: "Are you sure you want to delete this booking? This action cannot be undone!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                await deleteBooking(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: 'Booking deleted successfully 🗑️',
                    confirmButtonColor: '#6366f1',
                    timer: 2000,
                    timerProgressBar: true,
                });
                fetchBookings();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data || 'Error deleting booking',
                    confirmButtonColor: '#6366f1',
                });
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusMap = {
            'confirmed': { bg: '#dcfce7', color: '#166534', label: '✅ Confirmed' },
            'pending': { bg: '#fef3c7', color: '#92400e', label: '⏳ Pending' },
            'rejected': { bg: '#fee2e2', color: '#991b1b', label: '❌ Rejected' },
            'completed': { bg: '#e0e7ff', color: '#3730a3', label: '✓ Completed' }
        };
        return statusMap[status?.toLowerCase()] || { bg: '#f1f5f9', color: '#64748b', label: status || 'N/A' };
    };

    const filteredBookings = bookings.filter(booking => {
        const searchMatch = 
            booking.userName?.toLowerCase().includes(search.toLowerCase()) ||
            booking.pgName?.toLowerCase().includes(search.toLowerCase()) ||
<<<<<<< HEAD
            booking.bookingId?.toString().includes(search);
=======
            booking.id?.toString().includes(search);
>>>>>>> 3a35031 (push)
        
        if (filter === 'ALL') return searchMatch;
        return searchMatch && booking.status?.toLowerCase() === filter.toLowerCase();
    });

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status?.toLowerCase() === 'confirmed').length;
    const pendingBookings = bookings.filter(b => b.status?.toLowerCase() === 'pending').length;
    const rejectedBookings = bookings.filter(b => b.status?.toLowerCase() === 'rejected').length;
    const completedBookings = bookings.filter(b => b.status?.toLowerCase() === 'completed').length;

    if (loading) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTop: '4px solid #6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ padding: '25px 30px', background: '#eef2f6', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0f172a', margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Bookings
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#d9f99d', borderRadius: '50%', margin: '0 6px', verticalAlign: 'middle' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        Management
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500, marginTop: '4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage all booking requests on the platform</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { icon: '📊', label: 'Total', value: totalBookings, bg: '#dbeafe' },
                    { icon: '✅', label: 'Confirmed', value: confirmedBookings, bg: '#dcfce7' },
                    { icon: '⏳', label: 'Pending', value: pendingBookings, bg: '#fef3c7' },
                    { icon: '❌', label: 'Rejected', value: rejectedBookings, bg: '#fee2e2' },
                    { icon: '✓', label: 'Completed', value: completedBookings, bg: '#e0e7ff' }
                ].map((stat, index) => (
                    <div key={index} style={{ background: '#ffffff', borderRadius: '16px', padding: '14px 16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{stat.icon}</div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.label}</p>
                            <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search by user, PG or ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ 
                            width: '100%', 
                            padding: '12px 16px 12px 44px', 
                            border: '1px solid #e2e8f0', 
                            borderRadius: '14px', 
                            fontSize: '0.9rem', 
                            fontWeight: 500, 
                            background: '#ffffff', 
                            fontFamily: "'Plus Jakarta Sans', sans-serif", 
                            color: '#0f172a',
                            outline: 'none',
                            transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 4px rgba(99,102,241,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['ALL', 'CONFIRMED', 'PENDING', 'REJECTED', 'COMPLETED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '30px',
                                border: filter === status ? '1px solid #0f172a' : '1px solid #e2e8f0',
                                background: filter === status ? '#0f172a' : '#ffffff',
                                color: filter === status ? '#ffffff' : '#475569',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                                cursor: 'pointer',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {status === 'ALL' ? '📋 All' : status}
                            {filter === status && (
                                <span style={{ marginLeft: '6px', fontSize: '0.6rem' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        📋 Booking List
                        <span style={{ background: '#eef2ff', color: '#4f46e5', fontSize: '0.7rem', fontWeight: 700, padding: '2px 12px', borderRadius: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{filteredBookings.length} Bookings</span>
                    </h4>
                </div>

                {filteredBookings.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📅</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No Bookings Found</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {search ? "Try adjusting your search" : "No bookings made yet"}
                        </div>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', padding: '0 24px 24px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr>
<<<<<<< HEAD
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>BOOKING ID</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>User</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PG</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Check In</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Months</th>
=======
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ID</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>User</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>PG</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Check In</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Check Out</th>
>>>>>>> 3a35031 (push)
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Status</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => {
                                    const statusInfo = getStatusBadge(booking.status);
                                    return (
<<<<<<< HEAD
                                        <tr key={booking.bookingId} style={{ transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 700, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>#{booking.bookingNumber}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 600, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.userName || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.pgName || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.moveInDate || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.expectedStayMonths || 'N/A'}</td>
=======
                                        <tr key={booking.id} style={{ transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 700, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>#{booking.id}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 600, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.userName || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.pgName || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.checkIn || 'N/A'}</td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{booking.checkOut || 'N/A'}</td>
>>>>>>> 3a35031 (push)
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' }}>
                                                <span style={{ 
                                                    display: 'inline-flex', 
                                                    alignItems: 'center', 
                                                    gap: '6px', 
                                                    padding: '4px 14px', 
                                                    borderRadius: '20px', 
                                                    fontSize: '0.7rem', 
                                                    fontWeight: 700, 
                                                    background: statusInfo.bg, 
                                                    color: statusInfo.color,
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                                                }}>
                                                    {statusInfo.label}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' }}>
                                                <button 
<<<<<<< HEAD
                                                    onClick={() => handleDelete(booking.bookingId)} 
=======
                                                    onClick={() => handleDelete(booking.id)} 
>>>>>>> 3a35031 (push)
                                                    style={{ 
                                                        display: 'inline-flex', 
                                                        alignItems: 'center', 
                                                        gap: '6px', 
                                                        padding: '6px 14px', 
                                                        borderRadius: '8px', 
                                                        fontSize: '0.75rem', 
                                                        fontWeight: 700, 
                                                        border: 'none', 
                                                        cursor: 'pointer', 
                                                        background: '#fee2e2', 
                                                        color: '#991b1b',
                                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#fecaca'; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#fee2e2'; }}
                                                >
                                                    🗑️ Delete
                                                </button>
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
    );
};

export default AdminBookings;