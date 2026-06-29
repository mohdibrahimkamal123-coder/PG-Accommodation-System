import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PGCard from "../components/PGCard";
import { getAllPgs, getPgsByCity } from "../services/pgService";

function PgListing() {
  const [pgs, setPgs] = useState([]);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [rent, setRent] = useState("");
const [wifi, setWifi] = useState(false);
const [food, setFood] = useState(false);

  useEffect(() => {
    loadPgs();
  }, []);
  useEffect(() => {

  const timer = setTimeout(() => {

    searchByCity();

  }, 500);

  return () => clearTimeout(timer);

}, [city]);

const loadPgs = async () => {
  try {
    setLoading(true);

    const response = await getAllPgs();
    setPgs(response.data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  const searchByCity = async () => {
  try {

    setLoading(true);

    if (city.trim() === "") {
      await loadPgs();
      return;
    }

    const response = await getPgsByCity(city);

    setPgs(response.data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <div className="container mt-5">
       <div className="d-flex justify-content-between align-items-center mb-4">

  <h2>Available PGs</h2>

  <span className="badge bg-primary fs-6">
    {pgs.length} PG Found
  </span>

</div>
        <div className="row mb-4">
  <div className="col-md-12">

    <div className="input-group">

      <span className="input-group-text">
        <i className="bi bi-search"></i>
      </span>

      <input
        type="text"
        className="form-control"
        placeholder="Search by City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

    </div>

  </div>
</div>

      {loading ? (

  <div className="text-center my-5">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>

    <p className="mt-3 fw-bold">Loading PGs...</p>
  </div>

) : pgs.length === 0 ? (

  <div className="text-center py-5">

    <h2>😕 No PG Found</h2>

    <p className="text-muted">
      No PGs available for "<strong>{city}</strong>"
    </p>

    <button
      className="btn btn-outline-primary mt-3"
      onClick={() => {
        setCity("");
        loadPgs();
      }}
    >
      Show All PGs
    </button>

  </div>

) : (

  <div className="row">
    {pgs.map((pg) => (
      <PGCard key={pg.pgId} pg={pg} />
    ))}
  </div>

)}
      </div>
    </>
  );
}

export default PgListing;