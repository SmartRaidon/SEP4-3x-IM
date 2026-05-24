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

  let data;
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message ||  data?.error || `GET ${url} failed (status: ${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function apiPost(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: createAuthHeaders(),
    body: JSON.stringify(body),
  });

  let data;
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message ||  data?.error || 
      `POST ${url} failed (status: ${response.status})`;
    throw new Error(message);
  }

  return data;
}

export async function apiDelete(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: createAuthHeaders(),
  });

  let data;
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : data?.message ||  data?.error ||
      `DELETE ${url} failed (status: ${response.status})`;
    throw new Error(message);
  }

  return data;
}