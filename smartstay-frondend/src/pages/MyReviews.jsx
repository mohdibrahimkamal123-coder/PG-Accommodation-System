import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getReviewsByUser, deleteReview } from "../services/reviewService";

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviewsByUser(user.userId);
      setReviews(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await deleteReview(reviewId);
      loadReviews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">My Reviews</h2>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="alert alert-warning">
            No Reviews Found.
          </div>
        ) : (
          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>PG Name</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {reviews.map((review) => (
                <tr key={review.reviewId}>
                  <td>{review.pgName}</td>
                  <td>{review.rating}</td>
                  <td>{review.comment}</td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(review.reviewId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>
    </>
  );
};

export default MyReviews;