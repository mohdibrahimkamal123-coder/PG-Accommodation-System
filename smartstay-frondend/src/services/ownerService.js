import api from "./api"; // Shared Axios Instance Use Ho Raha Hai

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

// PG
export const getMyPgs = (ownerId) =>
    api.get(`/owner/pgs/owner/${ownerId}`);

// ==========================================
// Updated Add PG (Handles JSON + Multipart Image Upload)
// ==========================================
export const addPg = (pgData, imageFile) => {
    const formData = new FormData();

    formData.append(
        "pg",
        new Blob(
            [JSON.stringify(pgData)],
            { type: "application/json" }
        )
    );

    if (imageFile) {
        formData.append("image", imageFile);
    }

    return api.post("/owners/add-pg", formData);
};

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