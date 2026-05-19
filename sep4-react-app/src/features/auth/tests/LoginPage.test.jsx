import React from "react";
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
import LoginPage from "../pages/LoginPage";

const mockHandleLogin = vi.fn();

vi.mock("../hooks/useLogin", () => ({
  useLogin: () => ({
    handleLogin: mockHandleLogin,
    loading: false,
    message: "",
  }),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: /login/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });

  test("submits form data", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "test@test.com"
    );

    await userEvent.type(
      screen.getByLabelText(/password/i),
      "123456"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(mockHandleLogin).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "123456",
    });
  });

  test("button disabled when fields empty", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeDisabled();
  });
});