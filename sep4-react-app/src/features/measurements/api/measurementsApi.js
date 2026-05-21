import { measurements, measurementsHistory } from "../mocks/measurements.mock";
import { apiGet } from "../../shared/api/httpClient";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = "/api/measurements";
const HISTORY_URL = "api/...";

async function getMeasurementsMock(roomId) {
  await new Promise((res) => setTimeout(res, 500));
  const room = measurements[roomId];
  if (!room) {
    throw new Error(`No measurements for room ${roomId}`);
  }
  return room;
}

function adaptServerMeasurement(roomId, dto) {
  const timeStamp = dto.TimestampUtc;
  return {
    roomId,
    temperature: { value: dto.Temperature, timeStamp },
    humidity:    { value: dto.Humidity,    timeStamp },
    light:       { value: dto.Light,       timeStamp },
  };
}

async function getMeasurementsRest(roomId) {
  const dto = await apiGet(`${API_URL}?roomId=${roomId}`);
  return adaptServerMeasurement(roomId, dto);
}

async function getMeasurementsHistoryRest(roomId) {
  const dtos = await apiGet(`${HISTORY_URL}?roomId=${roomId}`);
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
    timeStamp: dto.TimestampUtc,
    temperature: dto.Temperature,
    humidity: dto.Humidity,
    light: dto.Light,
  };
}

export const measurementsApi = {
  getMeasurements: (roomId) =>
    USE_MOCK ? getMeasurementsMock(roomId) : getMeasurementsRest(roomId),
  getMeasurementsHistory: (roomId) =>
    USE_MOCK ? getMeasurementsHistoryMock(roomId) : getMeasurementsHistoryRest(roomId),
};
