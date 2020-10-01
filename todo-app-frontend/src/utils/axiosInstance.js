import axios from "axios";
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "http://localhost:8000/api/todo-app";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.defaults.headers.common["Accept"] = "application/json";

export default axiosInstance;
