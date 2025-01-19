import { useLocalStorage } from "@/hooks/use-localstorage";
import { routes } from "@/lib/routes";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getItem } = useLocalStorage();

const accessToken = getItem("accessToken");

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios request interceptors to add token in the request headers
api.interceptors.request.use((config) => {
  const token = accessToken && JSON.parse(accessToken);

  // If token exist, add token to the header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Axios response interceptors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // console.error("Expired token");
      // TODO: add refresh token later
      if (typeof window !== "undefined") {
        window.location.href = `/${routes.auth.login}`; // Adjust the login path as needed
      }
    }

    return Promise.reject(error);
  },
);

export default api;
