import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Announcement } from "./CreateAnnouncement";

interface AnnouncementData {
  success: boolean;
  message: string;
  data: Announcement[];
}

export interface AnnouncementState {
  announcementData: {
    message: string;
    success: boolean;
    data: Announcement[];
  };
}

const initialState: AnnouncementState = {
  announcementData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchGetAnnouncement = createAsyncThunk(
  "announcements/getAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      console.log(localStorage.getItem("roles"));
      const response = await axiosInstance.post<AnnouncementData>(
        "announcements/getAnnouncements",
        _
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

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetAnnouncement.fulfilled, (state, action) => {
      state.announcementData = action.payload;
    });
  },
});

export default announcementSlice.reducer;
