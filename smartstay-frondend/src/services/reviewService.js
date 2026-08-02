import api from "./api";

// Get all reviews of a PG
export const getReviewsByPg = async (pgId) => {
    const response = await api.get(`/reviews/pg/${pgId}`);
    return response.data;
};

// Add Review
export const addReview = async (reviewData) => {
    const response = await api.post("/reviews", reviewData);
    return response.data;
};

// Get reviews given by a user
export const getReviewsByUser = async (userId) => {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
};

// Delete Review
export const deleteReview = async (reviewId) => {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
};
export const getTopReviews = async () => {
    const response = await api.get("/reviews/top");
    return response.data;
};
