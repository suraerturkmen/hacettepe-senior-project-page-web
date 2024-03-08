import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use((config) => {
  const username = process.env.NEXT_PUBLIC_USERNAME;
  const password = process.env.NEXT_PUBLIC_PASSWORD;
  const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;

  config.headers["Authorization"] = basicAuth;
  return config;
});

export default instance;
