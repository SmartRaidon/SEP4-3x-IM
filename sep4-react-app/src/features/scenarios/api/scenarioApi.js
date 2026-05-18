import {
  mockScenario,
  mockedNewPredictedValues,
} from "../mocks/scenario.mock";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = "/api/scenarios";

export const scenarioService = {
  getScenario: async (roomId) => {
    if (USE_MOCK) {
      console.log("MOCK: getScenario");
      await new Promise((res) => setTimeout(res, 500));
      return mockScenario;
    }

    const response = await fetch(`${API_URL}?roomId=${roomId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch scenario");
    }

    return response.json();
  },

  sendFeedback: async ({ scenarioId, valueType, feedback }) => {
    if (USE_MOCK) {
      console.log("MOCK: sendFeedback", { scenarioId, valueType, feedback });
      await new Promise((res) => setTimeout(res, 300));

    if (feedback === 0) {
      return {
        success: true,
        newPredictedValue: mockedNewPredictedValues[valueType],
      };
    }

      return { success: true };
    }

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