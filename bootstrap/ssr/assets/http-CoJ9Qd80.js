import axios from "axios";
const baseURL = "http://127.0.0.1:8000/api";
const http = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
});
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
http.interceptors.response.use(
  (response) => response,
  (error) => {
    var _a;
    if (((_a = error.response) == null ? void 0 : _a.status) === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
