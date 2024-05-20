import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface UrlAndImage {
  url: string;
  image: string;
}

export interface UrlAndImageResponse {
  success: boolean;
  message: string;
  data: UrlAndImage[];
}

export interface UrlAndImageState {
  urlAndImageData: {
    message: string;
    success: boolean;
    data: UrlAndImage[];
  };
}

const initialState: UrlAndImageState = {
  urlAndImageData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchUrlAndImages = createAsyncThunk(
  "urlAndImages/getUrlAndImages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<UrlAndImageResponse>(
        "urlAndImages/getUrlAndImages",
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

const urlAndImagesSlice = createSlice({
  name: "urlAndImages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUrlAndImages.fulfilled, (state, action) => {
      state.urlAndImageData = action.payload;
    });
  },
});

export default urlAndImagesSlice.reducer;
