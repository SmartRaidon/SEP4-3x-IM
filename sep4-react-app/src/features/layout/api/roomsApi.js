import { rooms as initialRooms } from "../mocks/rooms.mock";
import { apiGet, apiPost, apiDelete } from "../../../shared/api/httpClient";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_IOT_URL;

let mockStore = initialRooms.map((r) => ({ ...r }));

async function getRoomsMock() {
  await new Promise((res) => setTimeout(res, 200));
  return mockStore.map((r) => ({ ...r }));
}

async function createRoomMock({ userId, name }) {
  await new Promise((res) => setTimeout(res, 200));
  const room = { id: `room-${Date.now()}`, userId, name };
  mockStore = [...mockStore, room];
  return room;
}

async function deleteRoomMock(id) {
  await new Promise((res) => setTimeout(res, 200));
  const room = mockStore.find((r) => r.id === id) ?? { id, userId: "", name: "" };
  mockStore = mockStore.filter((r) => r.id !== id);
  return room;
}

async function getRoomsRest() {
  return apiGet(`${API_URL}/rooms`);
}

async function createRoomRest({ userId, name }) {
  const response = await apiPost(`${API_URL}/rooms`, { userId, name });
  return response.room;
}

async function deleteRoomRest(id) {
  const response = await apiDelete(`${API_URL}/rooms/${id}`);
  return response.room;
}

export const roomsApi = {
  getRooms: () => (USE_MOCK ? getRoomsMock() : getRoomsRest()),
  createRoom: (payload) =>
    USE_MOCK ? createRoomMock(payload) : createRoomRest(payload),
  deleteRoom: (id) => (USE_MOCK ? deleteRoomMock(id) : deleteRoomRest(id)),
};
