export const USER = import.meta.env.VITE_USER;
export const USER_ID = JSON.parse(localStorage.getItem("user"));
export const TOKEN = localStorage.getItem("token");
export const API_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_URL_DEV
    : import.meta.env.VITE_API_URL_PROD;
