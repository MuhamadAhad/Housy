import axios from "axios";

export const API = axios.create({
  // baseURL: "https://housyahad.herokuapp.com/api/v1",
  baseURL: "http://localhost:4000/api/v1",
});

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
