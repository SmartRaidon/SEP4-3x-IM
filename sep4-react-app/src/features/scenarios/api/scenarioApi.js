import { scenarioMockService } from "../mocks/scenarioMockService";
import { apiGet, apiPost } from "../shared/api/httpClient";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = "/scenarios";

export const apiService = {
  getScenario: async (roomId) => {
    return apiGet(`${API_URL}?roomId=${roomId}`);
  },

  sendFeedback: async ({ scenarioId, valueType, feedback }) => {
    return apiPost(`${API_URL}/feedback`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ scenarioId, valueType, feedback })
    });
  },
};

export const scenarioService = USE_MOCK
  ? scenarioMockService
  : apiService;