import api from "./api";

export const ownerLogin = (data) => {
    return api.post("/owners/login", data);
};

// Dashboard
export const getDashboard = (ownerId) =>
    api.get(`/owners/dashboard/${ownerId}`);

// Profile
export const getProfile = (ownerId) =>
    api.get(`/owners/profile/${ownerId}`);

export const updateProfile = (ownerId, data) =>
    api.put(`/owners/profile/${ownerId}`, data);

export const changePassword = (ownerId, data) =>
    api.put(`/owners/change-password/${ownerId}`, data);

// PG
export const getMyPgs = (ownerId) =>
    api.get(`/owner/pgs/owner/${ownerId}`);

export const addPg = (data) =>
    api.post("/owner/pgs", data);

export const updatePg = (id, data) =>
    api.put(`/owner/pgs/${id}`, data);

export const deletePg = (id) =>
    api.delete(`/owner/pgs/${id}`);

// Rooms
export const getRooms = (pgId) =>
    api.get(`/owner/rooms/pg/${pgId}`);

export const addRoom = (data) =>
    api.post("/owner/rooms", data);

export const updateRoom = (id, data) =>
    api.put(`/owner/rooms/${id}`, data);

export const deleteRoom = (id) =>
    api.delete(`/owner/rooms/${id}`);

// Bookings
export const getBookings = (ownerId) =>
    api.get(`/owner/bookings/${ownerId}`);

export const approveBooking = (id) =>
    api.put(`/owner/bookings/${id}/approve`);

export const rejectBooking = (id) =>
    api.put(`/owner/bookings/${id}/reject`);

export const completeBooking = (id) =>
    api.put(`/owner/bookings/${id}/complete`);