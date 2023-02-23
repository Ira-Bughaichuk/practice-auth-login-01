import { createSlice } from '@reduxjs/toolkit';
import { logoutThunk, registerThunk } from './users-thunk';

const handlePending = state => {
  state.isLoading = true;
  state.error = '';
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  isLoading: false,
  error: '',
  user: {
    user: {},
    token: '',
  },
};

const authSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.pending, handlePending)
      .addCase(registerThunk.rejected, handleRejected)
      .addCase(logoutThunk.pending, handlePending)
      .addCase(logoutThunk.rejected, handleRejected)

      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});
export const authReducer = authSlice.reducer;
