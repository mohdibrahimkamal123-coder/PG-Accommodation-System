import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
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
      alert("Please login to submit a review.");
      return;
    }

    const trimmedComment = comment.trim();
    if (trimmedComment.length < 10) {
      alert("Please enter a review of at least 10 characters.");
      return;
    }

    if (trimmedComment.length > 500) {
      alert("Review cannot exceed 500 characters.");
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

      alert("Review Submitted Successfully.");
      setComment("");
      setRating(5);
      await Promise.all([loadReviews(), loadPg()]);
      
      reviewSectionRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } catch (error) {
      console.log(error);
      alert("Unable to submit review. Please try again.");
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

  const RatingStars = ({ rating, size = 'sm' }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <span className={`rating-stars ${size}`}>
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '⭐'}
        <span className="text-muted ms-1">({rating.toFixed(1)})</span>
      </span>
    );
  };

  // Loading State
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

  // Error State
  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>PG Not Found</h4>
            <p>The PG you're looking for doesn't exist or has been removed.</p>
            <button 
              className="btn btn-secondary mt-2"
              onClick={() => navigate('/')}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </>
    );
  }

  // Main Render
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
            ></button>
          </div>
        )}

        <div className="card shadow-lg">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h2 className="mb-0">{pg.pgName}</h2>
              <span className="badge bg-success fs-6 p-2">
                ⭐ {pg.rating ? pg.rating.toFixed(1) : "N/A"}
              </span>
            </div>
            <hr />

            <div className="row">
              <div className="col-md-8">
                <p><strong>Description:</strong> {pg.description}</p>
                <p><strong>Address:</strong> {pg.address}</p>
                <p><strong>City:</strong> {pg.city}, {pg.state} - {pg.pincode}</p>
                <p><strong>Starting Rent:</strong> ₹{pg.rentStarting.toLocaleString()}</p>
                <p><strong>Gender :</strong> {pg.genderType}</p>
              </div>
              <div className="col-md-4">
                <div className="card bg-light">
                  <div className="card-body">
                    <h6>Available Amenities</h6>
                    <ul className="list-unstyled">
                      <li>🍽️ Food: {pg.foodAvailable ? '✅ Available' : '❌ Not Available'}</li>
                      <li>📶 WiFi: {pg.wifiAvailable ? '✅ Available' : '❌ Not Available'}</li>
                      <li>👕 Laundry: {pg.laundryAvailable ? '✅ Available' : '❌ Not Available'}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => navigate(`/booking/${pg.pgId}`)}
              >
                📅 Book Now
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                ← Back
              </button>
            </div>

            {/* Reviews Section */}
            <hr className="my-4" />
            <div ref={reviewSectionRef}>
              <h3 className="mb-3">⭐ Reviews</h3>
              
              {reviewsLoading ? (
                <div className="text-center py-3">
                  <div className="spinner-border spinner-border-sm text-primary"></div>
                </div>
              ) : reviews.length === 0 ? (
                <div className="alert alert-info">
                  No reviews yet. Be the first to review!
                </div>
              ) : (
                <div className="review-list">
                  {reviews.map((review) => (
                    <div
                      className="card mb-3 shadow-sm hover-shadow"
                      key={review.reviewId}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h5 className="mb-1">👤 {review.userName}</h5>
                            <small className="text-muted">
                              {formatDate(review.createdAt)}
                            </small>
                          </div>
                          <span className="badge bg-warning text-dark">
                            <RatingStars rating={review.rating} />
                          </span>
                        </div>
                        <p className="mt-2 mb-0">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Write Review Section */}
              <hr className="my-4" />
              <h3 className="mb-3">Write a Review</h3>

              <div className="mb-3">
                <label className="form-label fw-semibold">Rating</label>
                <select
                  className="form-select w-auto"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  disabled={submitting}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                  <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
                  <option value="3">⭐⭐⭐ (3 - Average)</option>
                  <option value="2">⭐⭐ (2 - Below Average)</option>
                  <option value="1">⭐ (1 - Poor)</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Comment</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your review here... (Minimum 10 characters)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={submitting}
                  maxLength="500"
                />
                <div className="text-end text-muted small">
                  {comment.length}/500 characters
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleReviewSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
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

      <style>{`
        .hover-shadow:hover {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transition: box-shadow 0.2s ease;
        }
      `}</style>
    </>
  );
};

export default PGDetails;