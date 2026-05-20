import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ComfortZonePage from "../pages/ComfortZonePage";

vi.mock("../api/scenarioApi", () => ({
  scenarioService: {
    getScenario: vi.fn().mockResolvedValue({
      id: "scenario-1",
      roomId: 1,
      date: "2026-05-19",
      predictionHoursAhead: 6,
      values: [
        { type: "temperature", label: "Temperature", currentValue: 22, predictedValue: 23, unit: "°C" },
        { type: "humidity", label: "Humidity", currentValue: 45, predictedValue: 50, unit: "%" },
        { type: "light", label: "Light", currentValue: 300, predictedValue: 250, unit: "lx" },
      ],
    }),
    sendFeedback: vi.fn(({ feedback }) =>
      feedback === 0
        ? Promise.resolve({ success: true, newPredictedValue: 24 })
        : Promise.resolve({ success: true }),
    ),
  },
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/comfort-zone/1"]}>
      <Routes>
        <Route path="/comfort-zone/:roomId" element={<ComfortZonePage />} />
      </Routes>
    </MemoryRouter>,
  );

describe("ComfortZonePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("TC-CZ-01: shows current and predicted values for each metric", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading scenario/i)).not.toBeInTheDocument(),
    );

    expect(
      screen.getByRole("heading", { name: "Temperature", level: 4 }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Current: 22°C/)).toBeInTheDocument();
    expect(screen.getByText(/Predicted: 23°C/)).toBeInTheDocument();
    expect(screen.getByText(/Current: 45%/)).toBeInTheDocument();
    expect(screen.getByText(/Predicted: 50%/)).toBeInTheDocument();
  });

  test("TC-CZ-02: clicking Dislike updates the predicted value from the backend response", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading scenario/i)).not.toBeInTheDocument(),
    );

    const dislikeButtons = screen.getAllByRole("button", { name: /dislike/i });
    await userEvent.click(dislikeButtons[0]);

    await waitFor(() =>
      expect(screen.getByText(/Predicted: 24°C/)).toBeInTheDocument(),
    );
  });

  test("TC-CZ-03: clicking Like locks both feedback buttons for that metric", async () => {
    renderPage();
    await waitFor(() =>
      expect(screen.queryByText(/loading scenario/i)).not.toBeInTheDocument(),
    );

    const likeButtons = screen.getAllByRole("button", { name: /^like$/i });
    const dislikeButtons = screen.getAllByRole("button", { name: /dislike/i });

    await userEvent.click(likeButtons[0]);

    await waitFor(() => {
      expect(likeButtons[0]).toBeDisabled();
      expect(dislikeButtons[0]).toBeDisabled();
    });

    expect(likeButtons[1]).not.toBeDisabled();
  });
});
