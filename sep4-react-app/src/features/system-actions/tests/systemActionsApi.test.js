import { describe, it, expect } from "vitest";
import { systemActionsApi } from "../api/systemActionsApi";
import { DEVICE_TYPES, ACTIONS_BY_DEVICE } from "../constants/deviceActions";

describe("systemActionsApi.getActions (mock)", () => {
  it("resolves with an array of actions for a known roomId", async () => {
    const result = await systemActionsApi.getActions("room-1");
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns entries with the expected DeviceActionLog shape", async () => {
    const result = await systemActionsApi.getActions("room-1");
    const entry = result[0];
    expect(entry).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        roomId: "room-1",
        deviceType: expect.any(String),
        newState: expect.any(String),
        timestampUtc: expect.any(String),
      }),
    );
    expect(entry.previousState === null || typeof entry.previousState === "string").toBe(true);
  });

  it("only uses known device types and matching states", async () => {
    const result = await systemActionsApi.getActions("room-1");
    const knownTypes = Object.values(DEVICE_TYPES);
    for (const entry of result) {
      expect(knownTypes).toContain(entry.deviceType);
      const validStates = ACTIONS_BY_DEVICE[entry.deviceType];
      expect(validStates).toContain(entry.newState);
      if (entry.previousState !== null) {
        expect(validStates).toContain(entry.previousState);
      }
    }
  });

  it("sorts results newest-first", async () => {
    const result = await systemActionsApi.getActions("room-1");
    for (let i = 1; i < result.length; i++) {
      const prev = new Date(result[i - 1].timestampUtc).getTime();
      const curr = new Date(result[i].timestampUtc).getTime();
      expect(prev).toBeGreaterThanOrEqual(curr);
    }
  });

  it("returns an empty array for an unknown roomId", async () => {
    const result = await systemActionsApi.getActions("nonexistent");
    expect(result).toEqual([]);
  });
});
