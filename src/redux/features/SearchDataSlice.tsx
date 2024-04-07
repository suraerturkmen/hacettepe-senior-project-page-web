import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

interface ProjectData {
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

interface DataState {
  data: ProjectData[];
  isSuccess: boolean;
  message: string;
  loading: boolean;
}

const initialState: DataState = {
  data: [],
  isSuccess: false,
  message: "",
  loading: false,
};

export const getByTitle = createAsyncThunk(
  //getbytitleandpagination olarak değiştir
  "data/getByTitle",
  async (title, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<{
        success: boolean;
        message: string;
        data: ProjectData[];
      }>(`projects/getByTitle?title=${title}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getByTitle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload.success;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(getByTitle.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
      });
  },
});

export default dataSlice.reducer;
