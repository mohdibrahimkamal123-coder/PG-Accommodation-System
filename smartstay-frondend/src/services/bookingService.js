import api from "./api";

// Create Booking
export const bookRoom = (bookingData) => {
  return api.post("/bookings", bookingData);
};

// Get Logged-in User Bookings
export const getUserBookings = (userId) => {
  return api.get(`/bookings/user/${userId}`);
};

// Cancel Booking
export const cancelBooking = (bookingId) => {
  return api.delete(`/bookings/${bookingId}`);
};