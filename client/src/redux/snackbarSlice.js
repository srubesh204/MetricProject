import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
  severity: 'info', // info, success, warning, error
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    closeSnackbar: (state) => {
      state.open = false;
      state.message = '';
      state.severity = '';
    },
  },
});

export const { showSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer; // Export the slice as default
