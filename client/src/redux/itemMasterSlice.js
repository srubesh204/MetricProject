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

export const itemMasterSlice = createSlice({
  name: "itemMaster",
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

export const {  setItems, setError } = itemMasterSlice.actions;

export default itemMasterSlice.reducer;

// Async Thunks
export const fetchAllItemMasters = () => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await Helper.getData(`${baseUrl}/getAllItemMasters`);
    dispatch(setItems(response.data));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoader(false));
  }
};

export const fetchMasterByPlant = (data, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  
  try {
    const response = await Helper.postData(`${baseUrl}/itemMaster/getMasterByPlant`, data);

    callback(response.data);
  } catch (err) {
    callback({ status: false, message: err.message });
  } finally {
    dispatch(setLoader(false));
  }
};

export const fetchItemMasterById = (id, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await Helper.getData(`${baseUrl}/getItemMasterById/${id}`);
    callback(response.data);
  } catch (err) {
    callback({ status: false, message: err.message });
  } finally {
    dispatch(setLoader(false));
  }
};

export const createItemMaster = (data, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await Helper.postData(`${baseUrl}/itemMaster/createItemMaster`, data);
    callback(response.data);
  } catch (err) {
    callback({ status: false, message: err.message });
  } finally {
    dispatch(setLoader(false));
  }
};

export const updateItemMasterApi = (id, data, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    const response = await Helper.putData(`${baseUrl}/itemMaster/updateItemMaster/${id}`, data);
    callback(response.data);
  } catch (err) {
    callback({ status: false, message: err.message });
  } finally {
    dispatch(setLoader(false));
  }
};

export const deleteItemMaster = (id, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    

    const response = await Helper.deleteData(`${baseUrl}/ItemMaster/deleteItemMaster`, { data: {
                itemMasterIds: id
            } });
    callback(response.data);
  } catch (err) {
    callback({ status: false, message: err.message });
  } finally {
    dispatch(setLoader(false));
  }
};

export const uploadItemMasterInExcel = (formData, callback = () => {}) => async (dispatch) => {
  dispatch(setLoader(true));
  try {
    
    const response = await Helper.postData(`${baseUrl}/itemMaster/uploadItemMasterInExcel`, formData, {
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
