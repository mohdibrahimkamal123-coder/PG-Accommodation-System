// src/pages/FindPG.jsx

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import { getAllPgs, searchPgs } from "../services/pgService";
import { addToWishlist } from "../services/wishlistService";

const FindPG = () => {
  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [budget, setBudget] = useState("");
  const [gender, setGender] = useState("");
  
  const searchInputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    loadAllPgs();
  }, []);

  const filterPgs = useCallback(() => {
    let filtered = [...pgs];

    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(pg =>
        pg.pgName?.toLowerCase().includes(query) ||
        pg.city?.toLowerCase().includes(query) ||
        pg.state?.toLowerCase().includes(query) ||
        pg.address?.toLowerCase().includes(query)
      );
    }

    if (budget) {
      filtered = filtered.filter(
        pg => pg.rentStarting <= Number(budget)
      );
    }

    if (gender) {
      filtered = filtered.filter(
        pg => pg.genderType === gender
      );
    }

    setFilteredPgs(filtered);
  }, [pgs, searchTerm, budget, gender]);

  useEffect(() => {
    filterPgs();
  }, [filterPgs]);

  const loadAllPgs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPgs();
      setPgs(data || []);
      setFilteredPgs(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load PGs. Please try again.");
      setPgs([]);
      setFilteredPgs([]);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = async (query) => {
    try {
      setSearchLoading(true);
      const data = await searchPgs(query);
      setPgs(data || []);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      
      const searchQuery = query.toLowerCase().trim();
      const filtered = pgs.filter(pg => {
        return (
          pg.pgName?.toLowerCase().includes(searchQuery) ||
          pg.city?.toLowerCase().includes(searchQuery) ||
          pg.state?.toLowerCase().includes(searchQuery) ||
          pg.address?.toLowerCase().includes(searchQuery)
        );
      });
      setPgs(filtered);
      
      if (filtered.length === 0) {
        setError("No results found. Try a different search.");
      }
    } finally {
      setSearchLoading(false);
    }
  };

  const handleWishlist = async (pgId, pgName) => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to add to wishlist',
        confirmButtonColor: '#6366f1',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login';
        }
      });
      return;
    }

    try {
      await addToWishlist({
        userId: user.userId,
        pgId: pgId
      });
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `${pgName} added to wishlist ❤️`,
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data?.message || 'PG is already in your wishlist.',
        confirmButtonColor: '#6366f1',
      });
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setBudget("");
    setGender("");
    setFilteredPgs(pgs);
    setShowSuggestions(false);
    setError(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (!value.trim()) {
      setError(null);
    }
  };

  const highlightMatch = (text, query) => {
    if (!text) return "";
    if (!query.trim()) return text;
    try {
      const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
      return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
          <span key={index} className="highlight-text">{part}</span> : 
          part
      );
    } catch {
      return text;
    }
  };

  const getCitySuggestions = () => {
    if (searchTerm.length < 2) return [];
    const searchQuery = searchTerm.toLowerCase().trim();
    const cities = new Set();
    pgs.forEach(pg => {
      if (pg.city?.toLowerCase().includes(searchQuery)) {
        cities.add(pg.city);
      }
    });
    return Array.from(cities).slice(0, 5);
  };

  const citySuggestions = getCitySuggestions();

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .findpg-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
    }

    .hero-banner {
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid #e2e8f0;
      border-radius: 28px;
      padding: 32px 36px;
      margin-bottom: 32px;
      box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08);
    }

    .hero-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }

    .hero-sub {
      color: #64748b;
      font-size: 0.95rem;
      margin-bottom: 24px;
    }

    .search-input {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 14px 20px 14px 48px;
      font-size: 0.95rem;
      font-weight: 600;
      color: #0f172a;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
      transition: all 0.25s ease;
      width: 100%;
      outline: none;
    }

    .search-input:focus {
      border-color: #6366f1;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    }

    .search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }

    .select-custom {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 18px;
      font-size: 0.9rem;
      font-weight: 700;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
      width: 100%;
      outline: none;
    }

    .select-custom:focus {
      border-color: #6366f1;
    }

    .btn-reset {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      color: #475569;
      font-weight: 700;
      font-size: 0.9rem;
      border-radius: 16px;
      padding: 12px;
      width: 100%;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-reset:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
      color: #0f172a;
    }

    .pg-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 24px;
      padding: 24px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .pg-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.18);
      border-color: rgba(99, 102, 241, 0.4);
    }

    .pg-card-title {
      font-size: 1.2rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .rating-badge {
      background: #fefce8;
      border: 1px solid #fef08a;
      color: #854d0e;
      font-weight: 800;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .price-tag {
      font-size: 1.3rem;
      font-weight: 800;
      color: #4f46e5;
      margin: 12px 0 16px 0;
    }

    .amenity-chip {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .chip-food { background: #dcfce7; color: #15803d; }
    .chip-wifi { background: #e0f2fe; color: #0369a1; }
    .chip-laundry { background: #f3e8ff; color: #6b21a8; }

    .btn-primary-premium {
      background: #0f172a;
      color: white;
      border: none;
      font-weight: 700;
      font-size: 0.88rem;
      border-radius: 16px;
      padding: 10px 18px;
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      width: 100%;
    }

    .btn-primary-premium:hover {
      background: #1e293b;
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(15, 23, 42, 0.2);
      color: white;
    }

    .btn-wishlist {
      background: #ffffff;
      border: 1.5px solid #fecaca;
      color: #dc2626;
      font-weight: 700;
      font-size: 0.88rem;
      border-radius: 16px;
      padding: 10px 18px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      cursor: pointer;
      width: 100%;
    }

    .btn-wishlist:hover {
      background: #fef2f2;
      border-color: #f87171;
    }

    .highlight-text {
      background-color: #fef08a;
      color: #854d0e;
      padding: 0 4px;
      border-radius: 4px;
      font-weight: 800;
    }

    .suggestion-item {
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .suggestion-item:hover {
      background: #f1f5f9;
    }

    .gender-badge {
      display: inline-block;
      padding: 4px 14px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
    }

    .empty-state .icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .empty-state h4 {
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .empty-state p {
      color: #94a3b8;
      max-width: 400px;
      margin: 0 auto;
    }

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

    .result-count {
      text-align: center;
      color: #94a3b8;
      font-size: 0.85rem;
      margin-top: 24px;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .findpg-content {
        padding: 16px;
      }

      .hero-banner {
        padding: 20px;
      }

      .hero-title {
        font-size: 1.5rem;
      }

      .search-input {
        font-size: 0.9rem;
        padding: 12px 16px 12px 40px;
      }

      .pg-card {
        padding: 18px;
      }
    }
  `;

  if (loading) {
    return (
      <UserLayout>
        <div className="findpg-content">
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
      
      <div className="findpg-content">
        {/* Hero Banner */}
        <div className="hero-banner">
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-sub">Browse thousands of verified PGs across top Indian cities with zero brokerage.</p>

          {/* Search Bar */}
          <div className="row g-3">
            <div className="col-md-10">
              <div className="position-relative">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-input"
                  placeholder="Search by PG Name, City, State, or Area..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {searchTerm && (
                  <button
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted me-3"
                    onClick={clearSearch}
                    style={{ textDecoration: 'none', zIndex: 5, fontSize: "1.1rem" }}
                  >
                    ✕
                  </button>
                )}
                
                {searchLoading && (
                  <div className="position-absolute end-0 top-50 translate-middle-y me-5">
                    <span className="loading-spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></span>
                  </div>
                )}

                {/* City Suggestions */}
                {showSuggestions && citySuggestions.length > 0 && searchTerm.length >= 2 && (
                  <div className="position-absolute w-100 bg-white border rounded-4 shadow-lg mt-2 p-2" style={{ zIndex: 10 }}>
                    <div className="px-3 py-2 text-muted small fw-bold text-uppercase">City Suggestions</div>
                    {citySuggestions.map((city, index) => (
                      <div 
                        key={index}
                        className="suggestion-item"
                        onMouseDown={() => {
                          setSearchTerm(city);
                          setShowSuggestions(false);
                          performSearch(city);
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="fw-semibold text-dark">{city}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-md-2">
              <button className="btn-reset" onClick={loadAllPgs}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="row g-3 mt-2">
            <div className="col-md-4">
              <select
                className="select-custom"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="">All Budgets</option>
                <option value="5000">Under ₹5,000</option>
                <option value="8000">Under ₹8,000</option>
                <option value="10000">Under ₹10,000</option>
                <option value="15000">Under ₹15,000</option>
              </select>
            </div>

            <div className="col-md-4">
              <select
                className="select-custom"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All Gender Preferences</option>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div className="col-md-4">
              {(budget || gender || searchTerm) && (
                <button
                  className="btn btn-outline-danger rounded-3 w-100 py-2 fw-bold"
                  onClick={clearSearch}
                  style={{ borderRadius: '16px', border: '1.5px solid #fecaca' }}
                >
                  ✕ Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-warning border-0 rounded-4 shadow-sm d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{error}</span>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        {/* Search Result Header */}
        {searchTerm && !searchLoading && (
          <div className="mb-4">
            <span className="text-muted">Showing results for: </span>
            <strong className="text-primary">"{searchTerm}"</strong> 
            <span className="badge bg-primary-subtle text-primary ms-2 fw-bold" style={{ background: '#eef2ff', color: '#4f46e5' }}>
              {filteredPgs.length} stays found
            </span>
          </div>
        )}

        {/* Results */}
        {searchLoading ? (
          <div className="text-center py-5">
            <div className="loading-spinner" style={{ margin: '0 auto' }}></div>
            <p className="mt-3 text-muted">Searching for "{searchTerm}"...</p>
          </div>
        ) : (
          <>
            {filteredPgs.length === 0 ? (
              <div className="empty-state">
                <div className="icon">🔍</div>
                <h4>No PG Accommodations Found</h4>
                <p>
                  {searchTerm ? 
                    `No results found matching "${searchTerm}". Try broadening your search.` : 
                    budget || gender ? 
                    "No PGs match your selected filter criteria. Try adjusting your budget or gender options." :
                    "No accommodations available at the moment."}
                </p>
                {(searchTerm || budget || gender) && (
                  <div className="mt-3">
                    <button 
                      className="btn-primary-premium" 
                      onClick={clearSearch}
                      style={{ display: 'inline-flex', width: 'auto', padding: '12px 32px' }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="row g-4">
                {filteredPgs.map((pg) => (
                  <div className="col-md-4" key={pg.pgId}>
                    <div className="pg-card">
                      {/* Header */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="pg-card-title">
                          {searchTerm ? 
                            highlightMatch(pg.pgName, searchTerm) : 
                            pg.pgName
                          }
                        </h3>
                        <span className="rating-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ca8a04">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {pg.rating?.toFixed(1) || '4.5'}
                        </span>
                      </div>

                      {/* Location */}
                      <p className="text-muted small mb-2 d-flex align-items-center gap-1">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>
                          {searchTerm ? highlightMatch(pg.city, searchTerm) : pg.city}
                          {pg.state ? `, ${searchTerm ? highlightMatch(pg.state, searchTerm) : pg.state}` : ''}
                        </span>
                      </p>

                      {/* Price */}
                      <div className="price-tag">
                        ₹{pg.rentStarting?.toLocaleString() || "N/A"}
                        <span className="text-muted fw-normal small"> / month</span>
                      </div>

                      {/* Gender */}
                      {pg.genderType && (
                        <div className="mb-3">
                          <span className="gender-badge">
                            👥 {pg.genderType}
                          </span>
                        </div>
                      )}

                      {/* Amenities */}
                      <div className="d-flex gap-2 flex-wrap mb-4">
                        {pg.foodAvailable && (
                          <span className="amenity-chip chip-food">🍽️ Food</span>
                        )}
                        {pg.wifiAvailable && (
                          <span className="amenity-chip chip-wifi">📶 WiFi</span>
                        )}
                        {pg.laundryAvailable && (
                          <span className="amenity-chip chip-laundry">👕 Laundry</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-auto d-flex flex-column gap-2">
                        <button
                          className="btn-wishlist"
                          onClick={() => handleWishlist(pg.pgId, pg.pgName)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          Add to Wishlist
                        </button>
                        <Link
                          to={`/pg/${pg.pgId}`}
                          className="btn-primary-premium"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Total Count */}
        {!loading && !searchLoading && filteredPgs.length > 0 && (
          <div className="result-count">
            Showing {filteredPgs.length} of {pgs.length} accommodation{filteredPgs.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default FindPG;