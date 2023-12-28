import axios from "axios";
// Set config defaults when creating the instance
export const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "http://localhost:3003"
    : "https://emerald-server-nk73.onrender.com/";
const instance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 20000,
});
export default instance;
