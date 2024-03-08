import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface ProjectData {
  id: number;
  name: string;
  term: string;
  youtubeLink: string;
  reportLink: string;
  description: string;
  professors: number[];
  group: number;
  applications: number[];
}

export const getAllData = createAsyncThunk<ProjectData[]>(
  "getAllData",
  async (Params, { rejectWithValue }) => {
    try {
      const requestBody = {};
      const response = await axiosInstance.post<ProjectData[]>(
        "projects/getall",
        requestBody
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const dataSlice = createSlice({
  name: "ProjectData",
  initialState: {
    data: [] as ProjectData[],
    isSuccess: false,
    message: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
      });
  },
});

export default dataSlice.reducer;
