import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const subscribeNewsletter = createAsyncThunk('newsletter/subscribe', async (email, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/newsletter`, { email });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.message || 'Failed to subscribe to newsletter');
    }
});

const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        loading: false,
        error: null,
        successMessage: null
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(subscribeNewsletter.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(subscribeNewsletter.fulfilled, (state) => { state.loading = false; state.successMessage = 'Subscribed successfully!'; })
            .addCase(subscribeNewsletter.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export const { clearMessages } = newsletterSlice.actions;
export default newsletterSlice.reducer;
