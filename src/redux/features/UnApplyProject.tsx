import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { StudentProperties } from "./CreateGroup";
import { Project } from "./projectSlice";
import Cookies from "js-cookie";

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
  studentId: string;
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

export const fetchUnApplyProject = createAsyncThunk(
  "applications/unApplyProject",
  async (createRequest: CreateApplicationRequest, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ApplicationData>(
        "applications/unApplyProject",
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

const unApplyProjectSlice = createSlice({
  name: "unApplyProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUnApplyProject.fulfilled, (state, action) => {
      state.applicationData = action.payload;
    });
  },
});

export default unApplyProjectSlice.reducer;
