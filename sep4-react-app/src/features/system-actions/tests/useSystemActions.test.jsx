import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useSystemActions } from "../hooks/useSystemActions";

vi.mock("../api/systemActionsApi", () => ({
  systemActionsApi: {
    getActions: vi.fn(),
  },
}));

import { systemActionsApi } from "../api/systemActionsApi";

const sampleRows = [
  { id: 1, roomId: 1, deviceType: "Heater", previousState: "Off", newState: "On", timestampUtc: new Date().toISOString() },
];

describe("useSystemActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null data and skips fetch when roomId is missing", () => {
    const { result } = renderHook(() => useSystemActions(null));
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(systemActionsApi.getActions).not.toHaveBeenCalled();
  });

  it("loads data for a given roomId", async () => {
    systemActionsApi.getActions.mockResolvedValueOnce(sampleRows);
    const { result } = renderHook(() => useSystemActions(1));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toEqual(sampleRows);
    expect(result.current.error).toBeNull();
    expect(systemActionsApi.getActions).toHaveBeenCalledWith(1);
  });

  it("surfaces errors from the api", async () => {
    const err = new Error("boom");
    systemActionsApi.getActions.mockRejectedValueOnce(err);
    const { result } = renderHook(() => useSystemActions(1));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.error).toBe(err);
    expect(result.current.data).toBeNull();
  });
});
