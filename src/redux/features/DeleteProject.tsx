import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface DeleteProjectRequest {
  sessionId: string;
  projectId: string;
}

interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface DeleteState {
  deleteResponse: {
    message: string;
    success: boolean;
  };
}

const initialState: DeleteState = {
  deleteResponse: {
    success: false,
    message: "",
  },
};

export const fetchDeleteProject = createAsyncThunk(
  "projects/deleteSeniorProjectByProfessor",
  async (deleteProjectRequest: DeleteProjectRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<DeleteResponse>(
        "projects/deleteSeniorProjectByProfessor",
        deleteProjectRequest,
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

const DeleteSlice = createSlice({
  name: "deleteProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteProject.fulfilled, (state, action) => {
      state.deleteResponse = action.payload;
    });
  },
});

export default DeleteSlice.reducer;
