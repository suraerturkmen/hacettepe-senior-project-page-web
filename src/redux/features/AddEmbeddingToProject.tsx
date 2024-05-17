import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/Instance"
import { Project } from "./projectSlice";

export interface AddProjectEmbedding {
    projectId: string;
    embedding: string;
}


interface ProjectData {
    success: boolean;
    message: string;
    data: Project[];
    number: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

export interface AddProjectEmbeddingState {
    projectData: {
        message: string;
        number: number;
        pageSize: number;
        success: boolean;
        totalElements: number;
        totalPages: number;
        data: Project[];
    };
}

const initialState: AddProjectEmbeddingState = {
    projectData: {
        success: false,
        message: "",
        data: [],
        number: 0,
        pageSize: 0,
        totalElements: 0,
        totalPages: 0,
    },
};

export const fetchAddEmbedding = createAsyncThunk(
    "projects/addEmbedding",
    async (createRequest: AddProjectEmbedding, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.post<ProjectData>(
                "projects/addEmbedding",
                createRequest,
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const addProjectEmbeddingSlice = createSlice({
    name: "projectWithEmbedding",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAddEmbedding.fulfilled, (state, action) => {
            state.projectData = action.payload;
        });
    },
});

export default addProjectEmbeddingSlice.reducer;
