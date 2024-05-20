import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface UpdateAnnouncementRequest {
  id: string;
  content: string;
  title: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
}

interface AnnouncementData {
  success: boolean;
  message: string;
  data: Announcement[];
}

export interface UpdateAnnouncementState {
  announcement: {
    message: string;
    success: boolean;
    data: Announcement[];
  };
}

const initialState: UpdateAnnouncementState = {
  announcement: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchUpdateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
  async (createRequest: UpdateAnnouncementRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<AnnouncementData>(
        "announcements/updateAnnouncement",
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

const updateAnnouncementSlice = createSlice({
  name: "updateAnnouncement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateAnnouncement.fulfilled, (state, action) => {
      state.announcement = action.payload;
    });
  },
});

export default updateAnnouncementSlice.reducer;
