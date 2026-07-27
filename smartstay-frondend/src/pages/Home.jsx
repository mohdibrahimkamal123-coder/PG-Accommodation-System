import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllPgs } from "../services/pgService";

const Home = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPgs();
  }, []);

  const loadPgs = async () => {
    try {
      const data = await getAllPgs();
      setPgs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <div className="text-center mb-4">
          <h2>Welcome to SmartStay</h2>
          <p>Find the best PG Accommodation</p>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <div className="row">

            {pgs.length > 0 ? (
              pgs.map((pg) => (
                <div className="col-md-4 mb-4" key={pg.pgId}>
                  <div className="card h-100 shadow">

                    <div className="card-body">

                      <h5>{pg.pgName}</h5>

                      <p>
                        <strong>City :</strong> {pg.city}
                      </p>

                      <p>
                        <strong>Address :</strong> {pg.address}
                      </p>

                      <p>
                        <strong>Rent :</strong> ₹{pg.rentStarting}
                      </p>

                      <p>
                        <strong>Rating :</strong> ⭐ {pg.rating}
                      </p>

                      <Link
                        to={`/pg/${pg.pgId}`}
                        className="btn btn-primary w-100"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center">No PG Found</h4>
            )}

          </div>
        )}

      </div>
    </>
  );
};

export default Home;