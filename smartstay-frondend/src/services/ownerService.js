import api from "./api";

// Auth & Registration
export const ownerLogin = (data) =>
    api.post("/owners/login", data);

export const ownerRegister = (data) =>
    api.post("/owners/register", data);

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

// ==========================
// PG APIs
// ==========================

export const getMyPgs = (ownerId) =>
    api.get(`/owner/pgs/owner/${ownerId}`);

// Add PG
export const addPg = (pgData, imageFile) => {

    const formData = new FormData();

    Object.keys(pgData).forEach((key) => {
        formData.append(key, pgData[key]);
    });

    if (imageFile) {
        formData.append("image", imageFile);
    }

    return api.post("/owner/pgs", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Update PG
export const updatePg = (id, pgData, imageFile) => {

    const formData = new FormData();

    Object.keys(pgData).forEach((key) => {
        formData.append(key, pgData[key]);
    });

    if (imageFile) {
        formData.append("image", imageFile);
    }

    return api.put(`/owner/pgs/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// Delete PG
export const deletePg = (id) =>
    api.delete(`/owner/pgs/${id}`);

// ==========================
// Rooms
// ==========================

export const getRooms = (pgId) =>
    api.get(`/owner/rooms/pg/${pgId}`);

export const addRoom = (data) =>
    api.post("/owner/rooms", data);

export const updateRoom = (id, data) =>
    api.put(`/owner/rooms/${id}`, data);

export const deleteRoom = (id) =>
    api.delete(`/owner/rooms/${id}`);

// ==========================
// Bookings
// ==========================

export const getBookings = (ownerId) =>
    api.get(`/owner/bookings/${ownerId}`);

export const approveBooking = (id) =>
    api.put(`/owner/bookings/${id}/approve`);

export const rejectBooking = (id) =>
    api.put(`/owner/bookings/${id}/reject`);

export const completeBooking = (id) =>
    api.put(`/owner/bookings/${id}/complete`);