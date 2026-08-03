// src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";

const NotFound = () => {
    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .notfound-content {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 80vh;
            padding: 40px 20px;
            background: #eef2f6;
        }

        .notfound-card {
            background: #ffffff;
            border-radius: 32px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.08);
            padding: 60px 50px;
            max-width: 550px;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .notfound-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899);
        }

        .notfound-icon {
            font-size: 80px;
            margin-bottom: 16px;
            display: block;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .notfound-code {
            font-size: 6rem;
            font-weight: 900;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
            margin: 0;
            letter-spacing: -0.04em;
        }

        .notfound-title {
            font-size: 1.8rem;
            font-weight: 800;
            color: #0f172a;
            margin: 16px 0 8px 0;
        }

        .notfound-desc {
            color: #64748b;
            font-size: 1rem;
            font-weight: 500;
            line-height: 1.6;
            margin-bottom: 32px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }

        .notfound-actions {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-primary-premium {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 14px 32px;
            background: #0f172a;
            color: #ffffff;
            border: none;
            border-radius: 30px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
        }

        .btn-primary-premium:hover {
            background: #1e293b;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(15, 23, 42, 0.2);
        }

        .btn-secondary-premium {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 14px 32px;
            background: #f1f5f9;
            color: #475569;
            border: 1px solid #e2e8f0;
            border-radius: 30px;
            font-weight: 700;
            font-size: 0.95rem;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .btn-secondary-premium:hover {
            background: #e2e8f0;
            transform: translateY(-2px);
        }

        .notfound-suggestion {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #f1f5f9;
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .notfound-suggestion a {
            color: #6366f1;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.9rem;
            transition: color 0.2s ease;
        }

        .notfound-suggestion a:hover {
            color: #4f46e5;
            text-decoration: underline;
        }

        /* Floating Decorations */
        .notfound-deco {
            position: absolute;
            border-radius: 50%;
            opacity: 0.06;
            pointer-events: none;
        }

        .notfound-deco-1 {
            width: 200px;
            height: 200px;
            background: #6366f1;
            top: -80px;
            right: -80px;
        }

        .notfound-deco-2 {
            width: 150px;
            height: 150px;
            background: #8b5cf6;
            bottom: -60px;
            left: -60px;
        }

        @media (max-width: 768px) {
            .notfound-card {
                padding: 40px 24px;
            }

            .notfound-code {
                font-size: 4.5rem;
            }

            .notfound-title {
                font-size: 1.4rem;
            }

            .notfound-icon {
                font-size: 60px;
            }

            .notfound-actions {
                flex-direction: column;
                align-items: center;
            }

            .btn-primary-premium,
            .btn-secondary-premium {
                width: 100%;
                justify-content: center;
            }
        }

        @media (max-width: 480px) {
            .notfound-card {
                padding: 30px 16px;
                border-radius: 24px;
            }

            .notfound-code {
                font-size: 3.5rem;
            }
        }
    `;

    return (
        <UserLayout>
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <div className="notfound-content">
                <div className="notfound-card">
                    {/* Decorative Elements */}
                    <div className="notfound-deco notfound-deco-1"></div>
                    <div className="notfound-deco notfound-deco-2"></div>

                    {/* Icon */}
                    <span className="notfound-icon">🔍</span>

                    {/* 404 Code */}
                    <h1 className="notfound-code">404</h1>

                    {/* Title */}
                    <h2 className="notfound-title">Page Not Found</h2>

                    {/* Description */}
                    <p className="notfound-desc">
                        Oops! The page you're looking for doesn't exist or has been moved.
                        Let's get you back on track.
                    </p>

                    {/* Actions */}
                    <div className="notfound-actions">
                        <Link to="/" className="btn-primary-premium">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Back to Home
                        </Link>
                        <button 
                            className="btn-secondary-premium"
                            onClick={() => window.history.back()}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                            Go Back
                        </button>
                    </div>

                    {/* Suggestions */}
                    <div className="notfound-suggestion">
                        <Link to="/find-pg">🏠 Find PG</Link>
                        <Link to="/my-bookings">📅 My Bookings</Link>
                        <Link to="/profile">👤 Profile</Link>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default NotFound;