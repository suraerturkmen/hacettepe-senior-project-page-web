import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ProfessorsProperties, Project } from "./projectSlice";

export interface UpdateProjectRequest {
  id: string;
  sessionId: string;
  title: string;
  description: string;
  professors: ProfessorsProperties[];
  keywords: string[];
  studentLimit: number;
  groupId: string;
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

export interface UpdateProjectState {
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

const initialState: UpdateProjectState = {
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

export const fetchUpdateProject = createAsyncThunk(
  "projects/updateSeniorProjectByProfessor",
  async (updateRequest: UpdateProjectRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/updateSeniorProjectByProfessor",
        updateRequest,
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

const updateProjectSlice = createSlice({
  name: "updateProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateProject.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default updateProjectSlice.reducer;
