// src/lib/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend-nelis-website.onrender.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds
});

// OPTIONAL: Attach auth token if needed later
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Clean error messages everywhere
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const formattedError =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(new Error(formattedError));
  }
);

export default axiosInstance;
