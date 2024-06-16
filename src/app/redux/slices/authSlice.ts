import { User } from '@prisma/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginCredentials {
  phone: string;
  password: string;
}

interface AuthState {
  user: any | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentUser: User | null
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  currentUser: null
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const response = await axios.get('/api/auth/checkAuth', { withCredentials: true });
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (credentials: LoginCredentials) => {
  const response = await axios.post('/api/auth/login', credentials, { withCredentials: true });
  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/api/auth/logout', {}, { withCredentials: true });
  return response.data;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (id: string) => {
  const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.userData;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export default authSlice.reducer;
