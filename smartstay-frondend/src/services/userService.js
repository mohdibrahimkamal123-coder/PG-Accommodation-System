import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const changePassword = async (userId, passwordData) => {
  const response = await api.put(
    `/users/change-password/${userId}`,
    passwordData
  );
  return response.data;
};