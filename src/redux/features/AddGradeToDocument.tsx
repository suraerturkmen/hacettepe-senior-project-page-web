import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { Document } from "@/redux/features/UploadDocument";

export interface AddGradeToDocumentRequest {
  documentName: string;
  grade: string;
  projectId: string;
  timelineId: string;
}

interface DocumentData {
  success: boolean;
  message: string;
  data: Document[];
}

export interface DocumentState {
  documentData: {
    message: string;
    success: boolean;
    data: Document[];
  };
}

const initialState: DocumentState = {
  documentData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchAddGradeToDocument = createAsyncThunk(
  "documents/addGradeDocument",
  async (request: AddGradeToDocumentRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<DocumentData>(
        "documents/addGradeDocument",
        request
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddGradeToDocument.fulfilled, (state, action) => {
      state.documentData = action.payload;
    });
  },
});

export default documentSlice.reducer;
