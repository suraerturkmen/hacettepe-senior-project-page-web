import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Project } from "./projectSlice";
import { StudentProperties } from "./CreateGroup";
import { ApplicationProperties } from "./CreateApplication";

export interface GroupResponse {
  id: string;
  groupName: string;
  groupMembers: StudentProperties[];
  applications: ApplicationProperties[];
  projects: Project[];
}

interface GroupData {
  success: boolean;
  message: string;
  data: GroupResponse[];
}

export interface GroupState {
  groupData: {
    message: string;
    success: boolean;
    data: GroupResponse[];
  };
}

const initialState: GroupState = {
  groupData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchGetGroups = createAsyncThunk(
  "groups/getGroupsByStudentId",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const sessionId = localStorage.getItem("userId");
      if (!sessionId) {
        throw new Error("Session ID not found");
      }

      const request = JSON.stringify(sessionId);
      const response = await axiosInstance.post<GroupData>(
        "groups/getGroupsByStudentId",
        request,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue({
        success: false,
        message: error.message || "An error occurred",
        data: error.response ? error.response.data : null,
      });
    }
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetGroups.fulfilled, (state, action) => {
      state.groupData = action.payload;
    });
  },
});

export default groupSlice.reducer;
