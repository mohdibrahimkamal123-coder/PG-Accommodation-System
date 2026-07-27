// src/pages/admin/AdminOwners.jsx

import React, { useState, useEffect } from 'react';
import { getAllOwners, approveOwner, rejectOwner, deleteOwner } from '../../services/adminService';

const AdminOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            const data = await getAllOwners();
            setOwners(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!confirm('Approve this owner?')) return;
        await approveOwner(id);
        fetchOwners();
    };

    const handleReject = async (id) => {
        if (!confirm('Reject this owner?')) return;
        await rejectOwner(id);
        fetchOwners();
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this owner?')) return;
        await deleteOwner(id);
        fetchOwners();
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>🏢 Owners Management</h2>
            <table style={styles.table}>
                <thead><tr>
                    <th>ID</th><th>Name</th><th>Email</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                    {owners.map(owner => (
                        <tr key={owner.ownerId}>
                            <td>{owner.ownerId}</td>
                            <td>{owner.fullName}</td>
                            <td>{owner.email}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: owner.approved ? '#34a853' : '#f9ab00'
                                }}>
                                    {owner.approved ? 'Approved' : 'Pending'}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    {!owner.approved && (
                                        <>
                                            <button style={{...styles.btn, background: '#34a853'}} onClick={() => handleApprove(owner.ownerId)}>Approve</button>
                                            <button style={{...styles.btn, background: '#ea4335'}} onClick={() => handleReject(owner.ownerId)}>Reject</button>
                                        </>
                                    )}
                                    <button style={{...styles.btn, background: '#ea4335'}} onClick={() => handleDelete(owner.ownerId)}>Delete</button>
                                </div>
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

export default AdminOwners;