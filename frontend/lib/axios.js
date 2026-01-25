import axios from "axios";

// Set the base URL depending on environment
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Add token automatically to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Ensure headers exist
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
