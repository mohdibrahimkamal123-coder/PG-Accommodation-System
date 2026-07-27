// src/pages/admin/AdminUsers.jsx

import React, { useState, useEffect } from 'react';
import { 
    getAllUsers, 
    blockUser, 
    unblockUser, 
    deleteUser 
} from '../../services/adminService';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
            
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
        
    };

    const handleBlock = async (id) => {
        if (!confirm('Block this user?')) return;
        try {
            const res = await blockUser(id);
            setMessage(res);
            fetchUsers();
        } catch (error) {
            setMessage('Error blocking user');
        }
    };

    const handleUnblock = async (id) => {
        try {
            const res = await unblockUser(id);
            setMessage(res);
            fetchUsers();
        } catch (error) {
            setMessage('Error unblocking user');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this user permanently?')) return;
        try {
            const res = await deleteUser(id);
            setMessage(res);
            fetchUsers();
        } catch (error) {
            setMessage('Error deleting user');
        }
    };

    if (loading) return <div style={styles.loading}>Loading users...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>👤 Users Management</h2>
            
            {message && <div style={styles.alert}>{message}</div>}

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>
                                <span style={{
                                    ...styles.badge,
                                    background: user.blocked ? '#ea4335' : '#34a853'
                                }}>
                                    {user.blocked ? 'Blocked' : 'Active'}
                                </span>
                            </td>
                            <td>
                                <div style={styles.actions}>
                                    {user.blocked ? (
                                        <button 
                                            style={{...styles.btn, background: '#34a853'}}
                                            onClick={() => handleUnblock(user.userId)}
                                        >
                                            Unblock
                                        </button>
                                    ) : (
                                        <button 
                                            style={{...styles.btn, background: '#f9ab00'}}
                                            onClick={() => handleBlock(user.userId)}
                                        >
                                            Block
                                        </button>
                                    )}
                                    <button 
                                        style={{...styles.btn, background: '#ea4335'}}
                                        onClick={() => handleDelete(user.userId)}
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
    container: { padding: '20px' },
    header: { marginBottom: '20px', color: '#1a1a2e' },
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
    },
    actions: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
    },
    btn: {
        padding: '4px 12px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '12px',
    },
    alert: {
        padding: '10px 16px',
        background: '#e8f0fe',
        border: '1px solid #1a73e8',
        borderRadius: '6px',
        marginBottom: '16px',
        color: '#1a73e8',
    },
    loading: {
        padding: '40px',
        textAlign: 'center',
        color: '#666',
    },
};

export default AdminUsers;