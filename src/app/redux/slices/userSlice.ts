import { User } from '@prisma/client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


interface UsersState {
  users: User[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};



export const getAllUsers = createAsyncThunk('api/getUsers', async () => {
  const response = await axios.get(`/api/users`, { withCredentials: true });
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export default usersSlice.reducer;
