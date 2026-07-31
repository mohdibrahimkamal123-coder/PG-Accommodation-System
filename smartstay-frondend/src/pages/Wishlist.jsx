import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  getWishlist,
  removeFromWishlist,
} from "../services/wishlistService";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const data = await getWishlist(user.userId);
      setWishlist(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      loadWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">My Wishlist</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : wishlist.length === 0 ? (
          <div className="alert alert-warning">
            Wishlist is Empty.
          </div>
        ) : (
          <div className="row">

            {wishlist.map((item) => (
              <div className="col-md-4 mb-4" key={item.wishlistId}>

                <div className="card shadow">

                  <div className="card-body">

                    <h5>{item.pgName}</h5>

                    <p>{item.city}</p>

                   <p>₹{item.rentStarting}</p>

                   <p>⭐ {item.rating ?? "New"}</p>

                    <Link
                      to={`/pg/${item.pgId}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      View
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleRemove(item.wishlistId)
                      }
                    >
                      Remove
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
};

export default Wishlist;