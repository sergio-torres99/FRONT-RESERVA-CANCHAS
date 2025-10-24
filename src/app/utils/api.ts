import { API_BASE_URL } from "./constants";

export function createApiClient(token: string) {
  return async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json() as Promise<T>;
  };
}