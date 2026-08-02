import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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

  // Filter states
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

  // Combined filter function
  const filterPgs = useCallback(() => {
    let filtered = [...pgs];

    // Text Search
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      filtered = filtered.filter(pg =>
        pg.pgName?.toLowerCase().includes(query) ||
        pg.city?.toLowerCase().includes(query) ||
        pg.state?.toLowerCase().includes(query) ||
        pg.address?.toLowerCase().includes(query)
      );
    }

    // Budget Filter
    if (budget) {
      filtered = filtered.filter(
        pg => pg.rentStarting <= Number(budget)
      );
    }

    // Gender Filter
    if (gender) {
      filtered = filtered.filter(
        pg => pg.genderType === gender
      );
    }

    setFilteredPgs(filtered);
  }, [pgs, searchTerm, budget, gender]);

  // Apply filters whenever dependencies change
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

  const handleWishlist = async (pgId) => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await addToWishlist({
        userId: user.userId,
        pgId: pgId
      });
      alert("Added to Wishlist ❤️");
    } catch (error) {
      if (typeof error.response?.data === "string") {
        alert(error.response.data);
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("PG is already in your wishlist.");
      }
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
          <span key={index} className="smartstay-highlight">{part}</span> : 
          part
      );
    } catch {
      return text;
    }
  };

  // Get unique cities for suggestions
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

  const inlineStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    .smartstay-page-wrapper {
      position: relative;
      min-height: 100vh;
      background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.06) 0%, transparent 40%),
                  radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.08) 0%, transparent 40%),
                  radial-gradient(circle at 50% 80%, rgba(6, 182, 212, 0.05) 0%, transparent 50%),
                  #f8fafc;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #0f172a;
      padding-bottom: 60px;
    }

    .smartstay-hero-banner {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 28px;
      padding: 36px 40px;
      margin-top: 24px;
      margin-bottom: 32px;
      box-shadow: 0 20px 40px -15px rgba(99, 102, 241, 0.08);
    }

    .smartstay-hero-title {
      font-size: 2.1rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.03em;
      margin-bottom: 8px;
    }

    .smartstay-hero-sub {
      color: #64748b;
      font-size: 0.98rem;
      margin-bottom: 24px;
    }

    .smartstay-search-input {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 18px;
      padding: 14px 20px 14px 48px;
      font-size: 0.98rem;
      font-weight: 600;
      color: #0f172a;
      box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
      transition: all 0.25s ease;
      width: 100%;
    }

    .smartstay-search-input:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    }

    .smartstay-search-icon {
      position: absolute;
      left: 18px;
      top: 50%;
      transform: translateY(-50%);
      color: #94a3b8;
      pointer-events: none;
    }

    .smartstay-select-custom {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 16px;
      padding: 12px 18px;
      font-size: 0.92rem;
      font-weight: 700;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
      width: 100%;
    }

    .smartstay-select-custom:focus {
      border-color: #6366f1;
      outline: none;
    }

    .smartstay-btn-reset {
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

    .smartstay-btn-reset:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
      color: #0f172a;
    }

    .smartstay-card {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 24px;
      padding: 24px;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.04);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .smartstay-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px -12px rgba(99, 102, 241, 0.18);
      border-color: rgba(99, 102, 241, 0.4);
    }

    .smartstay-card-title {
      font-size: 1.25rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
      margin: 0;
    }

    .smartstay-rating-badge {
      background: #fefce8;
      border: 1px solid #fef08a;
      color: #854d0e;
      font-weight: 800;
      font-size: 0.8rem;
      padding: 4px 10px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .smartstay-price-tag {
      font-size: 1.35rem;
      font-weight: 800;
      color: #6366f1;
      margin: 12px 0 16px 0;
    }

    .smartstay-amenity-chip {
      font-size: 0.76rem;
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

    .btn-gradient-primary {
      background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
      color: white;
      border: none;
      font-weight: 700;
      font-size: 0.88rem;
      border-radius: 16px;
      padding: 10px 18px;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      width: 100%;
    }

    .btn-gradient-primary:hover {
      background: linear-gradient(135deg, #4f46e5 0%, #6d28d9 100%);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(99, 102, 241, 0.42);
      color: white;
    }

    .btn-wishlist-outline {
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

    .btn-wishlist-outline:hover {
      background: #fef2f2;
      border-color: #f87171;
    }

    .smartstay-highlight {
      background-color: #fef08a;
      color: #854d0e;
      padding: 0 4px;
      border-radius: 4px;
      font-weight: 800;
    }
  `;

  if (loading) {
    return (
      <div className="smartstay-page-wrapper">
        <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
        <Navbar />
        <div className="container text-center mt-5 py-5">
          <div className="spinner-border text-primary" style={{ width: "3.5rem", height: "3.5rem" }}></div>
          <h4 className="mt-4 fw-bold text-dark">Exploring Accommodations...</h4>
          <p className="text-muted small">Fetching verified PGs near you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="smartstay-page-wrapper">
      <style dangerouslySetInnerHTML={{ __html: inlineStyles }} />
      <Navbar />

      <div className="container">
        
        {/* Search Hero Header */}
        <div className="smartstay-hero-banner">
          <h1 className="smartstay-hero-title">Find Accommodation</h1>
          <p className="smartstay-hero-sub">Browse thousands of verified stay options across top Indian cities with zero brokerage.</p>

          {/* Search Bar with Live Suggestions */}
          <div className="row g-3">
            <div className="col-md-10">
              <div className="position-relative">
                <svg className="smartstay-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                  ref={searchInputRef}
                  type="text"
                  className="smartstay-search-input"
                  placeholder="Search by PG Name, City, State, or Area..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
                
                {/* Clear search button */}
                {searchTerm && (
                  <button
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted me-3"
                    onClick={clearSearch}
                    style={{ textDecoration: 'none', zIndex: 5, fontSize: "1.1rem" }}
                  >
                    ✕
                  </button>
                )}
                
                {/* Search Loading Spinner */}
                {searchLoading && (
                  <div className="position-absolute end-0 top-50 translate-middle-y me-5">
                    <span className="spinner-border spinner-border-sm text-primary"></span>
                  </div>
                )}

                {/* City Suggestions Dropdown */}
                {showSuggestions && citySuggestions.length > 0 && searchTerm.length >= 2 && (
                  <div className="position-absolute w-100 bg-white border rounded-4 shadow-lg mt-2 p-2" style={{ zIndex: 10 }}>
                    <div className="px-3 py-2 text-muted small fw-bold text-uppercase">City Suggestions</div>
                    {citySuggestions.map((city, index) => (
                      <div 
                        key={index}
                        className="px-3 py-2 rounded-3 hover-suggestion d-flex align-items-center gap-2 cursor-pointer"
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
              <button
                className="smartstay-btn-reset"
                onClick={loadAllPgs}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Reset
              </button>
            </div>
          </div>

          {/* Filter Row */}
          <div className="row g-3 mt-2">
            <div className="col-md-4">
              <select
                className="smartstay-select-custom"
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
                className="smartstay-select-custom"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">All Gender Preferences</option>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Co-Living">Co-Living / Mixed</option>
              </select>
            </div>

            <div className="col-md-4">
              {(budget || gender || searchTerm) && (
                <button
                  className="btn btn-outline-danger rounded-3 w-100 py-2 fw-bold"
                  onClick={clearSearch}
                >
                  ✕ Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Notification */}
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

        {/* Search & Filter Result Header */}
        {searchTerm && !searchLoading && (
          <div className="mb-4">
            <span className="text-muted">Showing results for: </span>
            <strong className="text-primary">"{searchTerm}"</strong> 
            <span className="badge bg-primary-subtle text-primary ms-2 fw-bold">{filteredPgs.length} stays found</span>
          </div>
        )}

        {/* Results Grid */}
        {searchLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
            <p className="mt-3 text-muted">Searching for "{searchTerm}"...</p>
          </div>
        ) : (
          <>
            {filteredPgs.length === 0 ? (
              <div className="card border-0 rounded-4 shadow-sm py-5 text-center bg-white">
                <div className="mb-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h4 className="fw-bold text-dark">No PG Accommodations Found</h4>
                <p className="text-muted max-w-md mx-auto">
                  {searchTerm ? 
                    `No results found matching "${searchTerm}". Try broadening your search.` : 
                    budget || gender ? 
                    "No PGs match your selected filter criteria. Try adjusting your budget or gender options." :
                    "No accommodations available at the moment."}
                </p>
                {(searchTerm || budget || gender) && (
                  <div className="mt-2">
                    <button 
                      className="btn-gradient-primary d-inline-flex w-auto px-4"
                      onClick={clearSearch}
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
                    <div className="smartstay-card">
                      
                      {/* Top Header Row */}
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="smartstay-card-title">
                          {searchTerm ? 
                            highlightMatch(pg.pgName, searchTerm) : 
                            pg.pgName
                          }
                        </h3>
                        <span className="smartstay-rating-badge">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ca8a04">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {pg.rating?.toFixed(1) || '4.5'}
                        </span>
                      </div>

                      {/* Location details */}
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

                      {/* Rent starting */}
                      <div className="smartstay-price-tag">
                        ₹{pg.rentStarting?.toLocaleString() || "N/A"}
                        <span className="text-muted fw-normal small"> / month</span>
                      </div>

                      {/* Gender Preference Badge */}
                      {pg.genderType && (
                        <div className="mb-3">
                          <span className="badge bg-light text-dark border fw-bold px-3 py-1 rounded-pill">
                            Role / Gender: {pg.genderType}
                          </span>
                        </div>
                      )}

                      {/* Amenity Badges */}
                      <div className="d-flex gap-2 flex-wrap mb-4">
                        {pg.foodAvailable && (
                          <span className="smartstay-amenity-chip chip-food">
                            🍽️ Food Included
                          </span>
                        )}
                        {pg.wifiAvailable && (
                          <span className="smartstay-amenity-chip chip-wifi">
                            📶 High-Speed WiFi
                          </span>
                        )}
                        {pg.laundryAvailable && (
                          <span className="smartstay-amenity-chip chip-laundry">
                            👕 Laundry
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="mt-auto d-flex flex-column gap-2">
                        <button
                          className="btn-wishlist-outline"
                          onClick={() => handleWishlist(pg.pgId)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                          Add to Wishlist
                        </button>
                        <Link
                          to={`/pg/${pg.pgId}`}
                          className="btn-gradient-primary"
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

        {/* Bottom Total Counter */}
        {!loading && !searchLoading && filteredPgs.length > 0 && (
          <div className="text-center text-muted mt-4 small">
            Showing {filteredPgs.length} of {pgs.length} total accommodation{filteredPgs.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

    </div>
  );
};

export default FindPG;
