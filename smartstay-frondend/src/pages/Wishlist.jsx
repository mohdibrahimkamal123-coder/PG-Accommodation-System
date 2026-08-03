// src/pages/Wishlist.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist(user.userId);
      setWishlist(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to load wishlist',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistId, pgName) => {
    const result = await Swal.fire({
      title: 'Remove from Wishlist?',
      text: `Are you sure you want to remove ${pgName} from your wishlist?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Remove!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await removeFromWishlist(wishlistId);
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'PG removed from wishlist 💔',
          confirmButtonColor: '#6366f1',
          timer: 2000,
          timerProgressBar: true,
        });
        loadWishlist();
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data || 'Failed to remove from wishlist',
          confirmButtonColor: '#6366f1',
        });
      }
    }
  };

  const filteredWishlist = wishlist.filter(item =>
    item.pgName?.toLowerCase().includes(search.toLowerCase()) ||
    item.city?.toLowerCase().includes(search.toLowerCase())
  );

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .wishlist-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
    }

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
    }

    .btn-primary-premium {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0f172a;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.88rem;
      padding: 12px 24px;
      border-radius: 30px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
      border: none;
      cursor: pointer;
    }

    .btn-primary-premium:hover {
      background: #1e293b;
      transform: translateY(-1px);
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }

    @media (max-width: 640px) {
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }

    .stat-card {
      background: #ffffff;
      border-radius: 16px;
      padding: 14px 18px;
      border: 1px solid #e2e8f0;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(15, 23, 42, 0.06);
    }

    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }

    .stat-icon.pink { background: #fce7f3; }
    .stat-icon.blue { background: #dbeafe; }
    .stat-icon.green { background: #dcfce7; }

    .stat-info {
      flex: 1;
    }

    .stat-label {
      font-size: 0.7rem;
      color: #64748b;
      font-weight: 600;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .stat-value {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }

    /* Search */
    .search-box {
      position: relative;
      margin-bottom: 24px;
    }

    .search-box input {
      width: 100%;
      max-width: 400px;
      padding: 12px 16px 12px 44px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 500;
      background: #ffffff;
      transition: all 0.2s ease;
      color: #0f172a;
      outline: none;
    }

    .search-box input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    }

    .search-box .search-icon {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      font-size: 18px;
    }

    /* Wishlist Grid */
    .wishlist-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    @media (max-width: 1024px) {
      .wishlist-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 640px) {
      .wishlist-grid {
        grid-template-columns: 1fr;
      }
    }

    .wishlist-card {
      background: #ffffff;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      transition: all 0.3s ease;
      position: relative;
    }

    .wishlist-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.12);
    }

    .wishlist-card-image {
      height: 160px;
      background: linear-gradient(135deg, #eef2ff, #e0e7ff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      position: relative;
    }

    .wishlist-card-image .heart-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(239, 68, 68, 0.15);
      padding: 8px 10px;
      border-radius: 50%;
      font-size: 18px;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .wishlist-card-body {
      padding: 20px;
    }

    .wishlist-card-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 4px 0;
    }

    .wishlist-card-city {
      color: #64748b;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
    }

    .wishlist-card-details {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-top: 1px solid #f1f5f9;
      border-bottom: 1px solid #f1f5f9;
      margin-bottom: 16px;
    }

    .wishlist-card-rent {
      font-size: 1.2rem;
      font-weight: 800;
      color: #4f46e5;
    }

    .wishlist-card-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #f59e0b;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .wishlist-card-actions {
      display: flex;
      gap: 10px;
    }

    .btn-view {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 12px;
      background: #0f172a;
      color: #ffffff;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }

    .btn-view:hover {
      background: #1e293b;
      transform: scale(1.02);
    }

    .btn-remove {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 10px 16px;
      border-radius: 12px;
      background: #fee2e2;
      color: #991b1b;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
      min-width: 80px;
    }

    .btn-remove:hover {
      background: #fecaca;
      transform: scale(1.02);
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 80px 20px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
    }

    .empty-state-icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .empty-state-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .empty-state-desc {
      color: #94a3b8;
      font-size: 1rem;
      max-width: 400px;
      margin: 0 auto 24px;
    }

    /* Loading */
    .loading-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
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
      .wishlist-content {
        padding: 16px;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .wishlist-card-image {
        height: 120px;
        font-size: 36px;
      }

      .wishlist-card-actions {
        flex-direction: column;
      }

      .btn-view, .btn-remove {
        width: 100%;
        justify-content: center;
      }
    }
  `;

  // Calculate stats
  const totalItems = wishlist.length;
  const uniqueCities = new Set(wishlist.map(item => item.city)).size;
  const avgRent = totalItems > 0 
    ? Math.round(wishlist.reduce((acc, item) => acc + (item.rentStarting || 0), 0) / totalItems)
    : 0;

  if (loading) {
    return (
      <UserLayout>
        <div className="wishlist-content">
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
      
      <div className="wishlist-content">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">
              My Wishlist
              <span className="page-title-pill">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#365314" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              Saved PGs
            </h1>
            <p className="page-subtitle">Your favorite PG properties saved for later</p>
          </div>
          <Link to="/find-pg" className="btn-primary-premium">
            + Explore More PGs
          </Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon pink">❤️</div>
            <div className="stat-info">
              <p className="stat-label">Total Items</p>
              <p className="stat-value">{totalItems}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">📍</div>
            <div className="stat-info">
              <p className="stat-label">Cities</p>
              <p className="stat-value">{uniqueCities}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">💰</div>
            <div className="stat-info">
              <p className="stat-label">Avg. Rent</p>
              <p className="stat-value">₹{avgRent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by PG name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Wishlist Grid */}
        {filteredWishlist.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💔</div>
            <div className="empty-state-title">
              {search ? "No matching PGs found" : "Wishlist is Empty"}
            </div>
            <div className="empty-state-desc">
              {search 
                ? "Try adjusting your search terms" 
                : "Start saving your favorite PG properties by clicking the heart icon"}
            </div>
            <Link to="/find-pg" className="btn-primary-premium" style={{ display: 'inline-flex' }}>
              Explore PGs
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            
            {filteredWishlist.map((item) => (
              <div className="wishlist-card" key={item.wishlistId}>
                
                <div className="wishlist-card-image">
                  🏠
                  <div className="heart-badge">❤️</div>
                </div>
                <div className="wishlist-card-body">
                  <h5 className="wishlist-card-title">{item.pgName}</h5>
                  <div className="wishlist-card-city">📍 {item.city || "Bangalore"}</div>
                  <div className="wishlist-card-details">
                    <span className="wishlist-card-rent">₹{item.rentStarting}</span>
                    <span className="wishlist-card-rating">
                      ⭐ {item.rating || "New"}
                    </span>
                  </div>
                  <div className="wishlist-card-actions">
                    <Link to={`/pg/${item.pgId}`} className="btn-view">
                      View Details →
                    </Link>
                    <button
                      className="btn-remove"
                      onClick={() => handleRemove(item.wishlistId, item.pgName)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Wishlist;