import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/AiInstance"

export interface CreateProjectEmbeddingsRequestAi {
    abstract: string;
    keywords: string[];
}



export interface GetEmbeddings {
    status: string;
    embeddings: string;
}

export interface GetEmbeddigProjectState {
    projectData: {
        status: string;
        embeddings: string;
    };
}

const initialState: GetEmbeddigProjectState = {
    projectData: {
        status: "",
        embeddings: ""
    },
};

export const fetchGetEmbeddings = createAsyncThunk(
    "addNewProject",
    async (createRequest: CreateProjectEmbeddingsRequestAi, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<GetEmbeddings>(
                "addNewProject",
                createRequest,
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const getEmbeddingsSlice = createSlice({
    name: "embeddings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetEmbeddings.fulfilled, (state, action) => {
            state.projectData = action.payload;
        });
    },
});

export default getEmbeddingsSlice.reducer;
