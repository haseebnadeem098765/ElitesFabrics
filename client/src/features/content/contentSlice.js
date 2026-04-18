import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 🔹 Error Handler (safe)
const getErrorMessage = (err) => {
  if (err.response && err.response.data) {
    return err.response.data.message || err.response.data;
  }
  return err.message || 'Something went wrong';
};

// 🔹 Get Token safely
const getToken = (getState) => {
  const state = getState();
  return state?.auth?.adminToken || state?.auth?.userToken || null;
};

// =======================
// 🔹 FETCH CONTENT
// =======================
export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/content`, { timeout: 5000 }); // 5 second timeout
      return res.data;
    } catch (err) {
      console.error("Content fetch failed:", err);
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// =======================
// 🔹 UPDATE CONTENT
// =======================
export const updateContent = createAsyncThunk(
  'content/updateContent',
  async (contentData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);

      if (!token) {
        return rejectWithValue('User not logged in');
      }

      const res = await axios.post(`${API_URL}/content`, contentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// =======================
// 🔹 UPLOAD IMAGE
// =======================
export const uploadImage = createAsyncThunk(
  'content/uploadImage',
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getToken(getState);

      if (!token) {
        return rejectWithValue('User not logged in');
      }

      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ Content-Type manually set nahi karna
        },
      });

      return res.data; // { imageUrl }
    } catch (err) {
      return rejectWithValue(getErrorMessage(err));
    }
  }
);

// =======================
// 🔹 SLICE
// =======================
const contentSlice = createSlice({
  name: 'content',

  initialState: {
    data: {},

    loading: true,
    error: null,

    updateLoading: false,
    updateError: null,
    updateSuccess: null,

    uploadLoading: false,
    uploadError: null,
  },

  reducers: {
    clearMessages: (state) => {
      state.updateError = null;
      state.updateSuccess = null;
      state.uploadError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =======================
      // FETCH
      // =======================
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {};
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =======================
      // UPDATE
      // =======================
      .addCase(updateContent.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })
      .addCase(updateContent.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = 'Content updated successfully';
        const { page, section, data } = action.payload.content;
        if (!state.data[page]) state.data[page] = {};
        state.data[page][section] = data;
      })
      .addCase(updateContent.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      // =======================
      // UPLOAD
      // =======================
      .addCase(uploadImage.pending, (state) => {
        state.uploadLoading = true;
        state.uploadError = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadLoading = false;
        state.uploadError = action.payload;
      });
  },
});

// EXPORTS
export const { clearMessages } = contentSlice.actions;
export default contentSlice.reducer;