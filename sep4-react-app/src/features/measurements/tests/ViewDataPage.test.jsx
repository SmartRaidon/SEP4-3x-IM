import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ViewDataPage from "../pages/ViewDataPage";

vi.mock("../api/measurementsApi", () => {
  const now = new Date().toISOString();
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  return {
    measurementsApi: {
      getMeasurements: vi.fn().mockResolvedValue({
        roomId: 1,
        temperature: { value: 21, timeStamp: now },
        humidity: { value: 45, timeStamp: now },
        light: { value: 300, timeStamp: now },
      }),
      getMeasurementsHistory: vi.fn().mockResolvedValue([
        { timeStamp: oneHourAgo, temperature: 20, humidity: 44, light: 280 },
        { timeStamp: now, temperature: 21, humidity: 45, light: 300 },
      ]),
    },
  };
});

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/view-data/1"]}>
      <Routes>
        <Route path="/view-data/:roomId" element={<ViewDataPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("ViewDataPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("TC-VD-01: shows current sensor values (temperature, humidity, light) for the selected room", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading measurements/i)).not.toBeInTheDocument(),
    );

    expect(screen.getByText(/Value: 21/)).toBeInTheDocument();
    expect(screen.getByText(/Value: 45/)).toBeInTheDocument();
    expect(screen.getByText(/Value: 300/)).toBeInTheDocument();
  });

  test("TC-VD-02: renders the daily summary section (min / max / avg)", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading measurements/i)).not.toBeInTheDocument(),
    );

    expect(screen.getByRole("heading", { name: /last 24 hours/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Min:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Max:/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Avg:/).length).toBeGreaterThan(0);
  });

  test("TC-VD-03: filter buttons switch between All and individual metric charts", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading measurements/i)).not.toBeInTheDocument(),
    );

    expect(screen.getByRole("heading", { name: /all measurements/i })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /^temperature$/i }));
    expect(screen.getByRole("heading", { name: /Temperature °C/i })).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /all measurements/i }),
    ).not.toBeInTheDocument();
  });
});
