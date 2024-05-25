import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ActiveSeniorProjectTerm } from "./ActiveSeniorProjectTerm";
import Cookies from "js-cookie";

export interface DeactivateProjectTerm {
  id: string;
}

interface DeactivateSeniorProjectTermData {
  success: boolean;
  message: string;
  data: ActiveSeniorProjectTerm;
}

export interface DeactiveSeniorProjectTermState {
  deactiveSeniorProjectTermData: {
    message: string;
    success: boolean;
    data: ActiveSeniorProjectTerm;
  };
}

const initialState: DeactiveSeniorProjectTermState = {
  deactiveSeniorProjectTermData: {
    success: false,
    message: "",
    data: { id: "", term: "", name: "" },
  },
};

export const fetchDeactivateSeniorProjectTerm = createAsyncThunk(
  "projectTypes/deactivateSeniorProjectTerm",
  async (
    archivedSeniorProjectTerm: DeactivateProjectTerm,
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response =
        await axiosInstance.post<DeactivateSeniorProjectTermData>(
          "projectTypes/deactivateSeniorProjectTerm",
          archivedSeniorProjectTerm,
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

const DeactivateSeniorProjectTermSlice = createSlice({
  name: "DeactivateSeniorProjectTerm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchDeactivateSeniorProjectTerm.fulfilled,
      (state, action) => {
        state.deactiveSeniorProjectTermData = action.payload;
      }
    );
  },
});

export default DeactivateSeniorProjectTermSlice.reducer;
