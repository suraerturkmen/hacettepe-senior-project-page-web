import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { StudentProperties } from "./CreateGroup";
import { Project } from "./projectSlice";

export enum ApplicationStatusType {
  Approved = "APPROVED",
  Rejected = "REJECTED",
  Pending = "PENDING",
}

export interface ApplicationProperties {
  id: string;
  project: Project;
  groupId: string;
  status: ApplicationStatusType;
  term: string;
  groupName: string;
  groupMembers: StudentProperties[];
}

export interface CreateApplicationRequest {
  groupId: string;
  projectId: string;
}

interface ApplicationData {
  success: boolean;
  message: string;
  data: ApplicationProperties[];
}

export interface CreateApplicationState {
  applicationData: {
    message: string;
    success: boolean;
    data: ApplicationProperties[];
  };
}

const initialState: CreateApplicationState = {
  applicationData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchCreateApplication = createAsyncThunk(
  "applications/createApplicationByGroupToProject",
  async (createRequest: CreateApplicationRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ApplicationData>(
        "applications/createApplicationByGroupToProject",
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

const createApplicationSlice = createSlice({
  name: "createApplication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateApplication.fulfilled, (state, action) => {
      state.applicationData = action.payload;
    });
  },
});

export default createApplicationSlice.reducer;
