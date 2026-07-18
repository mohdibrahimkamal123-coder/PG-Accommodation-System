import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import {
  getUserBookings,
  cancelBooking,
} from "../services/bookingService";

function MyBookings() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();  
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const response = await getUserBookings(user.userId);

      setBookings(response.data);
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

      setBookings(
        bookings.filter(
          (booking) => booking.bookingId !== bookingId
        )
      );

      alert("Booking cancelled successfully.");
    } catch (error) {
      alert("Unable to cancel booking.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container py-5">

        <h2 className="mb-4 text-primary">
          My Bookings
        </h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="alert alert-info">
            No bookings found.
          </div>
        ) : (
          <div className="row">

            {bookings.map((booking) => (

              <div
                className="col-md-6 col-lg-4 mb-4"
                key={booking.bookingId}
              >

                <div className="card shadow h-100">

                  <div className="card-body">

                    <h4 className="text-primary">
                      {booking.pgName}
                    </h4>

                    <hr />

                    <p>
                      <strong>Room Type :</strong>{" "}
                      {booking.roomType}
                    </p>

                    <p>
                      <strong>Rent :</strong> ₹
                      {booking.rent}
                    </p>

                    <p>
                      <strong>Address :</strong>{" "}
                      {booking.address}
                    </p>

                    <p>
                      <strong>City :</strong>{" "}
                      {booking.city}
                    </p>

                    <p>
                      <strong>State :</strong>{" "}
                      {booking.state}
                    </p>

                    <p>
                      <strong>Booking Date :</strong>
                      <br />
                      {new Date(
                        booking.bookingDate
                      ).toLocaleString()}
                    </p>

                    <span className="badge bg-success mb-3">
                      {booking.status}
                    </span>

                    <br />

                    <button
                      className="btn btn-danger w-100"
                      onClick={() =>
                        handleCancel(
                          booking.bookingId
                        )
                      }
                    >
                      Cancel Booking
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default MyBookings;