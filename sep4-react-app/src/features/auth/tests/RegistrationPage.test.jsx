import {
  describe,
  test,
  expect,
  beforeEach,
  vi,
} from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage";

const mockHandleRegister = vi.fn();

vi.mock("../hooks/useRegister", () => ({
  useRegister: () => ({
    handleRegister: mockHandleRegister,
    loading: false,
    message: "",
  }),
}));

describe("RegistrationPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("submits registration form", async () => {
    render(
      <BrowserRouter>
        <RegistrationPage />
      </BrowserRouter>
    );

    await userEvent.type(
      screen.getByLabelText(/username/i),
      "John"
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "john@test.com"
    );

    await userEvent.type(
      screen.getByLabelText(/password/i),
      "123456"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /register/i,
      })
    );

    expect(mockHandleRegister).toHaveBeenCalledWith({
      name: "John",
      email: "john@test.com",
      password: "123456",
    });
  });
});