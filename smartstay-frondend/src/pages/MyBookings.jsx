import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getUserBookings,
  cancelBooking,
} from "../services/bookingService";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getUserBookings(user.userId);
      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await cancelBooking(bookingId);
      alert("Booking Cancelled Successfully");
      loadBookings();
    } catch (error) {
      console.log(error);
      alert("Unable to Cancel Booking");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">My Bookings</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="alert alert-warning">
            No Bookings Found.
          </div>
        ) : (
          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>PG Name</th>
                <th>Room Type</th>
                <th>City</th>
                <th>Rent</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>{booking.bookingId}</td>
                  <td>{booking.pgName}</td>
                  <td>{booking.roomType}</td>
                  <td>{booking.city}</td>
                  <td>₹{booking.rent}</td>
                  <td>{booking.status}</td>
                  <td>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleCancel(booking.bookingId)
                      }
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}

      </div>
    </>
  );
};

export default MyBookings;