import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getUserById } from "../services/userService";
import { getUserBookings } from "../services/bookingService";
import { getWishlist } from "../services/wishlistService";
import { getReviewsByUser } from "../services/reviewService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const userId = loggedInUser.userId;

      const userData = await getUserById(userId);
      setUser(userData);

      const bookingData = await getUserBookings(userId);
      setBookings(bookingData || []);

      const wishlistData = await getWishlist(userId);
      setWishlist(wishlistData || []);

      const reviewData = await getReviewsByUser(userId);
      setReviews(reviewData || []);

    } catch (err) {
      console.error("Dashboard Error:", err);
      alert("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const activeBooking = bookings.find(
    (b) => b.status === "CONFIRMED" || b.status === "ACTIVE"
  );

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <h5 className="mt-3">Loading Dashboard...</h5>
      </div>
    );
  }
    return (
    <div className="container py-4">

      {/* Welcome */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold">
              Welcome, {user?.fullName}
            </h2>

            <p className="text-muted mb-0">
              {user?.email}
            </p>
          </div>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h1>📖</h1>
              <h3>{bookings.length}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h1>❤️</h1>
              <h3>{wishlist.length}</h3>
              <p>Wishlist</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h1>⭐</h1>
              <h3>{reviews.length}</h3>
              <p>Reviews</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center shadow-sm h-100">
            <div className="card-body">
              <h1>👤</h1>
              <h5>{user?.role}</h5>
              <p>Account Type</p>
            </div>
          </div>
        </div>

      </div>

      {/* Current Booking */}

      <div className="card shadow-sm mb-4">

        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            Current Booking
          </h5>
        </div>

        <div className="card-body">

          {activeBooking ? (

            <div>

              <h4>{activeBooking.pgName}</h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <p>
                    <strong>Booking ID :</strong>{" "}
                    {activeBooking.bookingId}
                  </p>

                  <p>
                    <strong>Room :</strong>{" "}
                    {activeBooking.roomId}
                  </p>

                  <p>
                    <strong>Status :</strong>{" "}
                    {activeBooking.status}
                  </p>

                </div>

                <div className="col-md-6">

                  <p>
                    <strong>Booking Date :</strong>{" "}
                    {activeBooking.bookingDate}
                  </p>

                  <p>
                    <strong>Rent :</strong> ₹
                    {activeBooking.rent}
                  </p>

                </div>

              </div>

            </div>

          ) : (

            <div className="text-center py-4">

              <h4>No Active Booking</h4>

              <Link
                to="/find-pg"
                className="btn btn-primary mt-3"
              >
                Find PG
              </Link>

            </div>

          )}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <Link
            to="/my-bookings"
            className="btn btn-outline-primary w-100"
          >
            My Bookings
          </Link>
        </div>

        <div className="col-md-3">
          <Link
            to="/wishlist"
            className="btn btn-outline-danger w-100"
          >
            Wishlist
          </Link>
        </div>

        <div className="col-md-3">
          <Link
            to="/profile"
            className="btn btn-outline-success w-100"
          >
            Profile
          </Link>
        </div>

        <div className="col-md-3">
          <Link
            to="/change-password"
            className="btn btn-outline-dark w-100"
          >
            Change Password
          </Link>
        </div>

      </div>
            {/* Recent Bookings */}

      <div className="card shadow-sm mb-4">

        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Recent Bookings</h5>
        </div>

        <div className="card-body">

          {bookings.length === 0 ? (

            <div className="text-center py-4">
              No Bookings Found
            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover">

                <thead>

                  <tr>
                    <th>Booking ID</th>
                    <th>PG</th>
                    <th>Room</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>

                </thead>

                <tbody>

                  {bookings.map((booking) => (

                    <tr key={booking.bookingId}>

                      <td>{booking.bookingId}</td>

                      <td>{booking.pgName}</td>

                      <td>{booking.roomId}</td>

                      <td>

                        <span
                          className={`badge ${
                            booking.status === "CONFIRMED"
                              ? "bg-success"
                              : booking.status === "ACTIVE"
                              ? "bg-primary"
                              : booking.status === "CANCELLED"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {booking.status}
                        </span>

                      </td>

                      <td>{booking.bookingDate}</td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* Reviews & Wishlist */}

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow-sm mb-4">

            <div className="card-header">
              <h5 className="mb-0">
                My Reviews
              </h5>
            </div>

            <div className="card-body">

              {reviews.length === 0 ? (

                <p>No Reviews Yet.</p>

              ) : (

                reviews.slice(0, 5).map((review) => (

                  <div
                    key={review.reviewId}
                    className="border-bottom mb-3 pb-2"
                  >

                    <strong>
                      ⭐ {review.rating}/5
                    </strong>

                    <p className="mb-1">
                      {review.comment}
                    </p>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow-sm mb-4">

            <div className="card-header">
              <h5 className="mb-0">
                Wishlist
              </h5>
            </div>

            <div className="card-body">

              {wishlist.length === 0 ? (

                <p>No Wishlist Added.</p>

              ) : (

                wishlist.slice(0, 5).map((item) => (

                  <div
                    key={item.wishlistId}
                    className="border-bottom pb-2 mb-3"
                  >

                    <strong>
                      {item.pgName}
                    </strong>

                    <br />

                    <small className="text-muted">
                      {item.city}
                    </small>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;