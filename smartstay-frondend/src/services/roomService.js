import api from "./api";

export const getRoomsByPgId = async (pgId) => {
  const response = await api.get(`/rooms/pg/${pgId}`);
  return response.data;
};