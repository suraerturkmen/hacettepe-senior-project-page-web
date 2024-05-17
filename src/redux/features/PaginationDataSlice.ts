import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface ProjectData {
  id: string;
  name: string;
  term: string;
  youtubeLink: string;
  reportLink: string;
  description: string;
  professors: number[];
  group: number;
  applications: number[];
  working: boolean;
  keywords: string[];
  embedding: string;
}

interface DataState {
  data: ProjectData[];
  isSuccess: boolean;
  message: string;
  loading: boolean;
}

interface PagingData {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  content: DataState;
}

const initialState: PagingData = {
  size: 0,
  totalElements: 0,
  totalPages: 0,
  number: 0,
  content: {
    data: [],
    isSuccess: false,
    message: "",
    loading: false,
  },
};

export const getPagingData = createAsyncThunk(
  "data/getAllByPage",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<{
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
        content: { success: boolean; message: string; data: ProjectData[] };
      }>(`projects/getAllByPage?pageNo=${pageNumber}&pageSize=${pageSize}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getWorkingProjects = createAsyncThunk(
  "data/getWorkingProjects",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<{
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
        content: { success: boolean; message: string; data: ProjectData[] };
      }>(`projects/getAllByPage?pageNo=${pageNumber}&pageSize=${pageSize}`);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getArchivedProjects = createAsyncThunk(
  "data/getWorkingProjects",
  async (
    { pageNumber, pageSize }: { pageNumber: number; pageSize: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get<{
        size: number;
        totalElements: number;
        totalPages: number;
        number: number;
        content: { success: boolean; message: string; data: ProjectData[] };
      }>(`projects/getAllByPage?pageNo=${pageNumber}&pageSize=${pageSize}`);
      console.log(response.data);
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
      .addCase(getPagingData.pending, (state) => {
        state.content.loading = true;
      })
      .addCase(getPagingData.fulfilled, (state, action) => {
        state.content.loading = false;
        state.content.isSuccess = action.payload.content.success;
        state.content.message = action.payload.content.message;
        state.content.data = action.payload.content.data;
      })
      .addCase(getPagingData.rejected, (state, action) => {
        state.content.loading = false;
        state.content.isSuccess = false;
      });
  },
});

export default dataSlice.reducer;
