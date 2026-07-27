// src/services/adminService.js

const API_BASE = 'http://localhost:8080/api/admin';

// ============ AUTH ============
export const adminLogin = (credentials) => {
    return fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(res => res.json());
};

export const adminLogout = () => {
    return fetch(`${API_BASE}/logout`, {
        method: 'POST'
    }).then(res => res.text());
};

// ============ DASHBOARD ============
export const getDashboard = () => {
    return fetch(`${API_BASE}/dashboard`)
        .then(res => res.json());
};

export const getStatistics = () => {
    return fetch(`${API_BASE}/statistics`)
        .then(res => res.json());
};

// ============ USERS ============
export const getAllUsers = () => {
    return fetch(`${API_BASE}/users`)
        .then(res => res.json());
};

export const getUserById = (id) => {
    return fetch(`${API_BASE}/users/${id}`)
        .then(res => res.json());
};

export const blockUser = (id) => {
    return fetch(`${API_BASE}/users/block/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const unblockUser = (id) => {
    return fetch(`${API_BASE}/users/unblock/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const deleteUser = (id) => {
    return fetch(`${API_BASE}/users/${id}`, {
        method: 'DELETE'
    }).then(res => res.text());
};

// ============ OWNERS ============
export const getAllOwners = () => {
    return fetch(`${API_BASE}/owners`)
        .then(res => res.json());
};

export const getOwnerById = (id) => {
    return fetch(`${API_BASE}/owners/${id}`)
        .then(res => res.json());
};

export const approveOwner = (id) => {
    return fetch(`${API_BASE}/owners/approve/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const rejectOwner = (id) => {
    return fetch(`${API_BASE}/owners/reject/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const deleteOwner = (id) => {
    return fetch(`${API_BASE}/owners/${id}`, {
        method: 'DELETE'
    }).then(res => res.text());
};

// ============ PGs ============
export const getAllPgs = () => {
    return fetch(`${API_BASE}/pgs`)
        .then(res => res.json());
};

export const getPgById = (id) => {
    return fetch(`${API_BASE}/pgs/${id}`)
        .then(res => res.json());
};

export const approvePg = (id) => {
    return fetch(`${API_BASE}/pgs/approve/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const rejectPg = (id) => {
    return fetch(`${API_BASE}/pgs/reject/${id}`, {
        method: 'PUT'
    }).then(res => res.text());
};

export const deletePg = (id) => {
    return fetch(`${API_BASE}/pgs/${id}`, {
        method: 'DELETE'
    }).then(res => res.text());
};

// ============ BOOKINGS ============
export const getAllBookings = () => {
    return fetch(`${API_BASE}/bookings`)
        .then(res => res.json());
};

export const getBookingById = (id) => {
    return fetch(`${API_BASE}/bookings/${id}`)
        .then(res => res.json());
};

export const deleteBooking = (id) => {
    return fetch(`${API_BASE}/bookings/${id}`, {
        method: 'DELETE'
    }).then(res => res.text());
};

// ============ REVIEWS ============
export const getAllReviews = () => {
    return fetch(`${API_BASE}/reviews`)
        .then(res => res.json());
};

export const deleteReview = (id) => {
    return fetch(`${API_BASE}/reviews/${id}`, {
        method: 'DELETE'
    }).then(res => res.text());
};

// ============ REPORTS & REVENUE ============
export const getReports = () => {
    return fetch(`${API_BASE}/reports`)
        .then(res => res.json());
};

export const getRevenue = () => {
    return fetch(`${API_BASE}/revenue`)
        .then(res => res.json());
};

export const exportData = () => {
    return fetch(`${API_BASE}/export`)
        .then(res => res.json());
};