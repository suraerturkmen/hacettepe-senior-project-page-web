import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Timeline } from "./TimelineSlice";

export interface EditSeniorProjectTermRequest {
  id: string;
  name: string;
  term: string;
  timelines: Timeline[];
}

export interface SeniorProject {
  id: string;
  name: string;
  term: string;
  timelines: Timeline[];
}

interface SeniorProjectData {
  success: boolean;
  message: string;
  data: SeniorProject[];
}

export interface EditSeniorProjectTermState {
  seniorProjectData: {
    message: string;
    success: boolean;
    data: SeniorProject[];
  };
}

const initialState: EditSeniorProjectTermState = {
  seniorProjectData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchEditSeniorProjectTerm = createAsyncThunk(
  "projectTypes/editSeniorProjectTerm",
  async (createRequest: EditSeniorProjectTermRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<SeniorProjectData>(
        "projectTypes/editSeniorProjectTerm",
        createRequest,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const editProjectSlice = createSlice({
  name: "editSeniorProjectTerm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEditSeniorProjectTerm.fulfilled, (state, action) => {
      state.seniorProjectData = action.payload;
    });
  },
});

export default editProjectSlice.reducer;
