import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/documentInstance";

export interface UploadDocumentRequest {
  projectId: string;
  timelineId: string;
  file: Blob;
}

export interface Document {
  id: string;
  deliveryName: string;
  deliveryDate: string;
  projectId: string;
  file: Blob;
}

interface FileData {
  success: boolean;
  message: string;
  data: Document[];
}

export interface FileDataState {
  documentData: {
    message: string;
    success: boolean;
    data: Document[];
  };
}

const initialState: FileDataState = {
  documentData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchUploadDocument = createAsyncThunk(
  "documents/uploadDocument",
  async (uploadRequest: UploadDocumentRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const formData = new FormData();
      formData.append("file", uploadRequest.file);
      formData.append("projectId", uploadRequest.projectId);
      formData.append("timelineId", uploadRequest.timelineId);

      const response = await axiosInstance.post<FileData>(
        "documents/uploadDocument",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUploadDocument.fulfilled, (state, action) => {
      state.documentData = action.payload;
    });
  },
});

export default documentSlice.reducer;
