import axios from "axios";
import secureLocalStorage from "react-secure-storage";

// const API_URL = process.env.NEXT_PUBLIC_API_URL;
// const API_URL = "https://localhost:7299/api/";
const API_URL = "https://jsonplaceholder.typicode.com/";

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
