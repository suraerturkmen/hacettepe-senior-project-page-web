import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface DeleteGroupRequest {
  groupId: string;
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

export const fetchDeleteGroup = createAsyncThunk(
  "groups/deleteStudentGroup",
  async (deleteGroupRequest: DeleteGroupRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const response = await axiosInstance.post<DeleteResponse>(
        "groups/deleteStudentGroup",
        deleteGroupRequest.groupId,
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
  name: "deleteGroup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteGroup.fulfilled, (state, action) => {
      state.deleteResponse = action.payload;
    });
  },
});

export default DeleteSlice.reducer;
