import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPgById } from "../services/pgService";

const PGDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pg, setPg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPg();
  }, []);

  const loadPg = async () => {
    try {
      const data = await getPgById(id);
      setPg(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
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

  if (!pg) {
    return (
      <>
        <Navbar />
        <div className="container mt-5">
          <h3>PG Not Found</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="card shadow">

          <div className="card-body">

            <h2>{pg.pgName}</h2>

            <hr />

            <p>
              <strong>Description :</strong> {pg.description}
            </p>

            <p>
              <strong>Address :</strong> {pg.address}
            </p>

            <p>
              <strong>City :</strong> {pg.city}
            </p>

            <p>
              <strong>State :</strong> {pg.state}
            </p>

            <p>
              <strong>Pincode :</strong> {pg.pincode}
            </p>

            <p>
              <strong>Starting Rent :</strong> ₹{pg.rentStarting}
            </p>

            <p>
              <strong>Rating :</strong> ⭐ {pg.rating}
            </p>

            <p>
              <strong>Food :</strong>{" "}
              {pg.foodAvailable ? "Available" : "Not Available"}
            </p>

            <p>
              <strong>WiFi :</strong>{" "}
              {pg.wifiAvailable ? "Available" : "Not Available"}
            </p>

            <p>
              <strong>Laundry :</strong>{" "}
              {pg.laundryAvailable ? "Available" : "Not Available"}
            </p>

            <button
              className="btn btn-success me-2"
              onClick={() => navigate(`/booking/${pg.pgId}`)}
            >
              Book Now
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Back
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default PGDetails;