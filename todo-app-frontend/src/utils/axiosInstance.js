import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/todo-app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return new Promise((resolve, reject) => {
      const originalReq = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        console.log("sdkjsdk", error.config._retry);

        originalReq._retry = true;
        console.log(originalReq._retry);

        let result = fetch("http://localhost:8000/api/todo-app/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("UserId"),
            refreshToken: localStorage.getItem("RefreshToken"),
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            localStorage.setItem("Token", res.token);
            originalReq.headers["Authorization"] = "Bearer " + res.token;
            return axiosInstance(originalReq);
          });
        resolve(result);
      }

      return Promise.reject(error);
    });
  }
);

export default axiosInstance;
