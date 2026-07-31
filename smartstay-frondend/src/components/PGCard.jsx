import { Link } from "react-router-dom";
import { addToWishlist } from "../services/wishlistService";

function PGCard({ pg }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const handleWishlist = async () => {

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {

      await addToWishlist({

        userId: user.userId,
        pgId: pg.pgId

      });

      alert("Added to Wishlist ❤️");

    } catch (error) {

      alert(error.response?.data || "PG is already in your wishlist.");

    }

  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">

      <div className="card shadow h-100">

        <img
          src="https://placehold.co/400x250"
          className="card-img-top"
          alt={pg.pgName}
        />

        <div className="card-body">

          <h5>{pg.pgName}</h5>

          <p className="text-muted">
            📍 {pg.city}
          </p>

          <h4 className="text-primary">
            ₹{pg.rentStarting}/month
          </h4>

          <p>⭐ {pg.rating ?? "New"}</p>

          <div className="mb-3">

            {pg.wifiAvailable && (
              <span className="badge bg-success me-2">
                WiFi
              </span>
            )}

            {pg.foodAvailable && (
              <span className="badge bg-warning text-dark me-2">
                Food
              </span>
            )}

            {pg.laundryAvailable && (
              <span className="badge bg-info">
                Laundry
              </span>
            )}

          </div>

          <button
            className="btn btn-outline-danger w-100 mb-2"
            onClick={handleWishlist}
          >
            ❤️ Add to Wishlist
          </button>

          <Link
            to={`/pg/${pg.pgId}`}
            className="btn btn-primary w-100"
          >
            View Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default PGCard;