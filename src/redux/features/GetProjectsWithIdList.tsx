import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Project } from "./projectSlice";

export interface ProjectsRequest {
  projectIds: string[];
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

export const fetchProjectIdsProjectList = createAsyncThunk(
  "projects/getProjectsWithIds",
  async (request: ProjectsRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ProjectData>(
        "projects/getProjectsWithIds",
        request
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectsSlice = createSlice({
  name: "projectsList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectIdsProjectList.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default projectsSlice.reducer;
