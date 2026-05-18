import { describe, it, expect } from "vitest";
import { measurementsApi } from "../services/measurementsApi";

describe("measurementsApi.getMeasurements", () => {
    // happy scenario - valid room ID shows right measurements
    it("resolves with measurements when given a valid roomId", async () => {
        const result = await measurementsApi.getMeasurements(1);
        expect(result.roomId).toBe(1);
        expect(result.temperature.value).toBe(18);
        expect(result.humidity.value).toBe(40);
        expect(result.light.value).toBe(40);
    });
    
    // error case - invalid roomId rejects with an Error
    it("rejects with an error when user input incorrect room id", async () => {
        await expect(measurementsApi.getMeasurements(1000000))
            .rejects.toThrow("No measurements for room 1000000");
    });
});
