import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


export const submitContactForm = createAsyncThunk('contacts/submit', async ({ formData }, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.userToken;
        const response = await axios.post(`${API_URL}/contact`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to submit contact form');
    }
});

export const fetchAdminContacts = createAsyncThunk('contacts/fetchAdmin', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        const response = await axios.get(`${API_URL}/admin/contacts`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to fetch contacts');
    }
});

export const deleteAdminContact = createAsyncThunk('contacts/deleteAdmin', async (id, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.adminToken;
        await axios.delete(`${API_URL}/admin/contacts/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return id;
    } catch(err) {
        return rejectWithValue(err.response?.data?.error || 'Failed to delete contact');
    }
});

const contactSlice = createSlice({
    name: 'contacts',
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
            // Submit Contact
            .addCase(submitContactForm.pending, (state) => { state.loading = true; state.error = null; state.successMessage = null; })
            .addCase(submitContactForm.fulfilled, (state) => { state.loading = false; state.successMessage = 'Your message has been sent successfully!'; })
            .addCase(submitContactForm.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
            // Fetch Contacts
            .addCase(fetchAdminContacts.pending, (state) => { state.adminLoading = true; state.adminError = null; })
            .addCase(fetchAdminContacts.fulfilled, (state, action) => { state.adminLoading = false; state.data = action.payload; })
            .addCase(fetchAdminContacts.rejected, (state, action) => { state.adminLoading = false; state.adminError = action.payload; })
            // Delete Contact
            .addCase(deleteAdminContact.fulfilled, (state, action) => {
                state.data = state.data.filter(contact => contact._id !== action.payload);
            });
    }
});

export const { clearMessages } = contactSlice.actions;
export default contactSlice.reducer;
