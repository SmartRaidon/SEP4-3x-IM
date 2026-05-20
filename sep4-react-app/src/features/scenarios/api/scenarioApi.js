import { scenarioMockService } from "../mocks/scenarioMockService";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = "/api/scenarios";

export const apiService = {
  getScenario: async (roomId) => {
    const response = await fetch(`${API_URL}?roomId=${roomId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch scenario");
    }

    return response.json();
  },

  sendFeedback: async ({ scenarioId, valueType, feedback }) => {
    const response = await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ scenarioId, valueType, feedback })
    });

    if (!response.ok) {
      throw new Error("Failed to send feedback");
    }

    return response.json();
  },
};

export const scenarioService = USE_MOCK
  ? scenarioMockService
  : apiService;