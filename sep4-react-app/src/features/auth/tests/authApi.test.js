import { describe, test, expect, beforeEach, vi } from "vitest";

describe("authApi (real API branch)", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  test("loginUser calls fetch", async () => {
    vi.stubEnv("VITE_USE_MOCK", "false");

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        token: "abc",
        user: { id: 1 },
      }),
    });

    const { loginUser } = await import("../services/authService");

    const result = await loginUser({
      email: "test@test.com",
      password: "123456",
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(result.token).toBe("abc");
  });

  test("registerUser calls fetch", async () => {
    vi.stubEnv("VITE_USE_MOCK", "false");

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
      }),
    });

    const { registerUser } = await import("../services/authService");

    const result = await registerUser({
      name: "John",
      email: "john@test.com",
      password: "123456",
    });

    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
  });
});