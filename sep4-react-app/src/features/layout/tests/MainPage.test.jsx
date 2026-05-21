import { describe, test, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";

vi.mock("../../measurements/hooks/useCurrentMeasurements", () => ({
  useCurrentMeasurements: (roomId) =>
    roomId
      ? {
          data: {
            temperature: { value: 21 },
            humidity: { value: 45 },
            light: { value: 300 },
          },
          isLoading: false,
          error: null,
        }
      : { data: null, isLoading: false, error: null },
}));

const renderPage = () =>
  render(
    <BrowserRouter>
      <MainPage />
    </BrowserRouter>,
  );

describe("MainPage / Manage Household", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("TC-MH-01: dashboard lists all rooms from the mock data", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Living Room" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Bedroom" })).toBeInTheDocument();
  });

  test("TC-MH-02: selecting a room shows that room's current measurements", async () => {
    renderPage();
    expect(
      screen.getByText(/select a room to see current measurements/i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Living Room" }));

    expect(screen.getByText(/Temperature: 21/)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 45/)).toBeInTheDocument();
    expect(screen.getByText(/Light: 300/)).toBeInTheDocument();
  });

  test("TC-MH-03: View Data and Comfort Zone buttons are disabled when no room is selected", () => {
    renderPage();
    expect(screen.getByRole("button", { name: /comfort zone/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /view data/i })).toBeDisabled();
  });

  test("TC-MH-04: adding a room with a duplicate name is rejected and does not duplicate the entry", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    renderPage();

    await userEvent.click(screen.getByRole("button", { name: "+" }));
    await userEvent.type(screen.getByPlaceholderText(/room name/i), "Living Room");
    await userEvent.click(screen.getByRole("button", { name: /^add$/i }));

    expect(alertSpy).toHaveBeenCalledWith("Room name already exists.");
    expect(screen.getAllByRole("button", { name: "Living Room" })).toHaveLength(1);

    alertSpy.mockRestore();
  });
});
