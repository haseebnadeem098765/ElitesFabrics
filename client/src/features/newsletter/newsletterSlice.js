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

export const fetchAdminNewsletters = createAsyncThunk('newsletter/fetchAdmin', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        const response = await axios.get(`${API_URL}/admin/newsletters`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch subscribers');
    }
});

export const deleteAdminNewsletter = createAsyncThunk('newsletter/deleteAdmin', async (id, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        await axios.delete(`${API_URL}/admin/newsletters/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete subscriber');
    }
});

const newsletterSlice = createSlice({
    name: 'newsletter',
    initialState: {
        data: [], // For admin use
        loading: false,
        error: null,
        successMessage: null,
        adminLoading: false,
        adminError: null
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMessage = null;
            state.adminError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Public Subscribe
            .addCase(subscribeNewsletter.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(subscribeNewsletter.fulfilled, (state) => { state.loading = false; state.successMessage = 'Subscribed successfully!'; })
            .addCase(subscribeNewsletter.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // Admin Fetch
            .addCase(fetchAdminNewsletters.pending, (state) => { state.adminLoading = true; state.adminError = null; })
            .addCase(fetchAdminNewsletters.fulfilled, (state, action) => { state.adminLoading = false; state.data = action.payload; })
            .addCase(fetchAdminNewsletters.rejected, (state, action) => { state.adminLoading = false; state.adminError = action.payload; })
            // Admin Delete
            .addCase(deleteAdminNewsletter.fulfilled, (state, action) => {
                state.data = state.data.filter(sub => sub._id !== action.payload);
            });
    }
});

export const { clearMessages } = newsletterSlice.actions;
export default newsletterSlice.reducer;
