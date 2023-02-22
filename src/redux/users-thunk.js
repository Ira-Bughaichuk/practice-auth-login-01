import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signUpUsers,
  token,
  logoutUsers,
  getCurrentUsers,
} from './../services/user-api';

export const registerThunk = createAsyncThunk(
  'users/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await signUpUsers(credentials);
      //console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const refreshThunk = createAsyncThunk(
  'users/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const accessToken = getState().user.token;
      console.log(accessToken);
      const current = await getCurrentUsers(accessToken);
      return current;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logoutThunk = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutUsers();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
