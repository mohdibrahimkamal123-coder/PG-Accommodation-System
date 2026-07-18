import api from "./api";

// Add PG to Wishlist
export const addToWishlist = (wishlistData) => {
  return api.post("/wishlist", wishlistData);
};

// Get User Wishlist
export const getWishlistByUser = (userId) => {
  return api.get(`/wishlist/user/${userId}`);
};

// Remove Wishlist Item
export const removeFromWishlist = (wishlistId) => {
  return api.delete(`/wishlist/${wishlistId}`);
};