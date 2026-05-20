import {
  describe,
  test,
  expect,
  vi
} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as authApi from "../api/authApi";
import { AuthProvider } from "../context/AuthContextProvider";
import { useAuth } from "../context/authContext";

vi.mock("../api/authApi", () => ({
  loginUser: vi.fn(),
  registerUser: vi.fn(),
  decodeToken: vi.fn(),
}));

function TestComponent() {
  const { login, isAuthenticated } = useAuth();

  return (
    <>
      <button onClick={() => login({ email: "test@test.com", password: "123456"})}>Login</button>
      <p>{isAuthenticated ? "Authenticated" : "Not authenticated"}</p>
    </>
  );
}

describe("AuthContext", () => {
  test("login updates auth state", async () => {
    authApi.loginUser.mockResolvedValue({
      token: "abc",
      user: { id: 1, name: "John"}});

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/authenticated/i)
      ).toBeInTheDocument();
    });
  });
});