import { API_BASE_URL } from "../utils/constants";

const useApi = () => {
  async function apiClient<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status} - ${errorText}`);
    }

    if (res.status === 204) {
      return {} as T;
    }

    const text = await res.text();
    if (!text) {
      return {} as T;
    }

    try {
      return JSON.parse(text) as T;
    } catch (e) {
      console.error("Failed to parse JSON:", e, text);
      throw new Error("Invalid JSON response");
    }
  }

  return { apiClient };
};

export default useApi;
