import axios from "axios";

const baseURL = (import.meta.env.VITE_APP_SERVER_URL + "/api/v1") || "http://localhost:8000/api/v1"

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true, // Corrected the property name from "Credential" to "withCredentials"
});

export default API;
