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

describe("authStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("saves token and user", () => {
    const token = "abc123";
    const user = {
      id: 1,
      name: "John",
    };

    saveAuth(token, user);
    expect(getToken()).toBe(token);
    expect(getUser()).toEqual(user);
  });

  test("clears auth data", () => {
    saveAuth("token", { id: 1 });
    clearAuth();
    expect(getToken()).toBeNull();
    expect(getUser()).toBeNull();
  });
});