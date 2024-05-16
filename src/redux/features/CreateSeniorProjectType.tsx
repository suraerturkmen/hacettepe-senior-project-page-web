import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ProfessorsProperties, Project } from "./projectSlice";
import { Timeline } from "./TimelineSlice";

export interface CreateSeniorProjectTermRequest {
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

export interface CreateSeniorProjectTermState {
  seniorProjectData: {
    message: string;
    success: boolean;
    data: SeniorProject[];
  };
}

const initialState: CreateSeniorProjectTermState = {
  seniorProjectData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchCreateSeniorProjectTerm = createAsyncThunk(
  "projectTypes/createSeniorProjectTerm",
  async (
    createRequest: CreateSeniorProjectTermRequest,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<SeniorProjectData>(
        "projectTypes/createSeniorProjectTerm",
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

const createProjectSlice = createSlice({
  name: "createSeniorProjectTerm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateSeniorProjectTerm.fulfilled, (state, action) => {
      state.seniorProjectData = action.payload;
    });
  },
});

export default createProjectSlice.reducer;
