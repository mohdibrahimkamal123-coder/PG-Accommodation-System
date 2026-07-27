import api from "./api";

export const addReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

export const getReviewsByPg = async (pgId) => {
  const response = await api.get(`/reviews/pg/${pgId}`);
  return response.data;
};

export const getReviewsByUser = async (userId) => {
  const response = await api.get(`/reviews/user/${userId}`);
  return response.data;
};

export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};