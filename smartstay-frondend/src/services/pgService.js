import api from "./api";
export const getPgById = (id) => api.get(`/pgs/${id}`);
export const getAllPgs = () => api.get("/pgs");
export const getPgsByCity = (city) =>
  api.get(`/pgs/city/${city}`);
