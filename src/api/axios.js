import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const baseURL = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

//인스턴스 request header
// baseURL.interceptors.request.use((config) => {
//   console.log(config.headers);
//   if (config.headers.Authorization === "null") return;
//   const token = localStorage.getItem("token");
//   config.headers["Authorization"] = `${token}`;
//   return config;
// });
