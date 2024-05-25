import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import Cookies from "js-cookie";

export interface DeleteAnnouncementRequest {
  announcementId: string;
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

export const fetchDeleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (
    deleteAnnouncementRequest: DeleteAnnouncementRequest,
    { rejectWithValue }
  ) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const response = await axiosInstance.post<DeleteResponse>(
        "announcements/deleteAnnouncement",
        deleteAnnouncementRequest.announcementId,
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
  name: "deleteAnnouncement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteAnnouncement.fulfilled, (state, action) => {
      state.deleteResponse = action.payload;
    });
  },
});

export default DeleteSlice.reducer;
