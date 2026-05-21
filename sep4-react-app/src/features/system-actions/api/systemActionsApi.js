import { systemActions } from "../mocks/systemActions.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = "/api/device-action-log";

async function getActionsMock(roomId) {
  await new Promise((res) => setTimeout(res, 500));
  return systemActions[roomId] ?? [];
}

function adaptServerActionLog(dto) {
  return {
    id: dto.Id,
    roomId: dto.RoomId,
    deviceType: dto.DeviceType,
    previousState: dto.PreviousState ?? null,
    newState: dto.NewState,
    timestampUtc: dto.TimestampUtc,
  };
}

async function getActionsRest(roomId) {
  const response = await fetch(`${API_URL}?roomId=${roomId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch system actions");
  }
  const dtos = await response.json();
  return dtos.map(adaptServerActionLog);
}

export const systemActionsApi = {
  getActions: (roomId) =>
    USE_MOCK ? getActionsMock(roomId) : getActionsRest(roomId),
};
