import React, { useEffect, useState } from "react";
import OwnerSidebar from "../../components/owner/OwnerSidebar";
import {
    getProfile,
    updateProfile
} from "../../services/ownerService";

const Profile = () => {
    const owner = JSON.parse(localStorage.getItem("owner"));
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        mobileNumber: ""
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getProfile(owner.ownerId);
            setFormData(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile(owner.ownerId, formData);
            alert(response.data || "Profile Updated Successfully");
            localStorage.setItem(
                "owner",
                JSON.stringify({
                    ...owner,
                    fullName: formData.fullName,
                    email: formData.email,
                    mobileNumber: formData.mobileNumber
                })
            );
            setIsEditing(false);
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };

    const pageStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        * {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
        }

        .profile-wrapper {
            display: flex;
            min-height: 100vh;
            background: #eef2f6;
        }

        .profile-main {
            flex: 1;
            margin-left: 240px;
            padding: 25px 30px;
            background: #eef2f6;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Header */
        .page-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 28px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .page-title {
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #0f172a;
            margin: 0;
            line-height: 1.15;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .page-title-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: #d9f99d;
            border-radius: 50%;
            margin: 0 6px;
            vertical-align: middle;
        }

        .page-subtitle {
            color: #64748b;
            font-size: 0.9rem;
            font-weight: 500;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        /* Profile Card */
        .profile-card {
            background: #ffffff;
            border-radius: 28px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
            max-width: 600px;
            width: 100%;
            overflow: hidden;
        }

        /* Profile Header with Avatar */
        .profile-header {
            background: #0f172a;
            padding: 40px 40px 30px;
            text-align: center;
            position: relative;
        }

        .profile-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 16px;
            font-size: 40px;
            font-weight: 800;
            color: #ffffff;
            border: 4px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(99, 102, 241, 0.3);
        }

        .profile-name {
            font-size: 1.5rem;
            font-weight: 800;
            color: #ffffff;
            margin: 0;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .profile-role {
            font-size: 0.8rem;
            color: #94a3b8;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .profile-status {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(255, 255, 255, 0.1);
            padding: 4px 16px;
            border-radius: 20px;
            color: #d9f99d;
            font-size: 0.75rem;
            font-weight: 600;
            margin-top: 8px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .profile-status .dot {
            width: 6px;
            height: 6px;
            background: #22c55e;
            border-radius: 50%;
            display: inline-block;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }

        /* Profile Body */
        .profile-body {
            padding: 32px 40px 40px;
        }

        .profile-body-title {
            font-size: 1rem;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            font-size: 0.75rem;
            font-weight: 700;
            color: #475569;
            letter-spacing: 0.02em;
            text-transform: uppercase;
            display: block;
            margin-bottom: 6px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .form-group .input-wrapper {
            position: relative;
        }

        .form-group .input-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            font-size: 18px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px 12px 46px;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            font-size: 0.95rem;
            font-weight: 500;
            transition: all 0.2s ease;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            background: #f8fafc;
            color: #0f172a;
        }

        .form-group input:focus {
            outline: none;
            border-color: #6366f1;
            background: #ffffff;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
        }

        .form-group input:disabled {
            background: #f1f5f9;
            color: #94a3b8;
            cursor: not-allowed;
        }

        .form-group input::placeholder {
            color: #94a3b8;
            font-weight: 400;
        }

        .form-group .input-hint {
            font-size: 0.7rem;
            color: #94a3b8;
            margin-top: 4px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        .btn-primary-premium {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0f172a;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.92rem;
            padding: 14px 32px;
            border-radius: 30px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
            border: none;
            cursor: pointer;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
            width: 100%;
        }

        .btn-primary-premium:hover {
            background: #1e293b;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
        }

        .btn-primary-premium:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .btn-primary-premium .icon {
            font-size: 18px;
        }

        .form-divider {
            height: 1px;
            background: #f1f5f9;
            margin: 24px 0;
        }

        /* Loading */
        .loading-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            width: 100%;
        }

        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .edit-indicator {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #eef2ff;
            color: #4f46e5;
            font-size: 0.7rem;
            font-weight: 700;
            padding: 2px 12px;
            border-radius: 12px;
            font-family: 'Plus Jakarta Sans', sans-serif !important;
        }

        @media (max-width: 768px) {
            .profile-main {
                margin-left: 0;
                padding: 16px;
            }

            .profile-header {
                padding: 30px 20px 24px;
            }

            .profile-body {
                padding: 24px 20px 30px;
            }

            .profile-avatar {
                width: 80px;
                height: 80px;
                font-size: 32px;
            }

            .profile-name {
                font-size: 1.2rem;
            }

            .page-title {
                font-size: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .profile-card {
                border-radius: 20px;
            }

            .profile-body {
                padding: 20px 16px 24px;
            }

            .form-group input {
                padding: 10px 14px 10px 40px;
                font-size: 0.9rem;
            }

            .btn-primary-premium {
                padding: 12px 24px;
                font-size: 0.85rem;
            }
        }
    `;

    if (loading) {
        return (
            <div className="profile-wrapper">
                <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
                <OwnerSidebar />
                <div className="profile-main">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-wrapper">
            <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
            
            <OwnerSidebar />

            <div className="profile-main">
                {/* Profile Card */}
                <div className="profile-card">
                    {/* Header with Avatar */}
                    <div className="profile-header">
                        <div className="profile-avatar">
                            {formData.fullName ? formData.fullName.charAt(0).toUpperCase() : "O"}
                        </div>
                        <h2 className="profile-name">{formData.fullName || "Owner"}</h2>
                        <div className="profile-role">Property Owner</div>
                        <div className="profile-status">
                            <span className="dot"></span>
                            Active Account
                        </div>
                    </div>

                    {/* Profile Body */}
                    <div className="profile-body">
                        <div className="profile-body-title">
                            📋 Personal Information
                            {isEditing && (
                                <span className="edit-indicator">✎ Editing</span>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">👤</span>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📧</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Mobile Number</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">📱</span>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your mobile number"
                                    />
                                    <div className="input-hint">We'll use this for booking communications</div>
                                </div>
                            </div>

                            <div className="form-divider"></div>

                            <button 
                                type="submit" 
                                className="btn-primary-premium"
                                disabled={!isEditing}
                            >
                                <span className="icon">💾</span>
                                {isEditing ? "Update Profile" : "No Changes to Save"}
                            </button>

                            {!isEditing && (
                                <div style={{ 
                                    textAlign: "center", 
                                    marginTop: "12px",
                                    fontSize: "0.8rem",
                                    color: "#94a3b8",
                                    fontFamily: "'Plus Jakarta Sans', sans-serif"
                                }}>
                                    Make changes to enable the update button
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;