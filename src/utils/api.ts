import axios from "axios";

export const API = axios.create({
    baseURL: "https://neon-active-back-end.onrender.com"
});