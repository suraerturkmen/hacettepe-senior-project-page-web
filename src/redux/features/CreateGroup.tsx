import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Project } from "./projectSlice";

export interface StudentProperties {
  id: string;
  username: string;
}

export interface CreateGroupRequest {
  sessionId: string;
  groupName: string;
  students: string[];
}

interface ProjectData {
  success: boolean;
  message: string;
  data: Project[];
}

export interface CreateProjectState {
  projectData: {
    message: string;
    success: boolean;
    data: Project[];
  };
}

const initialState: CreateProjectState = {
  projectData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchCreateGroup = createAsyncThunk(
  "groups/createStudentGroup",
  async (createRequest: CreateGroupRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<ProjectData>(
        "groups/createStudentGroup",
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

const createGroupSlice = createSlice({
  name: "createGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateGroup.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default createGroupSlice.reducer;
