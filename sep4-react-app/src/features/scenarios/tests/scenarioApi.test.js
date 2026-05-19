import { describe, test, expect, beforeEach, vi } from "vitest";

describe("scenarioService (mock branch)", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("VITE_USE_MOCK", "true");
  });

  test("TC-API-01: getScenario resolves with the mock scenario containing all three metric types", async () => {
    const { scenarioService } = await import("../api/scenarioApi");
    const result = await scenarioService.getScenario(1);

    expect(result.roomId).toBe(1);
    expect(result.values.map((v) => v.type)).toEqual([
      "temperature",
      "humidity",
      "light",
    ]);
  });

  test("TC-API-02: sendFeedback with feedback=0 returns a newPredictedValue", async () => {
    const { scenarioService } = await import("../api/scenarioApi");
    const result = await scenarioService.sendFeedback({
      scenarioId: "x",
      valueType: "temperature",
      feedback: 0,
    });

    expect(result.success).toBe(true);
    expect(result.newPredictedValue).toBeDefined();
  });

  test("TC-API-03: sendFeedback with feedback=1 returns success without a new value", async () => {
    const { scenarioService } = await import("../api/scenarioApi");
    const result = await scenarioService.sendFeedback({
      scenarioId: "x",
      valueType: "temperature",
      feedback: 1,
    });

    expect(result.success).toBe(true);
    expect(result.newPredictedValue).toBeUndefined();
  });
});
