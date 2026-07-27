// src/pages/admin/AdminBookings.jsx

import React, { useState, useEffect } from 'react';
import { getAllBookings, deleteBooking } from '../../services/adminService';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const data = await getAllBookings();
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this booking?')) return;
        await deleteBooking(id);
        fetchBookings();
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>📅 Bookings Management</h2>
            <table style={styles.table}>
                <thead><tr>
                    <th>ID</th><th>User</th><th>PG</th><th>Check In</th><th>Check Out</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking.id}>
                            <td>{booking.id}</td>
                            <td>{booking.userName || 'N/A'}</td>
                            <td>{booking.pgName || 'N/A'}</td>
                            <td>{booking.checkIn}</td>
                            <td>{booking.checkOut}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: booking.status === 'confirmed' ? '#34a853' : 
                                               booking.status === 'pending' ? '#f9ab00' : '#ea4335'
                                }}>
                                    {booking.status}
                                </span>
                            </td>
                            <td>
                                <button style={{...styles.btn, background: '#ea4335'}} onClick={() => handleDelete(booking.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    th: { background: '#f8f9fa', padding: '12px 16px', textAlign: 'left' },
    td: { padding: '12px 16px', borderBottom: '1px solid #e8ecf1' },
    badge: { padding: '4px 12px', borderRadius: '12px', color: '#fff', fontSize: '12px' },
    btn: { padding: '4px 12px', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '12px' },
};

export default AdminBookings;