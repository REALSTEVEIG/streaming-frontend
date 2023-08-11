import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {};
const axiosInstance = axios.create({
  baseURL: "http://localhost",
  headers,
});
// const axiosInstance = axios.create({
//   baseURL: "http://localhost",
// });

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const token = session?.user?.access_token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return new Promise((resolve, reject) => {
      resolve(response.data);
    });
  },
  (error) => {
    if (!error.response) {
      return new Promise((resolve, reject) => {
        reject(error.response);
      });
    }
    if (error.response.status == 401) {
      localStorage.clear();
      return new Promise((resolve, reject) => {
        let data = error.response.data;
        data.unAuthorized = true;
        resolve(data);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(error.response.data);
      });
    }
  }
);

export default axiosInstance;
