import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";

export interface UploadDocumentRequest {
  documentName: string;
}

export interface Document {
  id: string;
  deliveryName: string;
  deliveryDate: string;
  projectId: string;
  file: string;
}

export interface FileData {
  success: boolean;
  message: string;
  data?: Document;
}

interface FileDataState {
  documentData: {
    message: string;
    success: boolean;
    data?: Document;
  };
}

const initialState: FileDataState = {
  documentData: {
    success: false,
    message: "",
    data: undefined,
  },
};

export const fetchDownloadDocument = createAsyncThunk(
  "documents/downloadDocument",
  async (updateRequest: UploadDocumentRequest, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const response = await axiosInstance.post<FileData>(
        "documents/downloadDocument",
        updateRequest.documentName,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          //responseType: "blob",
        }
      );

      return response.data; // Return the Blob directly
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDownloadDocument.fulfilled, (state, action) => {
      state.documentData.success = action.payload.success;
      state.documentData.message = action.payload.message;
      state.documentData.data = action.payload.data;
    });
  },
});

export default documentSlice.reducer;
