import api from "./api";

export const loginUser = async (loginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const ownerLogin = async (loginData) => {
  const response = await api.post("/auth/owner-login", loginData);
  return response.data;
};