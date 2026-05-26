import {
  describe,
  test,
  expect,
  beforeEach,
} from "vitest";
import {
  saveAuth,
  clearAuth,
  getToken,
  getUser,
} from "../utils/authStorage";

// Unit tests follow the ZOMBIES approach taught in SWE1:
// Z(ero), O(ne), M(any), B(oundary), I(nterface), E(xceptions), S(imple).
// Interface and Simple are met by the test structure itself. The authStorage
// contract does not throw on any documented input, so E is "no exceptions".

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Z - Zero: fresh storage with nothing saved returns null for both reads
  test("Z - fresh storage: getToken and getUser return null", () => {
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
  });

  // Z - Zero: clearAuth wipes both keys, both reads return null
  test("Z - clearAuth wipes saved auth: both reads return null", () => {
    saveAuth("token", { id: 1 });
    clearAuth();
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
  });

  // O - One: saves one token and user, both can be read back
  test("O - saves one token and user, both read back", () => {
    const user = { id: 1, name: "John" };
    saveAuth("abc123", user);
    expect(getToken()).toBe("abc123");
    expect(getUser()).toEqual(user);
  });

  // M - Many: saving twice keeps only the latest token and user
  test("M - saving twice keeps only the latest token and user", () => {
    saveAuth("first-token", { id: 1, name: "John" });
    saveAuth("second-token", { id: 2, name: "Jane" });
    expect(getToken()).toBe("second-token");
    expect(getUser()).toEqual({ id: 2, name: "Jane" });
  });

  // B - Boundary: a minimal user object with only required fields is saved as-is
  test("B - saves and reads a minimal user object with only an id", () => {
    saveAuth("token", { id: 42 });
    expect(getUser()).toEqual({ id: 42 });
  });

  // B - Boundary: clearAuth on already-empty storage is a no-op and does not throw
  test("B - clearAuth on already-empty storage does not throw", () => {
    expect(() => clearAuth()).not.toThrow();
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
  });
});
