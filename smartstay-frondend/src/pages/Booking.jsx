import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPgById } from "../services/pgService";
import { bookRoom } from "../services/bookingService";
import { getRoomsByPgId } from "../services/roomService";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPg();
  }, []);

  const loadPg = async () => {
  try {
    const pgData = await getPgById(id);
    setPg(pgData);

    const roomData = await getRoomsByPgId(id);
    setRooms(roomData);

    console.log("Rooms:", roomData);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please Login First");
        navigate("/login");
        return;
      }

      if (rooms.length === 0) {
    alert("No rooms available.");
    return;
}

const booking = {
    userId: user.userId,
    roomId: rooms[0].roomId,
     status: "CONFIRMED"
};

      await bookRoom(booking);

      alert("Booking Successful");

      navigate("/my-bookings");

    } catch (error) {
      console.log(error);
      alert("Booking Failed");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">
          <div className="spinner-border text-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">

        <div className="card shadow">

          <div className="card-header">
            <h3>Booking Confirmation</h3>
          </div>

          <div className="card-body">

            <h4>{pg.pgName}</h4>

            <hr />

            <p>
              <strong>Address :</strong> {pg.address}
            </p>

            <p>
              <strong>City :</strong> {pg.city}
            </p>

            <p>
              <strong>Rent :</strong> ₹{pg.rentStarting}
            </p>

            <p>
              <strong>Food :</strong>{" "}
              {pg.foodAvailable ? "Available" : "Not Available"}
            </p>

            <p>
              <strong>WiFi :</strong>{" "}
              {pg.wifiAvailable ? "Available" : "Not Available"}
            </p>

            <button
              className="btn btn-success me-2"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default Booking;