import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface CreateAnnouncementRequest {
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

export interface CreateAnnouncementState {
  announcement: {
    message: string;
    success: boolean;
    data: Announcement[];
  };
}

const initialState: CreateAnnouncementState = {
  announcement: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchCreateAnnouncement = createAsyncThunk(
  "announcements/createAnnouncement",
  async (createRequest: CreateAnnouncementRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }
      const response = await axiosInstance.post<AnnouncementData>(
        "announcements/createAnnouncement",
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

const createAnnouncementSlice = createSlice({
  name: "createAnnouncement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreateAnnouncement.fulfilled, (state, action) => {
      state.announcement = action.payload;
    });
  },
});

export default createAnnouncementSlice.reducer;
