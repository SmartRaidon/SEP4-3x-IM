import { measurements, measurementsHistory } from "../mocks/measurements.mock";
import { apiGet } from "../../../shared/api/httpClient";
import { SHARED_ROOM_ID } from "../../../shared/api/constants";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_IOT_URL;

async function getMeasurementsMock(roomId) {
  await new Promise((res) => setTimeout(res, 500));
  const room = measurements[roomId];
  if (!room) {
    throw new Error(`No measurements for room ${roomId}`);
  }
  return room;
}

function adaptServerMeasurement(roomId, dto) {
  const timeStamp = dto.timestampUtc;
  return {
    roomId,
    temperature: { value: dto.temperature, timeStamp },
    humidity:    { value: dto.humidity,    timeStamp },
    light:       { value: dto.light,       timeStamp },
  };
}

async function getMeasurementsRest(roomId) {
  // Sensor data always queries the shared physical room; the UI roomId is kept
  // only so the returned shape carries the caller's id for display.
  const dto = await apiGet(`${API_URL}/sensor-data/current?roomId=${SHARED_ROOM_ID}`);
  return adaptServerMeasurement(roomId, dto);
}

async function getMeasurementsHistoryRest(roomId) {
  const to = new Date().toISOString();
  const from = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const dtos = await apiGet(
    `${API_URL}/sensor-data/history?roomId=${SHARED_ROOM_ID}&from=${from}&to=${to}`
  );
  return dtos.map(adaptServerHistoryPoint);
}

async function getMeasurementsHistoryMock(roomId){
  await new Promise((res) => setTimeout(res,500));
  const room = measurementsHistory[roomId];
  if(!room) throw new Error(`No measurement history for room ${roomId}`);
  return room.history;
}


function adaptServerHistoryPoint(dto){
  return {
    timeStamp: dto.timestampUtc,
    temperature: dto.temperature,
    humidity: dto.humidity,
    light: dto.light,
  };
}

export const measurementsApi = {
  getMeasurements: (roomId) =>
    USE_MOCK ? getMeasurementsMock(roomId) : getMeasurementsRest(roomId),
  getMeasurementsHistory: (roomId) =>
    USE_MOCK ? getMeasurementsHistoryMock(roomId) : getMeasurementsHistoryRest(roomId),
};
