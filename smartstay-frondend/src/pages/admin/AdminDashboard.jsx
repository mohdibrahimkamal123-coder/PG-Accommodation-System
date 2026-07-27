// src/pages/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { getDashboard, getStatistics } from '../../services/adminService';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [dashboard, statistics] = await Promise.all([
                getDashboard(),
                getStatistics()
            ]);
            setDashboardData(dashboard);
            setStats(statistics);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📊 Dashboard</h2>
            
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <h3>Total Users</h3>
                    <p style={styles.statNumber}>{stats?.totalUsers || 0}</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Total Owners</h3>
                    <p style={styles.statNumber}>{stats?.totalOwners || 0}</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Total PGs</h3>
                    <p style={styles.statNumber}>{stats?.totalPgs || 0}</p>
                </div>
                <div style={styles.statCard}>
                    <h3>Total Bookings</h3>
                    <p style={styles.statNumber}>{stats?.totalBookings || 0}</p>
                </div>
            </div>

            <div style={styles.recentSection}>
                <h3>Recent Activity</h3>
                <pre style={styles.jsonBox}>
                    {JSON.stringify(dashboardData, null, 2)}
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px' },
    header: { marginBottom: '20px', color: '#1a1a2e' },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
    },
    statCard: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        textAlign: 'center',
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#1a73e8',
        marginTop: '8px',
    },
    recentSection: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    jsonBox: {
        background: '#f8f9fa',
        padding: '16px',
        borderRadius: '6px',
        fontSize: '13px',
        overflow: 'auto',
        maxHeight: '400px',
    },
    loading: {
        padding: '40px',
        textAlign: 'center',
        fontSize: '18px',
        color: '#666',
    },
};

export default AdminDashboard;