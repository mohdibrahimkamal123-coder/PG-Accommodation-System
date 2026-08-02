// src/pages/Profile.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import { getUserById, updateUser } from "../services/userService";

const Profile = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: ""
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
      return;
    }
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await getUserById(loggedUser.userId);
      setUser(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load profile data',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(loggedUser.userId, user);
      
      // Update localStorage
      const updatedUser = { ...loggedUser, fullName: user.fullName };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Profile updated successfully 🎉',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data || 'Unable to update profile',
        confirmButtonColor: '#6366f1',
      });
    }
  };

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .profile-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .profile-card {
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
      max-width: 600px;
      width: 100%;
      overflow: hidden;
    }

    /* Profile Header */
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
    }

    .profile-role {
      font-size: 0.8rem;
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
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
      justify-content: space-between;
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

    .form-group input,
    .form-group select {
      width: 100%;
      padding: 12px 16px 12px 46px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.2s ease;
      background: #f8fafc;
      color: #0f172a;
    }

    .form-group input:focus,
    .form-group select:focus {
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

    .form-group select {
      padding-right: 40px;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
    }

    .form-divider {
      height: 1px;
      background: #f1f5f9;
      margin: 24px 0;
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
      width: 100%;
    }

    .btn-primary-premium:hover:not(:disabled) {
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

    .no-changes-text {
      text-align: center;
      margin-top: 12px;
      font-size: 0.8rem;
      color: #94a3b8;
    }

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

    @media (max-width: 768px) {
      .profile-content {
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

      .form-group input,
      .form-group select {
        padding: 10px 14px 10px 40px;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 480px) {
      .profile-card {
        border-radius: 20px;
      }

      .profile-body {
        padding: 20px 16px 24px;
      }

      .btn-primary-premium {
        padding: 12px 24px;
        font-size: 0.85rem;
      }
    }
  `;

  if (loading) {
    return (
      <UserLayout>
        <div className="profile-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      
      <div className="profile-content">
        <div className="profile-card">
          {/* Header with Avatar */}
          <div className="profile-header">
            <div className="profile-avatar">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : "U"}
            </div>
            <h2 className="profile-name">{user.fullName || "User"}</h2>
            <div className="profile-role">Guest User</div>
            <div className="profile-status">
              <span className="dot"></span>
              Active Account
            </div>
          </div>

          {/* Profile Body */}
          <div className="profile-body">
            <div className="profile-body-title">
              <span>📋 Personal Information</span>
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
                    value={user.fullName}
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
                    value={user.email}
                    disabled
                    placeholder="Email cannot be changed"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">📱</span>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Gender</label>
                <div className="input-wrapper">
                  <span className="input-icon">⚤</span>
                  <select
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
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
                <div className="no-changes-text">
                  Make changes to enable the update button
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;