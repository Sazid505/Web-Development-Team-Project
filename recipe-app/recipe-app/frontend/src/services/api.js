import axios from "axios";

// Create an Axios instance with base configuration
const API = axios.create({
  baseURL: "http://localhost:8888/api", // Replace with your backend's base URL
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export default API;
