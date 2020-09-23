import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api/todo-app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
