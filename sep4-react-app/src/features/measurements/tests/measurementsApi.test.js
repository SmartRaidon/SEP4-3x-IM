import { describe, it, expect } from "vitest";
import { measurementsApi } from "../api/measurementsApi";


describe("measurementsApi.getMeasurements", () => {
    // Z - Zero: empty roomId rejects (no data exists for it)
    it("Z - empty roomId rejects (no data for empty key)", async () => {
        await expect(measurementsApi.getMeasurements(""))
            .rejects.toThrow(/No measurements/);
    });
   
    // O - One: valid roomId returns the room's measurements
    it("O - returns the room's measurements for a valid roomId", async () => {
        const result = await measurementsApi.getMeasurements("room-1");
        expect(result.roomId).toBe("room-1");
        expect(result.temperature.value).toBe(18);
        expect(result.humidity.value).toBe(40);
        expect(result.light.value).toBe(40);
    });

    // M - Many: sequential calls for different rooms return independent data
    it("M - sequential calls for different rooms return independent data", async () => {
        const r1 = await measurementsApi.getMeasurements("room-1");
        const r2 = await measurementsApi.getMeasurements("room-2");
        expect(r1.roomId).toBe("room-1");
        expect(r2.roomId).toBe("room-2");
        expect(r1.temperature.value).not.toBe(r2.temperature.value);
    });

   

    // B - Boundary: a roomId just outside the valid set rejects
    it("B - roomId just outside the valid set rejects", async () => {
        await expect(measurementsApi.getMeasurements("room-0"))
            .rejects.toThrow("No measurements for room room-0");
    });

    // E - Exception: unknown roomId rejects with a descriptive error
    it("E - unknown roomId rejects with a descriptive error", async () => {
        await expect(measurementsApi.getMeasurements("nonexistent"))
            .rejects.toThrow("No measurements for room nonexistent");
    });
});

describe("measurementsApi.getMeasurementsHistory", () => {
    // O - One: valid roomId returns an array of history points
    it("O - returns an array of history points for a valid roomId", async () => {
        const history = await measurementsApi.getMeasurementsHistory("room-1");
        expect(Array.isArray(history)).toBe(true);
        expect(history.length).toBeGreaterThan(0);
        expect(history[0]).toHaveProperty("timeStamp");
        expect(history[0]).toHaveProperty("temperature");
        expect(history[0]).toHaveProperty("humidity");
        expect(history[0]).toHaveProperty("light");
    });

    // M - Many: history contains many data points (21 hourly samples)
    it("M - returns 21 hourly data points for the last 20 hours", async () => {
        const history = await measurementsApi.getMeasurementsHistory("room-1");
        expect(history.length).toBe(21);
    });

    // B - Boundary: oldest point comes before the newest point
    it("B - first timestamp is older than the last timestamp", async () => {
        const history = await measurementsApi.getMeasurementsHistory("room-1");
        const first = new Date(history[0].timeStamp).getTime();
        const last = new Date(history[history.length - 1].timeStamp).getTime();
        expect(first).toBeLessThan(last);
    });

    // Z - Zero: empty roomId rejects (no history for empty key)
    it("Z - empty roomId rejects (no history for empty key)", async () => {
        await expect(measurementsApi.getMeasurementsHistory(""))
            .rejects.toThrow(/No measurement history/);
    });

    // E - Exception: unknown roomId rejects with a descriptive error
    it("E - unknown roomId rejects with a descriptive error", async () => {
        await expect(measurementsApi.getMeasurementsHistory("nonexistent"))
            .rejects.toThrow("No measurement history for room nonexistent");
    });
});
