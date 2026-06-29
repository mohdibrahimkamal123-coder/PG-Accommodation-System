import api from "./api";

// Register User
export const registerUser = (userData) => {
  return api.post("/users/register", userData);
};

// User Login
export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

// Owner Login
export const ownerLogin = (credentials) => {
  return api.post("/auth/owner-login", credentials);
};

// Get User By Id
export const getUserById = (id) => {
  return api.get(`/users/${id}`);
};

// Update User
export const updateUser = (id, userData) => {
  return api.put(`/users/${id}`, userData);
};