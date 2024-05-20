import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./loader";
import { itemMasterSlice } from "./itemMasterSlice";
import { Upload } from "@mui/icons-material";
import { uploadsMasterSlice } from "./uploads";
import { unitMasterSlice } from "./unitSlice";

// import thunk from 'redux-thunk'; // Import the default export from redux-thunk

export const store = configureStore({
  reducer: { 
    counter: counterSlice.reducer,
    itemMaster: itemMasterSlice.reducer,
    upload:uploadsMasterSlice.reducer,
    unit:unitMasterSlice.reducer
  },
  // middleware: [thunk] // Use thunk directly in middleware array
});
