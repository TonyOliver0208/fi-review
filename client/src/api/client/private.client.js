import axios from "axios";
import queryString from "query-string";

const baseURL = "http://127.0.0.1:5050/api/v1/";

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
});

// Add request interceptor
privateClient.interceptors.request.use(async (config) => {
  // Get token from localStorage
  const token = localStorage.getItem("actkn");

  // Only add Authorization header if token exists
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  };
});

// Add response interceptor
privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    // If token is invalid/expired and returns 401, remove from storage
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("actkn");
    }

    // Properly transform the error
    throw err.response ? err.response.data : { message: "Network Error" };
  }
);

export default privateClient;
