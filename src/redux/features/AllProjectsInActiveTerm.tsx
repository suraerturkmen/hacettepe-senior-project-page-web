import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Project } from "./projectSlice";
import Cookies from "js-cookie";

export interface MyProjectRequest {
  sessionId: string;
  pageNumber: number;
  pageSize: number;
}

interface ProjectData {
  success: boolean;
  message: string;
  data: Project[];
  number: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export interface ProjectState {
  projectData: {
    message: string;
    success: boolean;
    data: Project[];
    number: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
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

export const fetchActiveSeniorProjects = createAsyncThunk(
  "projects/getActiveSeniorProjects",
  async (request: MyProjectRequest, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/getActiveSeniorProjects",
        request,
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

const activeSeniorProjectsSlice = createSlice({
  name: "activeSeniorProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchActiveSeniorProjects.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default activeSeniorProjectsSlice.reducer;
