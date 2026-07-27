import React, { useEffect, useState } from "react";
import {
    getBookings,
    approveBooking,
    rejectBooking,
    completeBooking
} from "../../services/ownerService";

const Bookings = () => {

    const owner = JSON.parse(localStorage.getItem("owner"));

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadBookings();

    }, []);

    const loadBookings = async () => {

        try {

            const response = await getBookings(owner.ownerId);

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const handleApprove = async (id) => {

        await approveBooking(id);

        loadBookings();

    };

    const handleReject = async (id) => {

        await rejectBooking(id);

        loadBookings();

    };

    const handleComplete = async (id) => {

        await completeBooking(id);

        loadBookings();

    };

    if (loading) {

        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
            </div>
        );

    }

    return (

        <div className="container mt-4">

            <h3 className="mb-4">
                Booking Management
            </h3>

            <div
                className="card"
                style={{
                    borderRadius: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,.1)"
                }}
            >

                <div className="card-body">

                    <table className="table table-hover table-bordered">

                        <thead className="table-dark">

                            <tr>

                                <th>ID</th>

                                <th>User</th>

                                <th>PG</th>

                                <th>Room</th>

                                <th>Date</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                bookings.length === 0 ?

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center"
                                        >

                                            No Bookings Found

                                        </td>

                                    </tr>

                                    :

                                    bookings.map((booking) => (

                                        <tr key={booking.bookingId}>

                                            <td>{booking.bookingId}</td>

                                            <td>{booking.userName}</td>

                                            <td>{booking.pgName}</td>

                                            <td>{booking.roomId}</td>

                                            <td>{booking.bookingDate}</td>

                                            <td>

                                                <span
                                                    className={
                                                        booking.status === "PENDING"
                                                            ? "badge bg-warning text-dark"
                                                            : booking.status === "APPROVED"
                                                                ? "badge bg-success"
                                                                : booking.status === "REJECTED"
                                                                    ? "badge bg-danger"
                                                                    : "badge bg-primary"
                                                    }
                                                >

                                                    {booking.status}

                                                </span>

                                            </td>

                                            <td>

                                                {

                                                    booking.status === "PENDING" &&

                                                    <>

                                                        <button
                                                            className="btn btn-success btn-sm me-2"
                                                            onClick={() => handleApprove(booking.bookingId)}
                                                        >

                                                            Approve

                                                        </button>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleReject(booking.bookingId)}
                                                        >

                                                            Reject

                                                        </button>

                                                    </>

                                                }

                                                {

                                                    booking.status === "APPROVED" &&

                                                    <button
                                                        className="btn btn-primary btn-sm"
                                                        onClick={() => handleComplete(booking.bookingId)}
                                                    >

                                                        Complete

                                                    </button>

                                                }

                                            </td>

                                        </tr>

                                    ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default Bookings;