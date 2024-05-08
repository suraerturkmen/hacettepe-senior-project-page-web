import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthToken } from "@/Service/Instance";

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post("auth/signin", {
        username,
        password,
      });
      const token: string = response.data.token;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);

      console.log("JWT Token:", token);
      return token;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
