import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface TimelineRequest {
  projectTypeId: string;
}

export interface Timeline {
  id: string;
  deliveryDate: Date;
  deliveryName: string;
  grade: string;
  term: string;
}

interface TimelineData {
  success: boolean;
  message: string;
  data: Timeline[];
}

export interface TimelineState {
  timelineData: {
    message: string;
    success: boolean;
    data: Timeline[];
  };
}

const initialState: TimelineState = {
  timelineData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchTimelinesByProjectTypeId = createAsyncThunk(
  "timeline/getTimelinesByProjectTypeId",
  async (request: TimelineRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<TimelineData>(
        "timeline/getTimelinesByProjectTypeId",
        request
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const TimelineSlice = createSlice({
  name: "timelines",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTimelinesByProjectTypeId.fulfilled,
      (state, action) => {
        state.timelineData = action.payload;
      }
    );
  },
});

export default TimelineSlice.reducer;
