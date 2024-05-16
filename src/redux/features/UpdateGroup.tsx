import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Project } from "./projectSlice";

export interface StudentProperties {
  id: string;
  username: string;
}

export interface UpdateGroupRequest {
  groupId: string;
  sessionId: string;
  groupName: string;
  students: string[];
}

interface GroupData {
  success: boolean;
  message: string;
  data: Project[];
}

export interface UpdateGroupState {
  groupData: {
    message: string;
    success: boolean;
    data: Project[];
  };
}

const initialState: UpdateGroupState = {
  groupData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchUpdateGroup = createAsyncThunk(
  "groups/updateStudentGroup",
  async (updateRequest: UpdateGroupRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<GroupData>(
        "groups/updateStudentGroup",
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

const createGroupSlice = createSlice({
  name: "createGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateGroup.fulfilled, (state, action) => {
      state.groupData = action.payload;
    });
  },
});

export default createGroupSlice.reducer;
