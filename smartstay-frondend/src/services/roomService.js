import api from "./api";

export const getRoomsByPgId = (pgId) => {
  return api.get(`/rooms/pg/${pgId}`);
};