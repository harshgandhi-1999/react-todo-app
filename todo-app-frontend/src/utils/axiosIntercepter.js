import axios from "axios";

let token;

if (localStorage.getItem("Token")) {
  token = localStorage.getItem("Token");
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/todo-app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
