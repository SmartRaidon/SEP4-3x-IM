import { scenarioMockService } from "../mocks/scenarioMockService";
import { mockScenario } from "../mocks/scenario.mock";
import { apiGet, apiPost } from "../../../shared/api/httpClient";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_URL = import.meta.env.VITE_API_MAL_URL;

// MAL doesn't predict light (no training data), so we splice in the mock
// light card until they add a real value to ScenarioOut.
function pickMockLightValue() {
  return mockScenario.values.find((v) => v.type === "light");
}

function adaptScenario(dto) {
  return {
    id: dto.id,
    date: dto.createdAt ? dto.createdAt.slice(0, 10) : "",
    predictionHoursAhead: 6,
    values: [
      {
        type: "temperature",
        label: "Temperature",
        currentValue: dto.currentTemperature,
        predictedValue: dto.prefTemperature,
        unit: "°C",
      },
      {
        type: "humidity",
        label: "Humidity",
        currentValue: dto.currentHumidity,
        predictedValue: dto.prefHumidity,
        unit: "%",
      },
      pickMockLightValue(),
    ],
  };
}

export const apiService = {
  getScenario: async () => {
    const dto = await apiGet(`${API_URL}/scenario/current`);
    return adaptScenario(dto);
  },

  // MAL currently stores a single bool per scenario; per-metric feedback is
  // on their backlog. For now we collapse valueType and only forward `liked`.
  sendFeedback: async ({ scenarioId, feedback }) => {
    await apiPost(`${API_URL}/feedback`, {
      scenarioId,
      liked: feedback === 1,
    });
    return { success: true };
  },
};

export const scenarioService = USE_MOCK
  ? scenarioMockService
  : apiService;
