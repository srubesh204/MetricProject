import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderSlice";
import { itemMasterSlice } from "./itemMasterSlice";
import { Upload } from "@mui/icons-material";
import { uploadsMasterSlice } from "./uploads";
import { unitMasterSlice } from "./unitSlice";
import {snackbarSlice} from './snackbarSlice';


// import thunk from 'redux-thunk'; // Import the default export from redux-thunk

export const store = configureStore({
  reducer: { 
    loader: loaderSlice.reducer,
    itemMaster: itemMasterSlice.reducer,
    upload:uploadsMasterSlice.reducer,
    unit:unitMasterSlice.reducer,
    snackbar: snackbarSlice.reducer,
  },
  // middleware: [thunk] // Use thunk directly in middleware array
});
