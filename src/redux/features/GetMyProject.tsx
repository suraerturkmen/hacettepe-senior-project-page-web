import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import Cookies from "js-cookie";
import { Project } from "./projectSlice";

export interface IdByProjectRequest {
  sessionId: string;
  roles: string[];
}

export interface ProjectState {
  projectData: {
    message: string;
    number: number;
    pageSize: number;
    success: boolean;
    totalElements: number;
    totalPages: number;
    data: Project[];
  };
}

export interface ProjectData {
  success: boolean;
  message: string;
  data: Project[];
  number: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

const initialState: ProjectState = {
  projectData: {
    success: false,
    message: "",
    data: [],
    number: 0,
    pageSize: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

export const fetchProjectsById = createAsyncThunk(
  "projects/getMyProjects",
  async (idByProjectRequest: IdByProjectRequest, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/getMyProjects",
        idByProjectRequest,
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

const myprojectSlice = createSlice({
  name: "myProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsById.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default myprojectSlice.reducer;
