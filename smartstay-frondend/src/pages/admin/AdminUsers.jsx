// src/pages/admin/AdminUsers.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { 
    getAllUsers, 
    blockUser, 
    unblockUser, 
    deleteUser 
} from '../../services/adminService';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to load users',
                confirmButtonColor: '#6366f1',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = async (id, userName) => {
        const result = await Swal.fire({
            title: 'Block User?',
            text: `Are you sure you want to block ${userName}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Block!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const res = await blockUser(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Blocked!',
                    text: res || 'User blocked successfully',
                    confirmButtonColor: '#6366f1',
                    timer: 2000,
                    timerProgressBar: true,
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data || 'Error blocking user',
                    confirmButtonColor: '#6366f1',
                });
            }
        }
    };

    const handleUnblock = async (id, userName) => {
        const result = await Swal.fire({
            title: 'Unblock User?',
            text: `Are you sure you want to unblock ${userName}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Unblock!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const res = await unblockUser(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Unblocked!',
                    text: res || 'User unblocked successfully',
                    confirmButtonColor: '#6366f1',
                    timer: 2000,
                    timerProgressBar: true,
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data || 'Error unblocking user',
                    confirmButtonColor: '#6366f1',
                });
            }
        }
    };

    const handleDelete = async (id, userName) => {
        const result = await Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to permanently delete ${userName}? This action cannot be undone!`,
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Delete!',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            try {
                const res = await deleteUser(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: res || 'User deleted successfully',
                    confirmButtonColor: '#6366f1',
                    timer: 2000,
                    timerProgressBar: true,
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response?.data || 'Error deleting user',
                    confirmButtonColor: '#6366f1',
                });
            }
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );

    const totalUsers = users.length;
    const activeUsers = users.filter(u => !u.blocked).length;
    const blockedUsers = users.filter(u => u.blocked).length;

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
                        Users
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#d9f99d', borderRadius: '50%', margin: '0 6px', verticalAlign: 'middle' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        Management
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500, marginTop: '4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Manage all registered users on the platform</p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { icon: '👤', label: 'Total Users', value: totalUsers, bg: '#dbeafe' },
                    { icon: '✅', label: 'Active', value: activeUsers, bg: '#dcfce7' },
                    { icon: '🚫', label: 'Blocked', value: blockedUsers, bg: '#fee2e2' }
                ].map((stat, index) => (
                    <div key={index} style={{ background: '#ffffff', borderRadius: '16px', padding: '16px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{stat.icon}</div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, margin: 0, textTransform: 'uppercase', letterSpacing: '0.03em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.label}</p>
                            <p style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: '18px' }}>🔍</span>
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ 
                        width: '100%', 
                        maxWidth: '400px', 
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

            {/* Table */}
            <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04)', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        📋 User List
                        <span style={{ background: '#eef2ff', color: '#4f46e5', fontSize: '0.7rem', fontWeight: 700, padding: '2px 12px', borderRadius: '12px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{filteredUsers.length} Users</span>
                    </h4>
                </div>

                {filteredUsers.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👤</div>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No Users Found</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.95rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{search ? "Try adjusting your search" : "No users registered yet"}</div>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto', padding: '0 24px 24px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>ID</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Name</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Email</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Status</th>
                                    <th style={{ padding: '16px 12px', fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '2px solid #f1f5f9', textAlign: 'left', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.userId} style={{ transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 700, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>#{user.userId}</td>
                                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', fontWeight: 700, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user.fullName}</td>
                                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle', color: '#475569', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{user.email}</td>
                                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' }}>
                                            <span style={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center', 
                                                gap: '6px', 
                                                padding: '4px 14px', 
                                                borderRadius: '20px', 
                                                fontSize: '0.7rem', 
                                                fontWeight: 700, 
                                                background: user.blocked ? '#fee2e2' : '#dcfce7', 
                                                color: user.blocked ? '#991b1b' : '#166534',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                                            }}>
                                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', display: 'inline-block', background: user.blocked ? '#ef4444' : '#22c55e' }}></span>
                                                {user.blocked ? 'Blocked' : 'Active'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 12px', borderBottom: '1px solid #f8fafc', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                                {user.blocked ? (
                                                    <button 
                                                        onClick={() => handleUnblock(user.userId, user.fullName)} 
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
                                                            background: '#dcfce7', 
                                                            color: '#166534',
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#bbf7d0'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#dcfce7'; }}
                                                    >
                                                        🔓 Unblock
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => handleBlock(user.userId, user.fullName)} 
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
                                                            background: '#fef3c7', 
                                                            color: '#92400e',
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = '#fde68a'; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = '#fef3c7'; }}
                                                    >
                                                        🔒 Block
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(user.userId, user.fullName)} 
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
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminUsers;