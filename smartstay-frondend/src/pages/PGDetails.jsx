// src/pages/PGDetails.jsx

import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserLayout from "../components/UserLayout";
import Swal from "sweetalert2";
import { getPgById } from "../services/pgService";
import { getReviewsByPg, addReview } from "../services/reviewService";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reviewSectionRef = useRef(null);

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    loadPg();
    loadReviews();
  }, [id]);

  const loadPg = async () => {
    setError(null);
    try {
      const data = await getPgById(id);
      setPg(data);
    } catch (err) {
      setError("Failed to load PG details. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const data = await getReviewsByPg(id);
      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please login to submit a review',
        confirmButtonColor: '#6366f1',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Login Now',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }

    const trimmedComment = comment.trim();
    if (trimmedComment.length < 10) {
      Swal.fire({
        icon: 'warning',
        title: 'Too Short!',
        text: 'Please enter a review of at least 10 characters',
        confirmButtonColor: '#6366f1',
      });
      return;
    }

    if (trimmedComment.length > 500) {
      Swal.fire({
        icon: 'warning',
        title: 'Too Long!',
        text: 'Review cannot exceed 500 characters',
        confirmButtonColor: '#6366f1',
      });
      return;
    }

    setSubmitting(true);
    try {
      await addReview({
        userId: user.userId,
        pgId: Number(id),
        rating: Number(rating),
        comment: trimmedComment
      });

      Swal.fire({
        icon: 'success',
        title: 'Review Submitted!',
        text: 'Thank you for your feedback 🎉',
        confirmButtonColor: '#6366f1',
        timer: 2000,
        timerProgressBar: true,
      });

      setComment("");
      setRating(5);
      await Promise.all([loadReviews(), loadPg()]);
      
      reviewSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response?.data || 'Unable to submit review. Please try again.',
        confirmButtonColor: '#6366f1',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pageStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

    * {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
    }

    .pg-details-content {
      padding: 25px 30px;
      background: #eef2f6;
      min-height: 100vh;
    }

    .pg-details-card {
      background: #ffffff;
      border-radius: 28px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 20px 50px -10px rgba(15, 23, 42, 0.08);
      overflow: hidden;
    }

    .pg-details-header {
      padding: 28px 32px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 15px;
    }

    .pg-details-header .pg-title {
      font-size: 2rem;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .pg-details-body {
      padding: 32px;
    }

    .pg-rating-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 20px;
      background: #dcfce7;
      color: #166534;
      border-radius: 30px;
      font-weight: 700;
      font-size: 1rem;
    }

    .pg-info-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
    }

    @media (max-width: 768px) {
      .pg-info-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    .pg-info-item {
      margin-bottom: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .pg-info-item .label {
      font-weight: 700;
      color: #475569;
      min-width: 120px;
      font-size: 0.9rem;
    }

    .pg-info-item .value {
      color: #0f172a;
      font-weight: 600;
    }

    .amenities-card {
      background: #f8fafc;
      border-radius: 16px;
      padding: 20px 24px;
      border: 1px solid #e2e8f0;
    }

    .amenities-card h6 {
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 16px;
      font-size: 0.95rem;
    }

    .amenity-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f1f5f9;
      font-size: 0.9rem;
    }

    .amenity-item:last-child {
      border-bottom: none;
    }

    .amenity-item .amenity-label {
      color: #475569;
      font-weight: 500;
    }

    .amenity-item .amenity-value {
      font-weight: 600;
    }

    .amenity-item .amenity-value.available {
      color: #22c55e;
    }

    .amenity-item .amenity-value.unavailable {
      color: #ef4444;
    }

    .pg-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #f1f5f9;
    }

    .btn-book {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      background: #0f172a;
      color: #ffffff;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-book:hover {
      background: #1e293b;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(15, 23, 42, 0.15);
    }

    .btn-back {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #f1f5f9;
      color: #475569;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
    }

    .btn-back:hover {
      background: #e2e8f0;
      transform: translateY(-2px);
    }

    /* Reviews Section */
    .reviews-section {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid #f1f5f9;
    }

    .reviews-section h3 {
      font-size: 1.3rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .review-card {
      background: #f8fafc;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
    }

    .review-card:hover {
      border-color: #6366f1;
      box-shadow: 0 4px 16px rgba(99, 102, 241, 0.08);
    }

    .review-card .review-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 10px;
    }

    .review-card .review-user {
      font-weight: 700;
      color: #0f172a;
      font-size: 0.95rem;
    }

    .review-card .review-date {
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .review-card .review-rating {
      font-size: 0.9rem;
      font-weight: 700;
      color: #f59e0b;
    }

    .review-card .review-comment {
      color: #475569;
      margin-top: 8px;
      line-height: 1.6;
    }

    /* Write Review */
    .write-review-section {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid #f1f5f9;
    }

    .write-review-section h4 {
      font-size: 1.1rem;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 20px;
    }

    .review-form select,
    .review-form textarea {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      font-size: 0.9rem;
      font-weight: 500;
      background: #f8fafc;
      color: #0f172a;
      transition: all 0.2s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .review-form select:focus,
    .review-form textarea:focus {
      outline: none;
      border-color: #6366f1;
      background: #ffffff;
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.08);
    }

    .review-form textarea {
      resize: vertical;
      min-height: 100px;
    }

    .review-form .char-count {
      text-align: right;
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
      margin-top: 4px;
    }

    .btn-submit-review {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 32px;
      background: #0f172a;
      color: #ffffff;
      border: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 12px;
    }

    .btn-submit-review:hover {
      background: #1e293b;
      transform: translateY(-2px);
    }

    .btn-submit-review:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .empty-reviews {
      text-align: center;
      padding: 40px 20px;
      background: #f8fafc;
      border-radius: 16px;
      border: 1px dashed #e2e8f0;
    }

    .empty-reviews .icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    .empty-reviews .title {
      font-weight: 700;
      color: #0f172a;
      font-size: 1.1rem;
    }

    .empty-reviews .desc {
      color: #94a3b8;
      font-size: 0.9rem;
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

    .error-container {
      text-align: center;
      padding: 60px 20px;
      background: #ffffff;
      border-radius: 24px;
      border: 1px solid #e2e8f0;
    }

    .error-container .icon {
      font-size: 64px;
      margin-bottom: 16px;
    }

    .error-container h4 {
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 8px;
    }

    .error-container p {
      color: #94a3b8;
    }

    @media (max-width: 768px) {
      .pg-details-content {
        padding: 16px;
      }

      .pg-details-header {
        padding: 20px;
      }

      .pg-details-header .pg-title {
        font-size: 1.5rem;
      }

      .pg-details-body {
        padding: 20px;
      }

      .pg-info-item {
        flex-direction: column;
        gap: 4px;
      }

      .pg-info-item .label {
        min-width: auto;
      }

      .pg-actions {
        flex-direction: column;
      }

      .btn-book, .btn-back {
        justify-content: center;
        width: 100%;
      }
    }
  `;

  // Loading State
  if (loading) {
    return (
      <UserLayout>
        <div className="pg-details-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </UserLayout>
    );
  }

  // Error State
  if (!pg) {
    return (
      <UserLayout>
        <div className="pg-details-content">
          <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
          <div className="error-container">
            <div className="icon">🏠</div>
            <h4>PG Not Found</h4>
            <p>The PG you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn-back"
              onClick={() => navigate('/')}
              style={{ display: 'inline-flex' }}
            >
              ← Go Back Home
            </button>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />
      
      <div className="pg-details-content">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show" style={{ borderRadius: '16px' }}>
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div className="pg-details-card">
          {/* Header */}
          <div className="pg-details-header">
            <h1 className="pg-title">{pg.pgName}</h1>
            <span className="pg-rating-badge">
              ⭐ {pg.rating ? pg.rating.toFixed(1) : "N/A"}
            </span>
          </div>

          {/* Body */}
          <div className="pg-details-body">
            <div className="pg-info-grid">
              {/* Left Column - PG Info */}
              <div>
                <div className="pg-info-item">
                  <span className="label">📝 Description</span>
                  <span className="value">{pg.description}</span>
                </div>
                <div className="pg-info-item">
                  <span className="label">📍 Address</span>
                  <span className="value">{pg.address}</span>
                </div>
                <div className="pg-info-item">
                  <span className="label">🏙️ City</span>
                  <span className="value">{pg.city}, {pg.state} - {pg.pincode}</span>
                </div>
                <div className="pg-info-item">
                  <span className="label">💰 Starting Rent</span>
                  <span className="value" style={{ color: '#4f46e5', fontWeight: 800, fontSize: '1.1rem' }}>
                    ₹{pg.rentStarting?.toLocaleString()}
                  </span>
                </div>
                <div className="pg-info-item">
                  <span className="label">👥 Gender</span>
                  <span className="value">{pg.genderType}</span>
                </div>
              </div>

              {/* Right Column - Amenities */}
              <div>
                <div className="amenities-card">
                  <h6>🛠️ Available Amenities</h6>
                  <div className="amenity-item">
                    <span className="amenity-label">🍽️ Food</span>
                    <span className={`amenity-value ${pg.foodAvailable ? 'available' : 'unavailable'}`}>
                      {pg.foodAvailable ? '✅ Available' : '❌ Not Available'}
                    </span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-label">📶 WiFi</span>
                    <span className={`amenity-value ${pg.wifiAvailable ? 'available' : 'unavailable'}`}>
                      {pg.wifiAvailable ? '✅ Available' : '❌ Not Available'}
                    </span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-label">👕 Laundry</span>
                    <span className={`amenity-value ${pg.laundryAvailable ? 'available' : 'unavailable'}`}>
                      {pg.laundryAvailable ? '✅ Available' : '❌ Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pg-actions">
              <Link to={`/booking/${pg.pgId}`} className="btn-book">
                📅 Book Now
              </Link>
              <button className="btn-back" onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>

            {/* Reviews Section */}
            <div className="reviews-section" ref={reviewSectionRef}>
              <h3>⭐ Reviews</h3>
              
              {reviewsLoading ? (
                <div className="loading-container" style={{ minHeight: '100px' }}>
                  <div className="loading-spinner" style={{ width: '30px', height: '30px' }}></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="empty-reviews">
                  <div className="icon">📝</div>
                  <div className="title">No Reviews Yet</div>
                  <div className="desc">Be the first to review this PG!</div>
                </div>
              ) : (
                <div>
                  {reviews.map((review) => (
                    <div className="review-card" key={review.reviewId}>
                      <div className="review-header">
                        <div>
                          <span className="review-user">👤 {review.userName}</span>
                          <div className="review-date">{formatDate(review.createdAt)}</div>
                        </div>
                        <span className="review-rating">⭐ {review.rating.toFixed(1)}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Review Section */}
              <div className="write-review-section">
                <h4>✍️ Write a Review</h4>

                <div className="review-form">
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      disabled={submitting}
                      style={{ maxWidth: '250px' }}
                    >
                      <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                      <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
                      <option value="3">⭐⭐⭐ (3 - Average)</option>
                      <option value="2">⭐⭐ (2 - Below Average)</option>
                      <option value="1">⭐ (1 - Poor)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontWeight: 700, color: '#475569', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
                      Comment
                    </label>
                    <textarea
                      rows="4"
                      placeholder="Write your review here... (Minimum 10 characters)"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={submitting}
                      maxLength="500"
                    />
                    <div className="char-count">{comment.length}/500 characters</div>
                  </div>

                  <button
                    className="btn-submit-review"
                    onClick={handleReviewSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className="loading-spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default PGDetails;