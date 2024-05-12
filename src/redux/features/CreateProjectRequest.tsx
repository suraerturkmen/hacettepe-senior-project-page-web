import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ProfessorsProperties, Project } from "./projectSlice";

export interface CreateProjectRequest {
  sessionId: string;
  title: string;
  description: string;
  professors: ProfessorsProperties[];
  keywords: string[];
  studentLimit: number;
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

export interface CreateProjectState {
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

const initialState: CreateProjectState = {
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

export const fetchCreateProject = createAsyncThunk(
  "projects/createSeniorProjectByProfessor",
  async (createRequest: CreateProjectRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/createSeniorProjectByProfessor",
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
  name: "createProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateProject.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default createProjectSlice.reducer;
