import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { RootState } from "../rootReducer";

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

interface Project {
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
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const response = await axiosInstance.post<ProjectData>(
        "projects/getProjects",
        searchRequest,
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
  },
});

export default projectSlice.reducer;
