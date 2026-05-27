import { describe, test, expect, beforeEach, vi } from "vitest";

// Unit tests follow the ZOMBIES approach taught in SWE1:
// Z(ero), O(ne), M(any), B(oundary), I(nterface), E(xceptions), S(imple).
// The mock has module-level state, so each test re-imports the module via
// vi.resetModules() to keep tests independent (Clean Code JS: single concept
// per test, no order dependencies).

describe("roomsApi", () => {
  let roomsApi;

  beforeEach(async () => {
    vi.resetModules();
    const mod = await import("../api/roomsApi");
    roomsApi = mod.roomsApi;
  });

  describe("getRooms", () => {
    // O - One: returns a non-empty list seeded from the mock
    test("O - returns the seeded rooms with id and name fields", async () => {
      const rooms = await roomsApi.getRooms();
      expect(rooms.length).toBeGreaterThan(0);
      expect(rooms[0]).toHaveProperty("id");
      expect(rooms[0]).toHaveProperty("name");
    });

    // M - Many: seed contains multiple rooms
    test("M - seed data contains Living Room and Bedroom", async () => {
      const rooms = await roomsApi.getRooms();
      expect(rooms.length).toBe(2);
      const names = rooms.map((r) => r.name);
      expect(names).toContain("Living Room");
      expect(names).toContain("Bedroom");
    });

    // I - Interface contract: returns a copy, external mutation is ignored
    test("I - returns a shallow copy so external mutation does not affect the store", async () => {
      const first = await roomsApi.getRooms();
      first.push({ id: "x", userId: "x", name: "Tampered" });
      const second = await roomsApi.getRooms();
      expect(second.find((r) => r.name === "Tampered")).toBeUndefined();
    });
  });

  describe("createRoom", () => {
    // O - One: creating one room adds it to the store
    test("O - creates one room and adds it to the store", async () => {
      const created = await roomsApi.createRoom({ userId: "u1", name: "Kitchen" });
      expect(created.name).toBe("Kitchen");
      expect(created.userId).toBe("u1");
      expect(created.id).toMatch(/^room-/);
      const rooms = await roomsApi.getRooms();
      expect(rooms.map((r) => r.name)).toContain("Kitchen");
    });

    // M - Many: creating multiple rooms keeps each one
    test("M - creating multiple rooms keeps each one in the store", async () => {
      await roomsApi.createRoom({ userId: "u1", name: "Kitchen" });
      await roomsApi.createRoom({ userId: "u1", name: "Bathroom" });
      const names = (await roomsApi.getRooms()).map((r) => r.name);
      expect(names).toContain("Kitchen");
      expect(names).toContain("Bathroom");
    });

    // B - Boundary: sequentially created rooms get different ids
    test("B - sequentially created rooms get unique ids", async () => {
      const a = await roomsApi.createRoom({ userId: "u1", name: "A" });
      await new Promise((r) => setTimeout(r, 5));
      const b = await roomsApi.createRoom({ userId: "u1", name: "B" });
      expect(a.id).not.toBe(b.id);
    });
  });

  describe("deleteRoom", () => {
    // O - One: deleting an existing room removes it from the store
    test("O - deleting an existing room removes it from the store", async () => {
      const created = await roomsApi.createRoom({ userId: "u1", name: "Kitchen" });
      await roomsApi.deleteRoom(created.id);
      const rooms = await roomsApi.getRooms();
      expect(rooms.find((r) => r.id === created.id)).toBeUndefined();
    });

    // Z - Zero: deleting every room leaves an empty store and does not throw
    test("Z - after deleting every room the store is empty", async () => {
      const initial = await roomsApi.getRooms();
      for (const r of initial) await roomsApi.deleteRoom(r.id);
      const after = await roomsApi.getRooms();
      expect(after).toEqual([]);
    });

    // E - Exception/edge: deleting an unknown id returns a placeholder, no throw,
    // and leaves the store unchanged
    test("E - deleting an unknown id returns a placeholder and does not change the store", async () => {
      const before = (await roomsApi.getRooms()).length;
      const result = await roomsApi.deleteRoom("nonexistent");
      expect(result.id).toBe("nonexistent");
      const after = (await roomsApi.getRooms()).length;
      expect(after).toBe(before);
    });
  });
});
