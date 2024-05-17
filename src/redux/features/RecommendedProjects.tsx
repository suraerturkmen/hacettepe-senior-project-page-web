import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/Service/AiInstance"

export interface GetRecommendedRequest {
    id: string;
}


export interface GetEmbeddings {
    status: string;
    id: string;
    similar_ids: string[][];
    message: string;
}

export interface GetRecommendState {
    projectData: {
        status: string;
        id: string;
        similar_ids: string[][];
        message: string;
    };
}

const initialState: GetRecommendState = {
    projectData: {
        status: "",
        id: "",
        similar_ids: [[]],
        message: ""
    },
};

export const fetchGetSimilars = createAsyncThunk(
    "ask",
    async (similarRequest: GetRecommendedRequest, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post<GetEmbeddings>(
                "ask",
                similarRequest,
            );

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
);

const getSimilarsSlice = createSlice({
    name: "similars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGetSimilars.fulfilled, (state, action) => {
            state.projectData = action.payload;
        });
    },
});

export default getSimilarsSlice.reducer;
