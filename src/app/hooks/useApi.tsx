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
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json() as Promise<T>;
  }

  return { apiClient };
};

export default useApi;
