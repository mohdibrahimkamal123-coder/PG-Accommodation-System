import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAllPgs, getPgsByCity } from "../services/pgService";

const FindPG = () => {
  const [pgs, setPgs] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllPgs();
  }, []);

  const loadAllPgs = async () => {
    try {
      const data = await getAllPgs();
      setPgs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (city.trim() === "") {
      loadAllPgs();
      return;
    }

    try {
      setLoading(true);
      const data = await getPgsByCity(city);
      setPgs(data);
    } catch (err) {
      console.error(err);
      setPgs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">Find PG</h2>

        <div className="row mb-4">
          <div className="col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Search by City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : (
          <div className="row">
            {pgs.length > 0 ? (
              pgs.map((pg) => (
                <div className="col-md-4 mb-4" key={pg.pgId}>
                  <div className="card h-100 shadow-sm">

                    <div className="card-body">

                      <h5>{pg.pgName}</h5>

                      <p>
                        <strong>City :</strong> {pg.city}
                      </p>

                      <p>
                        <strong>Rent :</strong> ₹{pg.rentStarting}
                      </p>

                      <p>
                        <strong>Rating :</strong> ⭐ {pg.rating}
                      </p>

                      <Link
                        to={`/pg/${pg.pgId}`}
                        className="btn btn-success w-100"
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

export default FindPG;