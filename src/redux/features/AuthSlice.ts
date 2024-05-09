import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthToken } from "@/Service/Instance";

interface AuthState {
  token: string | null;
  type: string | null;
  id: string | null;
  roles: string[] | null;
}

const initialState: AuthState = {
  token: null,
  type: null,
  id: null,
  roles: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await axiosInstance.post("auth/signin", {
        username,
        password,
      });
      const { token, type, id, roles } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("userId", id);
      setAuthToken(token);
      return { token, type, id, roles };
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
      state.token = action.payload.token;
      state.roles = action.payload.roles;
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    clearToken: (state) => {
      state.token = null;
      state.roles = null;
      state.type = null;
      state.id = null;
    },
  },
  extraReducers: (builder) => {},
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
