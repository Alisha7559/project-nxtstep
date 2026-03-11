import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.student = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;