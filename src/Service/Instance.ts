import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set JWT token in axios headers
export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;
