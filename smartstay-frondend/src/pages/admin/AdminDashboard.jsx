// src/pages/admin/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import { getDashboard, getStatistics } from '../../services/adminService';

// Custom SVG Icons (Zero External Dependencies)
const UsersIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const UserCheckIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="8.5" cy="7" r="4"/>
        <polyline points="17 11 19 13 23 9"/>
    </svg>
);

const BuildingIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
        <path d="M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2"/>
        <path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
    </svg>
);

const CalendarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <polyline points="9 16 11 18 15 14"/>
    </svg>
);

const TrendingUpIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
        <polyline points="17 6 23 6 23 12"/>
    </svg>
);

const ActivityIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
);

const LayersIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
    </svg>
);

const ClockIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="m9 12 2 2 4-4"/>
    </svg>
);

// Pure Custom Bar Chart Component
const PureBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.count), 1);
    return (
        <div style={{ width: '100%', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '20px', paddingBottom: '16px', borderBottom: '1.5px solid #e2e8f0' }}>
                {data.map((item, idx) => {
                    const heightPercent = Math.max(12, Math.round((item.count / maxVal) * 100));
                    return (
                        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                                {item.count}
                            </span>
                            <div 
                                style={{ 
                                    width: '100%', 
                                    maxWidth: '44px', 
                                    height: `${heightPercent}%`, 
                                    backgroundColor: item.color, 
                                    borderRadius: '10px 10px 0 0',
                                    transition: 'height 0.4s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                                }} 
                            />
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', gap: '20px', paddingTop: '14px' }}>
                {data.map((item, idx) => (
                    <div key={idx} style={{ flex: 1, textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Pure Custom Donut/Pie Chart Component
const PurePieChart = ({ data }) => {
    const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
    let accumulatedAngle = 0;

    const slices = data.map((item) => {
        const percentage = item.value / total;
        const angle = percentage * 360;
        const startAngle = accumulatedAngle;
        accumulatedAngle += angle;

        const x1 = 100 + 75 * Math.cos((Math.PI * (startAngle - 90)) / 180);
        const y1 = 100 + 75 * Math.sin((Math.PI * (startAngle - 90)) / 180);
        const x2 = 100 + 75 * Math.cos((Math.PI * (accumulatedAngle - 90)) / 180);
        const y2 = 100 + 75 * Math.sin((Math.PI * (accumulatedAngle - 90)) / 180);
        const largeArcFlag = angle > 180 ? 1 : 0;

        const pathData = data.length === 1 
            ? `M 100 25 A 75 75 0 1 1 99.99 25 Z`
            : `M 100 100 L ${x1} ${y1} A 75 75 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

        return { ...item, pathData };
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                <svg width="180" height="180" viewBox="0 0 200 200">
                    {slices.map((slice, idx) => (
                        <path key={idx} d={slice.pathData} fill={slice.color} stroke="#ffffff" strokeWidth="3" />
                    ))}
                    <circle cx="100" cy="100" r="42" fill="#ffffff" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>{total}</div>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>Total</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', justifyContent: 'center', marginTop: '20px' }}>
                {data.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

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

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading Dashboard Analytics...</p>
            </div>
        );
    }

    const totalUsers = stats?.totalUsers || 0;
    const totalOwners = stats?.totalOwners || 0;
    const totalPgs = stats?.totalPgs || 0;
    const totalBookings = stats?.totalBookings || 0;

    const chartData = [
        { name: 'Users', count: totalUsers, color: '#2563eb' },
        { name: 'Owners', count: totalOwners, color: '#7c3aed' },
        { name: 'PGs', count: totalPgs, color: '#10b981' },
        { name: 'Bookings', count: totalBookings, color: '#f59e0b' }
    ];

    const pieData = [
        { name: 'Users', value: totalUsers, color: '#2563eb' },
        { name: 'Owners', value: totalOwners, color: '#7c3aed' },
        { name: 'PGs', value: totalPgs, color: '#10b981' },
        { name: 'Bookings', value: totalBookings, color: '#f59e0b' }
    ];

    const renderDashboardContent = () => {
        if (!dashboardData) {
            return (
                <div style={styles.emptyState}>
                    <ActivityIcon />
                    <p style={{ marginTop: '12px', color: '#64748b', fontWeight: '500' }}>No recent activity records available.</p>
                </div>
            );
        }

        if (Array.isArray(dashboardData)) {
            return (
                <div style={styles.activityList}>
                    {dashboardData.map((item, idx) => (
                        <div key={idx} style={styles.activityItem}>
                            <div style={styles.activityIconBox}>
                                <CheckCircleIcon />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                                    {item.title || item.name || item.action || `Activity #${idx + 1}`}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                                    {item.description || item.details || JSON.stringify(item)}
                                </div>
                            </div>
                            {item.timestamp && (
                                <span style={styles.timestampBadge}>
                                    <ClockIcon />
                                    <span style={{ marginLeft: '4px' }}>
                                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof dashboardData === 'object') {
            const entries = Object.entries(dashboardData);
            return (
                <div style={styles.objectGrid}>
                    {entries.map(([key, val], idx) => {
                        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        const formattedVal = typeof val === 'object' ? JSON.stringify(val) : String(val);

                        return (
                            <div key={idx} style={styles.dataCard}>
                                <div style={styles.dataCardHeader}>
                                    <LayersIcon />
                                    <span style={styles.dataCardTitle}>{formattedKey}</span>
                                </div>
                                <div style={styles.dataCardValue}>{formattedVal}</div>
                            </div>
                        );
                    })}
                </div>
            );
        }

        return (
            <div style={{ padding: '16px', color: '#334155', fontSize: '14px' }}>
                {String(dashboardData)}
            </div>
        );
    };

    return (
        <div style={styles.container}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                
                .admin-card-hover {
                    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .admin-card-hover:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 20px 35px rgba(37, 99, 235, 0.08) !important;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            {/* Top Row - 4 Statistic Cards */}
            <div style={styles.statsGrid}>
                {/* Stat 1: Total Users */}
                <div className="admin-card-hover" style={styles.statCard}>
                    <div style={styles.statCardTop}>
                        <span style={styles.statTitle}>Total Users</span>
                        <div style={{ ...styles.iconBadge, background: '#eff6ff', color: '#2563eb' }}>
                            <UsersIcon />
                        </div>
                    </div>
                    <div style={styles.statNumber}>{totalUsers.toLocaleString()}</div>
                    <div style={styles.statFooter}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            <TrendingUpIcon /> Active Guests
                        </span>
                    </div>
                </div>

                {/* Stat 2: Total Owners */}
                <div className="admin-card-hover" style={styles.statCard}>
                    <div style={styles.statCardTop}>
                        <span style={styles.statTitle}>Total Owners</span>
                        <div style={{ ...styles.iconBadge, background: '#f3e8ff', color: '#7c3aed' }}>
                            <UserCheckIcon />
                        </div>
                    </div>
                    <div style={styles.statNumber}>{totalOwners.toLocaleString()}</div>
                    <div style={styles.statFooter}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            <TrendingUpIcon /> Property Hosts
                        </span>
                    </div>
                </div>

                {/* Stat 3: Total PGs */}
                <div className="admin-card-hover" style={styles.statCard}>
                    <div style={styles.statCardTop}>
                        <span style={styles.statTitle}>Total PGs</span>
                        <div style={{ ...styles.iconBadge, background: '#ecfdf5', color: '#10b981' }}>
                            <BuildingIcon />
                        </div>
                    </div>
                    <div style={styles.statNumber}>{totalPgs.toLocaleString()}</div>
                    <div style={styles.statFooter}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            <TrendingUpIcon /> Listed Properties
                        </span>
                    </div>
                </div>

                {/* Stat 4: Total Bookings */}
                <div className="admin-card-hover" style={styles.statCard}>
                    <div style={styles.statCardTop}>
                        <span style={styles.statTitle}>Total Bookings</span>
                        <div style={{ ...styles.iconBadge, background: '#fffbeb', color: '#f59e0b' }}>
                            <CalendarIcon />
                        </div>
                    </div>
                    <div style={styles.statNumber}>{totalBookings.toLocaleString()}</div>
                    <div style={styles.statFooter}>
                        <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                            <TrendingUpIcon /> Completed Stays
                        </span>
                    </div>
                </div>
            </div>

            {/* Second Row - Split Charts */}
            <div style={styles.chartsGrid}>
                {/* Left (70%) - Bar Chart */}
                <div className="admin-card-hover" style={styles.barChartCard}>
                    <div style={styles.sectionHeader}>
                        <div>
                            <h3 style={styles.sectionTitle}>Platform Overview</h3>
                            <p style={styles.sectionSubtitle}>System-wide metrics breakdown</p>
                        </div>
                        <div style={styles.headerBadge}>
                            <ActivityIcon />
                            <span style={{ marginLeft: '6px' }}>Live Metrics</span>
                        </div>
                    </div>

                    <div style={{ width: '100%', marginTop: '20px' }}>
                        <PureBarChart data={chartData} />
                    </div>
                </div>

                {/* Right (30%) - Pie Chart */}
                <div className="admin-card-hover" style={styles.pieChartCard}>
                    <div style={styles.sectionHeader}>
                        <div>
                            <h3 style={styles.sectionTitle}>Distribution</h3>
                            <p style={styles.sectionSubtitle}>Ratio of entities</p>
                        </div>
                    </div>

                    <div style={{ width: '100%', marginTop: '20px' }}>
                        <PurePieChart data={pieData} />
                    </div>
                </div>
            </div>

            {/* Third Row - Full Width Recent Activity Card */}
            <div className="admin-card-hover" style={styles.recentCard}>
                <div style={styles.sectionHeader}>
                    <div>
                        <h3 style={styles.sectionTitle}>Latest Dashboard Data</h3>
                        <p style={styles.sectionSubtitle}>Real-time system details and log activity</p>
                    </div>
                    <span style={styles.activeTag}>Updated Live</span>
                </div>

                <div style={{ marginTop: '20px' }}>
                    {renderDashboardContent()}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '24px',
        backgroundColor: '#f5f7fb',
        minHeight: '100vh',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        boxSizing: 'border-box',
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        backgroundColor: '#f5f7fb',
        fontFamily: "'Inter', sans-serif",
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '4px solid #e2e8f0',
        borderTop: '4px solid #2563eb',
        borderRadius: '50%',
    },
    loadingText: {
        marginTop: '16px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#64748b',
    },

    // Row 1 Stats Grid
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    statCard: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
    },
    statCardTop: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    statTitle: {
        fontSize: '13px',
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
    },
    iconBadge: {
        width: '46px',
        height: '46px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: '800',
        color: '#0f172a',
        marginTop: '14px',
        marginBottom: '10px',
        letterSpacing: '-0.02em',
    },
    statFooter: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px',
    },

    // Row 2 Charts Layout
    chartsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
    },
    barChartCard: {
        flex: '1 1 60%',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
    },
    pieChartCard: {
        flex: '1 1 35%',
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#0f172a',
        margin: 0,
    },
    sectionSubtitle: {
        fontSize: '13px',
        color: '#64748b',
        marginTop: '4px',
        margin: 0,
    },
    headerBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '6px 12px',
        borderRadius: '20px',
        backgroundColor: '#eff6ff',
        color: '#2563eb',
        fontSize: '12px',
        fontWeight: '700',
    },

    // Row 3 Recent Card
    recentCard: {
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        boxSizing: 'border-box',
    },
    activeTag: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#059669',
        backgroundColor: '#ecfdf5',
        padding: '6px 14px',
        borderRadius: '20px',
        border: '1px solid #a7f3d0',
    },
    emptyState: {
        textAlign: 'center',
        padding: '40px 20px',
    },
    objectGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px',
    },
    dataCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid #e2e8f0',
    },
    dataCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
    },
    dataCardTitle: {
        fontSize: '12px',
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
    },
    dataCardValue: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#0f172a',
        wordBreak: 'break-word',
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 16px',
        backgroundColor: '#f8fafc',
        borderRadius: '14px',
        border: '1px solid #f1f5f9',
    },
    activityIconBox: {
        width: '34px',
        height: '34px',
        borderRadius: '10px',
        backgroundColor: '#eff6ff',
        color: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timestampBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '12px',
        color: '#94a3b8',
        fontWeight: '500',
    },
};

export default AdminDashboard;
