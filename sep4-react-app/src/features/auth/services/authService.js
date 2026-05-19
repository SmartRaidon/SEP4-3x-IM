import { mockLogin, mockRegister } from "../mocks/authMock";
import { apiLogin, apiRegister } from "../api/authApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function loginUser(data) {
  return USE_MOCK ? mockLogin(data) : apiLogin(data);
}

export function registerUser(data) {
  return USE_MOCK ? mockRegister(data) : apiRegister(data);
}