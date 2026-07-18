import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getPgById } from "../services/pgService";
import { getRoomsByPgId } from "../services/roomService";
import { bookRoom } from "../services/bookingService";

import { useAuth } from "../context/AuthContext";

function PgDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user, isAuthenticated } = useAuth();

    const [pg, setPg] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [id]);

    const loadData = async () => {

        try {

            const pgResponse = await getPgById(id);
            setPg(pgResponse.data);

            const roomResponse = await getRoomsByPgId(id);
            setRooms(roomResponse.data);

        } catch (error) {

            console.error("Error loading PG details:", error);

        } finally {

            setLoading(false);

        }
    };

    const handleBooking = async (room) => {

        if (!isAuthenticated) {

            alert("Please login to book a room.");

            navigate("/login");

            return;
        }

        try {

            const bookingData = {

                userId: user.userId,

                roomId: room.roomId,

                status: "CONFIRMED"

            };

            await bookRoom(bookingData);

            alert("Booking Successful!");

            navigate("/bookings");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Booking Failed"
            );
        }
    };

    if (loading) {

        return (
            <>
                <Navbar />

                <div className="container text-center mt-5">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    ></div>

                    <p className="mt-3">
                        Loading PG Details...
                    </p>

                </div>
            </>
        );
    }

    if (!pg) {

        return (

            <>
                <Navbar />

                <div className="container text-center mt-5">

                    <h3>PG Not Found</h3>

                    <Link
                        to="/pgs"
                        className="btn btn-primary mt-3"
                    >
                        Back
                    </Link>

                </div>

            </>
        );
    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <Link
                    to="/pgs"
                    className="btn btn-outline-secondary mb-4"
                >
                    ← Back
                </Link>

                <div className="card shadow">

                    <img
                        src="https://placehold.co/900x400"
                        className="card-img-top"
                        alt={pg.pgName}
                    />

                    <div className="card-body">

                        <h2>{pg.pgName}</h2>

                        <h5 className="text-muted">
                            📍 {pg.city}, {pg.state}
                        </h5>

                        <h3 className="text-primary mt-3">
                            ₹{pg.rentStarting}/month
                        </h3>

                        <p className="mt-3">
                            ⭐ {pg.rating ?? "New"}
                        </p>

                        <hr />

                        <h4>Description</h4>

                        <p>{pg.description}</p>

                        <hr />

                        <h4>Facilities</h4>

                        <ul>

                            {pg.wifiAvailable && <li>📶 WiFi</li>}

                            {pg.foodAvailable && <li>🍴 Food</li>}

                            {pg.laundryAvailable && <li>🧺 Laundry</li>}

                        </ul>

                        <hr />

                        <h4>Address</h4>

                        <p>

                            {pg.address},

                            {" "}

                            {pg.city},

                            {" "}

                            {pg.state}

                            {" - "}

                            {pg.pincode}

                        </p>

                        <hr />

                        <h3 className="mb-4">
                            Available Rooms
                        </h3>

                        {
                            rooms.length === 0 ? (

                                <div className="alert alert-warning">

                                    No Rooms Available

                                </div>

                            ) : (

                                <div className="row">

                                    {

                                        rooms.map((room) => (

                                            <div
                                                className="col-md-4 mb-4"
                                                key={room.roomId}
                                            >

                                                <div className="card h-100 shadow-sm">

                                                    <div className="card-body">

                                                        <h5 className="card-title">

                                                            {room.roomType}

                                                        </h5>

                                                        <p>

                                                            <strong>Capacity:</strong>

                                                            {" "}

                                                            {room.capacity}

                                                        </p>

                                                        <p>

                                                            <strong>Available Beds:</strong>

                                                            {" "}

                                                            {room.availableBeds}

                                                        </p>

                                                        <p>

                                                            <strong>Rent:</strong>

                                                            {" "}

                                                            ₹{room.rent}/month

                                                        </p>

                                                    </div>

                                                    <div className="card-footer bg-white border-0">

                                                        {

                                                            room.availableBeds > 0 ? (

                                                                <button
                                                                    className="btn btn-success w-100"
                                                                    onClick={() => handleBooking(room)}
                                                                >
                                                                    Book Now
                                                                </button>

                                                            ) : (

                                                                <button
                                                                    className="btn btn-secondary w-100"
                                                                    disabled
                                                                >
                                                                    Fully Occupied
                                                                </button>

                                                            )

                                                        }

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    }

                                </div>

                            )

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default PgDetails;