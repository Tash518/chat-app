import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://chat-app-4ono.onrender.com/api",
  withCredentials: true
});