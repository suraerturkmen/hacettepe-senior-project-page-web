import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface ActiveSeniorProjectTerm {
  id: string;
  name: string;
  term: string;
}

interface ActiveSeniorProjectTermData {
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

export const fetchActiveSeniorProjectTerm = createAsyncThunk(
  "projectTypes/getActiveSeniorProjectTerm",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ActiveSeniorProjectTermData>(
        "projectTypes/getActiveSeniorProjectTerm",
        _,
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

const ActiveSeniorProjectTermDataSlice = createSlice({
  name: "activeSeniorProjectTermData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActiveSeniorProjectTerm.fulfilled, (state, action) => {
      state.activeSeniorProjectTermData = action.payload;
    });
  },
});

export default ActiveSeniorProjectTermDataSlice.reducer;
