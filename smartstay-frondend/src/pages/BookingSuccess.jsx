import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const BookingSuccess = () => {
  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow text-center">

          <div className="card-body p-5">

            <h1 className="text-success">✅ Booking Successful</h1>

            <p className="mt-3">
              Your booking has been confirmed successfully.
            </p>

            <div className="mt-4">

              <Link
                to="/my-bookings"
                className="btn btn-primary me-3"
              >
                My Bookings
              </Link>

              <Link
                to="/find-pg"
                className="btn btn-success"
              >
                Book Another PG
              </Link>

            </div>

          </div>

        </div>

      </div>
    </>
  );
};

export default BookingSuccess;