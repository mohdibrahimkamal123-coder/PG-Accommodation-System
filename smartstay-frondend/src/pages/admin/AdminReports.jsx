// src/pages/admin/AdminReports.jsx

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { getReports, getRevenue, exportData } from '../../services/adminService';

const AdminReports = () => {
    const [reports, setReports] = useState(null);
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

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
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to load reports',
                confirmButtonColor: '#6366f1',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportData();
            Swal.fire({
                icon: 'success',
                title: 'Export Success!',
                text: 'Data exported successfully 📥',
                confirmButtonColor: '#6366f1',
                timer: 2000,
                timerProgressBar: true,
            });
            console.log('Export data:', data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Export failed',
                confirmButtonColor: '#6366f1',
            });
        }
    };

    const renderOverview = () => {
        if (!reports) return null;
        
        // Define sections with safe fallback
        const sections = [
            { 
                title: '📊 Users', 
                data: reports.users || {}, 
                color: '#dbeafe', 
                icon: '👤' 
            },
            { 
                title: '🏢 Owners', 
                data: reports.owners || {}, 
                color: '#dcfce7', 
                icon: '🏢' 
            },
            { 
                title: '🏠 PGs', 
                data: reports.pgs || {}, 
                color: '#eef2ff', 
                icon: '🏠' 
            },
            { 
                title: '📅 Bookings', 
                data: reports.bookings || {}, 
                color: '#fef3c7', 
                icon: '📅' 
            },
            { 
                title: '⭐ Reviews', 
                data: reports.reviews || {}, 
                color: '#fce4ec', 
                icon: '⭐' 
            },
        ];

        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
                {sections.map((section, index) => {
                    // Check if data exists and has keys
                    const hasData = section.data && typeof section.data === 'object' && Object.keys(section.data).length > 0;
                    
                    return (
                        <div key={index} style={{ 
                            background: '#ffffff', 
                            borderRadius: '20px', 
                            padding: '20px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04)'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '12px',
                                marginBottom: '16px',
                                paddingBottom: '12px',
                                borderBottom: '1px solid #f1f5f9'
                            }}>
                                <div style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '10px', 
                                    background: section.color, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    fontSize: '20px' 
                                }}>
                                    {section.icon}
                                </div>
                                <h3 style={{ 
                                    fontSize: '1rem', 
                                    fontWeight: 800, 
                                    color: '#0f172a', 
                                    margin: 0,
                                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                                }}>
                                    {section.title}
                                </h3>
                                <span style={{ 
                                    marginLeft: 'auto',
                                    background: '#eef2ff',
                                    color: '#4f46e5',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    padding: '2px 12px',
                                    borderRadius: '12px'
                                }}>
                                    {hasData ? Object.keys(section.data).length : 0} fields
                                </span>
                            </div>
                            
                            {hasData ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {Object.entries(section.data).map(([key, value]) => (
                                        <div key={key} style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center',
                                            padding: '6px 10px',
                                            borderRadius: '8px',
                                            background: '#f8fafc',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = '#f8fafc'}
                                        >
                                            <span style={{ 
                                                fontSize: '0.85rem', 
                                                fontWeight: 600, 
                                                color: '#475569',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                textTransform: 'capitalize'
                                            }}>
                                                {key.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                            <span style={{ 
                                                fontSize: '1rem', 
                                                fontWeight: 800, 
                                                color: '#0f172a',
                                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                                            }}>
                                                {typeof value === 'object' ? JSON.stringify(value) : value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ 
                                    textAlign: 'center', 
                                    padding: '20px', 
                                    color: '#94a3b8',
                                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                                }}>
                                    No data available
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderRevenue = () => {
        if (!revenue) {
            return (
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    color: '#94a3b8',
                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                }}>
                    No revenue data available
                </div>
            );
        }

        return (
            <div style={{ 
                background: '#ffffff', 
                borderRadius: '24px', 
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04)'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '20px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 800, 
                        color: '#0f172a', 
                        margin: 0,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        💰 Revenue Details
                    </h3>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    {Object.entries(revenue).map(([key, value]) => (
                        <div key={key} style={{ 
                            background: '#f8fafc', 
                            padding: '16px', 
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(15,23,42,0.06)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                        >
                            <p style={{ 
                                fontSize: '0.7rem', 
                                color: '#64748b', 
                                fontWeight: 600, 
                                margin: 0, 
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em',
                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                            }}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 800, 
                                color: '#4f46e5', 
                                margin: '4px 0 0 0',
                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                            }}>
                                {typeof value === 'number' ? `₹${value.toLocaleString()}` : value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderRawData = () => {
        return (
            <div style={{ 
                background: '#ffffff', 
                borderRadius: '24px', 
                padding: '24px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 10px 30px -10px rgba(15,23,42,0.04)'
            }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '16px',
                    paddingBottom: '12px',
                    borderBottom: '1px solid #f1f5f9'
                }}>
                    <h3 style={{ 
                        fontSize: '1.1rem', 
                        fontWeight: 800, 
                        color: '#0f172a', 
                        margin: 0,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        📋 Raw Data
                    </h3>
                    <button 
                        onClick={handleExport}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '8px 20px',
                            background: '#0f172a',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        📥 Export
                    </button>
                </div>
                <pre style={{ 
                    background: '#0f172a', 
                    color: '#e2e8f0', 
                    padding: '20px', 
                    borderRadius: '12px',
                    fontSize: '13px',
                    overflow: 'auto',
                    maxHeight: '400px',
                    fontFamily: 'monospace',
                    lineHeight: 1.6
                }}>
                    {JSON.stringify({ reports, revenue }, null, 2)}
                </pre>
            </div>
        );
    };

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
                        Reports
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', background: '#d9f99d', borderRadius: '50%', margin: '0 6px', verticalAlign: 'middle' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        & Analytics
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500, marginTop: '4px', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Comprehensive reports and analytics for your platform
                    </p>
                </div>
            </div>

            {/* Stats Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
                {[
                    { label: 'Total Revenue', value: `₹${revenue?.totalRevenue?.toLocaleString() || 0}`, icon: '💰', color: '#dbeafe' },
                    { label: 'Total Bookings', value: reports?.totalBookings || 0, icon: '📅', color: '#dcfce7' },
                    { label: 'Total Users', value: reports?.totalUsers || 0, icon: '👤', color: '#eef2ff' },
                    { label: 'Total PGs', value: reports?.totalPgs || 0, icon: '🏠', color: '#fef3c7' }
                ].map((stat, index) => (
                    <div key={index} style={{ 
                        background: '#ffffff', 
                        borderRadius: '16px', 
                        padding: '16px 20px', 
                        border: '1px solid #e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px'
                    }}>
                        <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '12px', 
                            background: stat.color, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            fontSize: '22px',
                            flexShrink: 0
                        }}>
                            {stat.icon}
                        </div>
                        <div>
                            <p style={{ 
                                fontSize: '0.75rem', 
                                color: '#64748b', 
                                fontWeight: 600, 
                                margin: 0,
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                textTransform: 'uppercase',
                                letterSpacing: '0.03em'
                            }}>
                                {stat.label}
                            </p>
                            <p style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 800, 
                                color: '#0f172a', 
                                margin: 0,
                                fontFamily: "'Plus Jakarta Sans', sans-serif"
                            }}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div style={{ 
                display: 'flex', 
                gap: '8px', 
                marginBottom: '24px',
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: '12px',
                flexWrap: 'wrap'
            }}>
                {['overview', 'revenue', 'raw'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 24px',
                            borderRadius: '30px',
                            border: activeTab === tab ? '1px solid #0f172a' : '1px solid #e2e8f0',
                            background: activeTab === tab ? '#0f172a' : '#ffffff',
                            color: activeTab === tab ? '#ffffff' : '#475569',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {tab === 'overview' ? '📊 Overview' : tab === 'revenue' ? '💰 Revenue' : '📋 Raw Data'}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'raw' && renderRawData()}
        </div>
    );
};

export default AdminReports;