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

  // Live search with debouncing
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // If search is empty, show all PGs
    if (!searchTerm.trim()) {
      setFilteredPgs(pgs);
      setSearchLoading(false);
      setShowSuggestions(false);
      return;
    }

    // Show suggestions if search term is short
    if (searchTerm.length < 2) {
      setShowSuggestions(true);
      setSearchLoading(false);
      return;
    }

    // Set loading
    setSearchLoading(true);
    setShowSuggestions(false);

    // Debounce search
    debounceTimerRef.current = setTimeout(async () => {
      await performSearch(searchTerm);
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, pgs]);

  const loadAllPgs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPgs();
      setPgs(data);
      setFilteredPgs(data);
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
      // Use API search
      const data = await searchPgs(query);
      setFilteredPgs(data);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      
      // Fallback to client-side search if API fails
      const searchQuery = query.toLowerCase().trim();
      const filtered = pgs.filter(pg => {
        return (
          pg.pgName?.toLowerCase().includes(searchQuery) ||
          pg.city?.toLowerCase().includes(searchQuery) ||
          pg.state?.toLowerCase().includes(searchQuery) ||
          pg.address?.toLowerCase().includes(searchQuery)
        );
      });
      setFilteredPgs(filtered);
      
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
      setFilteredPgs(pgs);
      setShowSuggestions(false);
      setError(null);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query.trim()) return text;
    try {
      const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
      return parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? 
          <span key={index} className="highlight">{part}</span> : 
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">🏠 Find PG</h2>

        {/* Search Bar with Live Search */}
        <div className="row mb-4">
          <div className="col-md-10">
            <div className="position-relative">
              <input
                ref={searchInputRef}
                type="text"
                className="form-control form-control-lg"
                placeholder="🔍 Search by PG Name, City, State, or Address..."
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                autoFocus
              />
              
              {/* Clear button */}
              {searchTerm && (
                <button
                  className="btn btn-link position-absolute end-0 top-0 text-danger"
                  onClick={clearSearch}
                  style={{ textDecoration: 'none', zIndex: 5 }}
                >
                  ✕
                </button>
              )}
              
              {/* Loading indicator */}
              {searchLoading && (
                <div className="position-absolute end-0 top-0 mt-2 me-5">
                  <span className="spinner-border spinner-border-sm text-primary"></span>
                </div>
              )}

              {/* City Suggestions */}
              {showSuggestions && citySuggestions.length > 0 && searchTerm.length >= 2 && (
                <div className="position-absolute w-100 bg-white border rounded-3 shadow-lg mt-1" style={{ zIndex: 10 }}>
                  <ul className="list-unstyled m-0 p-2">
                    <li className="px-2 py-1 text-muted small fw-bold">City Suggestions</li>
                    {citySuggestions.map((city, index) => (
                      <li 
                        key={index}
                        className="px-3 py-2 hover-suggestion"
                        onMouseDown={() => {
                          setSearchTerm(city);
                          setShowSuggestions(false);
                          performSearch(city);
                        }}
                      >
                        📍 {city}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Search info */}
            {searchTerm && !searchLoading && (
              <small className="text-muted">
                Showing results for: <strong className="text-primary">"{searchTerm}"</strong> 
                ({filteredPgs.length} result{filteredPgs.length !== 1 ? 's' : ''})
              </small>
            )}
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={loadAllPgs}
            >
              🔄 Reset
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-warning alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle"></i> {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        {/* Results */}
        {searchLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Searching...</span>
            </div>
            <p className="mt-2 text-muted">Searching for "{searchTerm}"...</p>
          </div>
        ) : (
          <>
            {filteredPgs.length === 0 ? (
              <div className="text-center py-5">
                <div className="display-1">🔍</div>
                <h4 className="mt-3">No PG Found</h4>
                <p className="text-muted">
                  {searchTerm ? 
                    `No results found for "${searchTerm}". Try a different search.` : 
                    "No PGs available at the moment."}
                </p>
                {searchTerm && (
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={clearSearch}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              <div className="row">
                {filteredPgs.map((pg) => (
                  <div className="col-md-4 mb-4" key={pg.pgId}>
                    <div className="card h-100 shadow-sm hover-card">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <h5 className="card-title">
                            {searchTerm ? 
                              highlightMatch(pg.pgName, searchTerm) : 
                              pg.pgName
                            }
                          </h5>
                          <span className="badge bg-warning text-dark">
                            ⭐ {pg.rating?.toFixed(1) || 'N/A'}
                          </span>
                        </div>

                        <p className="card-text">
                          <strong>📍 City:</strong>{' '}
                          {searchTerm ? 
                            highlightMatch(pg.city, searchTerm) : 
                            pg.city
                          }
                        </p>

                        <p className="card-text">
                          <strong>💰 Rent:</strong> ₹{pg.rentStarting?.toLocaleString()}
                        </p>

                        <p className="card-text">
                          <strong>🏷️ State:</strong>{' '}
                          {searchTerm ? 
                            highlightMatch(pg.state, searchTerm) : 
                            pg.state
                          }
                        </p>

                        {/* Amenities quick view */}
                        <div className="d-flex gap-2 flex-wrap mb-3">
                          {pg.foodAvailable && (
                            <span className="badge bg-success">🍽️ Food</span>
                          )}
                          {pg.wifiAvailable && (
                            <span className="badge bg-info text-dark">📶 WiFi</span>
                          )}
                          {pg.laundryAvailable && (
                            <span className="badge bg-secondary">👕 Laundry</span>
                          )}
                        </div>

                        <div className="d-grid gap-2">
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleWishlist(pg.pgId)}
                          >
                            ❤️ Add to Wishlist
                          </button>
                          <Link
                            to={`/pg/${pg.pgId}`}
                            className="btn btn-success"
                          >
                            👁️ View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Stats */}
        {!loading && !searchLoading && filteredPgs.length > 0 && (
          <div className="text-center text-muted mt-4">
            <small>
              Showing {filteredPgs.length} of {pgs.length} PG{filteredPgs.length !== 1 ? 's' : ''}
            </small>
          </div>
        )}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .highlight {
          background-color: #ffeb3b;
          padding: 0 2px;
          border-radius: 2px;
          font-weight: bold;
        }
        .hover-suggestion {
          cursor: pointer;
          border-radius: 5px;
        }
        .hover-suggestion:hover {
          background-color: #f0f0f0;
        }
        .position-relative {
          position: relative;
        }
        .position-absolute {
          position: absolute;
        }
        .end-0 {
          right: 0;
        }
        .top-0 {
          top: 0;
        }
        .me-5 {
          margin-right: 3rem;
        }
        .mt-2 {
          margin-top: 0.5rem;
        }
        .w-100 {
          width: 100%;
        }
        .bg-white {
          background-color: white;
        }
        .rounded-3 {
          border-radius: 0.5rem;
        }
        .shadow-lg {
          box-shadow: 0 1rem 3rem rgba(0,0,0,0.175) !important;
        }
        .mt-1 {
          margin-top: 0.25rem;
        }
        .p-2 {
          padding: 0.5rem;
        }
        .px-2 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        .py-1 {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }
        .px-3 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .py-2 {
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
        }
        .fw-bold {
          font-weight: 700;
        }
        .small {
          font-size: 0.875rem;
        }
        .text-primary {
          color: #0d6efd !important;
        }
      `}</style>
    </>
  );
};

export default FindPG;