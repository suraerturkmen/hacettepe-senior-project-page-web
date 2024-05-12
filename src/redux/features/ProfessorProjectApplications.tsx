import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ApplicationProperties } from "./CreateApplication";

interface ApplicationData {
  success: boolean;
  message: string;
  data: ApplicationProperties[];
}

export interface ApplicationState {
  applicationData: {
    message: string;
    success: boolean;
    data: ApplicationProperties[];
  };
}

const initialState: ApplicationState = {
  applicationData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchGetApplications = createAsyncThunk(
  "applications/getApplicationsByProfessorId",
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
      const response = await axiosInstance.post<ApplicationData>(
        "applications/getApplicationsByProfessorId",
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

const applicationListSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetApplications.fulfilled, (state, action) => {
      state.applicationData = action.payload;
    });
  },
});

export default applicationListSlice.reducer;
