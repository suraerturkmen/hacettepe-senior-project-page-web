import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to set JWT token in axios headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    Cookies.set("jwtToken", token, { expires: 7 });
  } else {
    delete instance.defaults.headers.common["Authorization"];
    Cookies.remove("jwtToken");
  }
};

// Automatically set token if it exists in cookies
const token = Cookies.get("jwtToken");
if (token) {
  setAuthToken(token);
}

export default instance;
