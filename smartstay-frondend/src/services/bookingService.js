import api from "./api";

// Get all bookings of logged-in user
export const getUserBookings = (userId) => {
  return api.get(`/bookings/user/${userId}`);
};

// Cancel booking
export const cancelBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};

export const bookRoom = (bookingData) => {
  return api.post("/bookings", bookingData);
};