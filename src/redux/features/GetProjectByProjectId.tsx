import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import Cookies from "js-cookie";
import { Project, ProjectStatus } from "./projectSlice";

export interface IdByProjectRequest {
  projectId: string;
}

interface ProjectData {
  success: boolean;
  message: string;
  data: Project;
}

export interface ProjectState {
  projectData: {
    message: string;
    success: boolean;
    data: Project;
  };
}

const initialState: ProjectState = {
  projectData: {
    success: false,
    message: "",
    data: {
      id: "",
      title: "",
      term: "",
      description: "",
      poster: "",
      projectTypeId: "",
      applicationIds: [],
      students: [],
      professors: [],
      groupId: "",
      working: false,
      demoLink: "",
      projectStatus: ProjectStatus.Past,
      keywords: [],
      studentLimit: 0,
      myProject: false,
      applied: false,
      embedding: "",
      websiteLink: "",
    },
  },
};

export const fetchProjectByProjectId = createAsyncThunk(
  "projects/getProjectByProjectId",
  async (idByProjectRequest: IdByProjectRequest, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/getProjectByProjectId",
        idByProjectRequest.projectId,
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
    builder.addCase(fetchProjectByProjectId.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default projectSlice.reducer;
