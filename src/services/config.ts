import axios from "axios";

export const API_CONFIG = {
  BASE_URL: `${import.meta.env.VITE_BASEURL}/`,
  TIMEOUT: 100000,
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/login",
    PROFILE: "/api/me",
  },
};