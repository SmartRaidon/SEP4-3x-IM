import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SystemActionHistoryPage from "../pages/SystemActionHistoryPage";

vi.mock("../api/systemActionsApi", () => {
  const now = Date.now();
  const isoMinusHours = (h) => new Date(now - h * 60 * 60 * 1000).toISOString();
  return {
    systemActionsApi: {
      getActions: vi.fn().mockResolvedValue([
        { id: 1, roomId: 1, deviceType: "Heater", previousState: "Off", newState: "On", timestampUtc: isoMinusHours(1) },
        { id: 2, roomId: 1, deviceType: "Window", previousState: null,  newState: "Open", timestampUtc: isoMinusHours(5) },
        { id: 3, roomId: 1, deviceType: "Curtain", previousState: "Open", newState: "Closed", timestampUtc: isoMinusHours(48) },
      ]),
    },
  };
});

const now = Date.now();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/system-actions/1"]}>
      <Routes>
        <Route path="/system-actions/:roomId" element={<SystemActionHistoryPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("SystemActionHistoryPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all action rows after load", async () => {
    const { container } = renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading actions/i)).not.toBeInTheDocument(),
    );

    const rows = container.querySelectorAll(".actions-row:not(.actions-row-header)");
    expect(rows).toHaveLength(3);
    const rowText = Array.from(rows).map((r) => r.textContent);
    expect(rowText.some((t) => t.includes("Heater"))).toBe(true);
    expect(rowText.some((t) => t.includes("Window"))).toBe(true);
    expect(rowText.some((t) => t.includes("Curtain"))).toBe(true);
  });

  test("formats null previousState as an em dash", async () => {
    const { container } = renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading actions/i)).not.toBeInTheDocument(),
    );

    const cells = container.querySelectorAll(".actions-cell-change");
    const cellTexts = Array.from(cells).map((c) =>
      c.textContent.replace(/\s+/g, ""),
    );
    expect(cellTexts).toContain("—→Open");
    expect(cellTexts).toContain("Off→On");
    expect(cellTexts).toContain("Open→Closed");
  });

  test("filters rows by device type", async () => {
    const { container } = renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading actions/i)).not.toBeInTheDocument(),
    );

    await userEvent.selectOptions(screen.getByLabelText(/device:/i), "Heater");

    const rows = container.querySelectorAll(".actions-row:not(.actions-row-header)");
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain("Heater");
  });

  test("shows empty-state message when filters exclude every row", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading actions/i)).not.toBeInTheDocument(),
    );

    const past = new Date(now - 1000 * 60 * 60 * 24 * 365).toISOString().slice(0, 16);
    await userEvent.type(screen.getByLabelText(/to:/i), past);

    expect(screen.getByText(/no actions to display/i)).toBeInTheDocument();
  });
});
