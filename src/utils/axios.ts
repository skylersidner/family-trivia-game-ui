import axios from "axios";
// Set config defaults when creating the instance
export const baseURL =
    // @ts-ignore
    process.env.NODE_ENV === "development"
        ? "http://localhost:3003"
        : "https://family-trivia-api.onrender.com/";

const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000,
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${sessionStorage.getItem(
        "token"
    )}`;
  }
  return config;
});

instance.interceptors.response.use(
    (response) => {
      console.log("Response:", response);
      return response;
    },
    (error) => {
      console.log("Error:", error);
      if (error.response.status === 401) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.href = "/login?message=Session expired";
      }
      return Promise.reject(error);
    }
);
export default instance;
