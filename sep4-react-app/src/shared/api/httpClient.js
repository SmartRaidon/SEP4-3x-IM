import { getToken } from "../../features/auth/utils/authStorage";

function createAuthHeaders() {
  const token = getToken();
  const headers = { "Content-Type": "application/json",};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function apiGet(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed`);
  }

  return response.json();
}

export async function apiPost(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`POST ${url} failed`);
  }

  return response.json();
}

export async function apiDelete(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: createAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(`DELETE ${url} failed`);
  }

  return response.json();
}