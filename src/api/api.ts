import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Timeout de 10 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = secureLocalStorage.getItem("Token");

    if (token && typeof token === "string") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      secureLocalStorage.removeItem("Token");
      secureLocalStorage.removeItem("Usuario");
    }
    return Promise.reject(error);
  },
);
