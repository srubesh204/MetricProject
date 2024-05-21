// features/itemMaster/itemMasterSlice.js
import { createSlice } from "@reduxjs/toolkit";
import Helper from "../Helper/axiosHelper";
import { setLoader } from "./loaderSlice"; 

const baseUrl = Helper.baseUrl();

const initialState = {
  items: [],
  status: 'idle',
  error: null,
   
};

export const uploadsMasterSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {
  
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {  setItems, setError } = uploadsMasterSlice.actions;

export default uploadsMasterSlice.reducer;

// Async Thunks

export const itemMasterImage = (formData, callback = () => {}) => async (dispatch) => {
    dispatch(setLoader(true));
    try {
      
      const response = await Helper.postData(`${baseUrl}/upload/itemMasterImage`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });
      callback(response.data);
    } catch (err) {
      callback({ status: false, message: err.message });
    } finally {
      dispatch(setLoader(false));
    }
  };
  export const workInstructions = (data, callback = () => {}) => async (dispatch) => {
    dispatch(setLoader(true));
    
    try {
      const response = await Helper.postData(`${baseUrl}/upload/workInstructions`, data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
      });
      callback(response.data);
    } catch (err) {
      callback({ status: false, message: err.message });
    } finally {
      dispatch(setLoader(false));
    }
  };
  





