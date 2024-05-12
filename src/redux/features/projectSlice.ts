import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface ProfessorsProperties {
  id: string;
  username: string;
}
export enum ProjectStatus {
  Past = "ARCHIVED",
  Working = "WORKING",
  InApplicationProcess = "OFFERED",
}

export interface SearchRequest {
  search: {
    type: string;
    value: string;
  };
  sort: {
    type: string;
    direction: string;
  };
  pageNumber: number;
  pageSize: number;
}

export interface IdByProjectRequest {
  sessionId: string;
  roles: string[];
}

export interface Project {
  applicationIds: number[];
  students: string[];
  professors: ProfessorsProperties[];
  description: string;
  groupId: string;
  id: string;
  title: string;
  reportLink: string;
  term: string;
  working: boolean;
  youtubeLink: string;
  projectStatus: ProjectStatus;
  keywords: string[];
  studentLimit: number;
  imageUrl: string;
  projectTypeId: string;
  myProject: boolean;
  applied: boolean;
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
    number: number;
    pageSize: number;
    success: boolean;
    totalElements: number;
    totalPages: number;
    data: Project[];
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

export const fetchProjects = createAsyncThunk(
  "projects/getProjects",
  async (searchRequest: SearchRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<ProjectData>(
        "projects/getProjects",
        searchRequest
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProjectsById = createAsyncThunk(
  "projects/getMyProjects",
  async (idByProjectRequest: IdByProjectRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
    builder.addCase(fetchProjectsById.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default projectSlice.reducer;
