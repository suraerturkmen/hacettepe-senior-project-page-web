import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ProjectStatus } from "./projectSlice";
import {
  ApplicationProperties,
  ApplicationStatusType,
} from "./CreateApplication";

export interface ChangeApplicationStatusRequest {
  id: string;
  status: ApplicationStatusType;
}

interface ApplicationData {
  success: boolean;
  message: string;
  data: ApplicationProperties;
}

export interface ChangeApplicationState {
  applicationData: {
    message: string;
    success: boolean;
    data: ApplicationProperties;
  };
}

const initialState: ChangeApplicationState = {
  applicationData: {
    success: false,
    message: "",
    data: {
      id: "",
      status: ApplicationStatusType.Pending,
      groupId: "",
      groupMembers: [],
      term: "",
      groupName: "",
      project: {
        id: "",
        title: "",
        description: "",
        projectStatus: ProjectStatus.InApplicationProcess,
        professors: [],
        students: [],
        applicationIds: [],
        term: "",
        groupId: "",
        reportLink: "",
        working: false,
        youtubeLink: "",
        keywords: [],
        studentLimit: 0,
        poster: "",
        projectTypeId: "",
        myProject: false,
        applied: false,
        embedding: "",
      },
    },
  },
};

export const fetchChangeApplicationStatus = createAsyncThunk(
  "applications/changeApplicationStatus",
  async (
    createRequest: ChangeApplicationStatusRequest,
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ApplicationData>(
        "applications/changeApplicationStatus",
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

const changeApplicationStatusSlice = createSlice({
  name: "changeApplicationStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChangeApplicationStatus.fulfilled, (state, action) => {
      state.applicationData = action.payload;
    });
  },
});

export default changeApplicationStatusSlice.reducer;
