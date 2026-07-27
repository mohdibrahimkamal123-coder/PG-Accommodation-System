import api from "./api";

export const addToWishlist = async (wishlistData) => {
  const response = await api.post("/wishlist", wishlistData);
  return response.data;
};

export const getWishlist = async (userId) => {
  const response = await api.get(`/wishlist/user/${userId}`);
  return response.data;
};

export const removeWishlist = async (wishlistId) => {
  const response = await api.delete(`/wishlist/${wishlistId}`);
  return response.data;
};