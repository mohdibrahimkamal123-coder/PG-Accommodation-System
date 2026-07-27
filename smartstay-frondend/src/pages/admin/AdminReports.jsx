import React, { useState, useEffect } from 'react';
import { getReports, getRevenue, exportData } from '../../services/adminService';

const AdminReports = () => {
    const [reports, setReports] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [reportData, revenueData] = await Promise.all([
                getReports(),
                getRevenue()
            ]);
            setReports(reportData);
            setRevenue(revenueData);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportData();
            alert('Export data: ' + JSON.stringify(data, null, 2));
        } catch (error) {
            alert('Export failed');
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading reports...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📈 Reports & Analytics</h2>
            
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <h4 style={styles.statLabel}>Total Revenue</h4>
                   <p style={styles.statValue}>
    ₹{revenue?.totalRevenue || 0}
</p>
                </div>
                <div style={styles.statCard}>
                    <h4 style={styles.statLabel}>Total Bookings</h4>
                   <p style={styles.statValue}>
    {reports?.totalBookings || 0}
</p>
                </div>
                <div style={styles.statCard}>
                    <h4 style={styles.statLabel}>Total Users</h4>
                    <p style={styles.statValue}>
    {reports?.totalUsers || 0}
</p>
                </div>
                <div style={styles.statCard}>
                    <h4 style={styles.statLabel}>Total PGs</h4>
                   <p style={styles.statValue}>
    {reports?.totalPgs || 0}
</p>
                </div>
            </div>

            <div style={styles.reportSection}>
                <div style={styles.reportHeader}>
                    <h3>📋 Detailed Reports</h3>
                    <button style={styles.exportBtn} onClick={handleExport}>
                        📥 Export Data
                    </button>
                </div>
                <pre style={styles.jsonBox}>
                    {JSON.stringify(reports, null, 2)}
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
    },
    header: {
        color: '#1a1a2e',
        marginBottom: '24px',
    },
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
    statLabel: {
        color: '#666',
        fontSize: '14px',
        marginBottom: '8px',
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#1a73e8',
    },
    reportSection: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    },
    reportHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '10px',
    },
    exportBtn: {
        padding: '8px 20px',
        background: '#34a853',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    jsonBox: {
        background: '#f8f9fa',
        padding: '16px',
        borderRadius: '6px',
        fontSize: '13px',
        overflow: 'auto',
        maxHeight: '400px',
        fontFamily: 'monospace',
    },
};

export default AdminReports;  // ⬅️ YEH IMPORTANT HAI