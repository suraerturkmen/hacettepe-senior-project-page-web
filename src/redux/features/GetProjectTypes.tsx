import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Timeline } from "./TimelineSlice";

export enum EProjectTypeStatus {
  ACTIVE = "ACTIVE",
  ARCHIVED = "ARCHIVED",
  NOT_STARTED = "NOT_STARTED",
}

export interface ProjectTypeResponse {
  id: string;
  name: string;
  activeness: EProjectTypeStatus;
  timelines: Timeline[];
}

interface ProjectTypeData {
  success: boolean;
  message: string;
  data: ProjectTypeResponse[];
}

export interface ProjectTypeState {
  projectTypeData: {
    message: string;
    success: boolean;
    data: ProjectTypeResponse[];
  };
}

const initialState: ProjectTypeState = {
  projectTypeData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchGetProjectTypes = createAsyncThunk(
  "projectTypes/getProjectTypes",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const sessionId = localStorage.getItem("userId");
      if (!sessionId) {
        throw new Error("Session ID not found");
      }

      const request = JSON.stringify(sessionId);
      const response = await axiosInstance.post<ProjectTypeData>(
        "projectTypes/getProjectTypes",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.message || "An error occurred",
        data: error.response ? error.response.data : null,
      });
    }
  }
);

const projectTypesSlice = createSlice({
  name: "projectTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetProjectTypes.fulfilled, (state, action) => {
      state.projectTypeData = action.payload;
    });
  },
});

export default projectTypesSlice.reducer;
