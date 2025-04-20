// src/index.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});