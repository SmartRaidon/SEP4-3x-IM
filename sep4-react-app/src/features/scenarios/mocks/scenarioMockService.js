import { mockScenario } from "../mocks/scenario.mock";

function getRandomChange(type) {
  const variationMap = {
    temperature: 1.5,
    humidity: 3,
    light: 20,
  };

  return (Math.random() - 0.5) * variationMap[type] * 2;
}

export const scenarioMockService = {
  getScenario: async () => {
    await new Promise((res) => setTimeout(res, 500));
    return mockScenario;
  },

  sendFeedback: async ({ valueType, feedback }) => {
    await new Promise((res) => setTimeout(res, 300));

    if (feedback === 0) {
      const current = mockScenario.values.find((v) => v.type === valueType).predictedValue;
      const newValue = current + getRandomChange(valueType);

      return {
        success: true,
        newPredictedValue: Math.round(newValue * 10) / 10,
      };
    }

    return { success: true };
  },
};