import api from "./api";

export const getAllPgs = async () => {
  const response = await api.get("/pgs");
  return response.data;
};

export const getPgById = async (id) => {
  const response = await api.get(`/pgs/${id}`);
  return response.data;
};

export const getPgsByCity = async (city) => {
  const response = await api.get(`/pgs/city/${city}`);
  return response.data;
};

export const getTopRatedPgs = async () => {
  const response = await api.get("/pgs/top-rated");
  return response.data;
};

export const getPgsByRent = async (rent) => {
  const response = await api.get(`/pgs/rent/${rent}`);
  return response.data;
};

export const getWifiPgs = async () => {
  const response = await api.get("/pgs/wifi");
  return response.data;
};

export const getFoodPgs = async () => {
  const response = await api.get("/pgs/food");
  return response.data;
};