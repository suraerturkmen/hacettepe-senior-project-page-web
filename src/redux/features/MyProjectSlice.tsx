import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface MyProjectRequest {
  sessionId: string;
  roles: string[];
}

export interface Project {
  applicationIds: number[];
  authorNames: string[];
  description: string;
  groupId: number;
  id: number;
  title: string;
  professorIds: number[];
  reportLink: string;
  term: string;
  working: boolean;
  youtubeLink: string;
  projectStatus: string;
}

interface ProjectData {
  success: boolean;
  message: string;
  data: Project[];
}

export interface ProjectState {
  projectData: {
    message: string;
    success: boolean;
    data: Project[];
  };
}

const initialState: ProjectState = {
  projectData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchMyProjects = createAsyncThunk(
  "projects/getMyProjects",
  async (request: MyProjectRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "projects/getMyProjects",
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

const myProjectSlice = createSlice({
  name: "myProjects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMyProjects.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default myProjectSlice.reducer;
