import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ActiveSeniorProjectTerm } from "./ActiveSeniorProjectTerm";

export interface ArchivedSeniorProjectTerm {
  id: string;
}

interface ArchivedSeniorProjectTermData {
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

export const fetchArchivedSeniorProjectTerm = createAsyncThunk(
  "projectTypes/archiveSeniorProjectTerm",
  async (
    archivedSeniorProjectTerm: ArchivedSeniorProjectTerm,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ArchivedSeniorProjectTermData>(
        "projectTypes/archiveSeniorProjectTerm",
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

const ArchivedSeniorProjectTermSlice = createSlice({
  name: "ArchivedSeniorProjectTerm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchArchivedSeniorProjectTerm.fulfilled,
      (state, action) => {
        state.activeSeniorProjectTermData = action.payload;
      }
    );
  },
});

export default ArchivedSeniorProjectTermSlice.reducer;
