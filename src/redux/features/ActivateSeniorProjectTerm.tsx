import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ActiveSeniorProjectTerm } from "./ActiveSeniorProjectTerm";
import Cookies from "js-cookie";

export interface ActivateSeniorProjectTerm {
  id: string;
}

export interface ActivateSeniorProjectTermData {
  success: boolean;
  message: string;
  data: ActiveSeniorProjectTerm;
}

export interface ActiveSeniorProjectTermState {
  activeSeniorProjectTermData: {
    message: string;
    success: boolean;
    data: ActiveSeniorProjectTerm;
  };
}

const initialState: ActiveSeniorProjectTermState = {
  activeSeniorProjectTermData: {
    success: false,
    message: "",
    data: { id: "", term: "", name: "" },
  },
};

export const fetchActivateSeniorProjectTerm = createAsyncThunk(
  "projectTypes/activateSeniorProjectTerm",
  async (
    activateSeniorProjectTerm: ActivateSeniorProjectTerm,
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ActivateSeniorProjectTermData>(
        "projectTypes/activateSeniorProjectTerm",
        activateSeniorProjectTerm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ActivateSeniorProjectTermSlice = createSlice({
  name: "activateSeniorProjectTerm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchActivateSeniorProjectTerm.fulfilled,
      (state, action) => {
        state.activeSeniorProjectTermData = action.payload;
      }
    );
  },
});

export default ActivateSeniorProjectTermSlice.reducer;
