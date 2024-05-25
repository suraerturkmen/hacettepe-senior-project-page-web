import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface SeniorProjectTermRequest {
  projectTypeId: string;
}

export interface SeniorProjectTerm {
  id: string;
  name: string;
  term: string;
}

interface SeniorProjectTermData {
  success: boolean;
  message: string;
  data: SeniorProjectTerm;
}

export interface SeniorProjectTermState {
  SeniorProjectTermData: {
    message: string;
    success: boolean;
    data: SeniorProjectTerm;
  };
}

const initialState: SeniorProjectTermState = {
  SeniorProjectTermData: {
    success: false,
    message: "",
    data: { id: "", term: "", name: "" },
  },
};

export const fetchSeniorProjectTerm = createAsyncThunk(
  "projectTypes/getSeniorProjectWithProjectTypeId",
  async (request: SeniorProjectTermRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<SeniorProjectTermData>(
        "projectTypes/getSeniorProjectWithProjectTypeId",
        request
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const SeniorProjectTermDataSlice = createSlice({
  name: "SeniorProjectTermData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSeniorProjectTerm.fulfilled, (state, action) => {
      state.SeniorProjectTermData = action.payload;
    });
  },
});

export default SeniorProjectTermDataSlice.reducer;
