import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance";
import { StudentProperties } from "./CreateGroup";

export interface StudentResponse {
  students: StudentProperties[];
  currentStudentUsername: string;
}

interface StudentData {
  success: boolean;
  message: string;
  data: StudentResponse;
}

export interface StudentState {
  studentData: {
    message: string;
    success: boolean;
    data: StudentResponse;
  };
}

const initialState: StudentState = {
  studentData: {
    success: false,
    message: "",
    data: {
      students: [],
      currentStudentUsername: "",
    },
  },
};

export const fetchGetStudents = createAsyncThunk(
  "users/getStudents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const sessionId = localStorage.getItem("userId");
      if (!sessionId) {
        throw new Error("Session ID not found");
      }

      const request = JSON.stringify(sessionId);
      const response = await axiosInstance.post<StudentData>(
        "users/getStudents",
        request,
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

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetStudents.fulfilled, (state, action) => {
      state.studentData = action.payload;
    });
  },
});

export default studentSlice.reducer;
