import React, { useState, useEffect } from 'react';
import { getAllPgs, approvePg, rejectPg, deletePg } from '../../services/adminService';

const AdminPgs = () => {
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPgs();
    }, []);

    const fetchPgs = async () => {
        try {
            const data = await getAllPgs();
            setPgs(data);
        } catch (error) {
            console.error('Error fetching PGs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        if (!confirm('Approve this PG?')) return;
        try {
            await approvePg(id);
            fetchPgs();
        } catch (error) {
            alert('Error approving PG');
        }
    };

    const handleReject = async (id) => {
        if (!confirm('Reject this PG?')) return;
        try {
            await rejectPg(id);
            fetchPgs();
        } catch (error) {
            alert('Error rejecting PG');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this PG permanently?')) return;
        try {
            await deletePg(id);
            fetchPgs();
        } catch (error) {
            alert('Error deleting PG');
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading PGs...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#1a1a2e' }}>🏠 PG Management</h2>
            
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Location</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pgs.map(pg => (
                        <tr key={pg.id}>
                            <td>{pg.pgId}</td>
<td>{pg.pgName}</td>
<td>{pg.ownerId}</td>   {/* Later owner name fetch kar lenge */}
<td>{pg.city}, {pg.address}</td>
<td>₹{pg.rentStarting}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: pg.approved ? '#34a853' : '#f9ab00'
                                }}>
                                    {pg.approved ? 'Approved' : 'Pending'}
                                </span>
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    {!pg.approved && (
                                        <>
                                            <button 
                                                style={{...styles.btn, background: '#34a853'}} 
                                                onClick={() => handleApprove(pg.pgId)}
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                style={{...styles.btn, background: '#ea4335'}} 
                                                onClick={() => handleReject(pg.pgId)}
                                            >
                                                Reject
                                            </button>
                                        </>
                                    )}
                                    <button 
                                        style={{...styles.btn, background: '#ea4335'}} 
                                        onClick={() => handleDelete(pg.pgId)}
                                    >
                                        Delete
                                    </button>
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
    th: {
        background: '#f8f9fa',
        padding: '12px 16px',
        textAlign: 'left',
        borderBottom: '2px solid #e8ecf1',
        fontWeight: '600',
    },
    td: {
        padding: '12px 16px',
        borderBottom: '1px solid #e8ecf1',
    },
    badge: {
        padding: '4px 12px',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '12px',
        fontWeight: '600',
    },
    btn: {
        padding: '4px 12px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
        transition: 'opacity 0.2s',
    },
};

export default AdminPgs;