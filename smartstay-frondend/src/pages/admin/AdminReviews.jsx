// src/pages/admin/AdminReviews.jsx

import React, { useState, useEffect } from 'react';
import { getAllReviews, deleteReview } from '../../services/adminService';

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const data = await getAllReviews();
            setReviews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this review?')) return;
        await deleteReview(id);
        fetchReviews();
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>⭐ Reviews Management</h2>
            <table style={styles.table}>
                <thead><tr>
                    <th>ID</th><th>User</th><th>PG</th><th>Rating</th><th>Comment</th><th>Actions</th>
                </tr></thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.reviewId}>
                            <td>{review.reviewId}</td>
                            <td>{review.userName || 'N/A'}</td>
                            <td>{review.pgName || 'N/A'}</td>
                            <td>⭐ {review.rating}</td>
                            <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {review.comment}
                            </td>
                            <td>
                                <button style={{...styles.btn, background: '#ea4335'}} onClick={() => handleDelete(review.reviewId)}>Delete</button>
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
    btn: { padding: '4px 12px', border: 'none', borderRadius: '4px', color: '#fff', cursor: 'pointer', fontSize: '12px' },
};

export default AdminReviews;