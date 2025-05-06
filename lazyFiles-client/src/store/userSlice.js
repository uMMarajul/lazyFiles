import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getProfile} from "../services/userService.js";

// Async action (Thunk) to simulate fetching user data
export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    getProfile
);

const initialState = {
    status: 'idle',
    error: null,
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.id = null;
            state.name = '';
            state.email = '';
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;


