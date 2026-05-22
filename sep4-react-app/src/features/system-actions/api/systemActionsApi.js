import { systemActions } from "../mocks/systemActions.mock";
import { apiGet } from "../../../shared/api/httpClient";
import { SHARED_ROOM_ID } from "../../../shared/api/constants";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_IOT_URL;

async function getActionsMock(roomId) {
  await new Promise((res) => setTimeout(res, 500));
  return systemActions[roomId] ?? [];
}

function adaptServerActionLog(dto) {
  return {
    id: dto.id,
    roomId: dto.roomId,
    deviceType: dto.deviceType,
    previousState: dto.previousState ?? null,
    newState: dto.newState,
    timestampUtc: dto.timestampUtc,
  };
}

async function getActionsRest() {
  // Device action logs live under the shared physical room (see IoT seed data).
  const dtos = await apiGet(`${API_URL}/device-logs/room/${SHARED_ROOM_ID}`);
  return dtos.map(adaptServerActionLog);
}

export const systemActionsApi = {
  getActions: (roomId) =>
    USE_MOCK ? getActionsMock(roomId) : getActionsRest(roomId),
};
