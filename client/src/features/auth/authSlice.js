import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// 🔹 Safe localStorage parsing
const getLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        return null;
    }
};

// 🔹 Initial state
const initialState = {
    adminToken: localStorage.getItem('adminToken') || null,
    userToken: localStorage.getItem('userToken') || null,
    user: getLocalStorage('userData'),

    isAdminAuthenticated: !!localStorage.getItem('adminToken'),
    isUserAuthenticated: !!localStorage.getItem('userToken'),

    loading: false,
    error: null,
    requiresVerification: false,
    registeredEmail: null,
    registrationToken: null,
};

// =======================
// 🔹 ADMIN LOGIN
// =======================
export const adminLogin = createAsyncThunk(
    'auth/adminLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/admin/login`, credentials);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || 'Admin login failed');
        }
    }
);

// =======================
// 🔹 USER REGISTER
// =======================
export const userRegister = createAsyncThunk(
    'auth/userRegister',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/user/register`, userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || 'Registration failed');
        }
    }
);

// =======================
// 🔹 USER LOGIN
// =======================
export const userLogin = createAsyncThunk(
    'auth/userLogin',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/user/login`, credentials);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || 'Login failed');
        }
    }
);

// =======================
// 🔹 VERIFY EMAIL
// =======================
export const verifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/user/verify-email`, data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || 'Verification failed');
        }
    }
);
export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (tokenId, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${API_URL}/user/google-login`, { tokenId });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.error || 'Google login failed');
        }
    }
);

// =======================
// 🔹 SLICE
// =======================
const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        logout: (state) => {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('userToken');
            localStorage.removeItem('userData');

            state.adminToken = null;
            state.userToken = null;
            state.user = null;

            state.isAdminAuthenticated = false;
            state.isUserAuthenticated = false;
        },

        clearError: (state) => {
            state.error = null;
        },
    },

    extraReducers: (builder) => {

        // =======================
        // ADMIN LOGIN
        // =======================
        builder
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminToken = action.payload.token;
                state.isAdminAuthenticated = true;

                localStorage.setItem('adminToken', action.payload.token);
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // =======================
            // USER AUTH (REGISTER / LOGIN / GOOGLE / VERIFY)
            // =======================
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.requiresVerification) {
                    state.requiresVerification = true;
                    state.registeredEmail = action.payload.email;
                    state.registrationToken = action.payload.registrationToken;
                } else {
                    state.userToken = action.payload.token;
                    state.user = action.payload.user;
                    state.isUserAuthenticated = true;
                    localStorage.setItem('userToken', action.payload.token);
                    localStorage.setItem('userData', JSON.stringify(action.payload.user));
                }
            })

            .addMatcher(
                (action) =>
                    [userRegister.pending, userLogin.pending, googleLogin.pending, verifyEmail.pending]
                        .some(a => a.type === action.type),
                (state) => {
                    console.log('[AuthSlice] Auth pending...');
                    state.loading = true;
                    state.error = null;
                }
            )

            .addMatcher(
                (action) =>
                    [userLogin.fulfilled, googleLogin.fulfilled, verifyEmail.fulfilled]
                        .some(a => a.type === action.type),
                (state, action) => {
                    console.log('[AuthSlice] Auth fulfilled:', action.type);
                    state.loading = false;

                    state.userToken = action.payload.token;
                    state.user = action.payload.user;
                    state.isUserAuthenticated = true;
                    state.requiresVerification = false;
                    state.registeredEmail = null;
                    state.registrationToken = null;

                    localStorage.setItem('userToken', action.payload.token);
                    localStorage.setItem('userData', JSON.stringify(action.payload.user));
                }
            )

            .addMatcher(
                (action) =>
                    [userRegister.rejected, userLogin.rejected, googleLogin.rejected, verifyEmail.rejected]
                        .some(a => a.type === action.type),
                (state, action) => {
                    console.error('[AuthSlice] Auth rejected:', action.payload);
                    state.loading = false;
                    state.error = String(action.payload || 'Authentication failed');
                }
            );
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;