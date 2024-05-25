import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { ProfessorsProperties } from "./projectSlice";
import Cookies from "js-cookie";

export interface ProfessorsResponse {
  professors: ProfessorsProperties[];
  currentProfessorUsername: string;
}

interface ProfessorData {
  success: boolean;
  message: string;
  data: ProfessorsResponse;
}

export interface ProfessorState {
  professorData: {
    message: string;
    success: boolean;
    data: ProfessorsResponse;
  };
}

const initialState: ProfessorState = {
  professorData: {
    success: false,
    message: "",
    data: {
      professors: [],
      currentProfessorUsername: "",
    },
  },
};

export const fetchGetProfessors = createAsyncThunk(
  "users/getProfessors",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const sessionId = Cookies.get("userId");
      if (!sessionId) {
        throw new Error("Session ID not found");
      }

      const request = JSON.stringify(sessionId);
      const response = await axiosInstance.post<ProfessorData>(
        "users/getProfessors",
        request, // Simplify object creation
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

const professorsSlice = createSlice({
  name: "professors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetProfessors.fulfilled, (state, action) => {
      state.professorData = action.payload;
    });
  },
});

export default professorsSlice.reducer;
