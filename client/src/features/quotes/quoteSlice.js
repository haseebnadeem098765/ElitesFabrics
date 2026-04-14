import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const submitQuote = createAsyncThunk('quotes/submit', async ({ formData }, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.userToken;
        const response = await axios.post(`${API_URL}/quote`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to submit quote');
    }
});

export const fetchAdminQuotes = createAsyncThunk('quotes/fetchAdmin', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        const response = await axios.get(`${API_URL}/admin/quotes`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch quotes');
    }
});

export const deleteAdminQuote = createAsyncThunk('quotes/deleteAdmin', async (id, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        await axios.delete(`${API_URL}/admin/quotes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete quote');
    }
});

const quoteSlice = createSlice({
    name: 'quotes',
    initialState: {
        data: [],
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
        }
    },
    extraReducers: (builder) => {
        builder
            // Submit Quote
            .addCase(submitQuote.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(submitQuote.fulfilled, (state) => { state.loading = false; state.successMessage = 'Your quote request has been sent successfully!'; })
            .addCase(submitQuote.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // Fetch Quotes
            .addCase(fetchAdminQuotes.pending, (state) => { state.adminLoading = true; state.adminError = null; })
            .addCase(fetchAdminQuotes.fulfilled, (state, action) => { state.adminLoading = false; state.data = action.payload; })
            .addCase(fetchAdminQuotes.rejected, (state, action) => { state.adminLoading = false; state.adminError = action.payload; })
            // Delete Quote
            .addCase(deleteAdminQuote.fulfilled, (state, action) => {
                state.data = state.data.filter(quote => quote._id !== action.payload);
            });
    }
});

export const { clearMessages } = quoteSlice.actions;
export default quoteSlice.reducer;
