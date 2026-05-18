export const mockScenario = {
  id: "mocked-scenario-1",
  roomId: 1,
  date: "2026-04-29",
  predictionHoursAhead: 6,
  values: [
    {
      type: "temperature",
      label: "Temperature",
      currentValue: 22,
      predictedValue: 23,
      unit: "°C",
    },
    {
      type: "humidity",
      label: "Humidity",
      currentValue: 45,
      predictedValue: 50,
      unit: "%",
    },
    {
      type: "light",
      label: "Light",
      currentValue: 300,
      predictedValue: 250,
      unit: "lx",
    },
  ],
};

export const mockedNewPredictedValues = {
  temperature: 24,
  humidity: 48,
  light: 275,
};