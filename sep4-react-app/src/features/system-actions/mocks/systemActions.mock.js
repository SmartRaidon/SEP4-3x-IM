import { DEVICE_TYPES, ACTIONS_BY_DEVICE } from "../constants/deviceActions";

const ROOM_IDS = [1, 2];
const ENTRIES_PER_ROOM = 25;
const MAX_AGE_MINUTES = 7 * 24 * 60;

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateActionsForRoom(roomId) {
  const deviceTypes = Object.values(DEVICE_TYPES);
  const entries = [];

  for (let i = 0; i < ENTRIES_PER_ROOM; i++) {
    const deviceType = pickRandom(deviceTypes);
    const possibleStates = ACTIONS_BY_DEVICE[deviceType];
    const newState = pickRandom(possibleStates);
    const otherStates = possibleStates.filter((s) => s !== newState);
    const isFirstEver = Math.random() < 0.1;
    const previousState = isFirstEver ? null : pickRandom(otherStates);

    const minutesAgo = Math.floor(Math.random() * MAX_AGE_MINUTES);
    const timestampUtc = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();

    entries.push({
      id: i + 1,
      roomId,
      deviceType,
      previousState,
      newState,
      timestampUtc,
    });
  }

  return entries.sort((a, b) => new Date(b.timestampUtc) - new Date(a.timestampUtc));
}

export const systemActions = ROOM_IDS.reduce((acc, roomId) => {
  acc[roomId] = generateActionsForRoom(roomId);
  return acc;
}, {});
