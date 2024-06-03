import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/documentInstance";
import Cookies from "js-cookie";
import { Project } from "./projectSlice";

export interface UploadLastFilesRequest {
  projectId: string;
  demoLink: string;
  websiteLink: string;
  posterFile: Blob;
}

interface FileData {
  success: boolean;
  message: string;
  data: Project[];
}

export interface FileDataState {
  projectData: {
    message: string;
    success: boolean;
    data: Project[];
  };
}

const initialState: FileDataState = {
  projectData: {
    success: false,
    message: "",
    data: [],
  },
};

export const fetchUploadLastFiles = createAsyncThunk(
  "projects/uploadPosterDemoLinkWebsiteLink",
  async (uploadRequest: UploadLastFilesRequest, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const formData = new FormData();
      formData.append("posterFile", uploadRequest.posterFile);
      formData.append("projectId", uploadRequest.projectId);
      formData.append("demoLink", uploadRequest.demoLink);
      formData.append("websiteLink", uploadRequest.websiteLink);

      const response = await axiosInstance.post<FileData>(
        "projects/uploadPosterDemoLinkWebsiteLink",
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

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUploadLastFiles.fulfilled, (state, action) => {
      state.projectData = action.payload;
    });
  },
});

export default projectSlice.reducer;
